const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const path = require("path");
const ColorHash = require("color-hash");
require("dotenv").config();

const indexRouter = require("./routes");
const connect = require("./schemas");

const app = express();
connect();

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/gif", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(flash());
app.use((req, res, next) => {
  if (!req.session.color) {
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID);
  }
  next();
});

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status = err.status || 500;
  res.render("error");
});

const server = app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}포트 익스프레스 서버 작동 중`);
});

// 웹소켓 서버
const socket = require("./socket");
socket(server, app, sessionMiddleware);
