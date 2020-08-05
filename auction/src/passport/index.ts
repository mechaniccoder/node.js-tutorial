import local from './localStrategy';
import db from '../models';

const { User } = db;

export default (passport: any) => {
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findOne({ where: { id } })
      .then((user: any) => done(null, user))
      .catch((err: Error) => done(err));
  });

  local(passport);
};
