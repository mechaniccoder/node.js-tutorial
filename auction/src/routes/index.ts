import * as express from 'express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import db from '../models';
import { isLoggedIn, isLoggedOut } from './middlewares';

const router = express.Router();

const { User, Good, Auction } = db;

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
      const { name, price } = req.body;
      await Good.create({
        ownerId: req.user.id,
        name,
        price,
        img: req.file.filename,
      });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

export default router;
