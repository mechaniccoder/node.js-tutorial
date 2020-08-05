import * as express from 'express';
import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import { isLoggedIn, isLoggedOut } from './middlewares';
import db from '../models';

const router = express.Router();

const { User } = db;

// 회원가입 라우터
router.post(
  '/join',
  isLoggedOut,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { email, nick, password, money } = req.body;
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        req.flash('joinError', '이미 가입된 이메일입니다.');
        return res.redirect('/join');
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        nick,
        password: hash,
        money,
      });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

// 로그인 라우터
router.post(
  '/login',
  isLoggedOut,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        req.flash('loginError', info.message);
        return res.redirect('/');
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  },
);

// 로그아웃 라우터
router.get(
  '/logout',
  isLoggedIn,
  (req: express.Request, res: express.Response) => {
    req.logout();
    req.session?.destroy((err) => {
      console.error(err);
    });
    res.redirect('/');
  },
);

export default router;
