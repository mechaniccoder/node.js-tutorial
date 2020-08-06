// 라이브러리
import * as express from 'express';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 라우터
import indexRouter from './routes';
import authRouter from './routes/auth';

// 모듈
import db from './models';
import passportConfig from './passport';
import webSocket from './socket';
import sse from './sse';

const { sequelize } = db;

dotenv.config();

export const app = express();
sequelize.sync();
passportConfig(passport);

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET as string,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());

app.use('/', indexRouter);
app.use('/auth', authRouter);

interface Error {
  message?: string;
  status?: number;
}

app.use((req, res, next) => {
  const err: Error = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err: Error, req: express.Request, res: express.Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export const server = app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트 서버 대기!`);
});

webSocket(server, app);
sse(server);
