import { Express } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const isLoggedIn = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('loginError', '로그인이 필요합니다.');
    res.redirect('/');
  }
};

export const isLoggedOut = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};
