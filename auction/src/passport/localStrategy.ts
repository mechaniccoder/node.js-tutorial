import * as localStrategy from 'passport-local';
import * as bcrypt from 'bcrypt';
import db from '../models';

const LocalStrategy = localStrategy.Strategy;
const { User } = db;

export default (passport: any) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: any, password: any, done: any) => {
        try {
          const exUser = await User.find({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, exUser, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입하지 않은 회원입니다.' });
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          done(err);
        }
      },
    ),
  );
};
