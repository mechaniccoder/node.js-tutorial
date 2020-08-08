import * as express from 'express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import * as schedule from 'node-schedule';
import db from '../models';
import { isLoggedIn, isLoggedOut } from './middlewares';

const router = express.Router();

const { User, Good, Auction, sequelize } = db;

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const goods = await Good.findAll({ where: { soldId: null } });
      res.render('main', {
        title: '옥션',
        goods,
        loginError: req.flash('loginError'),
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
    // res.render('main', {
    //   user: {
    //     id: '1',
    //     name: '유승환',
    //     nick: 'mechaniccoder',
    //     money: '1,000,000',
    //   },
    // });
  },
);

router.get('/join', isLoggedOut, (req, res) => {
  res.render('join', { title: '회원가입', joinError: req.flash('joinError') });
});

router.get('/good', isLoggedIn, (req, res) => {
  res.render('good', { title: '상품등록' });
});

fs.readdir('uploads', (err) => {
  if (err) {
    console.error('uploads폴더가 없으므로 생성하겠습니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext,
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  '/good',
  isLoggedIn,
  upload.single('img'),
  async (req: any, res, next) => {
    try {
      console.log(req.body);
      const { name, price } = req.body;
      const good = await Good.create({
        ownerId: req.user.id,
        name,
        price,
        img: req.file.filename,
      });
      const end = new Date();
      end.setDate(end.getDate() + 1);
      schedule.scheduleJob(end, async () => {
        const success = await Auction.findOne({
          where: { goodId: good.id },
          order: [['bid', 'DESC']],
        });
        await Good.update(
          { soldId: success.userId },
          { where: { id: good.id } },
        );
        await User.update(
          {
            money: sequelize.literal(`money - ${success.bid}`),
          },
          {
            where: {
              id: success.userId,
            },
          },
        );
      });

      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

router.get(
  '/good/:id',
  isLoggedIn,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const [good, auction] = await Promise.all([
        Good.findOne({
          where: { id: req.params.id },
          include: {
            model: User,
            as: 'owner',
          },
        }),
        Auction.findAll({
          where: {
            goodId: req.params.id,
          },
          include: { model: User },
          order: [['bid', 'ASC']],
        }),
      ]);
      res.render('auction', {
        title: '경매방',
        good,
        auction,
        auctionError: req.flash('auctionError'),
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

router.post('/good/:id/bid', isLoggedIn, async (req: any, res, next) => {
  try {
    const { bid, msg } = req.body;
    const good = await Good.findOne({
      where: { id: req.params.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    });
    if (bid < good.price) {
      return res.status(403).send('시작 가격보다 높은 가격으로 입찰하세요.');
    }
    if (
      // eslint-disable-next-line operator-linebreak
      new Date(good.createdAt).valueOf() + 24 * 60 * 60 * 1000 <
      new Date().valueOf()
    ) {
      res.status(403).send('경매시간이 지났습니다.');
    }
    if (good.auctions[0] && good.auctions[0].bid >= bid) {
      res.send(403).send('이전 입찰가보다 높게 입찰하세요.');
    }
    const result = await Auction.create({
      bid,
      msg,
      userId: req.user.id,
      goodId: req.params.id,
    });
    req.app.get('io').to(req.params.id).emit('bid', {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
    return res.send('ok');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
