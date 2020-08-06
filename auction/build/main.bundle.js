/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/config.json":
/*!****************************!*\
  !*** ./config/config.json ***!
  \****************************/
/*! exports provided: development, test, production, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"development\":{\"username\":\"root\",\"password\":\"tmdghks9409151!\",\"database\":\"auction\",\"host\":\"127.0.0.1\",\"dialect\":\"mysql\",\"operatorAliases\":false},\"test\":{\"username\":\"root\",\"password\":null,\"database\":\"database_test\",\"host\":\"127.0.0.1\",\"dialect\":\"mysql\"},\"production\":{\"username\":\"root\",\"password\":null,\"database\":\"database_production\",\"host\":\"127.0.0.1\",\"dialect\":\"mysql\"}}");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
// 라이브러리
const express = __webpack_require__(/*! express */ "express");
const session = __webpack_require__(/*! express-session */ "express-session");
const morgan = __webpack_require__(/*! morgan */ "morgan");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
// import flash from 'connect-flash';
const passport = __webpack_require__(/*! passport */ "passport");
const path = __webpack_require__(/*! path */ "path");
const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
// 라우터
const routes_1 = __webpack_require__(/*! ./routes */ "./src/routes/index.ts");
const auth_1 = __webpack_require__(/*! ./routes/auth */ "./src/routes/auth.ts");
// 모듈
const models_1 = __webpack_require__(/*! ./models */ "./src/models/index.ts");
const passport_1 = __webpack_require__(/*! ./passport */ "./src/passport/index.ts");
const { sequelize } = models_1.default;
dotenv.config();
const app = express();
sequelize.sync();
passport_1.default(passport);
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
app.set('port', process.env.PORT || 8000);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(__webpack_require__(/*! connect-flash */ "connect-flash")());
app.use('/', routes_1.default);
app.use('/auth', auth_1.default);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트 서버 대기!`);
});

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src/models/auction.ts":
/*!*******************************!*\
  !*** ./src/models/auction.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable implicit-arrow-linebreak */
exports.default = (sequelize, DataTypes) => sequelize.define('auction', {
    bid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    msg: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    timestamps: true,
    paranoid: true,
});


/***/ }),

/***/ "./src/models/good.ts":
/*!****************************!*\
  !*** ./src/models/good.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable implicit-arrow-linebreak */
exports.default = (sequelize, DataTypes) => sequelize.define('good', {
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    paranoid: true,
});


/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const users_1 = __webpack_require__(/*! ./users */ "./src/models/users.ts");
const good_1 = __webpack_require__(/*! ./good */ "./src/models/good.ts");
const auction_1 = __webpack_require__(/*! ./auction */ "./src/models/auction.ts");
const env = "development" || false;
const config = __webpack_require__(/*! ../../config/config.json */ "./config/config.json")[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
// const db = {
//   sequelize,
//   Sequelize,
//   User: User(sequelize, Sequelize),
// };
// type dbProperties = {
//   sequelize: Sequelize;
//   Sequelize: typeof Sequelize;
//   User: (sequelize: Sequelize, Sequelize: Sequelize) => any;
//   Good: (sequelize: Sequelize, Sequelize: Sequelize) => any;
//   Auction: (sequelize: Sequelize, Sequelize: Sequelize) => any;
// };
const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
db.User = users_1.default(sequelize, sequelize_1.Sequelize);
db.Good = good_1.default(sequelize, sequelize_1.Sequelize);
db.Auction = auction_1.default(sequelize, sequelize_1.Sequelize);
db.Good.belongsTo(db.User, { as: 'owner' });
db.Good.belongsTo(db.User, { as: 'sold' });
db.User.hasMany(db.Auction);
db.Good.hasMany(db.Auction);
db.Auction.belongsTo(db.User);
db.Auction.belongsTo(db.Good);
exports.default = db;


/***/ }),

/***/ "./src/models/users.ts":
/*!*****************************!*\
  !*** ./src/models/users.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable implicit-arrow-linebreak */
exports.default = (sequelize, DataTypes) => sequelize.define('user', {
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    paranoid: true,
});


/***/ }),

/***/ "./src/passport/index.ts":
/*!*******************************!*\
  !*** ./src/passport/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const localStrategy_1 = __webpack_require__(/*! ./localStrategy */ "./src/passport/localStrategy.ts");
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
const { User } = models_1.default;
exports.default = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
    localStrategy_1.default(passport);
};


/***/ }),

/***/ "./src/passport/localStrategy.ts":
/*!***************************************!*\
  !*** ./src/passport/localStrategy.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const localStrategy = __webpack_require__(/*! passport-local */ "passport-local");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
const LocalStrategy = localStrategy.Strategy;
const { User } = models_1.default;
exports.default = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield User.findOne({ where: { email } });
            if (exUser) {
                const result = yield bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                }
                else {
                    done(null, exUser, { message: '비밀번호가 일치하지 않습니다.' });
                }
            }
            else {
                done(null, false, { message: '가입하지 않은 회원입니다.' });
            }
        }
        catch (err) {
            console.error(err);
            done(err);
        }
    })));
};


/***/ }),

/***/ "./src/routes/auth.ts":
/*!****************************!*\
  !*** ./src/routes/auth.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const passport = __webpack_require__(/*! passport */ "passport");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const middlewares_1 = __webpack_require__(/*! ./middlewares */ "./src/routes/middlewares.ts");
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
const router = express.Router();
const { User } = models_1.default;
// 회원가입 라우터
router.post('/join', middlewares_1.isLoggedOut, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nick, password, money } = req.body;
    try {
        const exUser = yield User.findOne({ where: { email } });
        if (exUser) {
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        const hash = yield bcrypt.hash(password, 12);
        yield User.create({
            email,
            nick,
            password: hash,
            money,
        });
        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
// 로그인 라우터
router.post('/login', middlewares_1.isLoggedOut, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// 로그아웃 라우터
router.get('/logout', middlewares_1.isLoggedIn, (req, res) => {
    var _a;
    req.logout();
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy((err) => {
        console.error(err);
    });
    res.redirect('/');
});
exports.default = router;


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const multer = __webpack_require__(/*! multer */ "multer");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
const middlewares_1 = __webpack_require__(/*! ./middlewares */ "./src/routes/middlewares.ts");
const router = express.Router();
const { User, Good, Auction } = models_1.default;
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goods = yield Good.findAll({ where: { soldId: null } });
        res.render('main', {
            title: '옥션',
            goods,
            loginError: req.flash('loginError'),
        });
    }
    catch (err) {
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
}));
router.get('/join', middlewares_1.isLoggedOut, (req, res) => {
    res.render('join', { title: '회원가입', joinError: req.flash('joinError') });
});
router.get('/good', middlewares_1.isLoggedIn, (req, res) => {
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
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.post('/good', middlewares_1.isLoggedIn, upload.single('img'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        yield Good.create({
            ownerId: req.user.id,
            name,
            price,
            img: req.file.filename,
        });
        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
exports.default = router;


/***/ }),

/***/ "./src/routes/middlewares.ts":
/*!***********************************!*\
  !*** ./src/routes/middlewares.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedOut = exports.isLoggedIn = void 0;
// eslint-disable-next-line import/prefer-default-export
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        req.flash('loginError', '로그인이 필요합니다.');
        res.redirect('/');
    }
};
exports.isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/');
    }
};


/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "connect-flash":
/*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-flash");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map