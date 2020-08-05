// 라이브러리
import * as express from 'express';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as flash from 'connect-flash';
import * as passport from 'passport';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 라우터
// import indexRouter from './routes';
// import authRouter from './routes/auth';

// 모듈
import db from './models';
import passportConfig from './passport';

const { sequelize } = db;

dotenv.config();

const app = express();
sequelize.sync();
passportConfig(passport);

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('3000번 포트 서버 대기!');
});
