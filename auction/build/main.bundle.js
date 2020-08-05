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

/***/ "./node_modules/are-we-there-yet/index.js":
/*!************************************************!*\
  !*** ./node_modules/are-we-there-yet/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.TrackerGroup = __webpack_require__(/*! ./tracker-group.js */ "./node_modules/are-we-there-yet/tracker-group.js")
exports.Tracker = __webpack_require__(/*! ./tracker.js */ "./node_modules/are-we-there-yet/tracker.js")
exports.TrackerStream = __webpack_require__(/*! ./tracker-stream.js */ "./node_modules/are-we-there-yet/tracker-stream.js")


/***/ }),

/***/ "./node_modules/are-we-there-yet/tracker-base.js":
/*!*******************************************************!*\
  !*** ./node_modules/are-we-there-yet/tracker-base.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter
var util = __webpack_require__(/*! util */ "util")

var trackerId = 0
var TrackerBase = module.exports = function (name) {
  EventEmitter.call(this)
  this.id = ++trackerId
  this.name = name
}
util.inherits(TrackerBase, EventEmitter)


/***/ }),

/***/ "./node_modules/are-we-there-yet/tracker-group.js":
/*!********************************************************!*\
  !*** ./node_modules/are-we-there-yet/tracker-group.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(/*! util */ "util")
var TrackerBase = __webpack_require__(/*! ./tracker-base.js */ "./node_modules/are-we-there-yet/tracker-base.js")
var Tracker = __webpack_require__(/*! ./tracker.js */ "./node_modules/are-we-there-yet/tracker.js")
var TrackerStream = __webpack_require__(/*! ./tracker-stream.js */ "./node_modules/are-we-there-yet/tracker-stream.js")

var TrackerGroup = module.exports = function (name) {
  TrackerBase.call(this, name)
  this.parentGroup = null
  this.trackers = []
  this.completion = {}
  this.weight = {}
  this.totalWeight = 0
  this.finished = false
  this.bubbleChange = bubbleChange(this)
}
util.inherits(TrackerGroup, TrackerBase)

function bubbleChange (trackerGroup) {
  return function (name, completed, tracker) {
    trackerGroup.completion[tracker.id] = completed
    if (trackerGroup.finished) return
    trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup)
  }
}

TrackerGroup.prototype.nameInTree = function () {
  var names = []
  var from = this
  while (from) {
    names.unshift(from.name)
    from = from.parentGroup
  }
  return names.join('/')
}

TrackerGroup.prototype.addUnit = function (unit, weight) {
  if (unit.addUnit) {
    var toTest = this
    while (toTest) {
      if (unit === toTest) {
        throw new Error(
          'Attempted to add tracker group ' +
          unit.name + ' to tree that already includes it ' +
          this.nameInTree(this))
      }
      toTest = toTest.parentGroup
    }
    unit.parentGroup = this
  }
  this.weight[unit.id] = weight || 1
  this.totalWeight += this.weight[unit.id]
  this.trackers.push(unit)
  this.completion[unit.id] = unit.completed()
  unit.on('change', this.bubbleChange)
  if (!this.finished) this.emit('change', unit.name, this.completion[unit.id], unit)
  return unit
}

TrackerGroup.prototype.completed = function () {
  if (this.trackers.length === 0) return 0
  var valPerWeight = 1 / this.totalWeight
  var completed = 0
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var trackerId = this.trackers[ii].id
    completed += valPerWeight * this.weight[trackerId] * this.completion[trackerId]
  }
  return completed
}

TrackerGroup.prototype.newGroup = function (name, weight) {
  return this.addUnit(new TrackerGroup(name), weight)
}

TrackerGroup.prototype.newItem = function (name, todo, weight) {
  return this.addUnit(new Tracker(name, todo), weight)
}

TrackerGroup.prototype.newStream = function (name, todo, weight) {
  return this.addUnit(new TrackerStream(name, todo), weight)
}

TrackerGroup.prototype.finish = function () {
  this.finished = true
  if (!this.trackers.length) this.addUnit(new Tracker(), 1, true)
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var tracker = this.trackers[ii]
    tracker.finish()
    tracker.removeListener('change', this.bubbleChange)
  }
  this.emit('change', this.name, 1, this)
}

var buffer = '                                  '
TrackerGroup.prototype.debug = function (depth) {
  depth = depth || 0
  var indent = depth ? buffer.substr(0, depth) : ''
  var output = indent + (this.name || 'top') + ': ' + this.completed() + '\n'
  this.trackers.forEach(function (tracker) {
    if (tracker instanceof TrackerGroup) {
      output += tracker.debug(depth + 1)
    } else {
      output += indent + ' ' + tracker.name + ': ' + tracker.completed() + '\n'
    }
  })
  return output
}


/***/ }),

/***/ "./node_modules/are-we-there-yet/tracker-stream.js":
/*!*********************************************************!*\
  !*** ./node_modules/are-we-there-yet/tracker-stream.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(/*! util */ "util")
var stream = __webpack_require__(/*! readable-stream */ "readable-stream")
var delegate = __webpack_require__(/*! delegates */ "./node_modules/delegates/index.js")
var Tracker = __webpack_require__(/*! ./tracker.js */ "./node_modules/are-we-there-yet/tracker.js")

var TrackerStream = module.exports = function (name, size, options) {
  stream.Transform.call(this, options)
  this.tracker = new Tracker(name, size)
  this.name = name
  this.id = this.tracker.id
  this.tracker.on('change', delegateChange(this))
}
util.inherits(TrackerStream, stream.Transform)

function delegateChange (trackerStream) {
  return function (name, completion, tracker) {
    trackerStream.emit('change', name, completion, trackerStream)
  }
}

TrackerStream.prototype._transform = function (data, encoding, cb) {
  this.tracker.completeWork(data.length ? data.length : 1)
  this.push(data)
  cb()
}

TrackerStream.prototype._flush = function (cb) {
  this.tracker.finish()
  cb()
}

delegate(TrackerStream.prototype, 'tracker')
  .method('completed')
  .method('addWork')
  .method('finish')


/***/ }),

/***/ "./node_modules/are-we-there-yet/tracker.js":
/*!**************************************************!*\
  !*** ./node_modules/are-we-there-yet/tracker.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(/*! util */ "util")
var TrackerBase = __webpack_require__(/*! ./tracker-base.js */ "./node_modules/are-we-there-yet/tracker-base.js")

var Tracker = module.exports = function (name, todo) {
  TrackerBase.call(this, name)
  this.workDone = 0
  this.workTodo = todo || 0
}
util.inherits(Tracker, TrackerBase)

Tracker.prototype.completed = function () {
  return this.workTodo === 0 ? 0 : this.workDone / this.workTodo
}

Tracker.prototype.addWork = function (work) {
  this.workTodo += work
  this.emit('change', this.name, this.completed(), this)
}

Tracker.prototype.completeWork = function (work) {
  this.workDone += work
  if (this.workDone > this.workTodo) this.workDone = this.workTodo
  this.emit('change', this.name, this.completed(), this)
}

Tracker.prototype.finish = function () {
  this.workTodo = this.workDone = 1
  this.emit('change', this.name, 1, this)
}


/***/ }),

/***/ "./node_modules/bcrypt sync recursive":
/*!**********************************!*\
  !*** ./node_modules/bcrypt sync ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/bcrypt sync recursive";

/***/ }),

/***/ "./node_modules/bcrypt/bcrypt.js":
/*!***************************************!*\
  !*** ./node_modules/bcrypt/bcrypt.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var binary = __webpack_require__(/*! node-pre-gyp */ "./node_modules/node-pre-gyp/lib/node-pre-gyp.js");
var path = __webpack_require__(/*! path */ "path");
var binding_path = binary.find(path.resolve(path.join(__dirname, './package.json')));
var bindings = __webpack_require__("./node_modules/bcrypt sync recursive")(binding_path);

var crypto = __webpack_require__(/*! crypto */ "crypto");

var promises = __webpack_require__(/*! ./promises */ "./node_modules/bcrypt/promises.js");

/// generate a salt (sync)
/// @param {Number} [rounds] number of rounds (default 10)
/// @return {String} salt
module.exports.genSaltSync = function genSaltSync(rounds, minor) {
    // default 10 rounds
    if (!rounds) {
        rounds = 10;
    } else if (typeof rounds !== 'number') {
        throw new Error('rounds must be a number');
    }

    if(!minor) {
        minor = 'b';
    } else if(minor !== 'b' && minor !== 'a') {
        throw new Error('minor must be either "a" or "b"');
    }

    return bindings.gen_salt_sync(minor, rounds, crypto.randomBytes(16));
};

/// generate a salt
/// @param {Number} [rounds] number of rounds (default 10)
/// @param {Function} cb callback(err, salt)
module.exports.genSalt = function genSalt(rounds, minor, cb) {
    var error;

    // if callback is first argument, then use defaults for others
    if (typeof arguments[0] === 'function') {
        // have to set callback first otherwise arguments are overriden
        cb = arguments[0];
        rounds = 10;
        minor = 'b';
    // callback is second argument
    } else if (typeof arguments[1] === 'function') {
        // have to set callback first otherwise arguments are overriden
        cb = arguments[1];
        minor = 'b';
    }

    if (!cb) {
        return promises.promise(genSalt, this, [rounds, minor]);
    }

    // default 10 rounds
    if (!rounds) {
        rounds = 10;
    } else if (typeof rounds !== 'number') {
        // callback error asynchronously
        error = new Error('rounds must be a number');
        return process.nextTick(function() {
            cb(error);
        });
    }

    if(!minor) {
        minor = 'b'
    } else if(minor !== 'b' && minor !== 'a') {
        error = new Error('minor must be either "a" or "b"');
        return process.nextTick(function() {
            cb(error);
        });
    }

    crypto.randomBytes(16, function(error, randomBytes) {
        if (error) {
            cb(error);
            return;
        }

        bindings.gen_salt(minor, rounds, randomBytes, cb);
    });
};

/// hash data using a salt
/// @param {String} data the data to encrypt
/// @param {String} salt the salt to use when hashing
/// @return {String} hash
module.exports.hashSync = function hashSync(data, salt) {
    if (data == null || salt == null) {
        throw new Error('data and salt arguments required');
    }

    if (typeof data !== 'string' || (typeof salt !== 'string' && typeof salt !== 'number')) {
        throw new Error('data must be a string and salt must either be a salt string or a number of rounds');
    }

    if (typeof salt === 'number') {
        salt = module.exports.genSaltSync(salt);
    }

    return bindings.encrypt_sync(data, salt);
};

/// hash data using a salt
/// @param {String} data the data to encrypt
/// @param {String} salt the salt to use when hashing
/// @param {Function} cb callback(err, hash)
module.exports.hash = function hash(data, salt, cb) {
    var error;

    if (typeof data === 'function') {
        error = new Error('data must be a string and salt must either be a salt string or a number of rounds');
        return process.nextTick(function() {
            data(error);
        });
    }

    if (typeof salt === 'function') {
        error = new Error('data must be a string and salt must either be a salt string or a number of rounds');
        return process.nextTick(function() {
            salt(error);
        });
    }

    // cb exists but is not a function
    // return a rejecting promise
    if (cb && typeof cb !== 'function') {
        return promises.reject(new Error('cb must be a function or null to return a Promise'));
    }

    if (!cb) {
        return promises.promise(hash, this, [data, salt]);
    }

    if (data == null || salt == null) {
        error = new Error('data and salt arguments required');
        return process.nextTick(function() {
            cb(error);
        });
    }

    if (typeof data !== 'string' || (typeof salt !== 'string' && typeof salt !== 'number')) {
        error = new Error('data must be a string and salt must either be a salt string or a number of rounds');
        return process.nextTick(function() {
            cb(error);
        });
    }


    if (typeof salt === 'number') {
        return module.exports.genSalt(salt, function(err, salt) {
            return bindings.encrypt(data, salt, cb);
        });
    }

    return bindings.encrypt(data, salt, cb);
};

/// compare raw data to hash
/// @param {String} data the data to hash and compare
/// @param {String} hash expected hash
/// @return {bool} true if hashed data matches hash
module.exports.compareSync = function compareSync(data, hash) {
    if (data == null || hash == null) {
        throw new Error('data and hash arguments required');
    }

    if (typeof data !== 'string' || typeof hash !== 'string') {
        throw new Error('data and hash must be strings');
    }

    return bindings.compare_sync(data, hash);
};

/// compare raw data to hash
/// @param {String} data the data to hash and compare
/// @param {String} hash expected hash
/// @param {Function} cb callback(err, matched) - matched is true if hashed data matches hash
module.exports.compare = function compare(data, hash, cb) {
    var error;

    if (typeof data === 'function') {
        error = new Error('data and hash arguments required');
        return process.nextTick(function() {
            data(error);
        });
    }

    if (typeof hash === 'function') {
        error = new Error('data and hash arguments required');
        return process.nextTick(function() {
            hash(error);
        });
    }

    // cb exists but is not a function
    // return a rejecting promise
    if (cb && typeof cb !== 'function') {
        return promises.reject(new Error('cb must be a function or null to return a Promise'));
    }

    if (!cb) {
        return promises.promise(compare, this, [data, hash]);
    }

    if (data == null || hash == null) {
        error = new Error('data and hash arguments required');
        return process.nextTick(function() {
            cb(error);
        });
    }

    if (typeof data !== 'string' || typeof hash !== 'string') {
        error = new Error('data and hash must be strings');
        return process.nextTick(function() {
            cb(error);
        });
    }

    return bindings.compare(data, hash, cb);
};

/// @param {String} hash extract rounds from this hash
/// @return {Number} the number of rounds used to encrypt a given hash
module.exports.getRounds = function getRounds(hash) {
    if (hash == null) {
        throw new Error('hash argument required');
    }

    if (typeof hash !== 'string') {
        throw new Error('hash must be a string');
    }

    return bindings.get_rounds(hash);
};

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/bcrypt/promises.js":
/*!*****************************************!*\
  !*** ./node_modules/bcrypt/promises.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = global.Promise;

/// encapsulate a method with a node-style callback in a Promise
/// @param {object} 'this' of the encapsulated function
/// @param {function} function to be encapsulated
/// @param {Array-like} args to be passed to the called function
/// @return {Promise} a Promise encapsulating the function
module.exports.promise = function (fn, context, args) {

    if (!Array.isArray(args)) {
        args = Array.prototype.slice.call(args);
    }

    if (typeof fn !== 'function') {
        return Promise.reject(new Error('fn must be a function'));
    }

    return new Promise(function(resolve, reject) {
        args.push(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

        fn.apply(context, args);
    });
};

/// @param {err} the error to be thrown
module.exports.reject = function (err) {
    return Promise.reject(err);
};

/// changes the promise implementation that bcrypt uses
/// @param {Promise} the implementation to use
module.exports.use = function(promise) {
  Promise = promise;
};


/***/ }),

/***/ "./node_modules/console-control-strings/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/console-control-strings/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// These tables borrowed from `ansi`

var prefix = '\x1b['

exports.up = function up (num) {
  return prefix + (num || '') + 'A'
}

exports.down = function down (num) {
  return prefix + (num || '') + 'B'
}

exports.forward = function forward (num) {
  return prefix + (num || '') + 'C'
}

exports.back = function back (num) {
  return prefix + (num || '') + 'D'
}

exports.nextLine = function nextLine (num) {
  return prefix + (num || '') + 'E'
}

exports.previousLine = function previousLine (num) {
  return prefix + (num || '') + 'F'
}

exports.horizontalAbsolute = function horizontalAbsolute (num) {
  if (num == null) throw new Error('horizontalAboslute requires a column to position to')
  return prefix + num + 'G'
}

exports.eraseData = function eraseData () {
  return prefix + 'J'
}

exports.eraseLine = function eraseLine () {
  return prefix + 'K'
}

exports.goto = function (x, y) {
  return prefix + y + ';' + x + 'H'
}

exports.gotoSOL = function () {
  return '\r'
}

exports.beep = function () {
  return '\x07'
}

exports.hideCursor = function hideCursor () {
  return prefix + '?25l'
}

exports.showCursor = function showCursor () {
  return prefix + '?25h'
}

var colors = {
  reset: 0,
// styles
  bold: 1,
  italic: 3,
  underline: 4,
  inverse: 7,
// resets
  stopBold: 22,
  stopItalic: 23,
  stopUnderline: 24,
  stopInverse: 27,
// colors
  white: 37,
  black: 30,
  blue: 34,
  cyan: 36,
  green: 32,
  magenta: 35,
  red: 31,
  yellow: 33,
  bgWhite: 47,
  bgBlack: 40,
  bgBlue: 44,
  bgCyan: 46,
  bgGreen: 42,
  bgMagenta: 45,
  bgRed: 41,
  bgYellow: 43,

  grey: 90,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,

  bgGrey: 100,
  bgBrightBlack: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107
}

exports.color = function color (colorWith) {
  if (arguments.length !== 1 || !Array.isArray(colorWith)) {
    colorWith = Array.prototype.slice.call(arguments)
  }
  return prefix + colorWith.map(colorNameToCode).join(';') + 'm'
}

function colorNameToCode (color) {
  if (colors[color] != null) return colors[color]
  throw new Error('Unknown color or style name: ' + color)
}


/***/ }),

/***/ "./node_modules/delegates/index.js":
/*!*****************************************!*\
  !*** ./node_modules/delegates/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Expose `Delegator`.
 */

module.exports = Delegator;

/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}

/**
 * Delegate method `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.method = function(name){
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function(){
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};

/**
 * Delegator accessor `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.access = function(name){
  return this.getter(name).setter(name);
};

/**
 * Delegator getter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.getter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, function(){
    return this[target][name];
  });

  return this;
};

/**
 * Delegator setter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.setter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function(val){
    return this[target][name] = val;
  });

  return this;
};

/**
 * Delegator fluent accessor
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);

  proto[name] = function(val){
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };

  return this;
};


/***/ }),

/***/ "./node_modules/detect-libc/lib/detect-libc.js":
/*!*****************************************************!*\
  !*** ./node_modules/detect-libc/lib/detect-libc.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var platform = __webpack_require__(/*! os */ "os").platform();
var spawnSync = __webpack_require__(/*! child_process */ "child_process").spawnSync;
var readdirSync = __webpack_require__(/*! fs */ "fs").readdirSync;

var GLIBC = 'glibc';
var MUSL = 'musl';

var spawnOptions = {
  encoding: 'utf8',
  env: process.env
};

if (!spawnSync) {
  spawnSync = function () {
    return { status: 126, stdout: '', stderr: '' };
  };
}

function contains (needle) {
  return function (haystack) {
    return haystack.indexOf(needle) !== -1;
  };
}

function versionFromMuslLdd (out) {
  return out.split(/[\r\n]+/)[1].trim().split(/\s/)[1];
}

function safeReaddirSync (path) {
  try {
    return readdirSync(path);
  } catch (e) {}
  return [];
}

var family = '';
var version = '';
var method = '';

if (platform === 'linux') {
  // Try getconf
  var glibc = spawnSync('getconf', ['GNU_LIBC_VERSION'], spawnOptions);
  if (glibc.status === 0) {
    family = GLIBC;
    version = glibc.stdout.trim().split(' ')[1];
    method = 'getconf';
  } else {
    // Try ldd
    var ldd = spawnSync('ldd', ['--version'], spawnOptions);
    if (ldd.status === 0 && ldd.stdout.indexOf(MUSL) !== -1) {
      family = MUSL;
      version = versionFromMuslLdd(ldd.stdout);
      method = 'ldd';
    } else if (ldd.status === 1 && ldd.stderr.indexOf(MUSL) !== -1) {
      family = MUSL;
      version = versionFromMuslLdd(ldd.stderr);
      method = 'ldd';
    } else {
      // Try filesystem (family only)
      var lib = safeReaddirSync('/lib');
      if (lib.some(contains('-linux-gnu'))) {
        family = GLIBC;
        method = 'filesystem';
      } else if (lib.some(contains('libc.musl-'))) {
        family = MUSL;
        method = 'filesystem';
      } else if (lib.some(contains('ld-musl-'))) {
        family = MUSL;
        method = 'filesystem';
      } else {
        var usrSbin = safeReaddirSync('/usr/sbin');
        if (usrSbin.some(contains('glibc'))) {
          family = GLIBC;
          method = 'filesystem';
        }
      }
    }
  }
}

var isNonGlibcLinux = (family !== '' && family !== GLIBC);

module.exports = {
  GLIBC: GLIBC,
  MUSL: MUSL,
  family: family,
  version: version,
  method: method,
  isNonGlibcLinux: isNonGlibcLinux
};


/***/ }),

/***/ "./node_modules/fs-minipass/index.js":
/*!*******************************************!*\
  !*** ./node_modules/fs-minipass/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const MiniPass = __webpack_require__(/*! minipass */ "./node_modules/minipass/index.js")
const EE = __webpack_require__(/*! events */ "events").EventEmitter
const fs = __webpack_require__(/*! fs */ "fs")

// for writev
const binding = process.binding('fs')
const writeBuffers = binding.writeBuffers
/* istanbul ignore next */
const FSReqWrap = binding.FSReqWrap || binding.FSReqCallback

const _autoClose = Symbol('_autoClose')
const _close = Symbol('_close')
const _ended = Symbol('_ended')
const _fd = Symbol('_fd')
const _finished = Symbol('_finished')
const _flags = Symbol('_flags')
const _flush = Symbol('_flush')
const _handleChunk = Symbol('_handleChunk')
const _makeBuf = Symbol('_makeBuf')
const _mode = Symbol('_mode')
const _needDrain = Symbol('_needDrain')
const _onerror = Symbol('_onerror')
const _onopen = Symbol('_onopen')
const _onread = Symbol('_onread')
const _onwrite = Symbol('_onwrite')
const _open = Symbol('_open')
const _path = Symbol('_path')
const _pos = Symbol('_pos')
const _queue = Symbol('_queue')
const _read = Symbol('_read')
const _readSize = Symbol('_readSize')
const _reading = Symbol('_reading')
const _remain = Symbol('_remain')
const _size = Symbol('_size')
const _write = Symbol('_write')
const _writing = Symbol('_writing')
const _defaultFlag = Symbol('_defaultFlag')

class ReadStream extends MiniPass {
  constructor (path, opt) {
    opt = opt || {}
    super(opt)

    this.writable = false

    if (typeof path !== 'string')
      throw new TypeError('path must be a string')

    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null
    this[_path] = path
    this[_readSize] = opt.readSize || 16*1024*1024
    this[_reading] = false
    this[_size] = typeof opt.size === 'number' ? opt.size : Infinity
    this[_remain] = this[_size]
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true

    if (typeof this[_fd] === 'number')
      this[_read]()
    else
      this[_open]()
  }

  get fd () { return this[_fd] }
  get path () { return this[_path] }

  write () {
    throw new TypeError('this is a readable stream')
  }

  end () {
    throw new TypeError('this is a readable stream')
  }

  [_open] () {
    fs.open(this[_path], 'r', (er, fd) => this[_onopen](er, fd))
  }

  [_onopen] (er, fd) {
    if (er)
      this[_onerror](er)
    else {
      this[_fd] = fd
      this.emit('open', fd)
      this[_read]()
    }
  }

  [_makeBuf] () {
    return Buffer.allocUnsafe(Math.min(this[_readSize], this[_remain]))
  }

  [_read] () {
    if (!this[_reading]) {
      this[_reading] = true
      const buf = this[_makeBuf]()
      /* istanbul ignore if */
      if (buf.length === 0) return process.nextTick(() => this[_onread](null, 0, buf))
      fs.read(this[_fd], buf, 0, buf.length, null, (er, br, buf) =>
        this[_onread](er, br, buf))
    }
  }

  [_onread] (er, br, buf) {
    this[_reading] = false
    if (er)
      this[_onerror](er)
    else if (this[_handleChunk](br, buf))
      this[_read]()
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      fs.close(this[_fd], _ => this.emit('close'))
      this[_fd] = null
    }
  }

  [_onerror] (er) {
    this[_reading] = true
    this[_close]()
    this.emit('error', er)
  }

  [_handleChunk] (br, buf) {
    let ret = false
    // no effect if infinite
    this[_remain] -= br
    if (br > 0)
      ret = super.write(br < buf.length ? buf.slice(0, br) : buf)

    if (br === 0 || this[_remain] <= 0) {
      ret = false
      this[_close]()
      super.end()
    }

    return ret
  }

  emit (ev, data) {
    switch (ev) {
      case 'prefinish':
      case 'finish':
        break

      case 'drain':
        if (typeof this[_fd] === 'number')
          this[_read]()
        break

      default:
        return super.emit(ev, data)
    }
  }
}

class ReadStreamSync extends ReadStream {
  [_open] () {
    let threw = true
    try {
      this[_onopen](null, fs.openSync(this[_path], 'r'))
      threw = false
    } finally {
      if (threw)
        this[_close]()
    }
  }

  [_read] () {
    let threw = true
    try {
      if (!this[_reading]) {
        this[_reading] = true
        do {
          const buf = this[_makeBuf]()
          /* istanbul ignore next */
          const br = buf.length === 0 ? 0 : fs.readSync(this[_fd], buf, 0, buf.length, null)
          if (!this[_handleChunk](br, buf))
            break
        } while (true)
        this[_reading] = false
      }
      threw = false
    } finally {
      if (threw)
        this[_close]()
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      try {
        fs.closeSync(this[_fd])
      } catch (er) {}
      this[_fd] = null
      this.emit('close')
    }
  }
}

class WriteStream extends EE {
  constructor (path, opt) {
    opt = opt || {}
    super(opt)
    this.readable = false
    this[_writing] = false
    this[_ended] = false
    this[_needDrain] = false
    this[_queue] = []
    this[_path] = path
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null
    this[_mode] = opt.mode === undefined ? 0o666 : opt.mode
    this[_pos] = typeof opt.start === 'number' ? opt.start : null
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true

    // truncating makes no sense when writing into the middle
    const defaultFlag = this[_pos] !== null ? 'r+' : 'w'
    this[_defaultFlag] = opt.flags === undefined
    this[_flags] = this[_defaultFlag] ? defaultFlag : opt.flags

    if (this[_fd] === null)
      this[_open]()
  }

  get fd () { return this[_fd] }
  get path () { return this[_path] }

  [_onerror] (er) {
    this[_close]()
    this[_writing] = true
    this.emit('error', er)
  }

  [_open] () {
    fs.open(this[_path], this[_flags], this[_mode],
      (er, fd) => this[_onopen](er, fd))
  }

  [_onopen] (er, fd) {
    if (this[_defaultFlag] &&
        this[_flags] === 'r+' &&
        er && er.code === 'ENOENT') {
      this[_flags] = 'w'
      this[_open]()
    } else if (er)
      this[_onerror](er)
    else {
      this[_fd] = fd
      this.emit('open', fd)
      this[_flush]()
    }
  }

  end (buf, enc) {
    if (buf)
      this.write(buf, enc)

    this[_ended] = true

    // synthetic after-write logic, where drain/finish live
    if (!this[_writing] && !this[_queue].length &&
        typeof this[_fd] === 'number')
      this[_onwrite](null, 0)
  }

  write (buf, enc) {
    if (typeof buf === 'string')
      buf = new Buffer(buf, enc)

    if (this[_ended]) {
      this.emit('error', new Error('write() after end()'))
      return false
    }

    if (this[_fd] === null || this[_writing] || this[_queue].length) {
      this[_queue].push(buf)
      this[_needDrain] = true
      return false
    }

    this[_writing] = true
    this[_write](buf)
    return true
  }

  [_write] (buf) {
    fs.write(this[_fd], buf, 0, buf.length, this[_pos], (er, bw) =>
      this[_onwrite](er, bw))
  }

  [_onwrite] (er, bw) {
    if (er)
      this[_onerror](er)
    else {
      if (this[_pos] !== null)
        this[_pos] += bw
      if (this[_queue].length)
        this[_flush]()
      else {
        this[_writing] = false

        if (this[_ended] && !this[_finished]) {
          this[_finished] = true
          this[_close]()
          this.emit('finish')
        } else if (this[_needDrain]) {
          this[_needDrain] = false
          this.emit('drain')
        }
      }
    }
  }

  [_flush] () {
    if (this[_queue].length === 0) {
      if (this[_ended])
        this[_onwrite](null, 0)
    } else if (this[_queue].length === 1)
      this[_write](this[_queue].pop())
    else {
      const iovec = this[_queue]
      this[_queue] = []
      writev(this[_fd], iovec, this[_pos],
        (er, bw) => this[_onwrite](er, bw))
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      fs.close(this[_fd], _ => this.emit('close'))
      this[_fd] = null
    }
  }
}

class WriteStreamSync extends WriteStream {
  [_open] () {
    let fd
    try {
      fd = fs.openSync(this[_path], this[_flags], this[_mode])
    } catch (er) {
      if (this[_defaultFlag] &&
          this[_flags] === 'r+' &&
          er && er.code === 'ENOENT') {
        this[_flags] = 'w'
        return this[_open]()
      } else
        throw er
    }
    this[_onopen](null, fd)
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      try {
        fs.closeSync(this[_fd])
      } catch (er) {}
      this[_fd] = null
      this.emit('close')
    }
  }

  [_write] (buf) {
    try {
      this[_onwrite](null,
        fs.writeSync(this[_fd], buf, 0, buf.length, this[_pos]))
    } catch (er) {
      this[_onwrite](er, 0)
    }
  }
}

const writev = (fd, iovec, pos, cb) => {
  const done = (er, bw) => cb(er, bw, iovec)
  const req = new FSReqWrap()
  req.oncomplete = done
  binding.writeBuffers(fd, iovec, pos, req)
}

exports.ReadStream = ReadStream
exports.ReadStreamSync = ReadStreamSync

exports.WriteStream = WriteStream
exports.WriteStreamSync = WriteStreamSync


/***/ }),

/***/ "./node_modules/gauge/base-theme.js":
/*!******************************************!*\
  !*** ./node_modules/gauge/base-theme.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var spin = __webpack_require__(/*! ./spin.js */ "./node_modules/gauge/spin.js")
var progressBar = __webpack_require__(/*! ./progress-bar.js */ "./node_modules/gauge/progress-bar.js")

module.exports = {
  activityIndicator: function (values, theme, width) {
    if (values.spun == null) return
    return spin(theme, values.spun)
  },
  progressbar: function (values, theme, width) {
    if (values.completed == null) return
    return progressBar(theme, width, values.completed)
  }
}


/***/ }),

/***/ "./node_modules/gauge/error.js":
/*!*************************************!*\
  !*** ./node_modules/gauge/error.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(/*! util */ "util")

var User = exports.User = function User (msg) {
  var err = new Error(msg)
  Error.captureStackTrace(err, User)
  err.code = 'EGAUGE'
  return err
}

exports.MissingTemplateValue = function MissingTemplateValue (item, values) {
  var err = new User(util.format('Missing template value "%s"', item.type))
  Error.captureStackTrace(err, MissingTemplateValue)
  err.template = item
  err.values = values
  return err
}

exports.Internal = function Internal (msg) {
  var err = new Error(msg)
  Error.captureStackTrace(err, Internal)
  err.code = 'EGAUGEINTERNAL'
  return err
}


/***/ }),

/***/ "./node_modules/gauge/has-color.js":
/*!*****************************************!*\
  !*** ./node_modules/gauge/has-color.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isWin32() || isColorTerm()

function isWin32 () {
  return process.platform === 'win32'
}

function isColorTerm () {
  var termHasColor = /^screen|^xterm|^vt100|color|ansi|cygwin|linux/i
  return !!process.env.COLORTERM || termHasColor.test(process.env.TERM)
}


/***/ }),

/***/ "./node_modules/gauge/index.js":
/*!*************************************!*\
  !*** ./node_modules/gauge/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Plumbing = __webpack_require__(/*! ./plumbing.js */ "./node_modules/gauge/plumbing.js")
var hasUnicode = __webpack_require__(/*! has-unicode */ "./node_modules/has-unicode/index.js")
var hasColor = __webpack_require__(/*! ./has-color.js */ "./node_modules/gauge/has-color.js")
var onExit = __webpack_require__(/*! signal-exit */ "signal-exit")
var defaultThemes = __webpack_require__(/*! ./themes */ "./node_modules/gauge/themes.js")
var setInterval = __webpack_require__(/*! ./set-interval.js */ "./node_modules/gauge/set-interval.js")
var process = __webpack_require__(/*! ./process.js */ "./node_modules/gauge/process.js")
var setImmediate = __webpack_require__(/*! ./set-immediate */ "./node_modules/gauge/set-immediate.js")

module.exports = Gauge

function callWith (obj, method) {
  return function () {
    return method.call(obj)
  }
}

function Gauge (arg1, arg2) {
  var options, writeTo
  if (arg1 && arg1.write) {
    writeTo = arg1
    options = arg2 || {}
  } else if (arg2 && arg2.write) {
    writeTo = arg2
    options = arg1 || {}
  } else {
    writeTo = process.stderr
    options = arg1 || arg2 || {}
  }

  this._status = {
    spun: 0,
    section: '',
    subsection: ''
  }
  this._paused = false // are we paused for back pressure?
  this._disabled = true // are all progress bar updates disabled?
  this._showing = false // do we WANT the progress bar on screen
  this._onScreen = false // IS the progress bar on screen
  this._needsRedraw = false // should we print something at next tick?
  this._hideCursor = options.hideCursor == null ? true : options.hideCursor
  this._fixedFramerate = options.fixedFramerate == null
    ? !(/^v0\.8\./.test(process.version))
    : options.fixedFramerate
  this._lastUpdateAt = null
  this._updateInterval = options.updateInterval == null ? 50 : options.updateInterval

  this._themes = options.themes || defaultThemes
  this._theme = options.theme
  var theme = this._computeTheme(options.theme)
  var template = options.template || [
    {type: 'progressbar', length: 20},
    {type: 'activityIndicator', kerning: 1, length: 1},
    {type: 'section', kerning: 1, default: ''},
    {type: 'subsection', kerning: 1, default: ''}
  ]
  this.setWriteTo(writeTo, options.tty)
  var PlumbingClass = options.Plumbing || Plumbing
  this._gauge = new PlumbingClass(theme, template, this.getWidth())

  this._$$doRedraw = callWith(this, this._doRedraw)
  this._$$handleSizeChange = callWith(this, this._handleSizeChange)

  this._cleanupOnExit = options.cleanupOnExit == null || options.cleanupOnExit
  this._removeOnExit = null

  if (options.enabled || (options.enabled == null && this._tty && this._tty.isTTY)) {
    this.enable()
  } else {
    this.disable()
  }
}
Gauge.prototype = {}

Gauge.prototype.isEnabled = function () {
  return !this._disabled
}

Gauge.prototype.setTemplate = function (template) {
  this._gauge.setTemplate(template)
  if (this._showing) this._requestRedraw()
}

Gauge.prototype._computeTheme = function (theme) {
  if (!theme) theme = {}
  if (typeof theme === 'string') {
    theme = this._themes.getTheme(theme)
  } else if (theme && (Object.keys(theme).length === 0 || theme.hasUnicode != null || theme.hasColor != null)) {
    var useUnicode = theme.hasUnicode == null ? hasUnicode() : theme.hasUnicode
    var useColor = theme.hasColor == null ? hasColor : theme.hasColor
    theme = this._themes.getDefault({hasUnicode: useUnicode, hasColor: useColor, platform: theme.platform})
  }
  return theme
}

Gauge.prototype.setThemeset = function (themes) {
  this._themes = themes
  this.setTheme(this._theme)
}

Gauge.prototype.setTheme = function (theme) {
  this._gauge.setTheme(this._computeTheme(theme))
  if (this._showing) this._requestRedraw()
  this._theme = theme
}

Gauge.prototype._requestRedraw = function () {
  this._needsRedraw = true
  if (!this._fixedFramerate) this._doRedraw()
}

Gauge.prototype.getWidth = function () {
  return ((this._tty && this._tty.columns) || 80) - 1
}

Gauge.prototype.setWriteTo = function (writeTo, tty) {
  var enabled = !this._disabled
  if (enabled) this.disable()
  this._writeTo = writeTo
  this._tty = tty ||
    (writeTo === process.stderr && process.stdout.isTTY && process.stdout) ||
    (writeTo.isTTY && writeTo) ||
    this._tty
  if (this._gauge) this._gauge.setWidth(this.getWidth())
  if (enabled) this.enable()
}

Gauge.prototype.enable = function () {
  if (!this._disabled) return
  this._disabled = false
  if (this._tty) this._enableEvents()
  if (this._showing) this.show()
}

Gauge.prototype.disable = function () {
  if (this._disabled) return
  if (this._showing) {
    this._lastUpdateAt = null
    this._showing = false
    this._doRedraw()
    this._showing = true
  }
  this._disabled = true
  if (this._tty) this._disableEvents()
}

Gauge.prototype._enableEvents = function () {
  if (this._cleanupOnExit) {
    this._removeOnExit = onExit(callWith(this, this.disable))
  }
  this._tty.on('resize', this._$$handleSizeChange)
  if (this._fixedFramerate) {
    this.redrawTracker = setInterval(this._$$doRedraw, this._updateInterval)
    if (this.redrawTracker.unref) this.redrawTracker.unref()
  }
}

Gauge.prototype._disableEvents = function () {
  this._tty.removeListener('resize', this._$$handleSizeChange)
  if (this._fixedFramerate) clearInterval(this.redrawTracker)
  if (this._removeOnExit) this._removeOnExit()
}

Gauge.prototype.hide = function (cb) {
  if (this._disabled) return cb && process.nextTick(cb)
  if (!this._showing) return cb && process.nextTick(cb)
  this._showing = false
  this._doRedraw()
  cb && setImmediate(cb)
}

Gauge.prototype.show = function (section, completed) {
  this._showing = true
  if (typeof section === 'string') {
    this._status.section = section
  } else if (typeof section === 'object') {
    var sectionKeys = Object.keys(section)
    for (var ii = 0; ii < sectionKeys.length; ++ii) {
      var key = sectionKeys[ii]
      this._status[key] = section[key]
    }
  }
  if (completed != null) this._status.completed = completed
  if (this._disabled) return
  this._requestRedraw()
}

Gauge.prototype.pulse = function (subsection) {
  this._status.subsection = subsection || ''
  this._status.spun ++
  if (this._disabled) return
  if (!this._showing) return
  this._requestRedraw()
}

Gauge.prototype._handleSizeChange = function () {
  this._gauge.setWidth(this._tty.columns - 1)
  this._requestRedraw()
}

Gauge.prototype._doRedraw = function () {
  if (this._disabled || this._paused) return
  if (!this._fixedFramerate) {
    var now = Date.now()
    if (this._lastUpdateAt && now - this._lastUpdateAt < this._updateInterval) return
    this._lastUpdateAt = now
  }
  if (!this._showing && this._onScreen) {
    this._onScreen = false
    var result = this._gauge.hide()
    if (this._hideCursor) {
      result += this._gauge.showCursor()
    }
    return this._writeTo.write(result)
  }
  if (!this._showing && !this._onScreen) return
  if (this._showing && !this._onScreen) {
    this._onScreen = true
    this._needsRedraw = true
    if (this._hideCursor) {
      this._writeTo.write(this._gauge.hideCursor())
    }
  }
  if (!this._needsRedraw) return
  if (!this._writeTo.write(this._gauge.show(this._status))) {
    this._paused = true
    this._writeTo.on('drain', callWith(this, function () {
      this._paused = false
      this._doRedraw()
    }))
  }
}


/***/ }),

/***/ "./node_modules/gauge/plumbing.js":
/*!****************************************!*\
  !*** ./node_modules/gauge/plumbing.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var consoleControl = __webpack_require__(/*! console-control-strings */ "./node_modules/console-control-strings/index.js")
var renderTemplate = __webpack_require__(/*! ./render-template.js */ "./node_modules/gauge/render-template.js")
var validate = __webpack_require__(/*! aproba */ "aproba")

var Plumbing = module.exports = function (theme, template, width) {
  if (!width) width = 80
  validate('OAN', [theme, template, width])
  this.showing = false
  this.theme = theme
  this.width = width
  this.template = template
}
Plumbing.prototype = {}

Plumbing.prototype.setTheme = function (theme) {
  validate('O', [theme])
  this.theme = theme
}

Plumbing.prototype.setTemplate = function (template) {
  validate('A', [template])
  this.template = template
}

Plumbing.prototype.setWidth = function (width) {
  validate('N', [width])
  this.width = width
}

Plumbing.prototype.hide = function () {
  return consoleControl.gotoSOL() + consoleControl.eraseLine()
}

Plumbing.prototype.hideCursor = consoleControl.hideCursor

Plumbing.prototype.showCursor = consoleControl.showCursor

Plumbing.prototype.show = function (status) {
  var values = Object.create(this.theme)
  for (var key in status) {
    values[key] = status[key]
  }

  return renderTemplate(this.width, this.template, values).trim() +
         consoleControl.color('reset') +
         consoleControl.eraseLine() + consoleControl.gotoSOL()
}


/***/ }),

/***/ "./node_modules/gauge/process.js":
/*!***************************************!*\
  !*** ./node_modules/gauge/process.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// this exists so we can replace it during testing
module.exports = process


/***/ }),

/***/ "./node_modules/gauge/progress-bar.js":
/*!********************************************!*\
  !*** ./node_modules/gauge/progress-bar.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var validate = __webpack_require__(/*! aproba */ "aproba")
var renderTemplate = __webpack_require__(/*! ./render-template.js */ "./node_modules/gauge/render-template.js")
var wideTruncate = __webpack_require__(/*! ./wide-truncate */ "./node_modules/gauge/wide-truncate.js")
var stringWidth = __webpack_require__(/*! string-width */ "string-width")

module.exports = function (theme, width, completed) {
  validate('ONN', [theme, width, completed])
  if (completed < 0) completed = 0
  if (completed > 1) completed = 1
  if (width <= 0) return ''
  var sofar = Math.round(width * completed)
  var rest = width - sofar
  var template = [
    {type: 'complete', value: repeat(theme.complete, sofar), length: sofar},
    {type: 'remaining', value: repeat(theme.remaining, rest), length: rest}
  ]
  return renderTemplate(width, template, theme)
}

// lodash's way of repeating
function repeat (string, width) {
  var result = ''
  var n = width
  do {
    if (n % 2) {
      result += string
    }
    n = Math.floor(n / 2)
    /*eslint no-self-assign: 0*/
    string += string
  } while (n && stringWidth(result) < width)

  return wideTruncate(result, width)
}


/***/ }),

/***/ "./node_modules/gauge/render-template.js":
/*!***********************************************!*\
  !*** ./node_modules/gauge/render-template.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var align = __webpack_require__(/*! wide-align */ "./node_modules/wide-align/align.js")
var validate = __webpack_require__(/*! aproba */ "aproba")
var objectAssign = __webpack_require__(/*! object-assign */ "object-assign")
var wideTruncate = __webpack_require__(/*! ./wide-truncate */ "./node_modules/gauge/wide-truncate.js")
var error = __webpack_require__(/*! ./error */ "./node_modules/gauge/error.js")
var TemplateItem = __webpack_require__(/*! ./template-item */ "./node_modules/gauge/template-item.js")

function renderValueWithValues (values) {
  return function (item) {
    return renderValue(item, values)
  }
}

var renderTemplate = module.exports = function (width, template, values) {
  var items = prepareItems(width, template, values)
  var rendered = items.map(renderValueWithValues(values)).join('')
  return align.left(wideTruncate(rendered, width), width)
}

function preType (item) {
  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1)
  return 'pre' + cappedTypeName
}

function postType (item) {
  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1)
  return 'post' + cappedTypeName
}

function hasPreOrPost (item, values) {
  if (!item.type) return
  return values[preType(item)] || values[postType(item)]
}

function generatePreAndPost (baseItem, parentValues) {
  var item = objectAssign({}, baseItem)
  var values = Object.create(parentValues)
  var template = []
  var pre = preType(item)
  var post = postType(item)
  if (values[pre]) {
    template.push({value: values[pre]})
    values[pre] = null
  }
  item.minLength = null
  item.length = null
  item.maxLength = null
  template.push(item)
  values[item.type] = values[item.type]
  if (values[post]) {
    template.push({value: values[post]})
    values[post] = null
  }
  return function ($1, $2, length) {
    return renderTemplate(length, template, values)
  }
}

function prepareItems (width, template, values) {
  function cloneAndObjectify (item, index, arr) {
    var cloned = new TemplateItem(item, width)
    var type = cloned.type
    if (cloned.value == null) {
      if (!(type in values)) {
        if (cloned.default == null) {
          throw new error.MissingTemplateValue(cloned, values)
        } else {
          cloned.value = cloned.default
        }
      } else {
        cloned.value = values[type]
      }
    }
    if (cloned.value == null || cloned.value === '') return null
    cloned.index = index
    cloned.first = index === 0
    cloned.last = index === arr.length - 1
    if (hasPreOrPost(cloned, values)) cloned.value = generatePreAndPost(cloned, values)
    return cloned
  }

  var output = template.map(cloneAndObjectify).filter(function (item) { return item != null })

  var outputLength = 0
  var remainingSpace = width
  var variableCount = output.length

  function consumeSpace (length) {
    if (length > remainingSpace) length = remainingSpace
    outputLength += length
    remainingSpace -= length
  }

  function finishSizing (item, length) {
    if (item.finished) throw new error.Internal('Tried to finish template item that was already finished')
    if (length === Infinity) throw new error.Internal('Length of template item cannot be infinity')
    if (length != null) item.length = length
    item.minLength = null
    item.maxLength = null
    --variableCount
    item.finished = true
    if (item.length == null) item.length = item.getBaseLength()
    if (item.length == null) throw new error.Internal('Finished template items must have a length')
    consumeSpace(item.getLength())
  }

  output.forEach(function (item) {
    if (!item.kerning) return
    var prevPadRight = item.first ? 0 : output[item.index - 1].padRight
    if (!item.first && prevPadRight < item.kerning) item.padLeft = item.kerning - prevPadRight
    if (!item.last) item.padRight = item.kerning
  })

  // Finish any that have a fixed (literal or intuited) length
  output.forEach(function (item) {
    if (item.getBaseLength() == null) return
    finishSizing(item)
  })

  var resized = 0
  var resizing
  var hunkSize
  do {
    resizing = false
    hunkSize = Math.round(remainingSpace / variableCount)
    output.forEach(function (item) {
      if (item.finished) return
      if (!item.maxLength) return
      if (item.getMaxLength() < hunkSize) {
        finishSizing(item, item.maxLength)
        resizing = true
      }
    })
  } while (resizing && resized++ < output.length)
  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining maxLength')

  resized = 0
  do {
    resizing = false
    hunkSize = Math.round(remainingSpace / variableCount)
    output.forEach(function (item) {
      if (item.finished) return
      if (!item.minLength) return
      if (item.getMinLength() >= hunkSize) {
        finishSizing(item, item.minLength)
        resizing = true
      }
    })
  } while (resizing && resized++ < output.length)
  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining minLength')

  hunkSize = Math.round(remainingSpace / variableCount)
  output.forEach(function (item) {
    if (item.finished) return
    finishSizing(item, hunkSize)
  })

  return output
}

function renderFunction (item, values, length) {
  validate('OON', arguments)
  if (item.type) {
    return item.value(values, values[item.type + 'Theme'] || {}, length)
  } else {
    return item.value(values, {}, length)
  }
}

function renderValue (item, values) {
  var length = item.getBaseLength()
  var value = typeof item.value === 'function' ? renderFunction(item, values, length) : item.value
  if (value == null || value === '') return ''
  var alignWith = align[item.align] || align.left
  var leftPadding = item.padLeft ? align.left('', item.padLeft) : ''
  var rightPadding = item.padRight ? align.right('', item.padRight) : ''
  var truncated = wideTruncate(String(value), length)
  var aligned = alignWith(truncated, length)
  return leftPadding + aligned + rightPadding
}


/***/ }),

/***/ "./node_modules/gauge/set-immediate.js":
/*!*********************************************!*\
  !*** ./node_modules/gauge/set-immediate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var process = __webpack_require__(/*! ./process */ "./node_modules/gauge/process.js")
try {
  module.exports = setImmediate
} catch (ex) {
  module.exports = process.nextTick
}


/***/ }),

/***/ "./node_modules/gauge/set-interval.js":
/*!********************************************!*\
  !*** ./node_modules/gauge/set-interval.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// this exists so we can replace it during testing
module.exports = setInterval


/***/ }),

/***/ "./node_modules/gauge/spin.js":
/*!************************************!*\
  !*** ./node_modules/gauge/spin.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function spin (spinstr, spun) {
  return spinstr[spun % spinstr.length]
}


/***/ }),

/***/ "./node_modules/gauge/template-item.js":
/*!*********************************************!*\
  !*** ./node_modules/gauge/template-item.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stringWidth = __webpack_require__(/*! string-width */ "string-width")

module.exports = TemplateItem

function isPercent (num) {
  if (typeof num !== 'string') return false
  return num.slice(-1) === '%'
}

function percent (num) {
  return Number(num.slice(0, -1)) / 100
}

function TemplateItem (values, outputLength) {
  this.overallOutputLength = outputLength
  this.finished = false
  this.type = null
  this.value = null
  this.length = null
  this.maxLength = null
  this.minLength = null
  this.kerning = null
  this.align = 'left'
  this.padLeft = 0
  this.padRight = 0
  this.index = null
  this.first = null
  this.last = null
  if (typeof values === 'string') {
    this.value = values
  } else {
    for (var prop in values) this[prop] = values[prop]
  }
  // Realize percents
  if (isPercent(this.length)) {
    this.length = Math.round(this.overallOutputLength * percent(this.length))
  }
  if (isPercent(this.minLength)) {
    this.minLength = Math.round(this.overallOutputLength * percent(this.minLength))
  }
  if (isPercent(this.maxLength)) {
    this.maxLength = Math.round(this.overallOutputLength * percent(this.maxLength))
  }
  return this
}

TemplateItem.prototype = {}

TemplateItem.prototype.getBaseLength = function () {
  var length = this.length
  if (length == null && typeof this.value === 'string' && this.maxLength == null && this.minLength == null) {
    length = stringWidth(this.value)
  }
  return length
}

TemplateItem.prototype.getLength = function () {
  var length = this.getBaseLength()
  if (length == null) return null
  return length + this.padLeft + this.padRight
}

TemplateItem.prototype.getMaxLength = function () {
  if (this.maxLength == null) return null
  return this.maxLength + this.padLeft + this.padRight
}

TemplateItem.prototype.getMinLength = function () {
  if (this.minLength == null) return null
  return this.minLength + this.padLeft + this.padRight
}



/***/ }),

/***/ "./node_modules/gauge/theme-set.js":
/*!*****************************************!*\
  !*** ./node_modules/gauge/theme-set.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var objectAssign = __webpack_require__(/*! object-assign */ "object-assign")

module.exports = function () {
  return ThemeSetProto.newThemeSet()
}

var ThemeSetProto = {}

ThemeSetProto.baseTheme = __webpack_require__(/*! ./base-theme.js */ "./node_modules/gauge/base-theme.js")

ThemeSetProto.newTheme = function (parent, theme) {
  if (!theme) {
    theme = parent
    parent = this.baseTheme
  }
  return objectAssign({}, parent, theme)
}

ThemeSetProto.getThemeNames = function () {
  return Object.keys(this.themes)
}

ThemeSetProto.addTheme = function (name, parent, theme) {
  this.themes[name] = this.newTheme(parent, theme)
}

ThemeSetProto.addToAllThemes = function (theme) {
  var themes = this.themes
  Object.keys(themes).forEach(function (name) {
    objectAssign(themes[name], theme)
  })
  objectAssign(this.baseTheme, theme)
}

ThemeSetProto.getTheme = function (name) {
  if (!this.themes[name]) throw this.newMissingThemeError(name)
  return this.themes[name]
}

ThemeSetProto.setDefault = function (opts, name) {
  if (name == null) {
    name = opts
    opts = {}
  }
  var platform = opts.platform == null ? 'fallback' : opts.platform
  var hasUnicode = !!opts.hasUnicode
  var hasColor = !!opts.hasColor
  if (!this.defaults[platform]) this.defaults[platform] = {true: {}, false: {}}
  this.defaults[platform][hasUnicode][hasColor] = name
}

ThemeSetProto.getDefault = function (opts) {
  if (!opts) opts = {}
  var platformName = opts.platform || process.platform
  var platform = this.defaults[platformName] || this.defaults.fallback
  var hasUnicode = !!opts.hasUnicode
  var hasColor = !!opts.hasColor
  if (!platform) throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
  if (!platform[hasUnicode][hasColor]) {
    if (hasUnicode && hasColor && platform[!hasUnicode][hasColor]) {
      hasUnicode = false
    } else if (hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
      hasColor = false
    } else if (hasUnicode && hasColor && platform[!hasUnicode][!hasColor]) {
      hasUnicode = false
      hasColor = false
    } else if (hasUnicode && !hasColor && platform[!hasUnicode][hasColor]) {
      hasUnicode = false
    } else if (!hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
      hasColor = false
    } else if (platform === this.defaults.fallback) {
      throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
    }
  }
  if (platform[hasUnicode][hasColor]) {
    return this.getTheme(platform[hasUnicode][hasColor])
  } else {
    return this.getDefault(objectAssign({}, opts, {platform: 'fallback'}))
  }
}

ThemeSetProto.newMissingThemeError = function newMissingThemeError (name) {
  var err = new Error('Could not find a gauge theme named "' + name + '"')
  Error.captureStackTrace.call(err, newMissingThemeError)
  err.theme = name
  err.code = 'EMISSINGTHEME'
  return err
}

ThemeSetProto.newMissingDefaultThemeError = function newMissingDefaultThemeError (platformName, hasUnicode, hasColor) {
  var err = new Error(
    'Could not find a gauge theme for your platform/unicode/color use combo:\n' +
    '    platform = ' + platformName + '\n' +
    '    hasUnicode = ' + hasUnicode + '\n' +
    '    hasColor = ' + hasColor)
  Error.captureStackTrace.call(err, newMissingDefaultThemeError)
  err.platform = platformName
  err.hasUnicode = hasUnicode
  err.hasColor = hasColor
  err.code = 'EMISSINGTHEME'
  return err
}

ThemeSetProto.newThemeSet = function () {
  var themeset = function (opts) {
    return themeset.getDefault(opts)
  }
  return objectAssign(themeset, ThemeSetProto, {
    themes: objectAssign({}, this.themes),
    baseTheme: objectAssign({}, this.baseTheme),
    defaults: JSON.parse(JSON.stringify(this.defaults || {}))
  })
}



/***/ }),

/***/ "./node_modules/gauge/themes.js":
/*!**************************************!*\
  !*** ./node_modules/gauge/themes.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var consoleControl = __webpack_require__(/*! console-control-strings */ "./node_modules/console-control-strings/index.js")
var ThemeSet = __webpack_require__(/*! ./theme-set.js */ "./node_modules/gauge/theme-set.js")

var themes = module.exports = new ThemeSet()

themes.addTheme('ASCII', {
  preProgressbar: '[',
  postProgressbar: ']',
  progressbarTheme: {
    complete: '#',
    remaining: '.'
  },
  activityIndicatorTheme: '-\\|/',
  preSubsection: '>'
})

themes.addTheme('colorASCII', themes.getTheme('ASCII'), {
  progressbarTheme: {
    preComplete: consoleControl.color('inverse'),
    complete: ' ',
    postComplete: consoleControl.color('stopInverse'),
    preRemaining: consoleControl.color('brightBlack'),
    remaining: '.',
    postRemaining: consoleControl.color('reset')
  }
})

themes.addTheme('brailleSpinner', {
  preProgressbar: '⸨',
  postProgressbar: '⸩',
  progressbarTheme: {
    complete: '░',
    remaining: '⠂'
  },
  activityIndicatorTheme: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
  preSubsection: '>'
})

themes.addTheme('colorBrailleSpinner', themes.getTheme('brailleSpinner'), {
  progressbarTheme: {
    preComplete: consoleControl.color('inverse'),
    complete: ' ',
    postComplete: consoleControl.color('stopInverse'),
    preRemaining: consoleControl.color('brightBlack'),
    remaining: '░',
    postRemaining: consoleControl.color('reset')
  }
})

themes.setDefault({}, 'ASCII')
themes.setDefault({hasColor: true}, 'colorASCII')
themes.setDefault({platform: 'darwin', hasUnicode: true}, 'brailleSpinner')
themes.setDefault({platform: 'darwin', hasUnicode: true, hasColor: true}, 'colorBrailleSpinner')


/***/ }),

/***/ "./node_modules/gauge/wide-truncate.js":
/*!*********************************************!*\
  !*** ./node_modules/gauge/wide-truncate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stringWidth = __webpack_require__(/*! string-width */ "string-width")
var stripAnsi = __webpack_require__(/*! strip-ansi */ "strip-ansi")

module.exports = wideTruncate

function wideTruncate (str, target) {
  if (stringWidth(str) === 0) return str
  if (target <= 0) return ''
  if (stringWidth(str) <= target) return str

  // We compute the number of bytes of ansi sequences here and add
  // that to our initial truncation to ensure that we don't slice one
  // that we want to keep in half.
  var noAnsi = stripAnsi(str)
  var ansiSize = str.length + noAnsi.length
  var truncated = str.slice(0, target + ansiSize)

  // we have to shrink the result to account for our ansi sequence buffer
  // (if an ansi sequence was truncated) and double width characters.
  while (stringWidth(truncated) > target) {
    truncated = truncated.slice(0, -1)
  }
  return truncated
}


/***/ }),

/***/ "./node_modules/has-unicode/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-unicode/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var os = __webpack_require__(/*! os */ "os")

var hasUnicode = module.exports = function () {
  // Recent Win32 platforms (>XP) CAN support unicode in the console but
  // don't have to, and in non-english locales often use traditional local
  // code pages. There's no way, short of windows system calls or execing
  // the chcp command line program to figure this out. As such, we default
  // this to false and encourage your users to override it via config if
  // appropriate.
  if (os.type() == "Windows_NT") { return false }

  var isUTF8 = /UTF-?8$/i
  var ctype = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG
  return isUTF8.test(ctype)
}


/***/ }),

/***/ "./node_modules/ignore-walk/index.js":
/*!*******************************************!*\
  !*** ./node_modules/ignore-walk/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")
const EE = __webpack_require__(/*! events */ "events").EventEmitter
const Minimatch = __webpack_require__(/*! minimatch */ "minimatch").Minimatch

class Walker extends EE {
  constructor (opts) {
    opts = opts || {}
    super(opts)
    this.path = opts.path || process.cwd()
    this.basename = path.basename(this.path)
    this.ignoreFiles = opts.ignoreFiles || [ '.ignore' ]
    this.ignoreRules = {}
    this.parent = opts.parent || null
    this.includeEmpty = !!opts.includeEmpty
    this.root = this.parent ? this.parent.root : this.path
    this.follow = !!opts.follow
    this.result = this.parent ? this.parent.result : new Set()
    this.entries = null
    this.sawError = false
  }

  sort (a, b) {
    return a.localeCompare(b)
  }

  emit (ev, data) {
    let ret = false
    if (!(this.sawError && ev === 'error')) {
      if (ev === 'error')
        this.sawError = true
      else if (ev === 'done' && !this.parent) {
        data = Array.from(data)
          .map(e => /^@/.test(e) ? `./${e}` : e).sort(this.sort)
        this.result = data
      }

      if (ev === 'error' && this.parent)
        ret = this.parent.emit('error', data)
      else
        ret = super.emit(ev, data)
    }
    return ret
  }

  start () {
    fs.readdir(this.path, (er, entries) =>
      er ? this.emit('error', er) : this.onReaddir(entries))
    return this
  }

  isIgnoreFile (e) {
    return e !== "." &&
      e !== ".." &&
      -1 !== this.ignoreFiles.indexOf(e)
  }

  onReaddir (entries) {
    this.entries = entries
    if (entries.length === 0) {
      if (this.includeEmpty)
        this.result.add(this.path.substr(this.root.length + 1))
      this.emit('done', this.result)
    } else {
      const hasIg = this.entries.some(e =>
        this.isIgnoreFile(e))

      if (hasIg)
        this.addIgnoreFiles()
      else
        this.filterEntries()
    }
  }

  addIgnoreFiles () {
    const newIg = this.entries
      .filter(e => this.isIgnoreFile(e))

    let igCount = newIg.length
    const then = _ => {
      if (--igCount === 0)
        this.filterEntries()
    }

    newIg.forEach(e => this.addIgnoreFile(e, then))
  }

  addIgnoreFile (file, then) {
    const ig = path.resolve(this.path, file)
    fs.readFile(ig, 'utf8', (er, data) =>
      er ? this.emit('error', er) : this.onReadIgnoreFile(file, data, then))
  }

  onReadIgnoreFile (file, data, then) {
    const mmopt = {
      matchBase: true,
      dot: true,
      flipNegate: true,
      nocase: true
    }
    const rules = data.split(/\r?\n/)
      .filter(line => !/^#|^$/.test(line.trim()))
      .map(r => new Minimatch(r, mmopt))

    this.ignoreRules[file] = rules

    then()
  }

  filterEntries () {
    // at this point we either have ignore rules, or just inheriting
    // this exclusion is at the point where we know the list of
    // entries in the dir, but don't know what they are.  since
    // some of them *might* be directories, we have to run the
    // match in dir-mode as well, so that we'll pick up partials
    // of files that will be included later.  Anything included
    // at this point will be checked again later once we know
    // what it is.
    const filtered = this.entries.map(entry => {
      // at this point, we don't know if it's a dir or not.
      const passFile = this.filterEntry(entry)
      const passDir = this.filterEntry(entry, true)
      return (passFile || passDir) ? [entry, passFile, passDir] : false
    }).filter(e => e)

    // now we stat them all
    // if it's a dir, and passes as a dir, then recurse
    // if it's not a dir, but passes as a file, add to set
    let entryCount = filtered.length
    if (entryCount === 0) {
      this.emit('done', this.result)
    } else {
      const then = _ => {
        if (-- entryCount === 0)
          this.emit('done', this.result)
      }
      filtered.forEach(filt => {
        const entry = filt[0]
        const file = filt[1]
        const dir = filt[2]
        this.stat(entry, file, dir, then)
      })
    }
  }

  onstat (st, entry, file, dir, then) {
    const abs = this.path + '/' + entry
    if (!st.isDirectory()) {
      if (file)
        this.result.add(abs.substr(this.root.length + 1))
      then()
    } else {
      // is a directory
      if (dir)
        this.walker(entry, then)
      else
        then()
    }
  }

  stat (entry, file, dir, then) {
    const abs = this.path + '/' + entry
    fs[this.follow ? 'stat' : 'lstat'](abs, (er, st) => {
      if (er)
        this.emit('error', er)
      else
        this.onstat(st, entry, file, dir, then)
    })
  }

  walkerOpt (entry) {
    return {
      path: this.path + '/' + entry,
      parent: this,
      ignoreFiles: this.ignoreFiles,
      follow: this.follow,
      includeEmpty: this.includeEmpty
    }
  }

  walker (entry, then) {
    new Walker(this.walkerOpt(entry)).on('done', then).start()
  }

  filterEntry (entry, partial) {
    let included = true

    // this = /a/b/c
    // entry = d
    // parent /a/b sees c/d
    if (this.parent && this.parent.filterEntry) {
      var pt = this.basename + "/" + entry
      included = this.parent.filterEntry(pt, partial)
    }

    this.ignoreFiles.forEach(f => {
      if (this.ignoreRules[f]) {
        this.ignoreRules[f].forEach(rule => {
          // negation means inclusion
          // so if it's negated, and already included, no need to check
          // likewise if it's neither negated nor included
          if (rule.negate !== included) {
            // first, match against /foo/bar
            // then, against foo/bar
            // then, in the case of partials, match with a /
            const match = rule.match('/' + entry) ||
              rule.match(entry) ||
              (!!partial && (
                rule.match('/' + entry + '/') ||
                rule.match(entry + '/'))) ||
              (!!partial && rule.negate && (
                rule.match('/' + entry, true) ||
                rule.match(entry, true)))

            if (match)
              included = rule.negate
          }
        })
      }
    })

    return included
  }
}

class WalkerSync extends Walker {
  constructor (opt) {
    super(opt)
  }

  start () {
    this.onReaddir(fs.readdirSync(this.path))
    return this
  }

  addIgnoreFile (file, then) {
    const ig = path.resolve(this.path, file)
    this.onReadIgnoreFile(file, fs.readFileSync(ig, 'utf8'), then)
  }

  stat (entry, file, dir, then) {
    const abs = this.path + '/' + entry
    const st = fs[this.follow ? 'statSync' : 'lstatSync'](abs)
    this.onstat(st, entry, file, dir, then)
  }

  walker (entry, then) {
    new WalkerSync(this.walkerOpt(entry)).start()
    then()
  }
}

const walk = (options, callback) => {
  const p = new Promise((resolve, reject) => {
    new Walker(options).on('done', resolve).on('error', reject).start()
  })
  return callback ? p.then(res => callback(null, res), callback) : p
}

const walkSync = options => {
  return new WalkerSync(options).start().result
}

module.exports = walk
walk.sync = walkSync
walk.Walker = Walker
walk.WalkerSync = WalkerSync


/***/ }),

/***/ "./node_modules/minipass/index.js":
/*!****************************************!*\
  !*** ./node_modules/minipass/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const EE = __webpack_require__(/*! events */ "events")
const Yallist = __webpack_require__(/*! yallist */ "yallist")
const SD = __webpack_require__(/*! string_decoder */ "string_decoder").StringDecoder

const EOF = Symbol('EOF')
const MAYBE_EMIT_END = Symbol('maybeEmitEnd')
const EMITTED_END = Symbol('emittedEnd')
const EMITTING_END = Symbol('emittingEnd')
const CLOSED = Symbol('closed')
const READ = Symbol('read')
const FLUSH = Symbol('flush')
const FLUSHCHUNK = Symbol('flushChunk')
const ENCODING = Symbol('encoding')
const DECODER = Symbol('decoder')
const FLOWING = Symbol('flowing')
const PAUSED = Symbol('paused')
const RESUME = Symbol('resume')
const BUFFERLENGTH = Symbol('bufferLength')
const BUFFERPUSH = Symbol('bufferPush')
const BUFFERSHIFT = Symbol('bufferShift')
const OBJECTMODE = Symbol('objectMode')
const DESTROYED = Symbol('destroyed')

// TODO remove when Node v8 support drops
const doIter = global._MP_NO_ITERATOR_SYMBOLS_  !== '1'
const ASYNCITERATOR = doIter && Symbol.asyncIterator
  || Symbol('asyncIterator not implemented')
const ITERATOR = doIter && Symbol.iterator
  || Symbol('iterator not implemented')

// Buffer in node 4.x < 4.5.0 doesn't have working Buffer.from
// or Buffer.alloc, and Buffer in node 10 deprecated the ctor.
// .M, this is fine .\^/M..
const B = Buffer.alloc ? Buffer
  : /* istanbul ignore next */ __webpack_require__(/*! safe-buffer */ "safe-buffer").Buffer

// events that mean 'the stream is over'
// these are treated specially, and re-emitted
// if they are listened for after emitting.
const isEndish = ev =>
  ev === 'end' ||
  ev === 'finish' ||
  ev === 'prefinish'

const isArrayBuffer = b => b instanceof ArrayBuffer ||
  typeof b === 'object' &&
  b.constructor &&
  b.constructor.name === 'ArrayBuffer' &&
  b.byteLength >= 0

const isArrayBufferView = b => !B.isBuffer(b) && ArrayBuffer.isView(b)

module.exports = class Minipass extends EE {
  constructor (options) {
    super()
    this[FLOWING] = false
    // whether we're explicitly paused
    this[PAUSED] = false
    this.pipes = new Yallist()
    this.buffer = new Yallist()
    this[OBJECTMODE] = options && options.objectMode || false
    if (this[OBJECTMODE])
      this[ENCODING] = null
    else
      this[ENCODING] = options && options.encoding || null
    if (this[ENCODING] === 'buffer')
      this[ENCODING] = null
    this[DECODER] = this[ENCODING] ? new SD(this[ENCODING]) : null
    this[EOF] = false
    this[EMITTED_END] = false
    this[EMITTING_END] = false
    this[CLOSED] = false
    this.writable = true
    this.readable = true
    this[BUFFERLENGTH] = 0
    this[DESTROYED] = false
  }

  get bufferLength () { return this[BUFFERLENGTH] }

  get encoding () { return this[ENCODING] }
  set encoding (enc) {
    if (this[OBJECTMODE])
      throw new Error('cannot set encoding in objectMode')

    if (this[ENCODING] && enc !== this[ENCODING] &&
        (this[DECODER] && this[DECODER].lastNeed || this[BUFFERLENGTH]))
      throw new Error('cannot change encoding')

    if (this[ENCODING] !== enc) {
      this[DECODER] = enc ? new SD(enc) : null
      if (this.buffer.length)
        this.buffer = this.buffer.map(chunk => this[DECODER].write(chunk))
    }

    this[ENCODING] = enc
  }

  setEncoding (enc) {
    this.encoding = enc
  }

  get objectMode () { return this[OBJECTMODE] }
  set objectMode (ॐ ) { this[OBJECTMODE] = this[OBJECTMODE] || !!ॐ  }

  write (chunk, encoding, cb) {
    if (this[EOF])
      throw new Error('write after end')

    if (this[DESTROYED]) {
      this.emit('error', Object.assign(
        new Error('Cannot call write after a stream was destroyed'),
        { code: 'ERR_STREAM_DESTROYED' }
      ))
      return true
    }

    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'

    if (!encoding)
      encoding = 'utf8'

    // convert array buffers and typed array views into buffers
    // at some point in the future, we may want to do the opposite!
    // leave strings and buffers as-is
    // anything else switches us into object mode
    if (!this[OBJECTMODE] && !B.isBuffer(chunk)) {
      if (isArrayBufferView(chunk))
        chunk = B.from(chunk.buffer, chunk.byteOffset, chunk.byteLength)
      else if (isArrayBuffer(chunk))
        chunk = B.from(chunk)
      else if (typeof chunk !== 'string')
        // use the setter so we throw if we have encoding set
        this.objectMode = true
    }

    // this ensures at this point that the chunk is a buffer or string
    // don't buffer it up or send it to the decoder
    if (!this.objectMode && !chunk.length) {
      const ret = this.flowing
      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable')
      if (cb)
        cb()
      return ret
    }

    // fast-path writing strings of same encoding to a stream with
    // an empty buffer, skipping the buffer/decoder dance
    if (typeof chunk === 'string' && !this[OBJECTMODE] &&
        // unless it is a string already ready for us to use
        !(encoding === this[ENCODING] && !this[DECODER].lastNeed)) {
      chunk = B.from(chunk, encoding)
    }

    if (B.isBuffer(chunk) && this[ENCODING])
      chunk = this[DECODER].write(chunk)

    try {
      return this.flowing
        ? (this.emit('data', chunk), this.flowing)
        : (this[BUFFERPUSH](chunk), false)
    } finally {
      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable')
      if (cb)
        cb()
    }
  }

  read (n) {
    if (this[DESTROYED])
      return null

    try {
      if (this[BUFFERLENGTH] === 0 || n === 0 || n > this[BUFFERLENGTH])
        return null

      if (this[OBJECTMODE])
        n = null

      if (this.buffer.length > 1 && !this[OBJECTMODE]) {
        if (this.encoding)
          this.buffer = new Yallist([
            Array.from(this.buffer).join('')
          ])
        else
          this.buffer = new Yallist([
            B.concat(Array.from(this.buffer), this[BUFFERLENGTH])
          ])
      }

      return this[READ](n || null, this.buffer.head.value)
    } finally {
      this[MAYBE_EMIT_END]()
    }
  }

  [READ] (n, chunk) {
    if (n === chunk.length || n === null)
      this[BUFFERSHIFT]()
    else {
      this.buffer.head.value = chunk.slice(n)
      chunk = chunk.slice(0, n)
      this[BUFFERLENGTH] -= n
    }

    this.emit('data', chunk)

    if (!this.buffer.length && !this[EOF])
      this.emit('drain')

    return chunk
  }

  end (chunk, encoding, cb) {
    if (typeof chunk === 'function')
      cb = chunk, chunk = null
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'
    if (chunk)
      this.write(chunk, encoding)
    if (cb)
      this.once('end', cb)
    this[EOF] = true
    this.writable = false

    // if we haven't written anything, then go ahead and emit,
    // even if we're not reading.
    // we'll re-emit if a new 'end' listener is added anyway.
    // This makes MP more suitable to write-only use cases.
    if (this.flowing || !this[PAUSED])
      this[MAYBE_EMIT_END]()
    return this
  }

  // don't let the internal resume be overwritten
  [RESUME] () {
    if (this[DESTROYED])
      return

    this[PAUSED] = false
    this[FLOWING] = true
    this.emit('resume')
    if (this.buffer.length)
      this[FLUSH]()
    else if (this[EOF])
      this[MAYBE_EMIT_END]()
    else
      this.emit('drain')
  }

  resume () {
    return this[RESUME]()
  }

  pause () {
    this[FLOWING] = false
    this[PAUSED] = true
  }

  get destroyed () {
    return this[DESTROYED]
  }

  get flowing () {
    return this[FLOWING]
  }

  get paused () {
    return this[PAUSED]
  }

  [BUFFERPUSH] (chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1
    else
      this[BUFFERLENGTH] += chunk.length
    return this.buffer.push(chunk)
  }

  [BUFFERSHIFT] () {
    if (this.buffer.length) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1
      else
        this[BUFFERLENGTH] -= this.buffer.head.value.length
    }
    return this.buffer.shift()
  }

  [FLUSH] () {
    do {} while (this[FLUSHCHUNK](this[BUFFERSHIFT]()))

    if (!this.buffer.length && !this[EOF])
      this.emit('drain')
  }

  [FLUSHCHUNK] (chunk) {
    return chunk ? (this.emit('data', chunk), this.flowing) : false
  }

  pipe (dest, opts) {
    if (this[DESTROYED])
      return

    const ended = this[EMITTED_END]
    opts = opts || {}
    if (dest === process.stdout || dest === process.stderr)
      opts.end = false
    else
      opts.end = opts.end !== false

    const p = { dest: dest, opts: opts, ondrain: _ => this[RESUME]() }
    this.pipes.push(p)

    dest.on('drain', p.ondrain)
    this[RESUME]()
    // piping an ended stream ends immediately
    if (ended && p.opts.end)
      p.dest.end()
    return dest
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    try {
      return super.on(ev, fn)
    } finally {
      if (ev === 'data' && !this.pipes.length && !this.flowing)
        this[RESUME]()
      else if (isEndish(ev) && this[EMITTED_END]) {
        super.emit(ev)
        this.removeAllListeners(ev)
      }
    }
  }

  get emittedEnd () {
    return this[EMITTED_END]
  }

  [MAYBE_EMIT_END] () {
    if (!this[EMITTING_END] &&
        !this[EMITTED_END] &&
        !this[DESTROYED] &&
        this.buffer.length === 0 &&
        this[EOF]) {
      this[EMITTING_END] = true
      this.emit('end')
      this.emit('prefinish')
      this.emit('finish')
      if (this[CLOSED])
        this.emit('close')
      this[EMITTING_END] = false
    }
  }

  emit (ev, data) {
    // error and close are only events allowed after calling destroy()
    if (ev !== 'error' && ev !== 'close' && ev !== DESTROYED && this[DESTROYED])
      return
    else if (ev === 'data') {
      if (!data)
        return

      if (this.pipes.length)
        this.pipes.forEach(p =>
          p.dest.write(data) === false && this.pause())
    } else if (ev === 'end') {
      // only actual end gets this treatment
      if (this[EMITTED_END] === true)
        return

      this[EMITTED_END] = true
      this.readable = false

      if (this[DECODER]) {
        data = this[DECODER].end()
        if (data) {
          this.pipes.forEach(p => p.dest.write(data))
          super.emit('data', data)
        }
      }

      this.pipes.forEach(p => {
        p.dest.removeListener('drain', p.ondrain)
        if (p.opts.end)
          p.dest.end()
      })
    } else if (ev === 'close') {
      this[CLOSED] = true
      // don't emit close before 'end' and 'finish'
      if (!this[EMITTED_END] && !this[DESTROYED])
        return
    }

    // TODO: replace with a spread operator when Node v4 support drops
    const args = new Array(arguments.length)
    args[0] = ev
    args[1] = data
    if (arguments.length > 2) {
      for (let i = 2; i < arguments.length; i++) {
        args[i] = arguments[i]
      }
    }

    try {
      return super.emit.apply(this, args)
    } finally {
      if (!isEndish(ev))
        this[MAYBE_EMIT_END]()
      else
        this.removeAllListeners(ev)
    }
  }

  // const all = await stream.collect()
  collect () {
    const buf = []
    buf.dataLength = 0
    this.on('data', c => {
      buf.push(c)
      buf.dataLength += c.length
    })
    return this.promise().then(() => buf)
  }

  // const data = await stream.concat()
  concat () {
    return this[OBJECTMODE]
      ? Promise.reject(new Error('cannot concat in objectMode'))
      : this.collect().then(buf =>
          this[OBJECTMODE]
            ? Promise.reject(new Error('cannot concat in objectMode'))
            : this[ENCODING] ? buf.join('') : B.concat(buf, buf.dataLength))
  }

  // stream.promise().then(() => done, er => emitted error)
  promise () {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED, () => reject(new Error('stream destroyed')))
      this.on('end', () => resolve())
      this.on('error', er => reject(er))
    })
  }

  // for await (let chunk of stream)
  [ASYNCITERATOR] () {
    const next = () => {
      const res = this.read()
      if (res !== null)
        return Promise.resolve({ done: false, value: res })

      if (this[EOF])
        return Promise.resolve({ done: true })

      let resolve = null
      let reject = null
      const onerr = er => {
        this.removeListener('data', ondata)
        this.removeListener('end', onend)
        reject(er)
      }
      const ondata = value => {
        this.removeListener('error', onerr)
        this.removeListener('end', onend)
        this.pause()
        resolve({ value: value, done: !!this[EOF] })
      }
      const onend = () => {
        this.removeListener('error', onerr)
        this.removeListener('data', ondata)
        resolve({ done: true })
      }
      const ondestroy = () => onerr(new Error('stream destroyed'))
      return new Promise((res, rej) => {
        reject = rej
        resolve = res
        this.once(DESTROYED, ondestroy)
        this.once('error', onerr)
        this.once('end', onend)
        this.once('data', ondata)
      })
    }

    return { next }
  }

  // for (let chunk of stream)
  [ITERATOR] () {
    const next = () => {
      const value = this.read()
      const done = value === null
      return { value, done }
    }
    return { next }
  }

  destroy (er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit('error', er)
      else
        this.emit(DESTROYED)
      return this
    }

    this[DESTROYED] = true

    // throw away all buffered data, it's never coming out
    this.buffer = new Yallist()
    this[BUFFERLENGTH] = 0

    if (typeof this.close === 'function' && !this[CLOSED])
      this.close()

    if (er)
      this.emit('error', er)
    else // if no error to emit, still reject pending promises
      this.emit(DESTROYED)

    return this
  }

  static isStream (s) {
    return !!s && (s instanceof Minipass || s instanceof EE && (
      typeof s.pipe === 'function' || // readable
      (typeof s.write === 'function' && typeof s.end === 'function') // writable
    ))
  }
}


/***/ }),

/***/ "./node_modules/minizlib/constants.js":
/*!********************************************!*\
  !*** ./node_modules/minizlib/constants.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Update with any zlib constants that are added or changed in the future.
// Node v6 didn't export this, so we just hard code the version and rely
// on all the other hard-coded values from zlib v4736.  When node v6
// support drops, we can just export the realZlibConstants object.
const realZlibConstants = __webpack_require__(/*! zlib */ "zlib").constants ||
  /* istanbul ignore next */ { ZLIB_VERNUM: 4736 }

module.exports = Object.freeze(Object.assign(Object.create(null), {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_DEFAULT_MODE: 0,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_MIN_WINDOW_BITS: 10,
  BROTLI_MAX_WINDOW_BITS: 24,
  BROTLI_LARGE_MAX_WINDOW_BITS: 30,
  BROTLI_DEFAULT_WINDOW: 22,
  BROTLI_MIN_INPUT_BLOCK_BITS: 16,
  BROTLI_MAX_INPUT_BLOCK_BITS: 24,
  BROTLI_PARAM_MODE: 0,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_PARAM_LGBLOCK: 3,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
  BROTLI_PARAM_SIZE_HINT: 5,
  BROTLI_PARAM_LARGE_WINDOW: 6,
  BROTLI_PARAM_NPOSTFIX: 7,
  BROTLI_PARAM_NDIRECT: 8,
  BROTLI_DECODER_RESULT_ERROR: 0,
  BROTLI_DECODER_RESULT_SUCCESS: 1,
  BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
  BROTLI_DECODER_NO_ERROR: 0,
  BROTLI_DECODER_SUCCESS: 1,
  BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
  BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
  BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
  BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
  BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
  BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
  BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
  BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
  BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
  BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
  BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
  BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
  BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
  BROTLI_DECODER_ERROR_UNREACHABLE: -31,
}, realZlibConstants))


/***/ }),

/***/ "./node_modules/minizlib/index.js":
/*!****************************************!*\
  !*** ./node_modules/minizlib/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const assert = __webpack_require__(/*! assert */ "assert")
const Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer
const realZlib = __webpack_require__(/*! zlib */ "zlib")

const constants = exports.constants = __webpack_require__(/*! ./constants.js */ "./node_modules/minizlib/constants.js")
const Minipass = __webpack_require__(/*! minipass */ "./node_modules/minipass/index.js")

const OriginalBufferConcat = Buffer.concat

class ZlibError extends Error {
  constructor (err) {
    super('zlib: ' + err.message)
    this.code = err.code
    this.errno = err.errno
    /* istanbul ignore if */
    if (!this.code)
      this.code = 'ZLIB_ERROR'

    this.message = 'zlib: ' + err.message
    Error.captureStackTrace(this, this.constructor)
  }

  get name () {
    return 'ZlibError'
  }
}

// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.
const _opts = Symbol('opts')
const _flushFlag = Symbol('flushFlag')
const _finishFlushFlag = Symbol('finishFlushFlag')
const _fullFlushFlag = Symbol('fullFlushFlag')
const _handle = Symbol('handle')
const _onError = Symbol('onError')
const _sawError = Symbol('sawError')
const _level = Symbol('level')
const _strategy = Symbol('strategy')
const _ended = Symbol('ended')
const _defaultFullFlush = Symbol('_defaultFullFlush')

class ZlibBase extends Minipass {
  constructor (opts, mode) {
    if (!opts || typeof opts !== 'object')
      throw new TypeError('invalid options for ZlibBase constructor')

    super(opts)
    this[_ended] = false
    this[_opts] = opts

    this[_flushFlag] = opts.flush
    this[_finishFlushFlag] = opts.finishFlush
    // this will throw if any options are invalid for the class selected
    try {
      this[_handle] = new realZlib[mode](opts)
    } catch (er) {
      // make sure that all errors get decorated properly
      throw new ZlibError(er)
    }

    this[_onError] = (err) => {
      this[_sawError] = true
      // there is no way to cleanly recover.
      // continuing only obscures problems.
      this.close()
      this.emit('error', err)
    }

    this[_handle].on('error', er => this[_onError](new ZlibError(er)))
    this.once('end', () => this.close)
  }

  close () {
    if (this[_handle]) {
      this[_handle].close()
      this[_handle] = null
      this.emit('close')
    }
  }

  reset () {
    if (!this[_sawError]) {
      assert(this[_handle], 'zlib binding closed')
      return this[_handle].reset()
    }
  }

  flush (flushFlag) {
    if (this.ended)
      return

    if (typeof flushFlag !== 'number')
      flushFlag = this[_fullFlushFlag]
    this.write(Object.assign(Buffer.alloc(0), { [_flushFlag]: flushFlag }))
  }

  end (chunk, encoding, cb) {
    if (chunk)
      this.write(chunk, encoding)
    this.flush(this[_finishFlushFlag])
    this[_ended] = true
    return super.end(null, null, cb)
  }

  get ended () {
    return this[_ended]
  }

  write (chunk, encoding, cb) {
    // process the chunk using the sync process
    // then super.write() all the outputted chunks
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'

    if (typeof chunk === 'string')
      chunk = Buffer.from(chunk, encoding)

    if (this[_sawError])
      return
    assert(this[_handle], 'zlib binding closed')

    // _processChunk tries to .close() the native handle after it's done, so we
    // intercept that by temporarily making it a no-op.
    const nativeHandle = this[_handle]._handle
    const originalNativeClose = nativeHandle.close
    nativeHandle.close = () => {}
    const originalClose = this[_handle].close
    this[_handle].close = () => {}
    // It also calls `Buffer.concat()` at the end, which may be convenient
    // for some, but which we are not interested in as it slows us down.
    Buffer.concat = (args) => args
    let result
    try {
      const flushFlag = typeof chunk[_flushFlag] === 'number'
        ? chunk[_flushFlag] : this[_flushFlag]
      result = this[_handle]._processChunk(chunk, flushFlag)
      // if we don't throw, reset it back how it was
      Buffer.concat = OriginalBufferConcat
    } catch (err) {
      // or if we do, put Buffer.concat() back before we emit error
      // Error events call into user code, which may call Buffer.concat()
      Buffer.concat = OriginalBufferConcat
      this[_onError](new ZlibError(err))
    } finally {
      if (this[_handle]) {
        // Core zlib resets `_handle` to null after attempting to close the
        // native handle. Our no-op handler prevented actual closure, but we
        // need to restore the `._handle` property.
        this[_handle]._handle = nativeHandle
        nativeHandle.close = originalNativeClose
        this[_handle].close = originalClose
        // `_processChunk()` adds an 'error' listener. If we don't remove it
        // after each call, these handlers start piling up.
        this[_handle].removeAllListeners('error')
      }
    }

    let writeReturn
    if (result) {
      if (Array.isArray(result) && result.length > 0) {
        // The first buffer is always `handle._outBuffer`, which would be
        // re-used for later invocations; so, we always have to copy that one.
        writeReturn = super.write(Buffer.from(result[0]))
        for (let i = 1; i < result.length; i++) {
          writeReturn = super.write(result[i])
        }
      } else {
        writeReturn = super.write(Buffer.from(result))
      }
    }

    if (cb)
      cb()
    return writeReturn
  }
}

class Zlib extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {}

    opts.flush = opts.flush || constants.Z_NO_FLUSH
    opts.finishFlush = opts.finishFlush || constants.Z_FINISH
    super(opts, mode)

    this[_fullFlushFlag] = constants.Z_FULL_FLUSH
    this[_level] = opts.level
    this[_strategy] = opts.strategy
  }

  params (level, strategy) {
    if (this[_sawError])
      return

    if (!this[_handle])
      throw new Error('cannot switch params when binding is closed')

    // no way to test this without also not supporting params at all
    /* istanbul ignore if */
    if (!this[_handle].params)
      throw new Error('not supported in this implementation')

    if (this[_level] !== level || this[_strategy] !== strategy) {
      this.flush(constants.Z_SYNC_FLUSH)
      assert(this[_handle], 'zlib binding closed')
      // .params() calls .flush(), but the latter is always async in the
      // core zlib. We override .flush() temporarily to intercept that and
      // flush synchronously.
      const origFlush = this[_handle].flush
      this[_handle].flush = (flushFlag, cb) => {
        this.flush(flushFlag)
        cb()
      }
      try {
        this[_handle].params(level, strategy)
      } finally {
        this[_handle].flush = origFlush
      }
      /* istanbul ignore else */
      if (this[_handle]) {
        this[_level] = level
        this[_strategy] = strategy
      }
    }
  }
}

// minimal 2-byte header
class Deflate extends Zlib {
  constructor (opts) {
    super(opts, 'Deflate')
  }
}

class Inflate extends Zlib {
  constructor (opts) {
    super(opts, 'Inflate')
  }
}

// gzip - bigger header, same deflate compression
class Gzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gzip')
  }
}

class Gunzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gunzip')
  }
}

// raw - no header
class DeflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'DeflateRaw')
  }
}

class InflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'InflateRaw')
  }
}

// auto-detect header.
class Unzip extends Zlib {
  constructor (opts) {
    super(opts, 'Unzip')
  }
}

class Brotli extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {}

    opts.flush = opts.flush || constants.BROTLI_OPERATION_PROCESS
    opts.finishFlush = opts.finishFlush || constants.BROTLI_OPERATION_FINISH

    super(opts, mode)

    this[_fullFlushFlag] = constants.BROTLI_OPERATION_FLUSH
  }
}

class BrotliCompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliCompress')
  }
}

class BrotliDecompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliDecompress')
  }
}

exports.Deflate = Deflate
exports.Inflate = Inflate
exports.Gzip = Gzip
exports.Gunzip = Gunzip
exports.DeflateRaw = DeflateRaw
exports.InflateRaw = InflateRaw
exports.Unzip = Unzip
/* istanbul ignore else */
if (typeof realZlib.BrotliCompress === 'function') {
  exports.BrotliCompress = BrotliCompress
  exports.BrotliDecompress = BrotliDecompress
} else {
  exports.BrotliCompress = exports.BrotliDecompress = class {
    constructor () {
      throw new Error('Brotli is not supported in this version of Node.js')
    }
  }
}


/***/ }),

/***/ "./node_modules/needle/lib/auth.js":
/*!*****************************************!*\
  !*** ./node_modules/needle/lib/auth.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createHash = __webpack_require__(/*! crypto */ "crypto").createHash;

function get_header(header, credentials, opts) {
  var type = header.split(' ')[0],
      user = credentials[0],
      pass = credentials[1];

  if (type == 'Digest') {
    return digest.generate(header, user, pass, opts.method, opts.path);
  } else if (type == 'Basic') {
    return basic(user, pass);
  }
}

////////////////////
// basic

function md5(string) {
  return createHash('md5').update(string).digest('hex');
}

function basic(user, pass) {
  var str  = typeof pass == 'undefined' ? user : [user, pass].join(':');
  return 'Basic ' + Buffer.from(str).toString('base64');
}

////////////////////
// digest
// logic inspired from https://github.com/simme/node-http-digest-client

var digest = {};

digest.parse_header = function(header) {
  var challenge = {},
      matches   = header.match(/([a-z0-9_-]+)="?([a-z0-9=\/\.@\s-]+)"?/gi);

  for (var i = 0, l = matches.length; i < l; i++) {
    var parts = matches[i].split('='),
        key   = parts.shift(),
        val   = parts.join('=').replace(/^"/, '').replace(/"$/, '');

    challenge[key] = val;
  }

  return challenge;
}

digest.update_nc = function(nc) {
  var max = 99999999;
  nc++;

  if (nc > max)
    nc = 1;

  var padding = new Array(8).join('0') + '';
  nc = nc + '';
  return padding.substr(0, 8 - nc.length) + nc;
}

digest.generate = function(header, user, pass, method, path) {

  var nc        = 1,
      cnonce    = null,
      challenge = digest.parse_header(header);

  var ha1  = md5(user + ':' + challenge.realm + ':' + pass),
      ha2  = md5(method.toUpperCase() + ':' + path),
      resp = [ha1, challenge.nonce];

  if (typeof challenge.qop === 'string') {
    cnonce = md5(Math.random().toString(36)).substr(0, 8);
    nc     = digest.update_nc(nc);
    resp   = resp.concat(nc, cnonce);
    resp   = resp.concat(challenge.qop, ha2);
  } else {
    resp   = resp.concat(ha2);
  }


  var params = {
    uri      : path,
    realm    : challenge.realm,
    nonce    : challenge.nonce,
    username : user,
    response : md5(resp.join(':'))
  }

  if (challenge.qop) {
    params.qop = challenge.qop;
  }

  if (challenge.opaque) {
    params.opaque = challenge.opaque;
  }

  if (cnonce) {
    params.nc = nc;
    params.cnonce = cnonce;
  }

  header = []
  for (var k in params)
    header.push(k + '="' + params[k] + '"')

  return 'Digest ' + header.join(', ');
}

module.exports = {
  header : get_header,
  basic  : basic,
  digest : digest.generate
}


/***/ }),

/***/ "./node_modules/needle/lib/cookies.js":
/*!********************************************!*\
  !*** ./node_modules/needle/lib/cookies.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


//  Simple cookie handling implementation based on the standard RFC 6265.
//
//  This module just has two functionalities:
//    - Parse a set-cookie-header as a key value object
//    - Write a cookie-string from a key value object
//
//  All cookie attributes are ignored.

var unescape = __webpack_require__(/*! querystring */ "querystring").unescape;

var COOKIE_PAIR        = /^([^=\s]+)\s*=\s*("?)\s*(.*)\s*\2\s*$/;
var EXCLUDED_CHARS     = /[\x00-\x1F\x7F\x3B\x3B\s\"\,\\"%]/g;
var TRAILING_SEMICOLON = /\x3B+$/;
var SEP_SEMICOLON      = /\s*\x3B\s*/;

// i know these should be 'const', but I'd like to keep
// supporting earlier node.js versions as long as I can. :)

var KEY_INDEX   = 1; // index of key from COOKIE_PAIR match
var VALUE_INDEX = 3; // index of value from COOKIE_PAIR match

// Returns a copy str trimmed and without trainling semicolon.
function cleanCookieString(str) {
  return str.trim().replace(/\x3B+$/, '');
}

function getFirstPair(str) {
  var index = str.indexOf('\x3B');
  return index === -1 ? str : str.substr(0, index);
}

// Returns a encoded copy of str based on RFC6265 S4.1.1.
function encodeCookieComponent(str) {
  return str.toString().replace(EXCLUDED_CHARS, encodeURIComponent);
}

// Parses a set-cookie-string based on the standard defined in RFC6265 S4.1.1.
function parseSetCookieString(str) {
  str = cleanCookieString(str);
  str = getFirstPair(str);

  var res = COOKIE_PAIR.exec(str);
  if (!res || !res[VALUE_INDEX]) return null;

  return {
    name  : unescape(res[KEY_INDEX]),
    value : unescape(res[VALUE_INDEX])
  };
}

// Parses a set-cookie-header and returns a key/value object.
// Each key represents the name of a cookie.
function parseSetCookieHeader(header) {
  if (!header) return {};
  header = Array.isArray(header) ? header : [header];

  return header.reduce(function(res, str) {
    var cookie = parseSetCookieString(str);
    if (cookie) res[cookie.name] = cookie.value;
    return res;
  }, {});
}

// Writes a set-cookie-string based on the standard definded in RFC6265 S4.1.1.
function writeCookieString(obj) {
  return Object.keys(obj).reduce(function(str, name) {
    var encodedName  = encodeCookieComponent(name);
    var encodedValue = encodeCookieComponent(obj[name]);
    str += (str ? '; ' : '') + encodedName + '=' + encodedValue;
    return str;
  }, '');
}

// returns a key/val object from an array of cookie strings
exports.read = parseSetCookieHeader;

// writes a cookie string header
exports.write = writeCookieString;


/***/ }),

/***/ "./node_modules/needle/lib/decoder.js":
/*!********************************************!*\
  !*** ./node_modules/needle/lib/decoder.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var iconv,
    inherits  = __webpack_require__(/*! util */ "util").inherits,
    stream    = __webpack_require__(/*! stream */ "stream");

var regex = /(?:charset|encoding)\s*=\s*['"]? *([\w\-]+)/i;

inherits(StreamDecoder, stream.Transform);

function StreamDecoder(charset) {
  if (!(this instanceof StreamDecoder))
    return new StreamDecoder(charset);

  stream.Transform.call(this, charset);
  this.charset = charset;
  this.parsed_chunk = false;
}

StreamDecoder.prototype._transform = function(chunk, encoding, done) {
  var res, found;

  // try get charset from chunk, just once
  if (this.charset == 'utf8' && !this.parsed_chunk) {
    this.parsed_chunk = true;

    var matches = regex.exec(chunk.toString());
    if (matches) {
      found = matches[1].toLowerCase();
      this.charset = found == 'utf-8' ? 'utf8' : found;
    }
  }

  try {
    res = iconv.decode(chunk, this.charset);
  } catch(e) { // something went wrong, just return original chunk
    res = chunk;
  }

  this.push(res);
  done();
}

module.exports = function(charset) {
  try {
    if (!iconv) iconv = __webpack_require__(/*! iconv-lite */ "iconv-lite");
  } catch(e) {
    /* iconv not found */
  }

  if (iconv)
    return new StreamDecoder(charset);
  else
    return new stream.PassThrough;
}


/***/ }),

/***/ "./node_modules/needle/lib/multipart.js":
/*!**********************************************!*\
  !*** ./node_modules/needle/lib/multipart.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var readFile = __webpack_require__(/*! fs */ "fs").readFile,
    basename = __webpack_require__(/*! path */ "path").basename;

exports.build = function(data, boundary, callback) {

  if (typeof data != 'object' || typeof data.pipe == 'function')
    return callback(new Error('Multipart builder expects data as key/val object.'));

  var body   = '',
      object = flatten(data),
      count  = Object.keys(object).length;

  if (count === 0)
    return callback(new Error('Empty multipart body. Invalid data.'))

  function done(err, section) {
    if (err) return callback(err);
    if (section) body += section;
    --count || callback(null, body + '--' + boundary + '--');
  };

  for (var key in object) {
    var value = object[key];
    if (value === null || typeof value == 'undefined') {
      done();
    } else if (Buffer.isBuffer(value)) {
      var part = { buffer: value, content_type: 'application/octet-stream' };
      generate_part(key, part, boundary, done);
    } else {
      var part = (value.buffer || value.file || value.content_type) ? value : { value: value };
      generate_part(key, part, boundary, done);
    }
  }

}

function generate_part(name, part, boundary, callback) {

  var return_part = '--' + boundary + '\r\n';
  return_part += 'Content-Disposition: form-data; name="' + name + '"';

  function append(data, filename) {

    if (data) {
      var binary = part.content_type.indexOf('text') == -1;
      return_part += '; filename="' + encodeURIComponent(filename) + '"\r\n';
      if (binary) return_part += 'Content-Transfer-Encoding: binary\r\n';
      return_part += 'Content-Type: ' + part.content_type + '\r\n\r\n';
      return_part += binary ? data.toString('binary') : data.toString('utf8');
    }

    callback(null, return_part + '\r\n');
  };

  if ((part.file || part.buffer) && part.content_type) {

    var filename = part.filename ? part.filename : part.file ? basename(part.file) : name;
    if (part.buffer) return append(part.buffer, filename);

    readFile(part.file, function(err, data) {
      if (err) return callback(err);
      append(data, filename);
    });

  } else {

    if (typeof part.value == 'object')
      return callback(new Error('Object received for ' + name + ', expected string.'))

    if (part.content_type) {
      return_part += '\r\n';
      return_part += 'Content-Type: ' + part.content_type;
    }

    return_part += '\r\n\r\n';
    return_part += Buffer.from(String(part.value), 'utf8').toString('binary');
    append();

  }

}

// flattens nested objects for multipart body
function flatten(object, into, prefix) {
  into = into || {};

  for(var key in object) {
    var prefix_key = prefix ? prefix + '[' + key + ']' : key;
    var prop = object[key];

    if (prop && typeof prop === 'object' && !(prop.buffer || prop.file || prop.content_type))
      flatten(prop, into, prefix_key)
    else
      into[prefix_key] = prop;
  }

  return into;
}


/***/ }),

/***/ "./node_modules/needle/lib/needle.js":
/*!*******************************************!*\
  !*** ./node_modules/needle/lib/needle.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//////////////////////////////////////////
// Needle -- HTTP Client for Node.js
// Written by Tomás Pollak <tomas@forkhq.com>
// (c) 2012-2020 - Fork Ltd.
// MIT Licensed
//////////////////////////////////////////

var fs          = __webpack_require__(/*! fs */ "fs"),
    http        = __webpack_require__(/*! http */ "http"),
    https       = __webpack_require__(/*! https */ "https"),
    url         = __webpack_require__(/*! url */ "url"),
    stream      = __webpack_require__(/*! stream */ "stream"),
    debug       = __webpack_require__(/*! debug */ "debug")('needle'),
    stringify   = __webpack_require__(/*! ./querystring */ "./node_modules/needle/lib/querystring.js").build,
    multipart   = __webpack_require__(/*! ./multipart */ "./node_modules/needle/lib/multipart.js"),
    auth        = __webpack_require__(/*! ./auth */ "./node_modules/needle/lib/auth.js"),
    cookies     = __webpack_require__(/*! ./cookies */ "./node_modules/needle/lib/cookies.js"),
    parsers     = __webpack_require__(/*! ./parsers */ "./node_modules/needle/lib/parsers.js"),
    decoder     = __webpack_require__(/*! ./decoder */ "./node_modules/needle/lib/decoder.js");

//////////////////////////////////////////
// variabilia

var version     = __webpack_require__(/*! ../package.json */ "./node_modules/needle/package.json").version;

var user_agent  = 'Needle/' + version;
user_agent     += ' (Node.js ' + process.version + '; ' + process.platform + ' ' + process.arch + ')';

var tls_options = 'agent pfx key passphrase cert ca ciphers rejectUnauthorized secureProtocol checkServerIdentity family';

// older versions of node (< 0.11.4) prevent the runtime from exiting
// because of connections in keep-alive state. so if this is the case
// we'll default new requests to set a Connection: close header.
var close_by_default = !http.Agent || http.Agent.defaultMaxSockets != Infinity;

// see if we have Object.assign. otherwise fall back to util._extend
var extend = Object.assign ? Object.assign : __webpack_require__(/*! util */ "util")._extend;

// these are the status codes that Needle interprets as redirects.
var redirect_codes = [301, 302, 303, 307, 308];

//////////////////////////////////////////
// decompressors for gzip/deflate/br bodies

var decompressors = {};
var brotli_supported = false;

try {

  var zlib = __webpack_require__(/*! zlib */ "zlib");
  brotli_supported = typeof zlib.BrotliDecompress === 'function';
  decompressors['x-deflate'] = zlib.Inflate;
  decompressors['deflate']   = zlib.Inflate;
  decompressors['x-gzip']    = zlib.Gunzip;
  decompressors['gzip']      = zlib.Gunzip;
  if (brotli_supported) {
    decompressors['br']      = zlib.BrotliDecompress;
  }

  // Enable Z_SYNC_FLUSH to avoid Z_BUF_ERROR errors (Node PR #2595)
  var zlib_options = {
    flush: zlib.Z_SYNC_FLUSH,
    finishFlush: zlib.Z_SYNC_FLUSH
  }

} catch(e) { /* zlib not available */ }

//////////////////////////////////////////
// options and aliases

var defaults = {
  // data
  boundary                : '--------------------NODENEEDLEHTTPCLIENT',
  encoding                : 'utf8',
  parse_response          : 'all', // same as true. valid options: 'json', 'xml' or false/null
  proxy                   : null,

  // headers
  headers                 : {},
  accept                  : '*/*',
  user_agent              : user_agent,

  // numbers
  open_timeout            : 10000,
  response_timeout        : 0,
  read_timeout            : 0,
  follow_max              : 0,
  stream_length           : -1,

  // booleans
  compressed              : false,
  decode_response         : true,
  parse_cookies           : true,
  follow_set_cookies      : false,
  follow_set_referer      : false,
  follow_keep_method      : false,
  follow_if_same_host     : false,
  follow_if_same_protocol : false,
  follow_if_same_location : false
}

var aliased = {
  options: {
    decode  : 'decode_response',
    parse   : 'parse_response',
    timeout : 'open_timeout',
    follow  : 'follow_max'
  },
  inverted: {}
}

// only once, invert aliased keys so we can get passed options.
Object.keys(aliased.options).map(function(k) {
  var value = aliased.options[k];
  aliased.inverted[value] = k;
});

//////////////////////////////////////////
// helpers

function keys_by_type(type) {
  return Object.keys(defaults).map(function(el) {
    if (defaults[el] !== null && defaults[el].constructor == type)
      return el;
  }).filter(function(el) { return el })
}

function parse_content_type(header) {
  if (!header || header === '') return {};

  var found, charset = 'utf8', arr = header.split(';');

  if (arr.length > 1 && (found = arr[1].match(/charset=(.+)/)))
    charset = found[1];

  return { type: arr[0], charset: charset };
}

function is_stream(obj) {
  return typeof obj.pipe === 'function';
}

function get_stream_length(stream, given_length, cb) {
  if (given_length > 0)
    return cb(given_length);

  if (stream.end !== void 0 && stream.end !== Infinity && stream.start !== void 0)
    return cb((stream.end + 1) - (stream.start || 0));

  fs.stat(stream.path, function(err, stat) {
    cb(stat ? stat.size - (stream.start || 0) : null);
  });
}

//////////////////////////////////////////
// the main act

function Needle(method, uri, data, options, callback) {
  // if (!(this instanceof Needle)) {
  //   return new Needle(method, uri, data, options, callback);
  // }

  if (typeof uri !== 'string')
    throw new TypeError('URL must be a string, not ' + uri);

  this.method   = method;
  this.uri      = uri;
  this.data     = data;

  if (typeof options == 'function') {
    this.callback = options;
    this.options  = {};
  } else {
    this.callback = callback;
    this.options  = options;
  }

}

Needle.prototype.setup = function(uri, options) {

  function get_option(key, fallback) {
    // if original is in options, return that value
    if (typeof options[key] != 'undefined') return options[key];

    // otherwise, return value from alias or fallback/undefined
    return typeof options[aliased.inverted[key]] != 'undefined'
                ? options[aliased.inverted[key]] : fallback;
  }

  function check_value(expected, key) {
    var value = get_option(key),
        type  = typeof value;

    if (type != 'undefined' && type != expected)
      throw new TypeError(type + ' received for ' + key + ', but expected a ' + expected);

    return (type == expected) ? value : defaults[key];
  }

  //////////////////////////////////////////////////
  // the basics

  var config = {
    http_opts : {
      localAddress: get_option('localAddress', undefined)
    }, // passed later to http.request() directly
    headers   : {},
    output    : options.output,
    proxy     : get_option('proxy', defaults.proxy),
    parser    : get_option('parse_response', defaults.parse_response),
    encoding  : options.encoding || (options.multipart ? 'binary' : defaults.encoding)
  }

  keys_by_type(Boolean).forEach(function(key) {
    config[key] = check_value('boolean', key);
  })

  keys_by_type(Number).forEach(function(key) {
    config[key] = check_value('number', key);
  })

  // populate http_opts with given TLS options
  tls_options.split(' ').forEach(function(key) {
    if (typeof options[key] != 'undefined') {
      config.http_opts[key] = options[key];
      if (typeof options.agent == 'undefined')
        config.http_opts.agent = false; // otherwise tls options are skipped
    }
  });

  //////////////////////////////////////////////////
  // headers, cookies

  for (var key in defaults.headers)
    config.headers[key] = defaults.headers[key];

  config.headers['accept'] = options.accept || defaults.accept;
  config.headers['user-agent'] = options.user_agent || defaults.user_agent;

  if (options.content_type)
    config.headers['content-type'] = options.content_type;

  // set connection header if opts.connection was passed, or if node < 0.11.4 (close)
  if (options.connection || close_by_default)
    config.headers['connection'] = options.connection || 'close';

  if ((options.compressed || defaults.compressed) && typeof zlib != 'undefined')
    config.headers['accept-encoding'] = brotli_supported ? 'gzip, deflate, br' : 'gzip, deflate';

  if (options.cookies)
    config.headers['cookie'] = cookies.write(options.cookies);

  //////////////////////////////////////////////////
  // basic/digest auth

  if (uri.match(/[^\/]@/)) { // url contains user:pass@host, so parse it.
    var parts = (url.parse(uri).auth || '').split(':');
    options.username = parts[0];
    options.password = parts[1];
  }

  if (options.username) {
    if (options.auth && (options.auth == 'auto' || options.auth == 'digest')) {
      config.credentials = [options.username, options.password];
    } else {
      config.headers['authorization'] = auth.basic(options.username, options.password);
    }
  }

  // if proxy is present, set auth header from either url or proxy_user option.
  if (config.proxy) {
    if (config.proxy.indexOf('http') === -1)
      config.proxy = 'http://' + config.proxy;

    if (config.proxy.indexOf('@') !== -1) {
      var proxy = (url.parse(config.proxy).auth || '').split(':');
      options.proxy_user = proxy[0];
      options.proxy_pass = proxy[1];
    }

    if (options.proxy_user)
      config.headers['proxy-authorization'] = auth.basic(options.proxy_user, options.proxy_pass);
  }

  // now that all our headers are set, overwrite them if instructed.
  for (var h in options.headers)
    config.headers[h.toLowerCase()] = options.headers[h];

  config.uri_modifier = get_option('uri_modifier', null);

  return config;
}

Needle.prototype.start = function() {

  var out      = new stream.PassThrough({ objectMode: false }),
      uri      = this.uri,
      data     = this.data,
      method   = this.method,
      callback = (typeof this.options == 'function') ? this.options : this.callback,
      options  = this.options || {};

  // if no 'http' is found on URL, prepend it.
  if (uri.indexOf('http') === -1)
    uri = uri.replace(/^(\/\/)?/, 'http://');

  var self = this, body, waiting = false, config = this.setup(uri, options);

  // unless options.json was set to false, assume boss also wants JSON if content-type matches.
  var json = options.json || (options.json !== false && config.headers['content-type'] == 'application/json');

  if (data) {

    if (options.multipart) { // boss says we do multipart. so we do it.
      var boundary = options.boundary || defaults.boundary;

      waiting = true;
      multipart.build(data, boundary, function(err, parts) {
        if (err) throw(err);

        config.headers['content-type'] = 'multipart/form-data; boundary=' + boundary;
        next(parts);
      });

    } else if (is_stream(data)) {

      if (method.toUpperCase() == 'GET')
        throw new Error('Refusing to pipe() a stream via GET. Did you mean .post?');

      if (config.stream_length > 0 || (config.stream_length === 0 && data.path)) {
        // ok, let's get the stream's length and set it as the content-length header.
        // this prevents some servers from cutting us off before all the data is sent.
        waiting = true;
        get_stream_length(data, config.stream_length, function(length) {
          data.length = length;
          next(data);
        })

      } else {
        // if the boss doesn't want us to get the stream's length, or if it doesn't
        // have a file descriptor for that purpose, then just head on.
        body = data;
      }

    } else if (Buffer.isBuffer(data)) {

      body = data; // use the raw buffer as request body.

    } else if (method.toUpperCase() == 'GET' && !json) {

      // append the data to the URI as a querystring.
      uri = uri.replace(/\?.*|$/, '?' + stringify(data));

    } else { // string or object data, no multipart.

      // if string, leave it as it is, otherwise, stringify.
      body = (typeof(data) === 'string') ? data
             : json ? JSON.stringify(data) : stringify(data);

      // ensure we have a buffer so bytecount is correct.
      body = Buffer.from(body, config.encoding);
    }

  }

  function next(body) {
    if (body) {
      if (body.length) config.headers['content-length'] = body.length;

      // if no content-type was passed, determine if json or not.
      if (!config.headers['content-type']) {
        config.headers['content-type'] = json
        ? 'application/json; charset=utf-8'
        : 'application/x-www-form-urlencoded'; // no charset says W3 spec.
      }
    }

    // unless a specific accept header was set, assume json: true wants JSON back.
    if (options.json && (!options.accept && !(options.headers || {}).accept))
      config.headers['accept'] = 'application/json';

    self.send_request(1, method, uri, config, body, out, callback);
  }

  if (!waiting) next(body);
  return out;
}

Needle.prototype.get_request_opts = function(method, uri, config) {
  var opts      = config.http_opts,
      proxy     = config.proxy,
      remote    = proxy ? url.parse(proxy) : url.parse(uri);

  opts.protocol = remote.protocol;
  opts.host     = remote.hostname;
  opts.port     = remote.port || (remote.protocol == 'https:' ? 443 : 80);
  opts.path     = proxy ? uri : remote.pathname + (remote.search || '');
  opts.method   = method;
  opts.headers  = config.headers;

  if (!opts.headers['host']) {
    // if using proxy, make sure the host header shows the final destination
    var target = proxy ? url.parse(uri) : remote;
    opts.headers['host'] = target.hostname;

    // and if a non standard port was passed, append it to the port header
    if (target.port && [80, 443].indexOf(target.port) === -1) {
      opts.headers['host'] += ':' + target.port;
    }
  }

  return opts;
}

Needle.prototype.should_follow = function(location, config, original) {
  if (!location) return false;

  // returns true if location contains matching property (host or protocol)
  function matches(property) {
    var property = original[property];
    return location.indexOf(property) !== -1;
  }

  // first, check whether the requested location is actually different from the original
  if (!config.follow_if_same_location && location === original)
    return false;

  if (config.follow_if_same_host && !matches('host'))
    return false; // host does not match, so not following

  if (config.follow_if_same_protocol && !matches('protocol'))
    return false; // procotol does not match, so not following

  return true;
}

Needle.prototype.send_request = function(count, method, uri, config, post_data, out, callback) {

  if (typeof config.uri_modifier === 'function') {
    var modified_uri = config.uri_modifier(uri);
    debug('Modifying request URI', uri + ' => ' + modified_uri);
    uri = modified_uri;
  }

  var timer,
      returned     = 0,
      self         = this,
      request_opts = this.get_request_opts(method, uri, config),
      protocol     = request_opts.protocol == 'https:' ? https : http;

  function done(err, resp) {
    if (returned++ > 0)
      return debug('Already finished, stopping here.');

    if (timer) clearTimeout(timer);
    request.removeListener('error', had_error);

    if (callback)
      return callback(err, resp, resp ? resp.body : undefined);

    // NOTE: this event used to be called 'end', but the behaviour was confusing
    // when errors ocurred, because the stream would still emit an 'end' event.
    out.emit('done', err);
  }

  function had_error(err) {
    debug('Request error', err);
    out.emit('err', err);
    done(err || new Error('Unknown error when making request.'));
  }

  function set_timeout(type, milisecs) {
    if (timer) clearTimeout(timer);
    if (milisecs <= 0) return;

    timer = setTimeout(function() {
      out.emit('timeout', type);
      request.abort();
      // also invoke done() to terminate job on read_timeout
      if (type == 'read') done(new Error(type + ' timeout'));
    }, milisecs);
  }

  // handle errors on the underlying socket, that may be closed while writing
  // for an example case, see test/long_string_spec.js. we make sure this
  // scenario ocurred by verifying the socket's writable & destroyed states.
  function on_socket_end() {
    if (returned && !this.writable && this.destroyed === false) {
      this.destroy();
      had_error(new Error('Remote end closed socket abruptly.'))
    }
  }

  debug('Making request #' + count, request_opts);
  var request = protocol.request(request_opts, function(resp) {

    var headers = resp.headers;
    debug('Got response', resp.statusCode, headers);
    out.emit('response', resp);

    set_timeout('read', config.read_timeout);

    // if we got cookies, parse them unless we were instructed not to. make sure to include any
    // cookies that might have been set on previous redirects.
    if (config.parse_cookies && (headers['set-cookie'] || config.previous_resp_cookies)) {
      resp.cookies = extend(config.previous_resp_cookies || {}, cookies.read(headers['set-cookie']));
      debug('Got cookies', resp.cookies);
    }

    // if redirect code is found, determine if we should follow it according to the given options.
    if (redirect_codes.indexOf(resp.statusCode) !== -1 && self.should_follow(headers.location, config, uri)) {
      // clear timer before following redirects to prevent unexpected setTimeout consequence
      clearTimeout(timer);

      if (count <= config.follow_max) {
        out.emit('redirect', headers.location);

        // unless 'follow_keep_method' is true, rewrite the request to GET before continuing.
        if (!config.follow_keep_method) {
          method    = 'GET';
          post_data = null;
          delete config.headers['content-length']; // in case the original was a multipart POST request.
        }

        // if follow_set_cookies is true, insert cookies in the next request's headers.
        // we set both the original request cookies plus any response cookies we might have received.
        if (config.follow_set_cookies) {
          var request_cookies = cookies.read(config.headers['cookie']);
          config.previous_resp_cookies = resp.cookies;
          if (Object.keys(request_cookies).length || Object.keys(resp.cookies || {}).length) {
            config.headers['cookie'] = cookies.write(extend(request_cookies, resp.cookies));
          }
        } else if (config.headers['cookie']) {
          debug('Clearing original request cookie', config.headers['cookie']);
          delete config.headers['cookie'];
        }

        if (config.follow_set_referer)
          config.headers['referer'] = encodeURI(uri); // the original, not the destination URL.

        config.headers['host'] = null; // clear previous Host header to avoid conflicts.

        debug('Redirecting to ' + url.resolve(uri, headers.location));
        return self.send_request(++count, method, url.resolve(uri, headers.location), config, post_data, out, callback);
      } else if (config.follow_max > 0) {
        return done(new Error('Max redirects reached. Possible loop in: ' + headers.location));
      }
    }

    // if auth is requested and credentials were not passed, resend request, provided we have user/pass.
    if (resp.statusCode == 401 && headers['www-authenticate'] && config.credentials) {
      if (!config.headers['authorization']) { // only if authentication hasn't been sent
        var auth_header = auth.header(headers['www-authenticate'], config.credentials, request_opts);

        if (auth_header) {
          config.headers['authorization'] = auth_header;
          return self.send_request(count, method, uri, config, post_data, out, callback);
        }
      }
    }

    // ok, so we got a valid (non-redirect & authorized) response. let's notify the stream guys.
    out.emit('header', resp.statusCode, headers);
    out.emit('headers', headers);

    var pipeline      = [],
        mime          = parse_content_type(headers['content-type']),
        text_response = mime.type && mime.type.indexOf('text/') != -1;

    // To start, if our body is compressed and we're able to inflate it, do it.
    if (headers['content-encoding'] && decompressors[headers['content-encoding']]) {

      var decompressor = decompressors[headers['content-encoding']](zlib_options);

      // make sure we catch errors triggered by the decompressor.
      decompressor.on('error', had_error);
      pipeline.push(decompressor);
    }

    // If parse is enabled and we have a parser for it, then go for it.
    if (config.parser && parsers[mime.type]) {

      // If a specific parser was requested, make sure we don't parse other types.
      var parser_name = config.parser.toString().toLowerCase();
      if (['xml', 'json'].indexOf(parser_name) == -1 || parsers[mime.type].name == parser_name) {

        // OK, so either we're parsing all content types or the one requested matches.
        out.parser = parsers[mime.type].name;
        pipeline.push(parsers[mime.type].fn());

        // Set objectMode on out stream to improve performance.
        out._writableState.objectMode = true;
        out._readableState.objectMode = true;
      }

    // If we're not parsing, and unless decoding was disabled, we'll try
    // decoding non UTF-8 bodies to UTF-8, using the iconv-lite library.
    } else if (text_response && config.decode_response
      && mime.charset) {
        pipeline.push(decoder(mime.charset));
    }
    // And `out` is the stream we finally push the decoded/parsed output to.
    pipeline.push(out);

    // Now, release the kraken!
    var tmp = resp;
    while (pipeline.length) {
      tmp = tmp.pipe(pipeline.shift());
    }

    // If the user has requested and output file, pipe the output stream to it.
    // In stream mode, we will still get the response stream to play with.
    if (config.output && resp.statusCode == 200) {

      // for some reason, simply piping resp to the writable stream doesn't
      // work all the time (stream gets cut in the middle with no warning).
      // so we'll manually need to do the readable/write(chunk) trick.
      var file = fs.createWriteStream(config.output);
      file.on('error', had_error);

      out.on('end', function() {
        if (file.writable) file.end();
      });

      file.on('close', function() {
        delete out.file;
      })

      out.on('readable', function() {
        var chunk;
        while ((chunk = this.read()) !== null) {
          if (file.writable) file.write(chunk);

          // if callback was requested, also push it to resp.body
          if (resp.body) resp.body.push(chunk);
        }
      })

      out.file = file;
    }

    // Only aggregate the full body if a callback was requested.
    if (callback) {
      resp.raw   = [];
      resp.body  = [];
      resp.bytes = 0;

      // Gather and count the amount of (raw) bytes using a PassThrough stream.
      var clean_pipe = new stream.PassThrough();
      resp.pipe(clean_pipe);

      clean_pipe.on('readable', function() {
        var chunk;
        while ((chunk = this.read()) != null) {
          resp.bytes += chunk.length;
          resp.raw.push(chunk);
        }
      })

      // Listen on the 'readable' event to aggregate the chunks, but only if
      // file output wasn't requested. Otherwise we'd have two stream readers.
      if (!config.output || resp.statusCode != 200) {
        out.on('readable', function() {
          var chunk;
          while ((chunk = this.read()) !== null) {
            // We're either pushing buffers or objects, never strings.
            if (typeof chunk == 'string') chunk = Buffer.from(chunk);

            // Push all chunks to resp.body. We'll bind them in resp.end().
            resp.body.push(chunk);
          }
        })
      }
    }

    // And set the .body property once all data is in.
    out.on('end', function() {
      if (resp.body) { // callback mode

        // we want to be able to access to the raw data later, so keep a reference.
        resp.raw = Buffer.concat(resp.raw);

        // if parse was successful, we should have an array with one object
        if (resp.body[0] !== undefined && !Buffer.isBuffer(resp.body[0])) {

          // that's our body right there.
          resp.body = resp.body[0];

          // set the parser property on our response. we may want to check.
          if (out.parser) resp.parser = out.parser;

        } else { // we got one or several buffers. string or binary.
          resp.body = Buffer.concat(resp.body);

          // if we're here and parsed is true, it means we tried to but it didn't work.
          // so given that we got a text response, let's stringify it.
          if (text_response || out.parser) {
            resp.body = resp.body.toString();
          }
        }
      }

      // if an output file is being written to, make sure the callback
      // is triggered after all data has been written to it.
      if (out.file) {
        out.file.on('close', function() {
          done(null, resp, resp.body);
        })
      } else { // elvis has left the building.
        done(null, resp, resp.body);
      }

    });

  }); // end request call

  // unless open_timeout was disabled, set a timeout to abort the request.
  set_timeout('open', config.open_timeout);

  // handle errors on the request object. things might get bumpy.
  request.on('error', had_error);

  // make sure timer is cleared if request is aborted (issue #257)
  request.once('abort', function() {
    if (timer) clearTimeout(timer);
  })

  // handle socket 'end' event to ensure we don't get delayed EPIPE errors.
  request.once('socket', function(socket) {
    if (socket.connecting) {
      socket.once('connect', function() {
        set_timeout('response', config.response_timeout);
      })
    } else {
      set_timeout('response', config.response_timeout);
    }

    // console.log(socket);
    if (!socket.on_socket_end) {
      socket.on_socket_end = on_socket_end;
      socket.once('end', function() { process.nextTick(on_socket_end.bind(socket)) });
    }
  })

  if (post_data) {
    if (is_stream(post_data)) {
      post_data.pipe(request);
    } else {
      request.write(post_data, config.encoding);
      request.end();
    }
  } else {
    request.end();
  }

  out.request = request;
  return out;
}

//////////////////////////////////////////
// exports

if (typeof Promise !== 'undefined') {
  module.exports = function() {
    var verb, args = [].slice.call(arguments);

    if (args[0].match(/\.|\//)) // first argument looks like a URL
      verb = (args.length > 2) ? 'post' : 'get';
    else
      verb = args.shift();

    if (verb.match(/get|head/) && args.length == 2)
      args.splice(1, 0, null); // assume no data if head/get with two args (url, options)

    return new Promise(function(resolve, reject) {
      module.exports.request(verb, args[0], args[1], args[2], function(err, resp) {
        return err ? reject(err) : resolve(resp);
      });
    })
  }
}

module.exports.version = version;

module.exports.defaults = function(obj) {
  for (var key in obj) {
    var target_key = aliased.options[key] || key;

    if (defaults.hasOwnProperty(target_key) && typeof obj[key] != 'undefined') {
      if (target_key != 'parse_response' && target_key != 'proxy') {
        // ensure type matches the original, except for proxy/parse_response that can be null/bool or string
        var valid_type = defaults[target_key].constructor.name;

        if (obj[key].constructor.name != valid_type)
          throw new TypeError('Invalid type for ' + key + ', should be ' + valid_type);
      }
      defaults[target_key] = obj[key];
    } else {
      throw new Error('Invalid property for defaults:' + target_key);
    }
  }

  return defaults;
}

'head get'.split(' ').forEach(function(method) {
  module.exports[method] = function(uri, options, callback) {
    return new Needle(method, uri, null, options, callback).start();
  }
})

'post put patch delete'.split(' ').forEach(function(method) {
  module.exports[method] = function(uri, data, options, callback) {
    return new Needle(method, uri, data, options, callback).start();
  }
})

module.exports.request = function(method, uri, data, opts, callback) {
  return new Needle(method, uri, data, opts, callback).start();
};


/***/ }),

/***/ "./node_modules/needle/lib/parsers.js":
/*!********************************************!*\
  !*** ./node_modules/needle/lib/parsers.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//////////////////////////////////////////
// Defines mappings between content-type
// and the appropriate parsers.
//////////////////////////////////////////

var Transform = __webpack_require__(/*! stream */ "stream").Transform;
var sax = __webpack_require__(/*! sax */ "./node_modules/sax/lib/sax.js");

function parseXML(str, cb) {
  var obj, current, parser = sax.parser(true, { trim: true, lowercase: true })
  parser.onerror = parser.onend = done;

  function done(err) {
    parser.onerror = parser.onend = function() { }
    cb(err, obj)
  }

  function newElement(name, attributes) {
    return {
      name: name || '',
      value: '',
      attributes: attributes || {},
      children: []
    }
  }

  parser.oncdata = parser.ontext = function(t) {
    if (current) current.value += t
  }

  parser.onopentag = function(node) {
    var element = newElement(node.name, node.attributes)
    if (current) {
      element.parent = current
      current.children.push(element)
    } else { // root object
      obj = element
    }

    current = element
  };

  parser.onclosetag = function() {
    if (typeof current.parent !== 'undefined') {
      var just_closed = current
      current = current.parent
      delete just_closed.parent
    }
  }

  parser.write(str).close()
}

function parserFactory(name, fn) {

  function parser() {
    var chunks = [],
        stream = new Transform({ objectMode: true });

    // Buffer all our data
    stream._transform = function(chunk, encoding, done) {
      chunks.push(chunk);
      done();
    }

    // And call the parser when all is there.
    stream._flush = function(done) {
      var self = this,
          data = Buffer.concat(chunks);

      try {
        fn(data, function(err, result) {
          if (err) throw err;
          self.push(result);
        });
      } catch (err) {
        self.push(data); // just pass the original data
      } finally {
        done();
      }
    }

    return stream;
  }

  return { fn: parser, name: name };
}

var parsers = {}

function buildParser(name, types, fn) {
  var parser = parserFactory(name, fn);
  types.forEach(function(type) {
    parsers[type] = parser;
  })
}

buildParser('json', [
  'application/json',
  'text/javascript'
], function(buffer, cb) {
  var err, data;
  try { data = JSON.parse(buffer); } catch (e) { err = e; }
  cb(err, data);
});

buildParser('xml', [
  'text/xml',
  'application/xml',
  'application/rdf+xml',
  'application/rss+xml',
  'application/atom+xml'
], function(buffer, cb) {
  parseXML(buffer.toString(), function(err, obj) {
    cb(err, obj)
  })
});

module.exports = parsers;
module.exports.use = buildParser;


/***/ }),

/***/ "./node_modules/needle/lib/querystring.js":
/*!************************************************!*\
  !*** ./node_modules/needle/lib/querystring.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// based on the qs module, but handles null objects as expected
// fixes by Tomas Pollak.

var toString = Object.prototype.toString;

function stringify(obj, prefix) {
  if (prefix && (obj === null || typeof obj == 'undefined')) {
    return prefix + '=';
  } else if (toString.call(obj) == '[object Array]') {
    return stringifyArray(obj, prefix);
  } else if (toString.call(obj) == '[object Object]') {
    return stringifyObject(obj, prefix);
  } else if (toString.call(obj) == '[object Date]') {
    return obj.toISOString();
  } else if (prefix) { // string inside array or hash
    return prefix + '=' + encodeURIComponent(String(obj));
  } else if (String(obj).indexOf('=') !== -1) { // string with equal sign
    return String(obj);
  } else {
    throw new TypeError('Cannot build a querystring out of: ' + obj);
  }
};

function stringifyArray(arr, prefix) {
  var ret = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    if (prefix)
      ret.push(stringify(arr[i], prefix + '[]'));
    else
      ret.push(stringify(arr[i]));
  }

  return ret.join('&');
}

function stringifyObject(obj, prefix) {
  var ret = [];

  Object.keys(obj).forEach(function(key) {
    ret.push(stringify(obj[key], prefix
      ? prefix + '[' + encodeURIComponent(key) + ']'
      : encodeURIComponent(key)));
  })

  return ret.join('&');
}

exports.build = stringify;


/***/ }),

/***/ "./node_modules/needle/package.json":
/*!******************************************!*\
  !*** ./node_modules/needle/package.json ***!
  \******************************************/
/*! exports provided: name, version, description, keywords, tags, author, repository, dependencies, devDependencies, scripts, directories, main, bin, license, engines, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"needle\",\"version\":\"2.5.0\",\"description\":\"The leanest and most handsome HTTP client in the Nodelands.\",\"keywords\":[\"http\",\"https\",\"simple\",\"request\",\"client\",\"multipart\",\"upload\",\"proxy\",\"deflate\",\"timeout\",\"charset\",\"iconv\",\"cookie\",\"redirect\"],\"tags\":[\"http\",\"https\",\"simple\",\"request\",\"client\",\"multipart\",\"upload\",\"proxy\",\"deflate\",\"timeout\",\"charset\",\"iconv\",\"cookie\",\"redirect\"],\"author\":\"Tomás Pollak <tomas@forkhq.com>\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/tomas/needle.git\"},\"dependencies\":{\"debug\":\"^3.2.6\",\"iconv-lite\":\"^0.4.4\",\"sax\":\"^1.2.4\"},\"devDependencies\":{\"JSONStream\":\"^1.3.5\",\"jschardet\":\"^1.6.0\",\"mocha\":\"^5.2.0\",\"q\":\"^1.5.1\",\"should\":\"^13.2.3\",\"sinon\":\"^2.3.0\",\"xml2js\":\"^0.4.19\"},\"scripts\":{\"test\":\"mocha test\"},\"directories\":{\"lib\":\"./lib\"},\"main\":\"./lib/needle\",\"bin\":{\"needle\":\"./bin/needle\"},\"license\":\"MIT\",\"engines\":{\"node\":\">= 4.4.x\"}}");

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib sync recursive":
/*!********************************************!*\
  !*** ./node_modules/node-pre-gyp/lib sync ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/node-pre-gyp/lib sync recursive";

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib sync recursive ^\\.\\/.*$":
/*!*****************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib sync ^\.\/.*$ ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./build": "./node_modules/node-pre-gyp/lib/build.js",
	"./build.js": "./node_modules/node-pre-gyp/lib/build.js",
	"./clean": "./node_modules/node-pre-gyp/lib/clean.js",
	"./clean.js": "./node_modules/node-pre-gyp/lib/clean.js",
	"./configure": "./node_modules/node-pre-gyp/lib/configure.js",
	"./configure.js": "./node_modules/node-pre-gyp/lib/configure.js",
	"./info": "./node_modules/node-pre-gyp/lib/info.js",
	"./info.js": "./node_modules/node-pre-gyp/lib/info.js",
	"./install": "./node_modules/node-pre-gyp/lib/install.js",
	"./install.js": "./node_modules/node-pre-gyp/lib/install.js",
	"./node-pre-gyp": "./node_modules/node-pre-gyp/lib/node-pre-gyp.js",
	"./node-pre-gyp.js": "./node_modules/node-pre-gyp/lib/node-pre-gyp.js",
	"./package": "./node_modules/node-pre-gyp/lib/package.js",
	"./package.js": "./node_modules/node-pre-gyp/lib/package.js",
	"./pre-binding": "./node_modules/node-pre-gyp/lib/pre-binding.js",
	"./pre-binding.js": "./node_modules/node-pre-gyp/lib/pre-binding.js",
	"./publish": "./node_modules/node-pre-gyp/lib/publish.js",
	"./publish.js": "./node_modules/node-pre-gyp/lib/publish.js",
	"./rebuild": "./node_modules/node-pre-gyp/lib/rebuild.js",
	"./rebuild.js": "./node_modules/node-pre-gyp/lib/rebuild.js",
	"./reinstall": "./node_modules/node-pre-gyp/lib/reinstall.js",
	"./reinstall.js": "./node_modules/node-pre-gyp/lib/reinstall.js",
	"./reveal": "./node_modules/node-pre-gyp/lib/reveal.js",
	"./reveal.js": "./node_modules/node-pre-gyp/lib/reveal.js",
	"./testbinary": "./node_modules/node-pre-gyp/lib/testbinary.js",
	"./testbinary.js": "./node_modules/node-pre-gyp/lib/testbinary.js",
	"./testpackage": "./node_modules/node-pre-gyp/lib/testpackage.js",
	"./testpackage.js": "./node_modules/node-pre-gyp/lib/testpackage.js",
	"./unpublish": "./node_modules/node-pre-gyp/lib/unpublish.js",
	"./unpublish.js": "./node_modules/node-pre-gyp/lib/unpublish.js",
	"./util/abi_crosswalk.json": "./node_modules/node-pre-gyp/lib/util/abi_crosswalk.json",
	"./util/compile": "./node_modules/node-pre-gyp/lib/util/compile.js",
	"./util/compile.js": "./node_modules/node-pre-gyp/lib/util/compile.js",
	"./util/handle_gyp_opts": "./node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js",
	"./util/handle_gyp_opts.js": "./node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js",
	"./util/napi": "./node_modules/node-pre-gyp/lib/util/napi.js",
	"./util/napi.js": "./node_modules/node-pre-gyp/lib/util/napi.js",
	"./util/nw-pre-gyp/index.html": "./node_modules/node-pre-gyp/lib/util/nw-pre-gyp/index.html",
	"./util/nw-pre-gyp/package.json": "./node_modules/node-pre-gyp/lib/util/nw-pre-gyp/package.json",
	"./util/s3_setup": "./node_modules/node-pre-gyp/lib/util/s3_setup.js",
	"./util/s3_setup.js": "./node_modules/node-pre-gyp/lib/util/s3_setup.js",
	"./util/versioning": "./node_modules/node-pre-gyp/lib/util/versioning.js",
	"./util/versioning.js": "./node_modules/node-pre-gyp/lib/util/versioning.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/node-pre-gyp/lib sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/build.js":
/*!************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/build.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = build;

exports.usage = 'Attempts to compile the module by dispatching to node-gyp or nw-gyp';

var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var compile = __webpack_require__(/*! ./util/compile.js */ "./node_modules/node-pre-gyp/lib/util/compile.js");
var handle_gyp_opts = __webpack_require__(/*! ./util/handle_gyp_opts.js */ "./node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js");
var configure = __webpack_require__(/*! ./configure.js */ "./node_modules/node-pre-gyp/lib/configure.js");

function do_build(gyp,argv,callback) {
    handle_gyp_opts(gyp,argv,function(err,result) {
        var final_args = ['build'].concat(result.gyp).concat(result.pre);
        if (result.unparsed.length > 0) {
            final_args = final_args.
                          concat(['--']).
                          concat(result.unparsed);
        }
        if (!err && result.opts.napi_build_version) {
            napi.swap_build_dir_in(result.opts.napi_build_version);
        }
        compile.run_gyp(final_args,result.opts,function(err) {
            if (result.opts.napi_build_version) {
                napi.swap_build_dir_out(result.opts.napi_build_version);
            }
            return callback(err);
        });
    });
}

function build(gyp, argv, callback) {

    // Form up commands to pass to node-gyp:
    // We map `node-pre-gyp build` to `node-gyp configure build` so that we do not
    // trigger a clean and therefore do not pay the penalty of a full recompile
    if (argv.length && (argv.indexOf('rebuild') > -1)) {
        argv.shift(); // remove `rebuild`
        // here we map `node-pre-gyp rebuild` to `node-gyp rebuild` which internally means
        // "clean + configure + build" and triggers a full recompile
        compile.run_gyp(['clean'],{},function(err) {
            if (err) return callback(err);
            configure(gyp,argv,function(err) {
                if (err) return callback(err);
                return do_build(gyp,argv,callback);
            });
        });
    } else {
        return do_build(gyp,argv,callback);        
    }
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/clean.js":
/*!************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/clean.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = clean;

exports.usage = 'Removes the entire folder containing the compiled .node module';

var fs = __webpack_require__(/*! fs */ "fs");
var rm = __webpack_require__(/*! rimraf */ "rimraf");
var exists = __webpack_require__(/*! fs */ "fs").exists || __webpack_require__(/*! path */ "path").exists;
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var path = __webpack_require__(/*! path */ "path");

function clean (gyp, argv, callback) {
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    var to_delete = opts.module_path;
    if (!to_delete) {
        return callback(new Error("module_path is empty, refusing to delete"));
    } else if (path.normalize(to_delete) == path.normalize(process.cwd())) {
        return callback(new Error("module_path is not set, refusing to delete"));
    } else {
        exists(to_delete, function(found) {
            if (found) {
                if (!gyp.opts.silent_clean) console.log('['+package_json.name+'] Removing "%s"', to_delete);
                return rm(to_delete, callback);
            }
            return callback();
        });
    }
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/configure.js":
/*!****************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/configure.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = configure;

exports.usage = 'Attempts to configure node-gyp or nw-gyp build';

var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var compile = __webpack_require__(/*! ./util/compile.js */ "./node_modules/node-pre-gyp/lib/util/compile.js");
var handle_gyp_opts = __webpack_require__(/*! ./util/handle_gyp_opts.js */ "./node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js");

function configure(gyp, argv, callback) {
    handle_gyp_opts(gyp,argv,function(err,result) {
        var final_args = result.gyp.concat(result.pre);
        // pull select node-gyp configure options out of the npm environ
        var known_gyp_args = ['dist-url','python','nodedir','msvs_version'];
        known_gyp_args.forEach(function(key) {
            var val = gyp.opts[key] || gyp.opts[key.replace('-','_')];
            if (val) {
               final_args.push('--'+key+'='+val);
            }
        });
        // --ensure=false tell node-gyp to re-install node development headers
        // but it is only respected by node-gyp install, so we have to call install
        // as a separate step if the user passes it
        if (gyp.opts.ensure === false) {
            var install_args = final_args.concat(['install','--ensure=false']);
            compile.run_gyp(install_args,result.opts,function(err) {
                if (err) return callback(err);
                if (result.unparsed.length > 0) {
                    final_args = final_args.
                                  concat(['--']).
                                  concat(result.unparsed);
                }
                compile.run_gyp(['configure'].concat(final_args),result.opts,function(err) {
                    return callback(err);
                });
            });
        } else {
            if (result.unparsed.length > 0) {
                final_args = final_args.
                              concat(['--']).
                              concat(result.unparsed);
            }
            compile.run_gyp(['configure'].concat(final_args),result.opts,function(err) {
                if (!err && result.opts.napi_build_version) {
                    napi.swap_build_dir_out(result.opts.napi_build_version);
                }
                return callback(err);
            });
        }
    });
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/info.js":
/*!***********************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/info.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = unpublish;

exports.usage = 'Lists all published binaries (requires aws-sdk)';

var fs = __webpack_require__(/*! fs */ "fs");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var s3_setup = __webpack_require__(/*! ./util/s3_setup.js */ "./node_modules/node-pre-gyp/lib/util/s3_setup.js");
var config = __webpack_require__(/*! rc */ "rc")("node_pre_gyp",{acl:"public-read"});

function unpublish(gyp, argv, callback) {
    var AWS = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'aws-sdk'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var opts = versioning.evaluate(package_json, gyp.opts);
    s3_setup.detect(opts.hosted_path,config);
    AWS.config.update(config);
    var s3 =  new AWS.S3();
    var s3_opts = {  Bucket: config.bucket,
                     Prefix: config.prefix
                  };
    s3.listObjects(s3_opts, function(err, meta){
        if (err && err.code == 'NotFound') {
            return callback(new Error('['+package_json.name+'] Not found: https://' + s3_opts.Bucket + '.s3.amazonaws.com/'+config.prefix));
        } else if(err) {
            return callback(err);
        } else {
            log.verbose(JSON.stringify(meta,null,1));
            if (meta && meta.Contents) {
                meta.Contents.forEach(function(obj) {
                    console.log(obj.Key);
                });
            } else {
                console.error('['+package_json.name+'] No objects found at https://' + s3_opts.Bucket + '.s3.amazonaws.com/'+config.prefix );
            }
            return callback();
        }
    });
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/install.js":
/*!**************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/install.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

module.exports = exports = install;

exports.usage = 'Attempts to install pre-built binary for module';

var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
var existsAsync = fs.exists || path.exists;
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var mkdirp = __webpack_require__(/*! mkdirp */ "mkdirp");

var npgVersion = 'unknown';
try {
    // Read own package.json to get the current node-pre-pyp version.
    var ownPackageJSON = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8');
    npgVersion = JSON.parse(ownPackageJSON).version;
} catch (e) {}

var http_get = {
    impl: undefined,
    type: undefined
};

try {
  http_get.impl = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'request'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  http_get.type = 'request';
  log.warn("Using request for node-pre-gyp https download");
} catch (e) {
  http_get.impl = __webpack_require__(/*! needle */ "./node_modules/needle/lib/needle.js");
  http_get.type = 'needle';
  log.warn("Using needle for node-pre-gyp https download");
}

function download(uri,opts,callback) {
    log.http('GET', uri);

    var req = null;

    // Try getting version info from the currently running npm.
    var envVersionInfo = process.env.npm_config_user_agent ||
        'node ' + process.version;

    var requestOpts = {
        uri: uri.replace('+','%2B'),
        headers: {
          'User-Agent': 'node-pre-gyp (v' + npgVersion + ', ' + envVersionInfo + ')'
        },
        follow_max: 10,
    };

    if (opts.cafile) {
        try {
            requestOpts.ca = fs.readFileSync(opts.cafile);
        } catch (e) {
            return callback(e);
        }
    } else if (opts.ca) {
        requestOpts.ca = opts.ca;
    }

    var proxyUrl = opts.proxy ||
                    process.env.http_proxy ||
                    process.env.HTTP_PROXY ||
                    process.env.npm_config_proxy;
    if (proxyUrl) {
      if (/^https?:\/\//i.test(proxyUrl)) {
        log.verbose('download', 'using proxy url: "%s"', proxyUrl);
        requestOpts.proxy = proxyUrl;
      } else {
        log.warn('download', 'ignoring invalid "proxy" config setting: "%s"', proxyUrl);
      }
    }
    try {
        req = http_get.impl.get(requestOpts.uri, requestOpts);
    } catch (e) {
        return callback(e);
    }
    if (req) {
      req.on('response', function (res) {
        log.http(res.statusCode, uri);
      });
    }
    return callback(null,req);
}

function place_binary(from,to,opts,callback) {
    download(from,opts,function(err,req) {
        if (err) return callback(err);
        if (!req) return callback(new Error("empty req"));
        var badDownload = false;
        var hasResponse = false;

        function afterExtract(err, extractCount) {
            if (err) return callback(err);
            if (badDownload) return callback(new Error("bad download"));
            if (extractCount === 0) {
                return callback(new Error('There was a fatal problem while downloading/extracting the tarball'));
            }
            log.info('tarball', 'done parsing tarball');
            callback();
        }

        // for request compatibility
        req.on('error', function(err) {
            badDownload = true;
            if (!hasResponse) {
                hasResponse = true;
                return callback(err);
            }
        });

        // for needle compatibility
        req.on('err', function(err) {
            badDownload = true;
            if (!hasResponse) {
                hasResponse = true;
                return callback(err);
            }
        });

        req.on('close', function () {
            if (!hasResponse) {
                hasResponse = true;
                return callback(new Error('Connection closed while downloading tarball file'));
            }
        });

      req.on('response', function(res) {
            // ignore redirects, needle handles these automatically.
            if (http_get.type === 'needle' && res.headers.hasOwnProperty('location') && res.headers.location !== '') {
                return;
            }
            if (hasResponse) {
                return;
            }
            hasResponse = true;
            if (res.statusCode !== 200) {
                badDownload = true;
                var err = new Error(res.statusCode + ' status code downloading tarball ' + from);
                err.statusCode = res.statusCode;
                return callback(err);
            }
            // start unzipping and untaring
            req.pipe(extract(to, afterExtract));
        });
    });
}

function extract_from_local(from, to, callback) {
    if (!fs.existsSync(from)) {
        return callback(new Error('Cannot find file ' + from));
    }
    log.info('Found local file to extract from ' + from);
    function afterExtract(err, extractCount) {
        if (err) return callback(err);
        if (extractCount === 0) {
            return callback(new Error('There was a fatal problem while extracting the tarball'));
        }
        log.info('tarball', 'done parsing tarball');
        callback();
    }
    fs.createReadStream(from).pipe(extract(to, afterExtract));
}

function extract(to, callback) {
    var extractCount = 0;
    function filter_func(entry) {
        log.info('install','unpacking ' + entry.path);
        extractCount++;
    }

    function afterTarball(err) {
        callback(err, extractCount);
    }

    var tar = __webpack_require__(/*! tar */ "./node_modules/tar/index.js");
    return tar.extract({
        cwd: to,
        strip: 1,
        onentry: filter_func
    }).on('close', afterTarball).on('error', callback);
}


function do_build(gyp,argv,callback) {
  var args = ['rebuild'].concat(argv);
  gyp.todo.push( { name: 'build', args: args } );
  process.nextTick(callback);
}

function print_fallback_error(err,opts,package_json) {
    var fallback_message = ' (falling back to source compile with node-gyp)';
    var full_message = '';
    if (err.statusCode !== undefined) {
        // If we got a network response it but failed to download
        // it means remote binaries are not available, so let's try to help
        // the user/developer with the info to debug why
        full_message = "Pre-built binaries not found for " + package_json.name + "@" + package_json.version;
        full_message += " and " + opts.runtime + "@" + (opts.target || process.versions.node) + " (" + opts.node_abi + " ABI, " + opts.libc + ")";
        full_message += fallback_message;
        log.warn("Tried to download(" + err.statusCode + "): " + opts.hosted_tarball);
        log.warn(full_message);
        log.http(err.message);
    } else {
        // If we do not have a statusCode that means an unexpected error
        // happened and prevented an http response, so we output the exact error
        full_message = "Pre-built binaries not installable for " + package_json.name + "@" + package_json.version;
        full_message += " and " + opts.runtime + "@" + (opts.target || process.versions.node) + " (" + opts.node_abi + " ABI, " + opts.libc + ")";
        full_message += fallback_message;
        log.warn(full_message);
        log.warn("Hit error " + err.message);
    }
}

function install(gyp, argv, callback) {
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
	var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var source_build = gyp.opts['build-from-source'] || gyp.opts.build_from_source;
    var update_binary = gyp.opts['update-binary'] || gyp.opts.update_binary;
    var should_do_source_build = source_build === package_json.name || (source_build === true || source_build === 'true');
    if (should_do_source_build) {
        log.info('build','requesting source compile');
        return do_build(gyp,argv,callback);
    } else {
        var fallback_to_build = gyp.opts['fallback-to-build'] || gyp.opts.fallback_to_build;
        var should_do_fallback_build = fallback_to_build === package_json.name || (fallback_to_build === true || fallback_to_build === 'true');
        // but allow override from npm
        if (process.env.npm_config_argv) {
            var cooked = JSON.parse(process.env.npm_config_argv).cooked;
            var match = cooked.indexOf("--fallback-to-build");
            if (match > -1 && cooked.length > match && cooked[match+1] == "false") {
                should_do_fallback_build = false;
                log.info('install','Build fallback disabled via npm flag: --fallback-to-build=false');
            }
        }
        var opts;
        try {
            opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
        } catch (err) {
            return callback(err);
        }

        opts.ca = gyp.opts.ca;
        opts.cafile = gyp.opts.cafile;

        var from = opts.hosted_tarball;
        var to = opts.module_path;
        var binary_module = path.join(to,opts.module_name + '.node');
        existsAsync(binary_module,function(found) {
            if (found && !update_binary) {
                console.log('['+package_json.name+'] Success: "' + binary_module + '" already installed');
                console.log('Pass --update-binary to reinstall or --build-from-source to recompile');
                return callback();
            } else {
                if (!update_binary) log.info('check','checked for "' + binary_module + '" (not found)');
                mkdirp(to,function(err) {
                    if (err) {
                        after_place(err);
                    } else {
                        var fileName = from.startsWith('file://') && from.replace(/^file:\/\//, '');
                        if (fileName) {
                            extract_from_local(fileName, to, after_place);
                        } else {
                            place_binary(from,to,opts,after_place);
                        }
                    }
                });
            }
            function after_place(err) {
                if (err && should_do_fallback_build) {
                    print_fallback_error(err,opts,package_json);
                    return do_build(gyp,argv,callback);
                } else if (err) {
                    return callback(err);
                } else {
                    console.log('['+package_json.name+'] Success: "' + binary_module + '" is installed via remote');
                    return callback();
                }
            }
        });
    }
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/node-pre-gyp.js":
/*!*******************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/node-pre-gyp.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

/**
 * Module exports.
 */

module.exports = exports;

/**
 * Module dependencies.
 */

var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var nopt = __webpack_require__(/*! nopt */ "nopt");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
log.disableProgress();
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");

var EE = __webpack_require__(/*! events */ "events").EventEmitter;
var inherits = __webpack_require__(/*! util */ "util").inherits;
var commands = [
      'clean',
      'install',
      'reinstall',
      'build',
      'rebuild',
      'package',
      'testpackage',
      'publish',
      'unpublish',
      'info',
      'testbinary',
      'reveal',
      'configure'
    ];
var aliases = {};

// differentiate node-pre-gyp's logs from npm's
log.heading = 'node-pre-gyp';

exports.find = __webpack_require__(/*! ./pre-binding */ "./node_modules/node-pre-gyp/lib/pre-binding.js").find;

function Run() {
  var self = this;

  this.commands = {};

  commands.forEach(function (command) {
    self.commands[command] = function (argv, callback) {
      log.verbose('command', command, argv);
      return __webpack_require__("./node_modules/node-pre-gyp/lib sync recursive ^\\.\\/.*$")("./" + command)(self, argv, callback);
    };
  });
}
inherits(Run, EE);
exports.Run = Run;
var proto = Run.prototype;

/**
 * Export the contents of the package.json.
 */

proto.package = __webpack_require__(/*! ../package.json */ "./node_modules/node-pre-gyp/package.json");

/**
 * nopt configuration definitions
 */

proto.configDefs = {
    help: Boolean,     // everywhere
    arch: String,      // 'configure'
    debug: Boolean,    // 'build'
    directory: String, // bin
    proxy: String,     // 'install'
    loglevel: String,  // everywhere
};

/**
 * nopt shorthands
 */

proto.shorthands = {
    release: '--no-debug',
    C: '--directory',
    debug: '--debug',
    j: '--jobs',
    silent: '--loglevel=silent',
    silly: '--loglevel=silly',
    verbose: '--loglevel=verbose',
};

/**
 * expose the command aliases for the bin file to use.
 */

proto.aliases = aliases;

/**
 * Parses the given argv array and sets the 'opts',
 * 'argv' and 'command' properties.
 */

proto.parseArgv = function parseOpts (argv) {
  this.opts = nopt(this.configDefs, this.shorthands, argv);
  this.argv = this.opts.argv.remain.slice();
  var commands = this.todo = [];

  // create a copy of the argv array with aliases mapped
  argv = this.argv.map(function (arg) {
    // is this an alias?
    if (arg in this.aliases) {
      arg = this.aliases[arg];
    }
    return arg;
  }, this);

  // process the mapped args into "command" objects ("name" and "args" props)
  argv.slice().forEach(function (arg) {
    if (arg in this.commands) {
      var args = argv.splice(0, argv.indexOf(arg));
      argv.shift();
      if (commands.length > 0) {
        commands[commands.length - 1].args = args;
      }
      commands.push({ name: arg, args: [] });
    }
  }, this);
  if (commands.length > 0) {
    commands[commands.length - 1].args = argv.splice(0);
  }

  // expand commands entries for multiple napi builds
  var dir = this.opts.directory;
  if (dir == null) dir = process.cwd();
  var package_json = JSON.parse(fs.readFileSync(path.join(dir,'package.json')));

  this.todo = napi.expand_commands (package_json, this.opts, commands);

  // support for inheriting config env variables from npm
  var npm_config_prefix = 'npm_config_';
  Object.keys(process.env).forEach(function (name) {
    if (name.indexOf(npm_config_prefix) !== 0) return;
    var val = process.env[name];
    if (name === npm_config_prefix + 'loglevel') {
      log.level = val;
    } else {
      // add the user-defined options to the config
      name = name.substring(npm_config_prefix.length);
      // avoid npm argv clobber already present args
      // which avoids problem of 'npm test' calling
      // script that runs unique npm install commands
      if (name === 'argv') {
         if (this.opts.argv &&
             this.opts.argv.remain &&
             this.opts.argv.remain.length) {
            // do nothing
         } else {
            this.opts[name] = val;
         }
      } else {
        this.opts[name] = val;
      }
    }
  }, this);

  if (this.opts.loglevel) {
    log.level = this.opts.loglevel;
  }
  log.resume();
};

/**
 * Returns the usage instructions for node-pre-gyp.
 */

proto.usage = function usage () {
  var str = [
      '',
      '  Usage: node-pre-gyp <command> [options]',
      '',
      '  where <command> is one of:',
      commands.map(function (c) {
        return '    - ' + c + ' - ' + __webpack_require__("./node_modules/node-pre-gyp/lib sync recursive ^\\.\\/.*$")("./" + c).usage;
      }).join('\n'),
      '',
      'node-pre-gyp@' + this.version + '  ' + path.resolve(__dirname, '..'),
      'node@' + process.versions.node
  ].join('\n');
  return str;
};

/**
 * Version number getter.
 */

Object.defineProperty(proto, 'version', {
    get: function () {
      return this.package.version;
    },
    enumerable: true
});


/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/package.js":
/*!**************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/package.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = _package;

exports.usage = 'Packs binary (and enclosing directory) into locally staged tarball';

var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var write = __webpack_require__(/*! fs */ "fs").createWriteStream;
var existsAsync = fs.exists || path.exists;
var mkdirp = __webpack_require__(/*! mkdirp */ "mkdirp");
var tar = __webpack_require__(/*! tar */ "./node_modules/tar/index.js");

function _package(gyp, argv, callback) {
    var packlist = __webpack_require__(/*! npm-packlist */ "./node_modules/npm-packlist/index.js");
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    var from = opts.module_path;
    var binary_module = path.join(from,opts.module_name + '.node');
    existsAsync(binary_module,function(found) {
        if (!found) {
            return callback(new Error("Cannot package because " + binary_module + " missing: run `node-pre-gyp rebuild` first"));
        }
        var tarball = opts.staged_tarball;
        var filter_func = function(entry) {
            // ensure directories are +x
            // https://github.com/mapnik/node-mapnik/issues/262
            log.info('package','packing ' + entry.path);
            return true;
        };
        mkdirp(path.dirname(tarball),function(err) {
            if (err) return callback(err);
            packlist({ path: from }).then(function(files) {
                var base = path.basename(from);
                files = files.map(function(file) {
                    return path.join(base, file);
                });
                tar.create({
                    portable: true,
                    gzip: true,
                    onentry: filter_func,
                    file: tarball,
                    cwd: path.dirname(from)
                }, files, function(err) {
                    if (err)  console.error('['+package_json.name+'] ' + err.message);
                    else log.info('package','Binary staged at "' + tarball + '"');
                    return callback(err);
                });
            }, callback);
        });
    });
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/pre-binding.js":
/*!******************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/pre-binding.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var versioning = __webpack_require__(/*! ../lib/util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ../lib/util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var existsSync = __webpack_require__(/*! fs */ "fs").existsSync || __webpack_require__(/*! path */ "path").existsSync;
var path = __webpack_require__(/*! path */ "path");

module.exports = exports;

exports.usage = 'Finds the require path for the node-pre-gyp installed module';

exports.validate = function(package_json,opts) {
    versioning.validate_config(package_json,opts);
};

exports.find = function(package_json_path,opts) {
   if (!existsSync(package_json_path)) {
        throw new Error("package.json does not exist at " + package_json_path);
   }
   var package_json = __webpack_require__("./node_modules/node-pre-gyp/lib sync recursive")(package_json_path);
   versioning.validate_config(package_json,opts);
   var napi_build_version;
   if (napi.get_napi_build_versions (package_json, opts)) {
       napi_build_version = napi.get_best_napi_build_version(package_json, opts);
   }
   opts = opts || {};
   if (!opts.module_root) opts.module_root = path.dirname(package_json_path);
   var meta = versioning.evaluate(package_json,opts,napi_build_version);
   return meta.module;
};


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/publish.js":
/*!**************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/publish.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = publish;

exports.usage = 'Publishes pre-built binary (requires aws-sdk)';

var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var s3_setup = __webpack_require__(/*! ./util/s3_setup.js */ "./node_modules/node-pre-gyp/lib/util/s3_setup.js");
var existsAsync = fs.exists || path.exists;
var url = __webpack_require__(/*! url */ "url");
var config = __webpack_require__(/*! rc */ "rc")("node_pre_gyp",{acl:"public-read"});

function publish(gyp, argv, callback) {
    var AWS = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'aws-sdk'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    var tarball = opts.staged_tarball;
    existsAsync(tarball,function(found) {
        if (!found) {
            return callback(new Error("Cannot publish because " + tarball + " missing: run `node-pre-gyp package` first"));
        }
        log.info('publish', 'Detecting s3 credentials');
        s3_setup.detect(opts.hosted_path,config);
        var key_name = url.resolve(config.prefix,opts.package_name);
        log.info('publish', 'Authenticating with s3');
        AWS.config.update(config);
        var s3 =  new AWS.S3();
        var s3_opts = {  Bucket: config.bucket,
                         Key: key_name
                      };
        var remote_package = 'https://' + s3_opts.Bucket + '.s3.amazonaws.com/' + s3_opts.Key;
        log.info('publish', 'Checking for existing binary at ' + remote_package);
        s3.headObject(s3_opts, function(err, meta){
            if (meta) log.info('publish', JSON.stringify(meta));
            if (err && err.code == 'NotFound') {
                // we are safe to publish because
                // the object does not already exist
                log.info('publish', 'Preparing to put object');
                var s3_put = new AWS.S3();
                var s3_put_opts = {  ACL: config.acl,
                                     Body: fs.createReadStream(tarball),
                                     Bucket: config.bucket,
                                     Key: key_name
                                  };
                log.info('publish', 'Putting object');
                try {
                    s3_put.putObject(s3_put_opts, function(err, resp){
                        log.info('publish', 'returned from putting object');
                        if(err) {
                           log.info('publish', 's3 putObject error: "' + err + '"');
                           return callback(err);
                        }
                        if (resp) log.info('publish', 's3 putObject response: "' + JSON.stringify(resp) + '"');
                        log.info('publish', 'successfully put object');
                        console.log('['+package_json.name+'] published to ' + remote_package);
                        return callback();
                    });
              } catch (err) {
                   log.info('publish', 's3 putObject error: "' + err + '"');
                   return callback(err);
              }
            } else if (err) {
                log.info('publish', 's3 headObject error: "' + err + '"');
                return callback(err);
            } else {
                log.error('publish','Cannot publish over existing version');
                log.error('publish',"Update the 'version' field in package.json and try again");
                log.error('publish','If the previous version was published in error see:');
                log.error('publish','\t node-pre-gyp unpublish');
                return callback(new Error('Failed publishing to ' + remote_package));
            }
        });
    });
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/rebuild.js":
/*!**************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/rebuild.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = rebuild;

exports.usage = 'Runs "clean" and "build" at once';

var fs = __webpack_require__(/*! fs */ "fs");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");

function rebuild (gyp, argv, callback) {
  var package_json = JSON.parse(fs.readFileSync('./package.json'));
  var commands = [
    { name: 'clean', args: [] },
    { name: 'build', args: ['rebuild'] }
    ];
  commands = napi.expand_commands(package_json, gyp.opts, commands);
  for (var i = commands.length; i !== 0; i--) {
    gyp.todo.unshift(commands[i-1]);
  }
  process.nextTick(callback);
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/reinstall.js":
/*!****************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/reinstall.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = rebuild;

exports.usage = 'Runs "clean" and "install" at once';

var fs = __webpack_require__(/*! fs */ "fs");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");

function rebuild (gyp, argv, callback) {
  var package_json = JSON.parse(fs.readFileSync('./package.json'));
  var installArgs = [];
  var napi_build_version = napi.get_best_napi_build_version(package_json, gyp.opts);
  if (napi_build_version != null) installArgs = [ napi.get_command_arg (napi_build_version) ];
  gyp.todo.unshift(
      { name: 'clean', args: [] },
      { name: 'install', args: installArgs }
  );
  process.nextTick(callback);
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/reveal.js":
/*!*************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/reveal.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = reveal;

exports.usage = 'Reveals data on the versioned binary';

var fs = __webpack_require__(/*! fs */ "fs");
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");

function unix_paths(key, val) {
    return val && val.replace ? val.replace(/\\/g, '/') : val;
}

function reveal(gyp, argv, callback) {
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    var hit = false;
    // if a second arg is passed look to see
    // if it is a known option
    //console.log(JSON.stringify(gyp.opts,null,1))
    var remain = gyp.opts.argv.remain[gyp.opts.argv.remain.length-1];
    if (remain && opts.hasOwnProperty(remain)) {
        console.log(opts[remain].replace(/\\/g, '/'));
        hit = true;
    }
    // otherwise return all options as json
    if (!hit) {
        console.log(JSON.stringify(opts,unix_paths,2));
    }
    return callback();
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/testbinary.js":
/*!*****************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/testbinary.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

module.exports = exports = testbinary;

exports.usage = 'Tests that the binary.node can be required';

var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
var cp = __webpack_require__(/*! child_process */ "child_process");
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var path = __webpack_require__(/*! path */ "path");

function testbinary(gyp, argv, callback) {
    var args = [];
    var options = {};
    var shell_cmd = process.execPath;
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    // skip validation for runtimes we don't explicitly support (like electron)
    if (opts.runtime &&
        opts.runtime !== 'node-webkit' &&
        opts.runtime !== 'node') {
        return callback();
    }
    var nw = (opts.runtime && opts.runtime === 'node-webkit');
    // ensure on windows that / are used for require path
    var binary_module = opts.module.replace(/\\/g, '/');
    if ((process.arch != opts.target_arch) ||
        (process.platform != opts.target_platform)) {
        var msg = "skipping validation since host platform/arch (";
        msg += process.platform+'/'+process.arch+")";
        msg += " does not match target (";
        msg += opts.target_platform+'/'+opts.target_arch+")";
        log.info('validate', msg);
        return callback();
    }
    if (nw) {
        options.timeout = 5000;
        if (process.platform === 'darwin') {
            shell_cmd = 'node-webkit';
        } else if (process.platform === 'win32') {
            shell_cmd = 'nw.exe';
        } else {
            shell_cmd = 'nw';
        }
        var modulePath = path.resolve(binary_module);
        var appDir = path.join(__dirname, 'util', 'nw-pre-gyp');
        args.push(appDir);
        args.push(modulePath);
        log.info("validate","Running test command: '" + shell_cmd + ' ' + args.join(' ') + "'");
        cp.execFile(shell_cmd, args, options, function(err, stdout, stderr) {
            // check for normal timeout for node-webkit
            if (err) {
                if (err.killed === true && err.signal && err.signal.indexOf('SIG') > -1) {
                    return callback();
                }
                var stderrLog = stderr.toString();
                log.info('stderr', stderrLog);
                if( /^\s*Xlib:\s*extension\s*"RANDR"\s*missing\s*on\s*display\s*":\d+\.\d+"\.\s*$/.test(stderrLog) ){
                    log.info('RANDR', 'stderr contains only RANDR error, ignored');
                    return callback();
                }
                return callback(err);
            }
            return callback();
        });
        return;
    }
    args.push('--eval');
    args.push("require('" + binary_module.replace(/'/g, '\'') +"')");
    log.info("validate","Running test command: '" + shell_cmd + ' ' + args.join(' ') + "'");
    cp.execFile(shell_cmd, args, options, function(err, stdout, stderr) {
        if (err) {
            return callback(err, { stdout:stdout, stderr:stderr});
        }
        return callback();
    });
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/testpackage.js":
/*!******************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/testpackage.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = testpackage;

exports.usage = 'Tests that the staged package is valid';

var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
var existsAsync = fs.exists || path.exists;
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var testbinary = __webpack_require__(/*! ./testbinary.js */ "./node_modules/node-pre-gyp/lib/testbinary.js");
var tar = __webpack_require__(/*! tar */ "./node_modules/tar/index.js");
var mkdirp = __webpack_require__(/*! mkdirp */ "mkdirp");

function testpackage(gyp, argv, callback) {
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    var tarball = opts.staged_tarball;
    existsAsync(tarball, function(found) {
        if (!found) {
            return callback(new Error("Cannot test package because " + tarball + " missing: run `node-pre-gyp package` first"));
        }
        var to = opts.module_path;
        function filter_func(entry) {
            log.info('install','unpacking [' + entry.path + ']');
        }

        mkdirp(to, function(err) {
            if (err) {
                return callback(err);
            } else {
                tar.extract({
                    file: tarball,
                    cwd: to,
                    strip: 1,
                    onentry: filter_func
                }).then(after_extract, callback);
            }
        });

        function after_extract() {
            testbinary(gyp,argv,function(err) {
                if (err) {
                    return callback(err);
                } else {
                    console.log('['+package_json.name+'] Package appears valid');
                    return callback();
                }
            });
        }
    });
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/unpublish.js":
/*!****************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/unpublish.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = unpublish;

exports.usage = 'Unpublishes pre-built binary (requires aws-sdk)';

var fs = __webpack_require__(/*! fs */ "fs");
var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
var versioning = __webpack_require__(/*! ./util/versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./util/napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");
var s3_setup = __webpack_require__(/*! ./util/s3_setup.js */ "./node_modules/node-pre-gyp/lib/util/s3_setup.js");
var url = __webpack_require__(/*! url */ "url");
var config = __webpack_require__(/*! rc */ "rc")("node_pre_gyp",{acl:"public-read"});

function unpublish(gyp, argv, callback) {
    var AWS = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'aws-sdk'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    s3_setup.detect(opts.hosted_path,config);
    AWS.config.update(config);
    var key_name = url.resolve(config.prefix,opts.package_name);
    var s3 =  new AWS.S3();
    var s3_opts = {  Bucket: config.bucket,
                     Key: key_name
                  };
    s3.headObject(s3_opts, function(err, meta) {
        if (err && err.code == 'NotFound') {
            console.log('['+package_json.name+'] Not found: https://' + s3_opts.Bucket + '.s3.amazonaws.com/' + s3_opts.Key);
            return callback();
        } else if(err) {
            return callback(err);
        } else {
            log.info('unpublish', JSON.stringify(meta));
            s3.deleteObject(s3_opts, function(err, resp) {
                if (err) return callback(err);
                log.info(JSON.stringify(resp));
                console.log('['+package_json.name+'] Success: removed https://' + s3_opts.Bucket + '.s3.amazonaws.com/' + s3_opts.Key);
                return callback();
            });
        }
    });
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util sync recursive":
/*!*************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util sync ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/node-pre-gyp/lib/util sync recursive";

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/abi_crosswalk.json":
/*!***************************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/abi_crosswalk.json ***!
  \***************************************************************/
/*! exports provided: 0.1.14, 0.1.15, 0.1.16, 0.1.17, 0.1.18, 0.1.19, 0.1.20, 0.1.21, 0.1.22, 0.1.23, 0.1.24, 0.1.25, 0.1.26, 0.1.27, 0.1.28, 0.1.29, 0.1.30, 0.1.31, 0.1.32, 0.1.33, 0.1.90, 0.1.91, 0.1.92, 0.1.93, 0.1.94, 0.1.95, 0.1.96, 0.1.97, 0.1.98, 0.1.99, 0.1.100, 0.1.101, 0.1.102, 0.1.103, 0.1.104, 0.2.0, 0.2.1, 0.2.2, 0.2.3, 0.2.4, 0.2.5, 0.2.6, 0.3.0, 0.3.1, 0.3.2, 0.3.3, 0.3.4, 0.3.5, 0.3.6, 0.3.7, 0.3.8, 0.4.0, 0.4.1, 0.4.2, 0.4.3, 0.4.4, 0.4.5, 0.4.6, 0.4.7, 0.4.8, 0.4.9, 0.4.10, 0.4.11, 0.4.12, 0.5.0, 0.5.1, 0.5.2, 0.5.3, 0.5.4, 0.5.5, 0.5.6, 0.5.7, 0.5.8, 0.5.9, 0.5.10, 0.6.0, 0.6.1, 0.6.2, 0.6.3, 0.6.4, 0.6.5, 0.6.6, 0.6.7, 0.6.8, 0.6.9, 0.6.10, 0.6.11, 0.6.12, 0.6.13, 0.6.14, 0.6.15, 0.6.16, 0.6.17, 0.6.18, 0.6.19, 0.6.20, 0.6.21, 0.7.0, 0.7.1, 0.7.2, 0.7.3, 0.7.4, 0.7.5, 0.7.6, 0.7.7, 0.7.8, 0.7.9, 0.7.10, 0.7.11, 0.7.12, 0.8.0, 0.8.1, 0.8.2, 0.8.3, 0.8.4, 0.8.5, 0.8.6, 0.8.7, 0.8.8, 0.8.9, 0.8.10, 0.8.11, 0.8.12, 0.8.13, 0.8.14, 0.8.15, 0.8.16, 0.8.17, 0.8.18, 0.8.19, 0.8.20, 0.8.21, 0.8.22, 0.8.23, 0.8.24, 0.8.25, 0.8.26, 0.8.27, 0.8.28, 0.9.0, 0.9.1, 0.9.2, 0.9.3, 0.9.4, 0.9.5, 0.9.6, 0.9.7, 0.9.8, 0.9.9, 0.9.10, 0.9.11, 0.9.12, 0.10.0, 0.10.1, 0.10.2, 0.10.3, 0.10.4, 0.10.5, 0.10.6, 0.10.7, 0.10.8, 0.10.9, 0.10.10, 0.10.11, 0.10.12, 0.10.13, 0.10.14, 0.10.15, 0.10.16, 0.10.17, 0.10.18, 0.10.19, 0.10.20, 0.10.21, 0.10.22, 0.10.23, 0.10.24, 0.10.25, 0.10.26, 0.10.27, 0.10.28, 0.10.29, 0.10.30, 0.10.31, 0.10.32, 0.10.33, 0.10.34, 0.10.35, 0.10.36, 0.10.37, 0.10.38, 0.10.39, 0.10.40, 0.10.41, 0.10.42, 0.10.43, 0.10.44, 0.10.45, 0.10.46, 0.10.47, 0.10.48, 0.11.0, 0.11.1, 0.11.2, 0.11.3, 0.11.4, 0.11.5, 0.11.6, 0.11.7, 0.11.8, 0.11.9, 0.11.10, 0.11.11, 0.11.12, 0.11.13, 0.11.14, 0.11.15, 0.11.16, 0.12.0, 0.12.1, 0.12.2, 0.12.3, 0.12.4, 0.12.5, 0.12.6, 0.12.7, 0.12.8, 0.12.9, 0.12.10, 0.12.11, 0.12.12, 0.12.13, 0.12.14, 0.12.15, 0.12.16, 0.12.17, 0.12.18, 1.0.0, 1.0.1, 1.0.2, 1.0.3, 1.0.4, 1.1.0, 1.2.0, 1.3.0, 1.4.1, 1.4.2, 1.4.3, 1.5.0, 1.5.1, 1.6.0, 1.6.1, 1.6.2, 1.6.3, 1.6.4, 1.7.1, 1.8.1, 1.8.2, 1.8.3, 1.8.4, 2.0.0, 2.0.1, 2.0.2, 2.1.0, 2.2.0, 2.2.1, 2.3.0, 2.3.1, 2.3.2, 2.3.3, 2.3.4, 2.4.0, 2.5.0, 3.0.0, 3.1.0, 3.2.0, 3.3.0, 3.3.1, 4.0.0, 4.1.0, 4.1.1, 4.1.2, 4.2.0, 4.2.1, 4.2.2, 4.2.3, 4.2.4, 4.2.5, 4.2.6, 4.3.0, 4.3.1, 4.3.2, 4.4.0, 4.4.1, 4.4.2, 4.4.3, 4.4.4, 4.4.5, 4.4.6, 4.4.7, 4.5.0, 4.6.0, 4.6.1, 4.6.2, 4.7.0, 4.7.1, 4.7.2, 4.7.3, 4.8.0, 4.8.1, 4.8.2, 4.8.3, 4.8.4, 4.8.5, 4.8.6, 4.8.7, 4.9.0, 4.9.1, 5.0.0, 5.1.0, 5.1.1, 5.2.0, 5.3.0, 5.4.0, 5.4.1, 5.5.0, 5.6.0, 5.7.0, 5.7.1, 5.8.0, 5.9.0, 5.9.1, 5.10.0, 5.10.1, 5.11.0, 5.11.1, 5.12.0, 6.0.0, 6.1.0, 6.2.0, 6.2.1, 6.2.2, 6.3.0, 6.3.1, 6.4.0, 6.5.0, 6.6.0, 6.7.0, 6.8.0, 6.8.1, 6.9.0, 6.9.1, 6.9.2, 6.9.3, 6.9.4, 6.9.5, 6.10.0, 6.10.1, 6.10.2, 6.10.3, 6.11.0, 6.11.1, 6.11.2, 6.11.3, 6.11.4, 6.11.5, 6.12.0, 6.12.1, 6.12.2, 6.12.3, 6.13.0, 6.13.1, 6.14.0, 6.14.1, 6.14.2, 6.14.3, 6.14.4, 6.15.0, 6.15.1, 6.16.0, 6.17.0, 6.17.1, 7.0.0, 7.1.0, 7.2.0, 7.2.1, 7.3.0, 7.4.0, 7.5.0, 7.6.0, 7.7.0, 7.7.1, 7.7.2, 7.7.3, 7.7.4, 7.8.0, 7.9.0, 7.10.0, 7.10.1, 8.0.0, 8.1.0, 8.1.1, 8.1.2, 8.1.3, 8.1.4, 8.2.0, 8.2.1, 8.3.0, 8.4.0, 8.5.0, 8.6.0, 8.7.0, 8.8.0, 8.8.1, 8.9.0, 8.9.1, 8.9.2, 8.9.3, 8.9.4, 8.10.0, 8.11.0, 8.11.1, 8.11.2, 8.11.3, 8.11.4, 8.12.0, 8.13.0, 8.14.0, 8.14.1, 8.15.0, 8.15.1, 8.16.0, 8.16.1, 8.16.2, 8.17.0, 9.0.0, 9.1.0, 9.2.0, 9.2.1, 9.3.0, 9.4.0, 9.5.0, 9.6.0, 9.6.1, 9.7.0, 9.7.1, 9.8.0, 9.9.0, 9.10.0, 9.10.1, 9.11.0, 9.11.1, 9.11.2, 10.0.0, 10.1.0, 10.2.0, 10.2.1, 10.3.0, 10.4.0, 10.4.1, 10.5.0, 10.6.0, 10.7.0, 10.8.0, 10.9.0, 10.10.0, 10.11.0, 10.12.0, 10.13.0, 10.14.0, 10.14.1, 10.14.2, 10.15.0, 10.15.1, 10.15.2, 10.15.3, 10.16.0, 10.16.1, 10.16.2, 10.16.3, 10.17.0, 10.18.0, 10.18.1, 10.19.0, 10.20.0, 10.20.1, 11.0.0, 11.1.0, 11.2.0, 11.3.0, 11.4.0, 11.5.0, 11.6.0, 11.7.0, 11.8.0, 11.9.0, 11.10.0, 11.10.1, 11.11.0, 11.12.0, 11.13.0, 11.14.0, 11.15.0, 12.0.0, 12.1.0, 12.2.0, 12.3.0, 12.3.1, 12.4.0, 12.5.0, 12.6.0, 12.7.0, 12.8.0, 12.8.1, 12.9.0, 12.9.1, 12.10.0, 12.11.0, 12.11.1, 12.12.0, 12.13.0, 12.13.1, 12.14.0, 12.14.1, 12.15.0, 12.16.0, 12.16.1, 12.16.2, 12.16.3, 13.0.0, 13.0.1, 13.1.0, 13.2.0, 13.3.0, 13.4.0, 13.5.0, 13.6.0, 13.7.0, 13.8.0, 13.9.0, 13.10.0, 13.10.1, 13.11.0, 13.12.0, 13.13.0, 13.14.0, 14.0.0, 14.1.0, 14.2.0, 14.3.0, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"0.1.14\":{\"node_abi\":null,\"v8\":\"1.3\"},\"0.1.15\":{\"node_abi\":null,\"v8\":\"1.3\"},\"0.1.16\":{\"node_abi\":null,\"v8\":\"1.3\"},\"0.1.17\":{\"node_abi\":null,\"v8\":\"1.3\"},\"0.1.18\":{\"node_abi\":null,\"v8\":\"1.3\"},\"0.1.19\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.20\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.21\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.22\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.23\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.24\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.25\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.26\":{\"node_abi\":null,\"v8\":\"2.0\"},\"0.1.27\":{\"node_abi\":null,\"v8\":\"2.1\"},\"0.1.28\":{\"node_abi\":null,\"v8\":\"2.1\"},\"0.1.29\":{\"node_abi\":null,\"v8\":\"2.1\"},\"0.1.30\":{\"node_abi\":null,\"v8\":\"2.1\"},\"0.1.31\":{\"node_abi\":null,\"v8\":\"2.1\"},\"0.1.32\":{\"node_abi\":null,\"v8\":\"2.1\"},\"0.1.33\":{\"node_abi\":null,\"v8\":\"2.1\"},\"0.1.90\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.91\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.92\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.93\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.94\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.95\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.96\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.97\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.98\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.99\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.100\":{\"node_abi\":null,\"v8\":\"2.2\"},\"0.1.101\":{\"node_abi\":null,\"v8\":\"2.3\"},\"0.1.102\":{\"node_abi\":null,\"v8\":\"2.3\"},\"0.1.103\":{\"node_abi\":null,\"v8\":\"2.3\"},\"0.1.104\":{\"node_abi\":null,\"v8\":\"2.3\"},\"0.2.0\":{\"node_abi\":1,\"v8\":\"2.3\"},\"0.2.1\":{\"node_abi\":1,\"v8\":\"2.3\"},\"0.2.2\":{\"node_abi\":1,\"v8\":\"2.3\"},\"0.2.3\":{\"node_abi\":1,\"v8\":\"2.3\"},\"0.2.4\":{\"node_abi\":1,\"v8\":\"2.3\"},\"0.2.5\":{\"node_abi\":1,\"v8\":\"2.3\"},\"0.2.6\":{\"node_abi\":1,\"v8\":\"2.3\"},\"0.3.0\":{\"node_abi\":1,\"v8\":\"2.5\"},\"0.3.1\":{\"node_abi\":1,\"v8\":\"2.5\"},\"0.3.2\":{\"node_abi\":1,\"v8\":\"3.0\"},\"0.3.3\":{\"node_abi\":1,\"v8\":\"3.0\"},\"0.3.4\":{\"node_abi\":1,\"v8\":\"3.0\"},\"0.3.5\":{\"node_abi\":1,\"v8\":\"3.0\"},\"0.3.6\":{\"node_abi\":1,\"v8\":\"3.0\"},\"0.3.7\":{\"node_abi\":1,\"v8\":\"3.0\"},\"0.3.8\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.0\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.1\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.2\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.3\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.4\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.5\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.6\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.7\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.8\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.9\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.10\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.11\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.4.12\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.5.0\":{\"node_abi\":1,\"v8\":\"3.1\"},\"0.5.1\":{\"node_abi\":1,\"v8\":\"3.4\"},\"0.5.2\":{\"node_abi\":1,\"v8\":\"3.4\"},\"0.5.3\":{\"node_abi\":1,\"v8\":\"3.4\"},\"0.5.4\":{\"node_abi\":1,\"v8\":\"3.5\"},\"0.5.5\":{\"node_abi\":1,\"v8\":\"3.5\"},\"0.5.6\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.5.7\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.5.8\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.5.9\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.5.10\":{\"node_abi\":1,\"v8\":\"3.7\"},\"0.6.0\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.1\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.2\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.3\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.4\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.5\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.6\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.7\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.8\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.9\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.10\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.11\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.12\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.13\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.14\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.15\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.16\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.17\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.18\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.19\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.20\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.6.21\":{\"node_abi\":1,\"v8\":\"3.6\"},\"0.7.0\":{\"node_abi\":1,\"v8\":\"3.8\"},\"0.7.1\":{\"node_abi\":1,\"v8\":\"3.8\"},\"0.7.2\":{\"node_abi\":1,\"v8\":\"3.8\"},\"0.7.3\":{\"node_abi\":1,\"v8\":\"3.9\"},\"0.7.4\":{\"node_abi\":1,\"v8\":\"3.9\"},\"0.7.5\":{\"node_abi\":1,\"v8\":\"3.9\"},\"0.7.6\":{\"node_abi\":1,\"v8\":\"3.9\"},\"0.7.7\":{\"node_abi\":1,\"v8\":\"3.9\"},\"0.7.8\":{\"node_abi\":1,\"v8\":\"3.9\"},\"0.7.9\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.7.10\":{\"node_abi\":1,\"v8\":\"3.9\"},\"0.7.11\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.7.12\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.0\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.1\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.2\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.3\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.4\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.5\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.6\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.7\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.8\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.9\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.10\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.11\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.12\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.13\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.14\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.15\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.16\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.17\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.18\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.19\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.20\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.21\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.22\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.23\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.24\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.25\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.26\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.27\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.8.28\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.9.0\":{\"node_abi\":1,\"v8\":\"3.11\"},\"0.9.1\":{\"node_abi\":10,\"v8\":\"3.11\"},\"0.9.2\":{\"node_abi\":10,\"v8\":\"3.11\"},\"0.9.3\":{\"node_abi\":10,\"v8\":\"3.13\"},\"0.9.4\":{\"node_abi\":10,\"v8\":\"3.13\"},\"0.9.5\":{\"node_abi\":10,\"v8\":\"3.13\"},\"0.9.6\":{\"node_abi\":10,\"v8\":\"3.15\"},\"0.9.7\":{\"node_abi\":10,\"v8\":\"3.15\"},\"0.9.8\":{\"node_abi\":10,\"v8\":\"3.15\"},\"0.9.9\":{\"node_abi\":11,\"v8\":\"3.15\"},\"0.9.10\":{\"node_abi\":11,\"v8\":\"3.15\"},\"0.9.11\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.9.12\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.0\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.1\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.2\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.3\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.4\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.5\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.6\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.7\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.8\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.9\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.10\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.11\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.12\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.13\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.14\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.15\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.16\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.17\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.18\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.19\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.20\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.21\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.22\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.23\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.24\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.25\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.26\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.27\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.28\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.29\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.30\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.31\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.32\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.33\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.34\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.35\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.36\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.37\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.38\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.39\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.40\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.41\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.42\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.43\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.44\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.45\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.46\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.47\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.10.48\":{\"node_abi\":11,\"v8\":\"3.14\"},\"0.11.0\":{\"node_abi\":12,\"v8\":\"3.17\"},\"0.11.1\":{\"node_abi\":12,\"v8\":\"3.18\"},\"0.11.2\":{\"node_abi\":12,\"v8\":\"3.19\"},\"0.11.3\":{\"node_abi\":12,\"v8\":\"3.19\"},\"0.11.4\":{\"node_abi\":12,\"v8\":\"3.20\"},\"0.11.5\":{\"node_abi\":12,\"v8\":\"3.20\"},\"0.11.6\":{\"node_abi\":12,\"v8\":\"3.20\"},\"0.11.7\":{\"node_abi\":12,\"v8\":\"3.20\"},\"0.11.8\":{\"node_abi\":13,\"v8\":\"3.21\"},\"0.11.9\":{\"node_abi\":13,\"v8\":\"3.22\"},\"0.11.10\":{\"node_abi\":13,\"v8\":\"3.22\"},\"0.11.11\":{\"node_abi\":14,\"v8\":\"3.22\"},\"0.11.12\":{\"node_abi\":14,\"v8\":\"3.22\"},\"0.11.13\":{\"node_abi\":14,\"v8\":\"3.25\"},\"0.11.14\":{\"node_abi\":14,\"v8\":\"3.26\"},\"0.11.15\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.11.16\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.0\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.1\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.2\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.3\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.4\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.5\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.6\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.7\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.8\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.9\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.10\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.11\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.12\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.13\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.14\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.15\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.16\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.17\":{\"node_abi\":14,\"v8\":\"3.28\"},\"0.12.18\":{\"node_abi\":14,\"v8\":\"3.28\"},\"1.0.0\":{\"node_abi\":42,\"v8\":\"3.31\"},\"1.0.1\":{\"node_abi\":42,\"v8\":\"3.31\"},\"1.0.2\":{\"node_abi\":42,\"v8\":\"3.31\"},\"1.0.3\":{\"node_abi\":42,\"v8\":\"4.1\"},\"1.0.4\":{\"node_abi\":42,\"v8\":\"4.1\"},\"1.1.0\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.2.0\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.3.0\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.4.1\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.4.2\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.4.3\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.5.0\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.5.1\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.6.0\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.6.1\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.6.2\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.6.3\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.6.4\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.7.1\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.8.1\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.8.2\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.8.3\":{\"node_abi\":43,\"v8\":\"4.1\"},\"1.8.4\":{\"node_abi\":43,\"v8\":\"4.1\"},\"2.0.0\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.0.1\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.0.2\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.1.0\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.2.0\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.2.1\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.3.0\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.3.1\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.3.2\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.3.3\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.3.4\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.4.0\":{\"node_abi\":44,\"v8\":\"4.2\"},\"2.5.0\":{\"node_abi\":44,\"v8\":\"4.2\"},\"3.0.0\":{\"node_abi\":45,\"v8\":\"4.4\"},\"3.1.0\":{\"node_abi\":45,\"v8\":\"4.4\"},\"3.2.0\":{\"node_abi\":45,\"v8\":\"4.4\"},\"3.3.0\":{\"node_abi\":45,\"v8\":\"4.4\"},\"3.3.1\":{\"node_abi\":45,\"v8\":\"4.4\"},\"4.0.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.1.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.1.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.1.2\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.2.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.2.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.2.2\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.2.3\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.2.4\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.2.5\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.2.6\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.3.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.3.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.3.2\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.2\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.3\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.4\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.5\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.6\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.4.7\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.5.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.6.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.6.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.6.2\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.7.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.7.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.7.2\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.7.3\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.2\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.3\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.4\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.5\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.6\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.8.7\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.9.0\":{\"node_abi\":46,\"v8\":\"4.5\"},\"4.9.1\":{\"node_abi\":46,\"v8\":\"4.5\"},\"5.0.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.1.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.1.1\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.2.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.3.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.4.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.4.1\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.5.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.6.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.7.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.7.1\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.8.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.9.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.9.1\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.10.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.10.1\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.11.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.11.1\":{\"node_abi\":47,\"v8\":\"4.6\"},\"5.12.0\":{\"node_abi\":47,\"v8\":\"4.6\"},\"6.0.0\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.1.0\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.2.0\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.2.1\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.2.2\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.3.0\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.3.1\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.4.0\":{\"node_abi\":48,\"v8\":\"5.0\"},\"6.5.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.6.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.7.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.8.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.8.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.9.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.9.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.9.2\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.9.3\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.9.4\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.9.5\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.10.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.10.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.10.2\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.10.3\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.11.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.11.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.11.2\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.11.3\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.11.4\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.11.5\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.12.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.12.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.12.2\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.12.3\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.13.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.13.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.14.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.14.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.14.2\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.14.3\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.14.4\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.15.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.15.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.16.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.17.0\":{\"node_abi\":48,\"v8\":\"5.1\"},\"6.17.1\":{\"node_abi\":48,\"v8\":\"5.1\"},\"7.0.0\":{\"node_abi\":51,\"v8\":\"5.4\"},\"7.1.0\":{\"node_abi\":51,\"v8\":\"5.4\"},\"7.2.0\":{\"node_abi\":51,\"v8\":\"5.4\"},\"7.2.1\":{\"node_abi\":51,\"v8\":\"5.4\"},\"7.3.0\":{\"node_abi\":51,\"v8\":\"5.4\"},\"7.4.0\":{\"node_abi\":51,\"v8\":\"5.4\"},\"7.5.0\":{\"node_abi\":51,\"v8\":\"5.4\"},\"7.6.0\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.7.0\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.7.1\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.7.2\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.7.3\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.7.4\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.8.0\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.9.0\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.10.0\":{\"node_abi\":51,\"v8\":\"5.5\"},\"7.10.1\":{\"node_abi\":51,\"v8\":\"5.5\"},\"8.0.0\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.1.0\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.1.1\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.1.2\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.1.3\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.1.4\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.2.0\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.2.1\":{\"node_abi\":57,\"v8\":\"5.8\"},\"8.3.0\":{\"node_abi\":57,\"v8\":\"6.0\"},\"8.4.0\":{\"node_abi\":57,\"v8\":\"6.0\"},\"8.5.0\":{\"node_abi\":57,\"v8\":\"6.0\"},\"8.6.0\":{\"node_abi\":57,\"v8\":\"6.0\"},\"8.7.0\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.8.0\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.8.1\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.9.0\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.9.1\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.9.2\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.9.3\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.9.4\":{\"node_abi\":57,\"v8\":\"6.1\"},\"8.10.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.11.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.11.1\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.11.2\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.11.3\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.11.4\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.12.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.13.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.14.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.14.1\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.15.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.15.1\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.16.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.16.1\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.16.2\":{\"node_abi\":57,\"v8\":\"6.2\"},\"8.17.0\":{\"node_abi\":57,\"v8\":\"6.2\"},\"9.0.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.1.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.2.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.2.1\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.3.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.4.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.5.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.6.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.6.1\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.7.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.7.1\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.8.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.9.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.10.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.10.1\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.11.0\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.11.1\":{\"node_abi\":59,\"v8\":\"6.2\"},\"9.11.2\":{\"node_abi\":59,\"v8\":\"6.2\"},\"10.0.0\":{\"node_abi\":64,\"v8\":\"6.6\"},\"10.1.0\":{\"node_abi\":64,\"v8\":\"6.6\"},\"10.2.0\":{\"node_abi\":64,\"v8\":\"6.6\"},\"10.2.1\":{\"node_abi\":64,\"v8\":\"6.6\"},\"10.3.0\":{\"node_abi\":64,\"v8\":\"6.6\"},\"10.4.0\":{\"node_abi\":64,\"v8\":\"6.7\"},\"10.4.1\":{\"node_abi\":64,\"v8\":\"6.7\"},\"10.5.0\":{\"node_abi\":64,\"v8\":\"6.7\"},\"10.6.0\":{\"node_abi\":64,\"v8\":\"6.7\"},\"10.7.0\":{\"node_abi\":64,\"v8\":\"6.7\"},\"10.8.0\":{\"node_abi\":64,\"v8\":\"6.7\"},\"10.9.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.10.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.11.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.12.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.13.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.14.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.14.1\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.14.2\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.15.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.15.1\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.15.2\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.15.3\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.16.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.16.1\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.16.2\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.16.3\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.17.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.18.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.18.1\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.19.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.20.0\":{\"node_abi\":64,\"v8\":\"6.8\"},\"10.20.1\":{\"node_abi\":64,\"v8\":\"6.8\"},\"11.0.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.1.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.2.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.3.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.4.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.5.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.6.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.7.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.8.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.9.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.10.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.10.1\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.11.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.12.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.13.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.14.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"11.15.0\":{\"node_abi\":67,\"v8\":\"7.0\"},\"12.0.0\":{\"node_abi\":72,\"v8\":\"7.4\"},\"12.1.0\":{\"node_abi\":72,\"v8\":\"7.4\"},\"12.2.0\":{\"node_abi\":72,\"v8\":\"7.4\"},\"12.3.0\":{\"node_abi\":72,\"v8\":\"7.4\"},\"12.3.1\":{\"node_abi\":72,\"v8\":\"7.4\"},\"12.4.0\":{\"node_abi\":72,\"v8\":\"7.4\"},\"12.5.0\":{\"node_abi\":72,\"v8\":\"7.5\"},\"12.6.0\":{\"node_abi\":72,\"v8\":\"7.5\"},\"12.7.0\":{\"node_abi\":72,\"v8\":\"7.5\"},\"12.8.0\":{\"node_abi\":72,\"v8\":\"7.5\"},\"12.8.1\":{\"node_abi\":72,\"v8\":\"7.5\"},\"12.9.0\":{\"node_abi\":72,\"v8\":\"7.6\"},\"12.9.1\":{\"node_abi\":72,\"v8\":\"7.6\"},\"12.10.0\":{\"node_abi\":72,\"v8\":\"7.6\"},\"12.11.0\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.11.1\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.12.0\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.13.0\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.13.1\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.14.0\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.14.1\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.15.0\":{\"node_abi\":72,\"v8\":\"7.7\"},\"12.16.0\":{\"node_abi\":72,\"v8\":\"7.8\"},\"12.16.1\":{\"node_abi\":72,\"v8\":\"7.8\"},\"12.16.2\":{\"node_abi\":72,\"v8\":\"7.8\"},\"12.16.3\":{\"node_abi\":72,\"v8\":\"7.8\"},\"13.0.0\":{\"node_abi\":79,\"v8\":\"7.8\"},\"13.0.1\":{\"node_abi\":79,\"v8\":\"7.8\"},\"13.1.0\":{\"node_abi\":79,\"v8\":\"7.8\"},\"13.2.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.3.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.4.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.5.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.6.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.7.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.8.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.9.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.10.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.10.1\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.11.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.12.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.13.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"13.14.0\":{\"node_abi\":79,\"v8\":\"7.9\"},\"14.0.0\":{\"node_abi\":83,\"v8\":\"8.1\"},\"14.1.0\":{\"node_abi\":83,\"v8\":\"8.1\"},\"14.2.0\":{\"node_abi\":83,\"v8\":\"8.1\"},\"14.3.0\":{\"node_abi\":83,\"v8\":\"8.1\"}}");

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/compile.js":
/*!*******************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/compile.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports;

var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var win = process.platform == 'win32';
var existsSync = fs.existsSync || path.existsSync;
var cp = __webpack_require__(/*! child_process */ "child_process");

// try to build up the complete path to node-gyp
/* priority:
  - node-gyp on ENV:npm_config_node_gyp (https://github.com/npm/npm/pull/4887)
  - node-gyp on NODE_PATH
  - node-gyp inside npm on NODE_PATH (ignore on iojs)
  - node-gyp inside npm beside node exe
*/
function which_node_gyp() {
    var node_gyp_bin;
    if (process.env.npm_config_node_gyp) {
      try {
          node_gyp_bin = process.env.npm_config_node_gyp;
          if (existsSync(node_gyp_bin)) {
              return node_gyp_bin;
          }
      } catch (err) { }
    }
    try {
        var node_gyp_main = /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module 'node-gyp'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
        node_gyp_bin = path.join(path.dirname(
                                     path.dirname(node_gyp_main)),
                                     'bin/node-gyp.js');
        if (existsSync(node_gyp_bin)) {
            return node_gyp_bin;
        }
    } catch (err) { }
    if (process.execPath.indexOf('iojs') === -1) {
        try {
            var npm_main = /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module 'npm'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
            node_gyp_bin = path.join(path.dirname(
                                         path.dirname(npm_main)),
                                         'node_modules/node-gyp/bin/node-gyp.js');
            if (existsSync(node_gyp_bin)) {
                return node_gyp_bin;
            }
        } catch (err) { }
    }
    var npm_base = path.join(path.dirname(
                             path.dirname(process.execPath)),
                             'lib/node_modules/npm/');
    node_gyp_bin = path.join(npm_base, 'node_modules/node-gyp/bin/node-gyp.js');
    if (existsSync(node_gyp_bin)) {
        return node_gyp_bin;
    }
}

module.exports.run_gyp = function(args,opts,callback) {
    var shell_cmd = '';
    var cmd_args = [];
    if (opts.runtime && opts.runtime == 'node-webkit') {
        shell_cmd = 'nw-gyp';
        if (win) shell_cmd += '.cmd';
    } else {
        var node_gyp_path = which_node_gyp();
        if (node_gyp_path) {
            shell_cmd = process.execPath;
            cmd_args.push(node_gyp_path);
        } else {
            shell_cmd = 'node-gyp';
            if (win) shell_cmd += '.cmd';
        }
    }
    var final_args = cmd_args.concat(args);
    var cmd = cp.spawn(shell_cmd, final_args, {cwd: undefined, env: process.env, stdio: [ 0, 1, 2]});
    cmd.on('error', function (err) {
        if (err) {
            return callback(new Error("Failed to execute '" + shell_cmd + ' ' + final_args.join(' ') + "' (" + err + ")"));
        }
        callback(null,opts);
    });
    cmd.on('close', function (code) {
        if (code && code !== 0) {
            return callback(new Error("Failed to execute '" + shell_cmd + ' ' + final_args.join(' ') + "' (" + code + ")"));
        }
        callback(null,opts);
    });
};


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js":
/*!***************************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = handle_gyp_opts;

var fs = __webpack_require__(/*! fs */ "fs");
var versioning = __webpack_require__(/*! ./versioning.js */ "./node_modules/node-pre-gyp/lib/util/versioning.js");
var napi = __webpack_require__(/*! ./napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");

/*

Here we gather node-pre-gyp generated options (from versioning) and pass them along to node-gyp.

We massage the args and options slightly to account for differences in what commands mean between
node-pre-gyp and node-gyp (e.g. see the difference between "build" and "rebuild" below)

Keep in mind: the values inside `argv` and `gyp.opts` below are different depending on whether
node-pre-gyp is called directory, or if it is called in a `run-script` phase of npm.

We also try to preserve any command line options that might have been passed to npm or node-pre-gyp.
But this is fairly difficult without passing way to much through. For example `gyp.opts` contains all
the process.env and npm pushes a lot of variables into process.env which node-pre-gyp inherits. So we have
to be very selective about what we pass through.

For example:

`npm install --build-from-source` will give:

argv == [ 'rebuild' ]
gyp.opts.argv == { remain: [ 'install' ],
  cooked: [ 'install', '--fallback-to-build' ],
  original: [ 'install', '--fallback-to-build' ] }

`./bin/node-pre-gyp build` will give:

argv == []
gyp.opts.argv == { remain: [ 'build' ],
  cooked: [ 'build' ],
  original: [ '-C', 'test/app1', 'build' ] }

*/

// select set of node-pre-gyp versioning info
// to share with node-gyp
var share_with_node_gyp = [
  'module',
  'module_name',
  'module_path',
  'napi_version',
  'node_abi_napi',
  'napi_build_version',
  'node_napi_label'
];

function handle_gyp_opts(gyp, argv, callback) {

    // Collect node-pre-gyp specific variables to pass to node-gyp
    var node_pre_gyp_options = [];
    // generate custom node-pre-gyp versioning info
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(JSON.parse(fs.readFileSync('./package.json')), gyp.opts, napi_build_version);
    share_with_node_gyp.forEach(function(key) {
        var val = opts[key];
        if (val) {
            node_pre_gyp_options.push('--' + key + '=' + val);
        } else if (key === 'napi_build_version') {
            node_pre_gyp_options.push('--' + key + '=0');
        } else {
            if (key !== 'napi_version' && key !== 'node_abi_napi')
                return callback(new Error("Option " + key + " required but not found by node-pre-gyp"));
        }
    });

    // Collect options that follow the special -- which disables nopt parsing
    var unparsed_options = [];
    var double_hyphen_found = false;
    gyp.opts.argv.original.forEach(function(opt) {
        if (double_hyphen_found) {
            unparsed_options.push(opt);
        }
        if (opt == '--') {
            double_hyphen_found = true;
        }
    });

    // We try respect and pass through remaining command
    // line options (like --foo=bar) to node-gyp
    var cooked = gyp.opts.argv.cooked;
    var node_gyp_options = [];
    cooked.forEach(function(value) {
        if (value.length > 2 && value.slice(0,2) == '--') {
            var key = value.slice(2);
            var val = cooked[cooked.indexOf(value)+1];
            if (val && val.indexOf('--') === -1) { // handle '--foo=bar' or ['--foo','bar']
                node_gyp_options.push('--' + key + '=' + val);
            } else { // pass through --foo
                node_gyp_options.push(value);
            }
        }
    });

    var result = {'opts':opts,'gyp':node_gyp_options,'pre':node_pre_gyp_options,'unparsed':unparsed_options};
    return callback(null,result);
}


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/napi.js":
/*!****************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/napi.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(/*! fs */ "fs");

module.exports = exports;

var versionArray = process.version
	.substr(1)
	.replace(/-.*$/, '')
	.split('.')
	.map(function(item) {
		return +item;
	});

var napi_multiple_commands = [
	'build',
	'clean',
	'configure',
	'package',
	'publish',
	'reveal',
	'testbinary',
	'testpackage',
	'unpublish'
];

var napi_build_version_tag = 'napi_build_version=';

module.exports.get_napi_version = function(target) { // target may be undefined
	// returns the non-zero numeric napi version or undefined if napi is not supported.
	// correctly supporting target requires an updated cross-walk
	var version = process.versions.napi; // can be undefined
	if (!version) { // this code should never need to be updated
		if (versionArray[0] === 9 && versionArray[1] >= 3) version = 2; // 9.3.0+
		else if (versionArray[0] === 8) version = 1; // 8.0.0+
	}
	return version;
};

module.exports.get_napi_version_as_string = function(target) {
	// returns the napi version as a string or an empty string if napi is not supported.
	var version = module.exports.get_napi_version(target);
	return version ? ''+version : '';
};

module.exports.validate_package_json = function(package_json, opts) { // throws Error

	var binary = package_json.binary;
	var module_path_ok = pathOK(binary.module_path);
	var remote_path_ok = pathOK(binary.remote_path);
	var package_name_ok = pathOK(binary.package_name);
	var napi_build_versions = module.exports.get_napi_build_versions(package_json,opts,true);
	var napi_build_versions_raw = module.exports.get_napi_build_versions_raw(package_json);

	if (napi_build_versions) {
		napi_build_versions.forEach(function(napi_build_version){
			if (!(parseInt(napi_build_version,10) === napi_build_version && napi_build_version > 0)) {
				throw new Error("All values specified in napi_versions must be positive integers.");
			}
		});
	}

	if (napi_build_versions && (!module_path_ok || (!remote_path_ok && !package_name_ok))) {
		throw new Error("When napi_versions is specified; module_path and either remote_path or " +
			"package_name must contain the substitution string '{napi_build_version}`.");
	}

	if ((module_path_ok || remote_path_ok || package_name_ok) && !napi_build_versions_raw) {
		throw new Error("When the substitution string '{napi_build_version}` is specified in " +
			"module_path, remote_path, or package_name; napi_versions must also be specified.");
	}

	if (napi_build_versions && !module.exports.get_best_napi_build_version(package_json, opts) && 
	module.exports.build_napi_only(package_json)) {
		throw new Error(
			'The N-API version of this Node instance is ' + module.exports.get_napi_version(opts ? opts.target : undefined) + '. ' +
			'This module supports N-API version(s) ' + module.exports.get_napi_build_versions_raw(package_json) + '. ' +
			'This Node instance cannot run this module.');
	}

	if (napi_build_versions_raw && !napi_build_versions && module.exports.build_napi_only(package_json)) {
		throw new Error(
			'The N-API version of this Node instance is ' + module.exports.get_napi_version(opts ? opts.target : undefined) + '. ' +
			'This module supports N-API version(s) ' + module.exports.get_napi_build_versions_raw(package_json) + '. ' +
			'This Node instance cannot run this module.');
	}

};

function pathOK (path) {
	return path && (path.indexOf('{napi_build_version}') !== -1 || path.indexOf('{node_napi_label}') !== -1);
}

module.exports.expand_commands = function(package_json, opts, commands) {
	var expanded_commands = [];
	var napi_build_versions = module.exports.get_napi_build_versions(package_json, opts);
	commands.forEach(function(command){
		if (napi_build_versions && command.name === 'install') {
			var napi_build_version = module.exports.get_best_napi_build_version(package_json, opts);
			var args = napi_build_version ? [ napi_build_version_tag+napi_build_version ] : [ ];
			expanded_commands.push ({ name: command.name, args: args });
		} else if (napi_build_versions && napi_multiple_commands.indexOf(command.name) !== -1) {
			napi_build_versions.forEach(function(napi_build_version){
				var args = command.args.slice();
				args.push (napi_build_version_tag+napi_build_version);
				expanded_commands.push ({ name: command.name, args: args });
			});
		} else {
			expanded_commands.push (command);
		}
	});
	return expanded_commands;
};

module.exports.get_napi_build_versions = function(package_json, opts, warnings) { // opts may be undefined
	var log = __webpack_require__(/*! npmlog */ "./node_modules/npmlog/log.js");
	var napi_build_versions = [];
	var supported_napi_version = module.exports.get_napi_version(opts ? opts.target : undefined);
	// remove duplicates, verify each napi version can actaully be built
	if (package_json.binary && package_json.binary.napi_versions) {
		package_json.binary.napi_versions.forEach(function(napi_version) {
			var duplicated = napi_build_versions.indexOf(napi_version) !== -1;
			if (!duplicated && supported_napi_version && napi_version <= supported_napi_version) {
				napi_build_versions.push(napi_version);
			} else if (warnings && !duplicated && supported_napi_version) {
				log.info('This Node instance does not support builds for N-API version', napi_version);
			}
		});
	}
	if (opts && opts["build-latest-napi-version-only"]) {
		var latest_version = 0;
		napi_build_versions.forEach(function(napi_version) {
			if (napi_version > latest_version) latest_version = napi_version;
		});
		napi_build_versions = latest_version ? [ latest_version ] : [];
	}
	return napi_build_versions.length ? napi_build_versions : undefined;
};

module.exports.get_napi_build_versions_raw = function(package_json) {
	var napi_build_versions = [];
	// remove duplicates
	if (package_json.binary && package_json.binary.napi_versions) {
		package_json.binary.napi_versions.forEach(function(napi_version) {
			if (napi_build_versions.indexOf(napi_version) === -1) {
				napi_build_versions.push(napi_version);
			}
		});
	}
	return napi_build_versions.length ? napi_build_versions : undefined;
};

module.exports.get_command_arg = function(napi_build_version) {
	return napi_build_version_tag + napi_build_version;
};

module.exports.get_napi_build_version_from_command_args = function(command_args) {
	for (var i = 0; i < command_args.length; i++) {
		var arg = command_args[i];
		if (arg.indexOf(napi_build_version_tag) === 0) {
			return parseInt(arg.substr(napi_build_version_tag.length),10);
		}
	}
	return undefined;
};

module.exports.swap_build_dir_out = function(napi_build_version) {
	if (napi_build_version) {
		var rm = __webpack_require__(/*! rimraf */ "rimraf");
		rm.sync(module.exports.get_build_dir(napi_build_version));
		fs.renameSync('build', module.exports.get_build_dir(napi_build_version));
	}
};

module.exports.swap_build_dir_in = function(napi_build_version) {
	if (napi_build_version) {
		var rm = __webpack_require__(/*! rimraf */ "rimraf");
		rm.sync('build');
		fs.renameSync(module.exports.get_build_dir(napi_build_version), 'build');
	}
};

module.exports.get_build_dir = function(napi_build_version) {
	return 'build-tmp-napi-v'+napi_build_version;
};

module.exports.get_best_napi_build_version = function(package_json, opts) {
	var best_napi_build_version = 0;
	var napi_build_versions = module.exports.get_napi_build_versions (package_json, opts);
	if (napi_build_versions) {
		var our_napi_version = module.exports.get_napi_version(opts ? opts.target : undefined);
		napi_build_versions.forEach(function(napi_build_version){
			if (napi_build_version > best_napi_build_version &&
				napi_build_version <= our_napi_version) {
				best_napi_build_version = napi_build_version;
			}
		});
	}
	return best_napi_build_version === 0 ? undefined : best_napi_build_version;
};

module.exports.build_napi_only = function(package_json) {
	return package_json.binary && package_json.binary.package_name && 
	package_json.binary.package_name.indexOf('{node_napi_label}') === -1;
};

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/nw-pre-gyp/index.html":
/*!******************************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/nw-pre-gyp/index.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> <!doctype html>\n| <html>\n| <head>");

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/nw-pre-gyp/package.json":
/*!********************************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/nw-pre-gyp/package.json ***!
  \********************************************************************/
/*! exports provided: main, name, description, version, window, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":\"index.html\",\"name\":\"nw-pre-gyp-module-test\",\"description\":\"Node-webkit-based module test.\",\"version\":\"0.0.1\",\"window\":{\"show\":false}}");

/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/s3_setup.js":
/*!********************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/s3_setup.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports;

var url = __webpack_require__(/*! url */ "url");

var URI_REGEX="^(.*)\.(s3(?:-.*)?)\.amazonaws\.com$";

module.exports.detect = function(to,config) {
    var uri = url.parse(to);
    var hostname_matches = uri.hostname.match(URI_REGEX);
    config.prefix = (!uri.pathname || uri.pathname == '/') ? '' : uri.pathname.replace('/','');
    if(!hostname_matches) {
        return;
    }
    if (!config.bucket) {
        config.bucket = hostname_matches[1];
    }
    if (!config.region) {
        var s3_domain = hostname_matches[2];
        if (s3_domain.slice(0,3) == 's3-' &&
            s3_domain.length >= 3) {
            // it appears the region is explicit in the url
            config.region = s3_domain.replace('s3-','');
        }
    }
};


/***/ }),

/***/ "./node_modules/node-pre-gyp/lib/util/versioning.js":
/*!**********************************************************!*\
  !*** ./node_modules/node-pre-gyp/lib/util/versioning.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports;

var path = __webpack_require__(/*! path */ "path");
var semver = __webpack_require__(/*! semver */ "semver");
var url = __webpack_require__(/*! url */ "url");
var detect_libc = __webpack_require__(/*! detect-libc */ "./node_modules/detect-libc/lib/detect-libc.js");
var napi = __webpack_require__(/*! ./napi.js */ "./node_modules/node-pre-gyp/lib/util/napi.js");

var abi_crosswalk;

// This is used for unit testing to provide a fake
// ABI crosswalk that emulates one that is not updated
// for the current version
if (process.env.NODE_PRE_GYP_ABI_CROSSWALK) {
    abi_crosswalk = __webpack_require__("./node_modules/node-pre-gyp/lib/util sync recursive")(process.env.NODE_PRE_GYP_ABI_CROSSWALK);
} else {
    abi_crosswalk = __webpack_require__(/*! ./abi_crosswalk.json */ "./node_modules/node-pre-gyp/lib/util/abi_crosswalk.json");
}

var major_versions = {};
Object.keys(abi_crosswalk).forEach(function(v) {
    var major = v.split('.')[0];
    if (!major_versions[major]) {
        major_versions[major] = v;
    }
});

function get_electron_abi(runtime, target_version) {
    if (!runtime) {
        throw new Error("get_electron_abi requires valid runtime arg");
    }
    if (typeof target_version === 'undefined') {
        // erroneous CLI call
        throw new Error("Empty target version is not supported if electron is the target.");
    }
    // Electron guarantees that patch version update won't break native modules.
    var sem_ver = semver.parse(target_version);
    return runtime + '-v' + sem_ver.major + '.' + sem_ver.minor;
}
module.exports.get_electron_abi = get_electron_abi;

function get_node_webkit_abi(runtime, target_version) {
    if (!runtime) {
        throw new Error("get_node_webkit_abi requires valid runtime arg");
    }
    if (typeof target_version === 'undefined') {
        // erroneous CLI call
        throw new Error("Empty target version is not supported if node-webkit is the target.");
    }
    return runtime + '-v' + target_version;
}
module.exports.get_node_webkit_abi = get_node_webkit_abi;

function get_node_abi(runtime, versions) {
    if (!runtime) {
        throw new Error("get_node_abi requires valid runtime arg");
    }
    if (!versions) {
        throw new Error("get_node_abi requires valid process.versions object");
    }
    var sem_ver = semver.parse(versions.node);
    if (sem_ver.major === 0 && sem_ver.minor % 2) { // odd series
        // https://github.com/mapbox/node-pre-gyp/issues/124
        return runtime+'-v'+versions.node;
    } else {
        // process.versions.modules added in >= v0.10.4 and v0.11.7
        // https://github.com/joyent/node/commit/ccabd4a6fa8a6eb79d29bc3bbe9fe2b6531c2d8e
        return versions.modules ? runtime+'-v' + (+versions.modules) :
            'v8-' + versions.v8.split('.').slice(0,2).join('.');
    }
}
module.exports.get_node_abi = get_node_abi;

function get_runtime_abi(runtime, target_version) {
    if (!runtime) {
        throw new Error("get_runtime_abi requires valid runtime arg");
    }
    if (runtime === 'node-webkit') {
        return get_node_webkit_abi(runtime, target_version || process.versions['node-webkit']);
    } else if (runtime === 'electron') {
        return get_electron_abi(runtime, target_version || process.versions.electron);
    } else {
        if (runtime != 'node') {
            throw new Error("Unknown Runtime: '" + runtime + "'");
        }
        if (!target_version) {
            return get_node_abi(runtime,process.versions);
        } else {
            var cross_obj;
            // abi_crosswalk generated with ./scripts/abi_crosswalk.js
            if (abi_crosswalk[target_version]) {
                cross_obj = abi_crosswalk[target_version];
            } else {
                var target_parts = target_version.split('.').map(function(i) { return +i; });
                if (target_parts.length != 3) { // parse failed
                    throw new Error("Unknown target version: " + target_version);
                }
                /*
                    The below code tries to infer the last known ABI compatible version
                    that we have recorded in the abi_crosswalk.json when an exact match
                    is not possible. The reasons for this to exist are complicated:

                       - We support passing --target to be able to allow developers to package binaries for versions of node
                         that are not the same one as they are running. This might also be used in combination with the
                         --target_arch or --target_platform flags to also package binaries for alternative platforms
                       - When --target is passed we can't therefore determine the ABI (process.versions.modules) from the node
                         version that is running in memory
                       - So, therefore node-pre-gyp keeps an "ABI crosswalk" (lib/util/abi_crosswalk.json) to be able to look
                         this info up for all versions
                       - But we cannot easily predict what the future ABI will be for released versions
                       - And node-pre-gyp needs to be a `bundledDependency` in apps that depend on it in order to work correctly
                         by being fully available at install time.
                       - So, the speed of node releases and the bundled nature of node-pre-gyp mean that a new node-pre-gyp release
                         need to happen for every node.js/io.js/node-webkit/nw.js/atom-shell/etc release that might come online if
                         you want the `--target` flag to keep working for the latest version
                       - Which is impractical ^^
                       - Hence the below code guesses about future ABI to make the need to update node-pre-gyp less demanding.

                    In practice then you can have a dependency of your app like `node-sqlite3` that bundles a `node-pre-gyp` that
                    only knows about node v0.10.33 in the `abi_crosswalk.json` but target node v0.10.34 (which is assumed to be
                    ABI compatible with v0.10.33).

                    TODO: use semver module instead of custom version parsing
                */
                var major = target_parts[0];
                var minor = target_parts[1];
                var patch = target_parts[2];
                // io.js: yeah if node.js ever releases 1.x this will break
                // but that is unlikely to happen: https://github.com/iojs/io.js/pull/253#issuecomment-69432616
                if (major === 1) {
                    // look for last release that is the same major version
                    // e.g. we assume io.js 1.x is ABI compatible with >= 1.0.0
                    while (true) {
                        if (minor > 0) --minor;
                        if (patch > 0) --patch;
                        var new_iojs_target = '' + major + '.' + minor + '.' + patch;
                        if (abi_crosswalk[new_iojs_target]) {
                            cross_obj = abi_crosswalk[new_iojs_target];
                            console.log('Warning: node-pre-gyp could not find exact match for ' + target_version);
                            console.log('Warning: but node-pre-gyp successfully choose ' + new_iojs_target + ' as ABI compatible target');
                            break;
                        }
                        if (minor === 0 && patch === 0) {
                            break;
                        }
                    }
                } else if (major >= 2) {
                    // look for last release that is the same major version
                    if (major_versions[major]) {
                        cross_obj = abi_crosswalk[major_versions[major]];
                        console.log('Warning: node-pre-gyp could not find exact match for ' + target_version);
                        console.log('Warning: but node-pre-gyp successfully choose ' + major_versions[major] + ' as ABI compatible target');
                    }
                } else if (major === 0) { // node.js
                    if (target_parts[1] % 2 === 0) { // for stable/even node.js series
                        // look for the last release that is the same minor release
                        // e.g. we assume node 0.10.x is ABI compatible with >= 0.10.0
                        while (--patch > 0) {
                            var new_node_target = '' + major + '.' + minor + '.' + patch;
                            if (abi_crosswalk[new_node_target]) {
                                cross_obj = abi_crosswalk[new_node_target];
                                console.log('Warning: node-pre-gyp could not find exact match for ' + target_version);
                                console.log('Warning: but node-pre-gyp successfully choose ' + new_node_target + ' as ABI compatible target');
                                break;
                            }
                        }
                    }
                }
            }
            if (!cross_obj) {
                throw new Error("Unsupported target version: " + target_version);
            }
            // emulate process.versions
            var versions_obj = {
                node: target_version,
                v8: cross_obj.v8+'.0',
                // abi_crosswalk uses 1 for node versions lacking process.versions.modules
                // process.versions.modules added in >= v0.10.4 and v0.11.7
                modules: cross_obj.node_abi > 1 ? cross_obj.node_abi : undefined
            };
            return get_node_abi(runtime, versions_obj);
        }
    }
}
module.exports.get_runtime_abi = get_runtime_abi;

var required_parameters = [
    'module_name',
    'module_path',
    'host'
];

function validate_config(package_json,opts) {
    var msg = package_json.name + ' package.json is not node-pre-gyp ready:\n';
    var missing = [];
    if (!package_json.main) {
        missing.push('main');
    }
    if (!package_json.version) {
        missing.push('version');
    }
    if (!package_json.name) {
        missing.push('name');
    }
    if (!package_json.binary) {
        missing.push('binary');
    }
    var o = package_json.binary;
    required_parameters.forEach(function(p) {
        if (missing.indexOf('binary') > -1) {
            missing.pop('binary');
        }
        if (!o || o[p] === undefined || o[p] === "") {
            missing.push('binary.' + p);
        }
    });
    if (missing.length >= 1) {
        throw new Error(msg+"package.json must declare these properties: \n" + missing.join('\n'));
    }
    if (o) {
        // enforce https over http
        var protocol = url.parse(o.host).protocol;
        if (protocol === 'http:') {
            throw new Error("'host' protocol ("+protocol+") is invalid - only 'https:' is accepted");
        }
    }
    napi.validate_package_json(package_json,opts);
}

module.exports.validate_config = validate_config;

function eval_template(template,opts) {
    Object.keys(opts).forEach(function(key) {
        var pattern = '{'+key+'}';
        while (template.indexOf(pattern) > -1) {
            template = template.replace(pattern,opts[key]);
        }
    });
    return template;
}

// url.resolve needs single trailing slash
// to behave correctly, otherwise a double slash
// may end up in the url which breaks requests
// and a lacking slash may not lead to proper joining
function fix_slashes(pathname) {
    if (pathname.slice(-1) != '/') {
        return pathname + '/';
    }
    return pathname;
}

// remove double slashes
// note: path.normalize will not work because
// it will convert forward to back slashes
function drop_double_slashes(pathname) {
    return pathname.replace(/\/\//g,'/');
}

function get_process_runtime(versions) {
    var runtime = 'node';
    if (versions['node-webkit']) {
        runtime = 'node-webkit';
    } else if (versions.electron) {
        runtime = 'electron';
    }
    return runtime;
}

module.exports.get_process_runtime = get_process_runtime;

var default_package_name = '{module_name}-v{version}-{node_abi}-{platform}-{arch}.tar.gz';
var default_remote_path = '';

module.exports.evaluate = function(package_json,options,napi_build_version) {
    options = options || {};
    validate_config(package_json,options); // options is a suitable substitute for opts in this case
    var v = package_json.version;
    var module_version = semver.parse(v);
    var runtime = options.runtime || get_process_runtime(process.versions);
    var opts = {
        name: package_json.name,
        configuration: Boolean(options.debug) ? 'Debug' : 'Release',
        debug: options.debug,
        module_name: package_json.binary.module_name,
        version: module_version.version,
        prerelease: module_version.prerelease.length ? module_version.prerelease.join('.') : '',
        build: module_version.build.length ? module_version.build.join('.') : '',
        major: module_version.major,
        minor: module_version.minor,
        patch: module_version.patch,
        runtime: runtime,
        node_abi: get_runtime_abi(runtime,options.target),
        node_abi_napi: napi.get_napi_version(options.target) ? 'napi' : get_runtime_abi(runtime,options.target),
        napi_version: napi.get_napi_version(options.target), // non-zero numeric, undefined if unsupported
        napi_build_version: napi_build_version || '',
        node_napi_label: napi_build_version ? 'napi-v' + napi_build_version : get_runtime_abi(runtime,options.target),
        target: options.target || '',
        platform: options.target_platform || process.platform,
        target_platform: options.target_platform || process.platform,
        arch: options.target_arch || process.arch,
        target_arch: options.target_arch || process.arch,
        libc: options.target_libc || detect_libc.family || 'unknown',
        module_main: package_json.main,
        toolset : options.toolset || '' // address https://github.com/mapbox/node-pre-gyp/issues/119
    };
    // support host mirror with npm config `--{module_name}_binary_host_mirror`
    // e.g.: https://github.com/node-inspector/v8-profiler/blob/master/package.json#L25
    // > npm install v8-profiler --profiler_binary_host_mirror=https://npm.taobao.org/mirrors/node-inspector/
    var host = process.env['npm_config_' + opts.module_name + '_binary_host_mirror'] || package_json.binary.host;
    opts.host = fix_slashes(eval_template(host,opts));
    opts.module_path = eval_template(package_json.binary.module_path,opts);
    // now we resolve the module_path to ensure it is absolute so that binding.gyp variables work predictably
    if (options.module_root) {
        // resolve relative to known module root: works for pre-binding require
        opts.module_path = path.join(options.module_root,opts.module_path);
    } else {
        // resolve relative to current working directory: works for node-pre-gyp commands
        opts.module_path = path.resolve(opts.module_path);
    }
    opts.module = path.join(opts.module_path,opts.module_name + '.node');
    opts.remote_path = package_json.binary.remote_path ? drop_double_slashes(fix_slashes(eval_template(package_json.binary.remote_path,opts))) : default_remote_path;
    var package_name = package_json.binary.package_name ? package_json.binary.package_name : default_package_name;
    opts.package_name = eval_template(package_name,opts);
    opts.staged_tarball = path.join('build/stage',opts.remote_path,opts.package_name);
    opts.hosted_path = url.resolve(opts.host,opts.remote_path);
    opts.hosted_tarball = url.resolve(opts.hosted_path,opts.package_name);
    return opts;
};


/***/ }),

/***/ "./node_modules/node-pre-gyp/package.json":
/*!************************************************!*\
  !*** ./node_modules/node-pre-gyp/package.json ***!
  \************************************************/
/*! exports provided: name, description, version, keywords, license, author, repository, bin, main, dependencies, devDependencies, jshintConfig, scripts, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"node-pre-gyp\",\"description\":\"Node.js native addon binary install tool\",\"version\":\"0.15.0\",\"keywords\":[\"native\",\"addon\",\"module\",\"c\",\"c++\",\"bindings\",\"binary\"],\"license\":\"BSD-3-Clause\",\"author\":\"Dane Springmeyer <dane@mapbox.com>\",\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/mapbox/node-pre-gyp.git\"},\"bin\":\"./bin/node-pre-gyp\",\"main\":\"./lib/node-pre-gyp.js\",\"dependencies\":{\"detect-libc\":\"^1.0.2\",\"mkdirp\":\"^0.5.3\",\"needle\":\"^2.5.0\",\"nopt\":\"^4.0.1\",\"npm-packlist\":\"^1.1.6\",\"npmlog\":\"^4.0.2\",\"rc\":\"^1.2.7\",\"rimraf\":\"^2.6.1\",\"semver\":\"^5.3.0\",\"tar\":\"^4.4.2\"},\"devDependencies\":{\"aws-sdk\":\"^2.28.0\",\"jshint\":\"^2.9.5\",\"nock\":\"^9.2.3\",\"tape\":\"^4.6.3\"},\"jshintConfig\":{\"node\":true,\"globalstrict\":true,\"undef\":true,\"unused\":false,\"noarg\":true},\"scripts\":{\"pretest\":\"jshint test/build.test.js test/s3_setup.test.js test/versioning.test.js test/fetch.test.js lib lib/util scripts bin/node-pre-gyp\",\"update-crosswalk\":\"node scripts/abi_crosswalk.js\",\"test\":\"jshint lib lib/util scripts bin/node-pre-gyp && tape test/*test.js\"}}");

/***/ }),

/***/ "./node_modules/npm-bundled/index.js":
/*!*******************************************!*\
  !*** ./node_modules/npm-bundled/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// walk the tree of deps starting from the top level list of bundled deps
// Any deps at the top level that are depended on by a bundled dep that
// does not have that dep in its own node_modules folder are considered
// bundled deps as well.  This list of names can be passed to npm-packlist
// as the "bundled" argument.  Additionally, packageJsonCache is shared so
// packlist doesn't have to re-read files already consumed in this pass

const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")
const EE = __webpack_require__(/*! events */ "events").EventEmitter
// we don't care about the package bins, but we share a pj cache
// with other modules that DO care about it, so keep it nice.
const normalizePackageBin = __webpack_require__(/*! npm-normalize-package-bin */ "./node_modules/npm-normalize-package-bin/index.js")

class BundleWalker extends EE {
  constructor (opt) {
    opt = opt || {}
    super(opt)
    this.path = path.resolve(opt.path || process.cwd())

    this.parent = opt.parent || null
    if (this.parent) {
      this.result = this.parent.result
      // only collect results in node_modules folders at the top level
      // since the node_modules in a bundled dep is included always
      if (!this.parent.parent) {
        const base = path.basename(this.path)
        const scope = path.basename(path.dirname(this.path))
        this.result.add(/^@/.test(scope) ? scope + '/' + base : base)
      }
      this.root = this.parent.root
      this.packageJsonCache = this.parent.packageJsonCache
    } else {
      this.result = new Set()
      this.root = this.path
      this.packageJsonCache = opt.packageJsonCache || new Map()
    }

    this.seen = new Set()
    this.didDone = false
    this.children = 0
    this.node_modules = []
    this.package = null
    this.bundle = null
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    const ret = super.on(ev, fn)
    if (ev === 'done' && this.didDone) {
      this.emit('done', this.result)
    }
    return ret
  }

  done () {
    if (!this.didDone) {
      this.didDone = true
      if (!this.parent) {
        const res = Array.from(this.result)
        this.result = res
        this.emit('done', res)
      } else {
        this.emit('done')
      }
    }
  }

  start () {
    const pj = path.resolve(this.path, 'package.json')
    if (this.packageJsonCache.has(pj))
      this.onPackage(this.packageJsonCache.get(pj))
    else
      this.readPackageJson(pj)
    return this
  }

  readPackageJson (pj) {
    fs.readFile(pj, (er, data) =>
      er ? this.done() : this.onPackageJson(pj, data))
  }

  onPackageJson (pj, data) {
    try {
      this.package = normalizePackageBin(JSON.parse(data + ''))
    } catch (er) {
      return this.done()
    }
    this.packageJsonCache.set(pj, this.package)
    this.onPackage(this.package)
  }

  allDepsBundled (pkg) {
    return Object.keys(pkg.dependencies || {}).concat(
      Object.keys(pkg.optionalDependencies || {}))
  }

  onPackage (pkg) {
    // all deps are bundled if we got here as a child.
    // otherwise, only bundle bundledDeps
    // Get a unique-ified array with a short-lived Set
    const bdRaw = this.parent ? this.allDepsBundled(pkg)
      : pkg.bundleDependencies || pkg.bundledDependencies || []

    const bd = Array.from(new Set(
      Array.isArray(bdRaw) ? bdRaw
      : bdRaw === true ? this.allDepsBundled(pkg)
      : Object.keys(bdRaw)))

    if (!bd.length)
      return this.done()

    this.bundle = bd
    const nm = this.path + '/node_modules'
    this.readModules()
  }

  readModules () {
    readdirNodeModules(this.path + '/node_modules', (er, nm) =>
      er ? this.onReaddir([]) : this.onReaddir(nm))
  }

  onReaddir (nm) {
    // keep track of what we have, in case children need it
    this.node_modules = nm

    this.bundle.forEach(dep => this.childDep(dep))
    if (this.children === 0)
      this.done()
  }

  childDep (dep) {
    if (this.node_modules.indexOf(dep) !== -1 && !this.seen.has(dep)) {
      this.seen.add(dep)
      this.child(dep)
    } else if (this.parent) {
      this.parent.childDep(dep)
    }
  }

  child (dep) {
    const p = this.path + '/node_modules/' + dep
    this.children += 1
    const child = new BundleWalker({
      path: p,
      parent: this
    })
    child.on('done', _ => {
      if (--this.children === 0)
        this.done()
    })
    child.start()
  }
}

class BundleWalkerSync extends BundleWalker {
  constructor (opt) {
    super(opt)
  }

  start () {
    super.start()
    this.done()
    return this
  }

  readPackageJson (pj) {
    try {
      this.onPackageJson(pj, fs.readFileSync(pj))
    } catch (er) {}
    return this
  }

  readModules () {
    try {
      this.onReaddir(readdirNodeModulesSync(this.path + '/node_modules'))
    } catch (er) {
      this.onReaddir([])
    }
  }

  child (dep) {
    new BundleWalkerSync({
      path: this.path + '/node_modules/' + dep,
      parent: this
    }).start()
  }
}

const readdirNodeModules = (nm, cb) => {
  fs.readdir(nm, (er, set) => {
    if (er)
      cb(er)
    else {
      const scopes = set.filter(f => /^@/.test(f))
      if (!scopes.length)
        cb(null, set)
      else {
        const unscoped = set.filter(f => !/^@/.test(f))
        let count = scopes.length
        scopes.forEach(scope => {
          fs.readdir(nm + '/' + scope, (er, pkgs) => {
            if (er || !pkgs.length)
              unscoped.push(scope)
            else
              unscoped.push.apply(unscoped, pkgs.map(p => scope + '/' + p))
            if (--count === 0)
              cb(null, unscoped)
          })
        })
      }
    }
  })
}

const readdirNodeModulesSync = nm => {
  const set = fs.readdirSync(nm)
  const unscoped = set.filter(f => !/^@/.test(f))
  const scopes = set.filter(f => /^@/.test(f)).map(scope => {
    try {
      const pkgs = fs.readdirSync(nm + '/' + scope)
      return pkgs.length ? pkgs.map(p => scope + '/' + p) : [scope]
    } catch (er) {
      return [scope]
    }
  }).reduce((a, b) => a.concat(b), [])
  return unscoped.concat(scopes)
}

const walk = (options, callback) => {
  const p = new Promise((resolve, reject) => {
    new BundleWalker(options).on('done', resolve).on('error', reject).start()
  })
  return callback ? p.then(res => callback(null, res), callback) : p
}

const walkSync = options => {
  return new BundleWalkerSync(options).start().result
}

module.exports = walk
walk.sync = walkSync
walk.BundleWalker = BundleWalker
walk.BundleWalkerSync = BundleWalkerSync


/***/ }),

/***/ "./node_modules/npm-normalize-package-bin/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/npm-normalize-package-bin/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// pass in a manifest with a 'bin' field here, and it'll turn it
// into a properly santized bin object
const {join, basename} = __webpack_require__(/*! path */ "path")

const normalize = pkg =>
  !pkg.bin ? removeBin(pkg)
  : typeof pkg.bin === 'string' ? normalizeString(pkg)
  : Array.isArray(pkg.bin) ? normalizeArray(pkg)
  : typeof pkg.bin === 'object' ? normalizeObject(pkg)
  : removeBin(pkg)

const normalizeString = pkg => {
  if (!pkg.name)
    return removeBin(pkg)
  pkg.bin = { [pkg.name]: pkg.bin }
  return normalizeObject(pkg)
}

const normalizeArray = pkg => {
  pkg.bin = pkg.bin.reduce((acc, k) => {
    acc[basename(k)] = k
    return acc
  }, {})
  return normalizeObject(pkg)
}

const removeBin = pkg => {
  delete pkg.bin
  return pkg
}

const normalizeObject = pkg => {
  const orig = pkg.bin
  const clean = {}
  let hasBins = false
  Object.keys(orig).forEach(binKey => {
    const base = join('/', basename(binKey.replace(/\\|:/g, '/'))).substr(1)

    if (typeof orig[binKey] !== 'string' || !base)
      return

    const binTarget = join('/', orig[binKey])
      .replace(/\\/g, '/').substr(1)

    if (!binTarget)
      return

    clean[base] = binTarget
    hasBins = true
  })

  if (hasBins)
    pkg.bin = clean
  else
    delete pkg.bin

  return pkg
}

module.exports = normalize


/***/ }),

/***/ "./node_modules/npm-packlist/index.js":
/*!********************************************!*\
  !*** ./node_modules/npm-packlist/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Do a two-pass walk, first to get the list of packages that need to be
// bundled, then again to get the actual files and folders.
// Keep a cache of node_modules content and package.json data, so that the
// second walk doesn't have to re-do all the same work.

const bundleWalk = __webpack_require__(/*! npm-bundled */ "./node_modules/npm-bundled/index.js")
const BundleWalker = bundleWalk.BundleWalker
const BundleWalkerSync = bundleWalk.BundleWalkerSync

const ignoreWalk = __webpack_require__(/*! ignore-walk */ "./node_modules/ignore-walk/index.js")
const IgnoreWalker = ignoreWalk.Walker
const IgnoreWalkerSync = ignoreWalk.WalkerSync

const rootBuiltinRules = Symbol('root-builtin-rules')
const packageNecessaryRules = Symbol('package-necessary-rules')
const path = __webpack_require__(/*! path */ "path")

const normalizePackageBin = __webpack_require__(/*! npm-normalize-package-bin */ "./node_modules/npm-normalize-package-bin/index.js")

const defaultRules = [
  '.npmignore',
  '.gitignore',
  '**/.git',
  '**/.svn',
  '**/.hg',
  '**/CVS',
  '**/.git/**',
  '**/.svn/**',
  '**/.hg/**',
  '**/CVS/**',
  '/.lock-wscript',
  '/.wafpickle-*',
  '/build/config.gypi',
  'npm-debug.log',
  '**/.npmrc',
  '.*.swp',
  '.DS_Store',
  '**/.DS_Store/**',
  '._*',
  '**/._*/**',
  '*.orig',
  '/package-lock.json',
  '/yarn.lock',
  'archived-packages/**',
  'core',
  '!core/',
  '!**/core/',
  '*.core',
  '*.vgcore',
  'vgcore.*',
  'core.+([0-9])',
]

// There may be others, but :?|<> are handled by node-tar
const nameIsBadForWindows = file => /\*/.test(file)

// a decorator that applies our custom rules to an ignore walker
const npmWalker = Class => class Walker extends Class {
  constructor (opt) {
    opt = opt || {}

    // the order in which rules are applied.
    opt.ignoreFiles = [
      rootBuiltinRules,
      'package.json',
      '.npmignore',
      '.gitignore',
      packageNecessaryRules
    ]

    opt.includeEmpty = false
    opt.path = opt.path || process.cwd()
    const dirName = path.basename(opt.path)
    const parentName = path.basename(path.dirname(opt.path))
    opt.follow =
      dirName === 'node_modules' ||
      (parentName === 'node_modules' && /^@/.test(dirName))
    super(opt)

    // ignore a bunch of things by default at the root level.
    // also ignore anything in node_modules, except bundled dependencies
    if (!this.parent) {
      this.bundled = opt.bundled || []
      this.bundledScopes = Array.from(new Set(
        this.bundled.filter(f => /^@/.test(f))
        .map(f => f.split('/')[0])))
      const rules = defaultRules.join('\n') + '\n'
      this.packageJsonCache = opt.packageJsonCache || new Map()
      super.onReadIgnoreFile(rootBuiltinRules, rules, _=>_)
    } else {
      this.bundled = []
      this.bundledScopes = []
      this.packageJsonCache = this.parent.packageJsonCache
    }
  }

  onReaddir (entries) {
    if (!this.parent) {
      entries = entries.filter(e =>
        e !== '.git' &&
        !(e === 'node_modules' && this.bundled.length === 0)
      )
    }
    return super.onReaddir(entries)
  }

  filterEntry (entry, partial) {
    // get the partial path from the root of the walk
    const p = this.path.substr(this.root.length + 1)
    const pkgre = /^node_modules\/(@[^\/]+\/?[^\/]+|[^\/]+)(\/.*)?$/
    const isRoot = !this.parent
    const pkg = isRoot && pkgre.test(entry) ?
      entry.replace(pkgre, '$1') : null
    const rootNM = isRoot && entry === 'node_modules'
    const rootPJ = isRoot && entry === 'package.json'

    return (
      // if we're in a bundled package, check with the parent.
      /^node_modules($|\/)/i.test(p) ? this.parent.filterEntry(
          this.basename + '/' + entry, partial)

      // if package is bundled, all files included
      // also include @scope dirs for bundled scoped deps
      // they'll be ignored if no files end up in them.
      // However, this only matters if we're in the root.
      // node_modules folders elsewhere, like lib/node_modules,
      // should be included normally unless ignored.
      : pkg ? -1 !== this.bundled.indexOf(pkg) ||
        -1 !== this.bundledScopes.indexOf(pkg)

      // only walk top node_modules if we want to bundle something
      : rootNM ? !!this.bundled.length

      // always include package.json at the root.
      : rootPJ ? true

      // otherwise, follow ignore-walk's logic
      : super.filterEntry(entry, partial)
    )
  }

  filterEntries () {
    if (this.ignoreRules['package.json'])
      this.ignoreRules['.gitignore'] = this.ignoreRules['.npmignore'] = null
    else if (this.ignoreRules['.npmignore'])
      this.ignoreRules['.gitignore'] = null
    this.filterEntries = super.filterEntries
    super.filterEntries()
  }

  addIgnoreFile (file, then) {
    const ig = path.resolve(this.path, file)
    if (this.packageJsonCache.has(ig))
      this.onPackageJson(ig, this.packageJsonCache.get(ig), then)
    else
      super.addIgnoreFile(file, then)
  }

  onPackageJson (ig, pkg, then) {
    this.packageJsonCache.set(ig, pkg)

    // if there's a bin, browser or main, make sure we don't ignore it
    // also, don't ignore the package.json itself!
    //
    // Weird side-effect of this: a readme (etc) file will be included
    // if it exists anywhere within a folder with a package.json file.
    // The original intent was only to include these files in the root,
    // but now users in the wild are dependent on that behavior for
    // localized documentation and other use cases.  Adding a `/` to
    // these rules, while tempting and arguably more "correct", is a
    // breaking change.
    const rules = [
      pkg.browser ? '!' + pkg.browser : '',
      pkg.main ? '!' + pkg.main : '',
      '!package.json',
      '!npm-shrinkwrap.json',
      '!@(readme|copying|license|licence|notice|changes|changelog|history){,.*[^~$]}'
    ]
    if (pkg.bin) {
      // always an object, because normalized already
      for (const key in pkg.bin)
        rules.push('!' + pkg.bin[key])
    }

    const data = rules.filter(f => f).join('\n') + '\n'
    super.onReadIgnoreFile(packageNecessaryRules, data, _=>_)

    if (Array.isArray(pkg.files))
      super.onReadIgnoreFile('package.json', '*\n' + pkg.files.map(
        f => '!' + f + '\n!' + f.replace(/\/+$/, '') + '/**'
      ).join('\n') + '\n', then)
    else
      then()
  }

  // override parent stat function to completely skip any filenames
  // that will break windows entirely.
  // XXX(isaacs) Next major version should make this an error instead.
  stat (entry, file, dir, then) {
    if (nameIsBadForWindows(entry))
      then()
    else
      super.stat(entry, file, dir, then)
  }

  // override parent onstat function to nix all symlinks
  onstat (st, entry, file, dir, then) {
    if (st.isSymbolicLink())
      then()
    else
      super.onstat(st, entry, file, dir, then)
  }

  onReadIgnoreFile (file, data, then) {
    if (file === 'package.json')
      try {
        const ig = path.resolve(this.path, file)
        this.onPackageJson(ig, normalizePackageBin(JSON.parse(data)), then)
      } catch (er) {
        // ignore package.json files that are not json
        then()
      }
    else
      super.onReadIgnoreFile(file, data, then)
  }

  sort (a, b) {
    return sort(a, b)
  }
}

class Walker extends npmWalker(IgnoreWalker) {
  walker (entry, then) {
    new Walker(this.walkerOpt(entry)).on('done', then).start()
  }
}

class WalkerSync extends npmWalker(IgnoreWalkerSync) {
  walker (entry, then) {
    new WalkerSync(this.walkerOpt(entry)).start()
    then()
  }
}

const walk = (options, callback) => {
  options = options || {}
  const p = new Promise((resolve, reject) => {
    const bw = new BundleWalker(options)
    bw.on('done', bundled => {
      options.bundled = bundled
      options.packageJsonCache = bw.packageJsonCache
      new Walker(options).on('done', resolve).on('error', reject).start()
    })
    bw.start()
  })
  return callback ? p.then(res => callback(null, res), callback) : p
}

const walkSync = options => {
  options = options || {}
  const bw = new BundleWalkerSync(options).start()
  options.bundled = bw.result
  options.packageJsonCache = bw.packageJsonCache
  const walker = new WalkerSync(options)
  walker.start()
  return walker.result
}

// optimize for compressibility
// extname, then basename, then locale alphabetically
// https://twitter.com/isntitvacant/status/1131094910923231232
const sort = (a, b) => {
  const exta = path.extname(a).toLowerCase()
  const extb = path.extname(b).toLowerCase()
  const basea = path.basename(a).toLowerCase()
  const baseb = path.basename(b).toLowerCase()

  return exta.localeCompare(extb) ||
    basea.localeCompare(baseb) ||
    a.localeCompare(b)
}


module.exports = walk
walk.sync = walkSync
walk.Walker = Walker
walk.WalkerSync = WalkerSync


/***/ }),

/***/ "./node_modules/npmlog/log.js":
/*!************************************!*\
  !*** ./node_modules/npmlog/log.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Progress = __webpack_require__(/*! are-we-there-yet */ "./node_modules/are-we-there-yet/index.js")
var Gauge = __webpack_require__(/*! gauge */ "./node_modules/gauge/index.js")
var EE = __webpack_require__(/*! events */ "events").EventEmitter
var log = exports = module.exports = new EE()
var util = __webpack_require__(/*! util */ "util")

var setBlocking = __webpack_require__(/*! set-blocking */ "set-blocking")
var consoleControl = __webpack_require__(/*! console-control-strings */ "./node_modules/console-control-strings/index.js")

setBlocking(true)
var stream = process.stderr
Object.defineProperty(log, 'stream', {
  set: function (newStream) {
    stream = newStream
    if (this.gauge) this.gauge.setWriteTo(stream, stream)
  },
  get: function () {
    return stream
  }
})

// by default, decide based on tty-ness.
var colorEnabled
log.useColor = function () {
  return colorEnabled != null ? colorEnabled : stream.isTTY
}

log.enableColor = function () {
  colorEnabled = true
  this.gauge.setTheme({hasColor: colorEnabled, hasUnicode: unicodeEnabled})
}
log.disableColor = function () {
  colorEnabled = false
  this.gauge.setTheme({hasColor: colorEnabled, hasUnicode: unicodeEnabled})
}

// default level
log.level = 'info'

log.gauge = new Gauge(stream, {
  enabled: false, // no progress bars unless asked
  theme: {hasColor: log.useColor()},
  template: [
    {type: 'progressbar', length: 20},
    {type: 'activityIndicator', kerning: 1, length: 1},
    {type: 'section', default: ''},
    ':',
    {type: 'logline', kerning: 1, default: ''}
  ]
})

log.tracker = new Progress.TrackerGroup()

// we track this separately as we may need to temporarily disable the
// display of the status bar for our own loggy purposes.
log.progressEnabled = log.gauge.isEnabled()

var unicodeEnabled

log.enableUnicode = function () {
  unicodeEnabled = true
  this.gauge.setTheme({hasColor: this.useColor(), hasUnicode: unicodeEnabled})
}

log.disableUnicode = function () {
  unicodeEnabled = false
  this.gauge.setTheme({hasColor: this.useColor(), hasUnicode: unicodeEnabled})
}

log.setGaugeThemeset = function (themes) {
  this.gauge.setThemeset(themes)
}

log.setGaugeTemplate = function (template) {
  this.gauge.setTemplate(template)
}

log.enableProgress = function () {
  if (this.progressEnabled) return
  this.progressEnabled = true
  this.tracker.on('change', this.showProgress)
  if (this._pause) return
  this.gauge.enable()
}

log.disableProgress = function () {
  if (!this.progressEnabled) return
  this.progressEnabled = false
  this.tracker.removeListener('change', this.showProgress)
  this.gauge.disable()
}

var trackerConstructors = ['newGroup', 'newItem', 'newStream']

var mixinLog = function (tracker) {
  // mixin the public methods from log into the tracker
  // (except: conflicts and one's we handle specially)
  Object.keys(log).forEach(function (P) {
    if (P[0] === '_') return
    if (trackerConstructors.filter(function (C) { return C === P }).length) return
    if (tracker[P]) return
    if (typeof log[P] !== 'function') return
    var func = log[P]
    tracker[P] = function () {
      return func.apply(log, arguments)
    }
  })
  // if the new tracker is a group, make sure any subtrackers get
  // mixed in too
  if (tracker instanceof Progress.TrackerGroup) {
    trackerConstructors.forEach(function (C) {
      var func = tracker[C]
      tracker[C] = function () { return mixinLog(func.apply(tracker, arguments)) }
    })
  }
  return tracker
}

// Add tracker constructors to the top level log object
trackerConstructors.forEach(function (C) {
  log[C] = function () { return mixinLog(this.tracker[C].apply(this.tracker, arguments)) }
})

log.clearProgress = function (cb) {
  if (!this.progressEnabled) return cb && process.nextTick(cb)
  this.gauge.hide(cb)
}

log.showProgress = function (name, completed) {
  if (!this.progressEnabled) return
  var values = {}
  if (name) values.section = name
  var last = log.record[log.record.length - 1]
  if (last) {
    values.subsection = last.prefix
    var disp = log.disp[last.level] || last.level
    var logline = this._format(disp, log.style[last.level])
    if (last.prefix) logline += ' ' + this._format(last.prefix, this.prefixStyle)
    logline += ' ' + last.message.split(/\r?\n/)[0]
    values.logline = logline
  }
  values.completed = completed || this.tracker.completed()
  this.gauge.show(values)
}.bind(log) // bind for use in tracker's on-change listener

// temporarily stop emitting, but don't drop
log.pause = function () {
  this._paused = true
  if (this.progressEnabled) this.gauge.disable()
}

log.resume = function () {
  if (!this._paused) return
  this._paused = false

  var b = this._buffer
  this._buffer = []
  b.forEach(function (m) {
    this.emitLog(m)
  }, this)
  if (this.progressEnabled) this.gauge.enable()
}

log._buffer = []

var id = 0
log.record = []
log.maxRecordSize = 10000
log.log = function (lvl, prefix, message) {
  var l = this.levels[lvl]
  if (l === undefined) {
    return this.emit('error', new Error(util.format(
      'Undefined log level: %j', lvl)))
  }

  var a = new Array(arguments.length - 2)
  var stack = null
  for (var i = 2; i < arguments.length; i++) {
    var arg = a[i - 2] = arguments[i]

    // resolve stack traces to a plain string.
    if (typeof arg === 'object' && arg &&
        (arg instanceof Error) && arg.stack) {

      Object.defineProperty(arg, 'stack', {
        value: stack = arg.stack + '',
        enumerable: true,
        writable: true
      })
    }
  }
  if (stack) a.unshift(stack + '\n')
  message = util.format.apply(util, a)

  var m = { id: id++,
            level: lvl,
            prefix: String(prefix || ''),
            message: message,
            messageRaw: a }

  this.emit('log', m)
  this.emit('log.' + lvl, m)
  if (m.prefix) this.emit(m.prefix, m)

  this.record.push(m)
  var mrs = this.maxRecordSize
  var n = this.record.length - mrs
  if (n > mrs / 10) {
    var newSize = Math.floor(mrs * 0.9)
    this.record = this.record.slice(-1 * newSize)
  }

  this.emitLog(m)
}.bind(log)

log.emitLog = function (m) {
  if (this._paused) {
    this._buffer.push(m)
    return
  }
  if (this.progressEnabled) this.gauge.pulse(m.prefix)
  var l = this.levels[m.level]
  if (l === undefined) return
  if (l < this.levels[this.level]) return
  if (l > 0 && !isFinite(l)) return

  // If 'disp' is null or undefined, use the lvl as a default
  // Allows: '', 0 as valid disp
  var disp = log.disp[m.level] != null ? log.disp[m.level] : m.level
  this.clearProgress()
  m.message.split(/\r?\n/).forEach(function (line) {
    if (this.heading) {
      this.write(this.heading, this.headingStyle)
      this.write(' ')
    }
    this.write(disp, log.style[m.level])
    var p = m.prefix || ''
    if (p) this.write(' ')
    this.write(p, this.prefixStyle)
    this.write(' ' + line + '\n')
  }, this)
  this.showProgress()
}

log._format = function (msg, style) {
  if (!stream) return

  var output = ''
  if (this.useColor()) {
    style = style || {}
    var settings = []
    if (style.fg) settings.push(style.fg)
    if (style.bg) settings.push('bg' + style.bg[0].toUpperCase() + style.bg.slice(1))
    if (style.bold) settings.push('bold')
    if (style.underline) settings.push('underline')
    if (style.inverse) settings.push('inverse')
    if (settings.length) output += consoleControl.color(settings)
    if (style.beep) output += consoleControl.beep()
  }
  output += msg
  if (this.useColor()) {
    output += consoleControl.color('reset')
  }
  return output
}

log.write = function (msg, style) {
  if (!stream) return

  stream.write(this._format(msg, style))
}

log.addLevel = function (lvl, n, style, disp) {
  // If 'disp' is null or undefined, use the lvl as a default
  if (disp == null) disp = lvl
  this.levels[lvl] = n
  this.style[lvl] = style
  if (!this[lvl]) {
    this[lvl] = function () {
      var a = new Array(arguments.length + 1)
      a[0] = lvl
      for (var i = 0; i < arguments.length; i++) {
        a[i + 1] = arguments[i]
      }
      return this.log.apply(this, a)
    }.bind(this)
  }
  this.disp[lvl] = disp
}

log.prefixStyle = { fg: 'magenta' }
log.headingStyle = { fg: 'white', bg: 'black' }

log.style = {}
log.levels = {}
log.disp = {}
log.addLevel('silly', -Infinity, { inverse: true }, 'sill')
log.addLevel('verbose', 1000, { fg: 'blue', bg: 'black' }, 'verb')
log.addLevel('info', 2000, { fg: 'green' })
log.addLevel('timing', 2500, { fg: 'green', bg: 'black' })
log.addLevel('http', 3000, { fg: 'green', bg: 'black' })
log.addLevel('notice', 3500, { fg: 'blue', bg: 'black' })
log.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, 'WARN')
log.addLevel('error', 5000, { fg: 'red', bg: 'black' }, 'ERR!')
log.addLevel('silent', Infinity)

// allow 'error' prefix
log.on('error', function () {})


/***/ }),

/***/ "./node_modules/passport-local/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/passport-local/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(/*! ./strategy */ "./node_modules/passport-local/lib/strategy.js");


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),

/***/ "./node_modules/passport-local/lib/strategy.js":
/*!*****************************************************!*\
  !*** ./node_modules/passport-local/lib/strategy.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var passport = __webpack_require__(/*! passport-strategy */ "./node_modules/passport-strategy/lib/index.js")
  , util = __webpack_require__(/*! util */ "util")
  , lookup = __webpack_require__(/*! ./utils */ "./node_modules/passport-local/lib/utils.js").lookup;


/**
 * `Strategy` constructor.
 *
 * The local authentication strategy authenticates requests based on the
 * credentials submitted through an HTML-based login form.
 *
 * Applications must supply a `verify` callback which accepts `username` and
 * `password` credentials, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occured, `err` should be set.
 *
 * Optionally, `options` can be used to change the fields in which the
 * credentials are found.
 *
 * Options:
 *   - `usernameField`  field name where the username is found, defaults to _username_
 *   - `passwordField`  field name where the password is found, defaults to _password_
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *     passport.use(new LocalStrategy(
 *       function(username, password, done) {
 *         User.findOne({ username: username, password: password }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }
  
  this._usernameField = options.usernameField || 'username';
  this._passwordField = options.passwordField || 'password';
  
  passport.Strategy.call(this);
  this.name = 'local';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
  var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
  
  if (!username || !password) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
  }
  
  var self = this;
  
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  
  try {
    if (self._passReqToCallback) {
      this._verify(req, username, password, verified);
    } else {
      this._verify(username, password, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),

/***/ "./node_modules/passport-local/lib/utils.js":
/*!**************************************************!*\
  !*** ./node_modules/passport-local/lib/utils.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.lookup = function(obj, field) {
  if (!obj) { return null; }
  var chain = field.split(']').join('').split('[');
  for (var i = 0, len = chain.length; i < len; i++) {
    var prop = obj[chain[i]];
    if (typeof(prop) === 'undefined') { return null; }
    if (typeof(prop) !== 'object') { return prop; }
    obj = prop;
  }
  return null;
};


/***/ }),

/***/ "./node_modules/passport-strategy/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/passport-strategy/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(/*! ./strategy */ "./node_modules/passport-strategy/lib/strategy.js");


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),

/***/ "./node_modules/passport-strategy/lib/strategy.js":
/*!********************************************************!*\
  !*** ./node_modules/passport-strategy/lib/strategy.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates an instance of `Strategy`.
 *
 * @constructor
 * @api public
 */
function Strategy() {
}

/**
 * Authenticate request.
 *
 * This function must be overridden by subclasses.  In abstract form, it always
 * throws an exception.
 *
 * @param {Object} req The request to authenticate.
 * @param {Object} [options] Strategy-specific options.
 * @api public
 */
Strategy.prototype.authenticate = function(req, options) {
  throw new Error('Strategy#authenticate must be overridden by subclass');
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),

/***/ "./node_modules/passport/lib/authenticator.js":
/*!****************************************************!*\
  !*** ./node_modules/passport/lib/authenticator.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var SessionStrategy = __webpack_require__(/*! ./strategies/session */ "./node_modules/passport/lib/strategies/session.js")
  , SessionManager = __webpack_require__(/*! ./sessionmanager */ "./node_modules/passport/lib/sessionmanager.js");


/**
 * `Authenticator` constructor.
 *
 * @api public
 */
function Authenticator() {
  this._key = 'passport';
  this._strategies = {};
  this._serializers = [];
  this._deserializers = [];
  this._infoTransformers = [];
  this._framework = null;
  this._userProperty = 'user';
  
  this.init();
}

/**
 * Initialize authenticator.
 *
 * @api protected
 */
Authenticator.prototype.init = function() {
  this.framework(__webpack_require__(/*! ./framework/connect */ "./node_modules/passport/lib/framework/connect.js")());
  this.use(new SessionStrategy(this.deserializeUser.bind(this)));
  this._sm = new SessionManager({ key: this._key }, this.serializeUser.bind(this));
};

/**
 * Utilize the given `strategy` with optional `name`, overridding the strategy's
 * default name.
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy(...));
 *
 *     passport.use('api', new http.BasicStrategy(...));
 *
 * @param {String|Strategy} name
 * @param {Strategy} strategy
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.use = function(name, strategy) {
  if (!strategy) {
    strategy = name;
    name = strategy.name;
  }
  if (!name) { throw new Error('Authentication strategies must have a name'); }
  
  this._strategies[name] = strategy;
  return this;
};

/**
 * Un-utilize the `strategy` with given `name`.
 *
 * In typical applications, the necessary authentication strategies are static,
 * configured once and always available.  As such, there is often no need to
 * invoke this function.
 *
 * However, in certain situations, applications may need dynamically configure
 * and de-configure authentication strategies.  The `use()`/`unuse()`
 * combination satisfies these scenarios.
 *
 * Examples:
 *
 *     passport.unuse('legacy-api');
 *
 * @param {String} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.unuse = function(name) {
  delete this._strategies[name];
  return this;
};

/**
 * Setup Passport to be used under framework.
 *
 * By default, Passport exposes middleware that operate using Connect-style
 * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
 * have different expectations, and this function allows Passport to be adapted
 * to operate within such environments.
 *
 * If you are using a Connect-compatible framework, including Express, there is
 * no need to invoke this function.
 *
 * Examples:
 *
 *     passport.framework(require('hapi-passport')());
 *
 * @param {Object} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.framework = function(fw) {
  this._framework = fw;
  return this;
};

/**
 * Passport's primary initialization middleware.
 *
 * This middleware must be in use by the Connect/Express application for
 * Passport to operate.
 *
 * Options:
 *   - `userProperty`  Property to set on `req` upon login, defaults to _user_
 *
 * Examples:
 *
 *     app.use(passport.initialize());
 *
 *     app.use(passport.initialize({ userProperty: 'currentUser' }));
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.initialize = function(options) {
  options = options || {};
  this._userProperty = options.userProperty || 'user';
  
  return this._framework.initialize(this, options);
};

/**
 * Middleware that will authenticate a request using the given `strategy` name,
 * with optional `options` and `callback`.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);
 *
 *     passport.authenticate('local', function(err, user) {
 *       if (!user) { return res.redirect('/login'); }
 *       res.end('Authenticated!');
 *     })(req, res);
 *
 *     passport.authenticate('basic', { session: false })(req, res);
 *
 *     app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
 *       // request will be redirected to Twitter
 *     });
 *     app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
 *       res.json(req.user);
 *     });
 *
 * @param {String} strategy
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authenticate = function(strategy, options, callback) {
  return this._framework.authenticate(this, strategy, options, callback);
};

/**
 * Middleware that will authorize a third-party account using the given
 * `strategy` name, with optional `options`.
 *
 * If authorization is successful, the result provided by the strategy's verify
 * callback will be assigned to `req.account`.  The existing login session and
 * `req.user` will be unaffected.
 *
 * This function is particularly useful when connecting third-party accounts
 * to the local account of a user that is currently authenticated.
 *
 * Examples:
 *
 *    passport.authorize('twitter-authz', { failureRedirect: '/account' });
 *
 * @param {String} strategy
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authorize = function(strategy, options, callback) {
  options = options || {};
  options.assignProperty = 'account';
  
  var fn = this._framework.authorize || this._framework.authenticate;
  return fn(this, strategy, options, callback);
};

/**
 * Middleware that will restore login state from a session.
 *
 * Web applications typically use sessions to maintain login state between
 * requests.  For example, a user will authenticate by entering credentials into
 * a form which is submitted to the server.  If the credentials are valid, a
 * login session is established by setting a cookie containing a session
 * identifier in the user's web browser.  The web browser will send this cookie
 * in subsequent requests to the server, allowing a session to be maintained.
 *
 * If sessions are being utilized, and a login session has been established,
 * this middleware will populate `req.user` with the current user.
 *
 * Note that sessions are not strictly required for Passport to operate.
 * However, as a general rule, most web applications will make use of sessions.
 * An exception to this rule would be an API server, which expects each HTTP
 * request to provide credentials in an Authorization header.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 * Options:
 *   - `pauseStream`      Pause the request stream before deserializing the user
 *                        object from the session.  Defaults to _false_.  Should
 *                        be set to true in cases where middleware consuming the
 *                        request body is configured after passport and the
 *                        deserializeUser method is asynchronous.
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.session = function(options) {
  return this.authenticate('session', options);
};

// TODO: Make session manager pluggable
/*
Authenticator.prototype.sessionManager = function(mgr) {
  this._sm = mgr;
  return this;
}
*/

/**
 * Registers a function used to serialize user objects into the session.
 *
 * Examples:
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 * @api public
 */
Authenticator.prototype.serializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._serializers.push(fn);
  }
  
  // private implementation that traverses the chain of serializers, attempting
  // to serialize a user
  var user = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._serializers;
  (function pass(i, err, obj) {
    // serializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or serialized object was obtained, done
    if (err || obj || obj === 0) { return done(err, obj); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to serialize user into session'));
    }
    
    
    function serialized(e, o) {
      pass(i + 1, e, o);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, user, serialized);
      } else {
        layer(user, serialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to deserialize user objects out of the session.
 *
 * Examples:
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.deserializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._deserializers.push(fn);
  }
  
  // private implementation that traverses the chain of deserializers,
  // attempting to deserialize a user
  var obj = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._deserializers;
  (function pass(i, err, user) {
    // deserializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or deserialized user was obtained, done
    if (err || user) { return done(err, user); }
    // a valid user existed when establishing the session, but that user has
    // since been removed
    if (user === null || user === false) { return done(null, false); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to deserialize user out of session'));
    }
    
    
    function deserialized(e, u) {
      pass(i + 1, e, u);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, obj, deserialized);
      } else {
        layer(obj, deserialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to transform auth info.
 *
 * In some circumstances authorization details are contained in authentication
 * credentials or loaded as part of verification.
 *
 * For example, when using bearer tokens for API authentication, the tokens may
 * encode (either directly or indirectly in a database), details such as scope
 * of access or the client to which the token was issued.
 *
 * Such authorization details should be enforced separately from authentication.
 * Because Passport deals only with the latter, this is the responsiblity of
 * middleware or routes further along the chain.  However, it is not optimal to
 * decode the same data or execute the same database query later.  To avoid
 * this, Passport accepts optional `info` along with the authenticated `user`
 * in a strategy's `success()` action.  This info is set at `req.authInfo`,
 * where said later middlware or routes can access it.
 *
 * Optionally, applications can register transforms to proccess this info,
 * which take effect prior to `req.authInfo` being set.  This is useful, for
 * example, when the info contains a client ID.  The transform can load the
 * client from the database and include the instance in the transformed info,
 * allowing the full set of client properties to be convieniently accessed.
 *
 * If no transforms are registered, `info` supplied by the strategy will be left
 * unmodified.
 *
 * Examples:
 *
 *     passport.transformAuthInfo(function(info, done) {
 *       Client.findById(info.clientID, function (err, client) {
 *         info.client = client;
 *         done(err, info);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.transformAuthInfo = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._infoTransformers.push(fn);
  }
  
  // private implementation that traverses the chain of transformers,
  // attempting to transform auth info
  var info = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._infoTransformers;
  (function pass(i, err, tinfo) {
    // transformers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or transformed info was obtained, done
    if (err || tinfo) { return done(err, tinfo); }
    
    var layer = stack[i];
    if (!layer) {
      // if no transformers are registered (or they all pass), the default
      // behavior is to use the un-transformed info as-is
      return done(null, info);
    }
    
    
    function transformed(e, t) {
      pass(i + 1, e, t);
    }
    
    try {
      var arity = layer.length;
      if (arity == 1) {
        // sync
        var t = layer(info);
        transformed(null, t);
      } else if (arity == 3) {
        layer(req, info, transformed);
      } else {
        layer(info, transformed);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Return strategy with given `name`. 
 *
 * @param {String} name
 * @return {Strategy}
 * @api private
 */
Authenticator.prototype._strategy = function(name) {
  return this._strategies[name];
};


/**
 * Expose `Authenticator`.
 */
module.exports = Authenticator;


/***/ }),

/***/ "./node_modules/passport/lib/errors/authenticationerror.js":
/*!*****************************************************************!*\
  !*** ./node_modules/passport/lib/errors/authenticationerror.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * `AuthenticationError` error.
 *
 * @constructor
 * @api private
 */
function AuthenticationError(message, status) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthenticationError';
  this.message = message;
  this.status = status || 401;
}

// Inherit from `Error`.
AuthenticationError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = AuthenticationError;


/***/ }),

/***/ "./node_modules/passport/lib/framework/connect.js":
/*!********************************************************!*\
  !*** ./node_modules/passport/lib/framework/connect.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var initialize = __webpack_require__(/*! ../middleware/initialize */ "./node_modules/passport/lib/middleware/initialize.js")
  , authenticate = __webpack_require__(/*! ../middleware/authenticate */ "./node_modules/passport/lib/middleware/authenticate.js");
  
/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using Passport with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 *
 * @return {Object}
 * @api protected
 */
exports = module.exports = function() {
  
  // HTTP extensions.
  exports.__monkeypatchNode();
  
  return {
    initialize: initialize,
    authenticate: authenticate
  };
};

exports.__monkeypatchNode = function() {
  var http = __webpack_require__(/*! http */ "http");
  var IncomingMessageExt = __webpack_require__(/*! ../http/request */ "./node_modules/passport/lib/http/request.js");
  
  http.IncomingMessage.prototype.login =
  http.IncomingMessage.prototype.logIn = IncomingMessageExt.logIn;
  http.IncomingMessage.prototype.logout =
  http.IncomingMessage.prototype.logOut = IncomingMessageExt.logOut;
  http.IncomingMessage.prototype.isAuthenticated = IncomingMessageExt.isAuthenticated;
  http.IncomingMessage.prototype.isUnauthenticated = IncomingMessageExt.isUnauthenticated;
};


/***/ }),

/***/ "./node_modules/passport/lib/http/request.js":
/*!***************************************************!*\
  !*** ./node_modules/passport/lib/http/request.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Module dependencies.
 */
//var http = require('http')
//  , req = http.IncomingMessage.prototype;


var req = exports = module.exports = {};

/**
 * Initiate a login session for `user`.
 *
 * Options:
 *   - `session`  Save login state in session, defaults to _true_
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 *
 * @param {User} user
 * @param {Object} options
 * @param {Function} done
 * @api public
 */
req.login =
req.logIn = function(user, options, done) {
  if (typeof options == 'function') {
    done = options;
    options = {};
  }
  options = options || {};
  
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  var session = (options.session === undefined) ? true : options.session;
  
  this[property] = user;
  if (session) {
    if (!this._passport) { throw new Error('passport.initialize() middleware not in use'); }
    if (typeof done != 'function') { throw new Error('req#login requires a callback function'); }
    
    var self = this;
    this._passport.instance._sm.logIn(this, user, function(err) {
      if (err) { self[property] = null; return done(err); }
      done();
    });
  } else {
    done && done();
  }
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout =
req.logOut = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  this[property] = null;
  if (this._passport) {
    this._passport.instance._sm.logOut(this);
  }
};

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isAuthenticated = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  return (this[property]) ? true : false;
};

/**
 * Test if request is unauthenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isUnauthenticated = function() {
  return !this.isAuthenticated();
};


/***/ }),

/***/ "./node_modules/passport/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/passport/lib/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Passport = __webpack_require__(/*! ./authenticator */ "./node_modules/passport/lib/authenticator.js")
  , SessionStrategy = __webpack_require__(/*! ./strategies/session */ "./node_modules/passport/lib/strategies/session.js");


/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = new Passport();

/**
 * Expose constructors.
 */
exports.Passport =
exports.Authenticator = Passport;
exports.Strategy = __webpack_require__(/*! passport-strategy */ "./node_modules/passport-strategy/lib/index.js");

/**
 * Expose strategies.
 */
exports.strategies = {};
exports.strategies.SessionStrategy = SessionStrategy;


/***/ }),

/***/ "./node_modules/passport/lib/middleware/authenticate.js":
/*!**************************************************************!*\
  !*** ./node_modules/passport/lib/middleware/authenticate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var http = __webpack_require__(/*! http */ "http")
  , IncomingMessageExt = __webpack_require__(/*! ../http/request */ "./node_modules/passport/lib/http/request.js")
  , AuthenticationError = __webpack_require__(/*! ../errors/authenticationerror */ "./node_modules/passport/lib/errors/authenticationerror.js");


/**
 * Authenticates requests.
 *
 * Applies the `name`ed strategy (or strategies) to the incoming request, in
 * order to authenticate the request.  If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default.  If authentication fails, an unauthorized response
 * will be sent.
 *
 * Options:
 *   - `session`          Save login state in session, defaults to _true_
 *   - `successRedirect`  After successful login, redirect to given URL
 *   - `successMessage`   True to store success message in
 *                        req.session.messages, or a string to use as override
 *                        message for success.
 *   - `successFlash`     True to flash success messages or a string to use as a flash
 *                        message for success (overrides any from the strategy itself).
 *   - `failureRedirect`  After failed login, redirect to given URL
 *   - `failureMessage`   True to store failure message in
 *                        req.session.messages, or a string to use as override
 *                        message for failure.
 *   - `failureFlash`     True to flash failure messages or a string to use as a flash
 *                        message for failures (overrides any from the strategy itself).
 *   - `assignProperty`   Assign the object provided by the verify callback to given property
 *
 * An optional `callback` can be supplied to allow the application to override
 * the default manner in which authentication attempts are handled.  The
 * callback has the following signature, where `user` will be set to the
 * authenticated user on a successful authentication attempt, or `false`
 * otherwise.  An optional `info` argument will be passed, containing additional
 * details provided by the strategy's verify callback - this could be information about
 * a successful authentication or a challenge message for a failed authentication.
 * An optional `status` argument will be passed when authentication fails - this could
 * be a HTTP response code for a remote authentication failure or similar.
 *
 *     app.get('/protected', function(req, res, next) {
 *       passport.authenticate('local', function(err, user, info, status) {
 *         if (err) { return next(err) }
 *         if (!user) { return res.redirect('/signin') }
 *         res.redirect('/account');
 *       })(req, res, next);
 *     });
 *
 * Note that if a callback is supplied, it becomes the application's
 * responsibility to log-in the user, establish a session, and otherwise perform
 * the desired operations.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
 *
 *     passport.authenticate('basic', { session: false });
 *
 *     passport.authenticate('twitter');
 *
 * @param {Strategy|String|Array} name
 * @param {Object} options
 * @param {Function} callback
 * @return {Function}
 * @api public
 */
module.exports = function authenticate(passport, name, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  
  var multi = true;
  
  // Cast `name` to an array, allowing authentication to pass through a chain of
  // strategies.  The first strategy to succeed, redirect, or error will halt
  // the chain.  Authentication failures will proceed through each strategy in
  // series, ultimately failing if all strategies fail.
  //
  // This is typically used on API endpoints to allow clients to authenticate
  // using their preferred choice of Basic, Digest, token-based schemes, etc.
  // It is not feasible to construct a chain of multiple strategies that involve
  // redirection (for example both Facebook and Twitter), since the first one to
  // redirect will halt the chain.
  if (!Array.isArray(name)) {
    name = [ name ];
    multi = false;
  }
  
  return function authenticate(req, res, next) {
    if (http.IncomingMessage.prototype.logIn
        && http.IncomingMessage.prototype.logIn !== IncomingMessageExt.logIn) {
      __webpack_require__(/*! ../framework/connect */ "./node_modules/passport/lib/framework/connect.js").__monkeypatchNode();
    }
    
    
    // accumulator for failures from each strategy in the chain
    var failures = [];
    
    function allFailed() {
      if (callback) {
        if (!multi) {
          return callback(null, false, failures[0].challenge, failures[0].status);
        } else {
          var challenges = failures.map(function(f) { return f.challenge; });
          var statuses = failures.map(function(f) { return f.status; });
          return callback(null, false, challenges, statuses);
        }
      }
      
      // Strategies are ordered by priority.  For the purpose of flashing a
      // message, the first failure will be displayed.
      var failure = failures[0] || {}
        , challenge = failure.challenge || {}
        , msg;
    
      if (options.failureFlash) {
        var flash = options.failureFlash;
        if (typeof flash == 'string') {
          flash = { type: 'error', message: flash };
        }
        flash.type = flash.type || 'error';
      
        var type = flash.type || challenge.type || 'error';
        msg = flash.message || challenge.message || challenge;
        if (typeof msg == 'string') {
          req.flash(type, msg);
        }
      }
      if (options.failureMessage) {
        msg = options.failureMessage;
        if (typeof msg == 'boolean') {
          msg = challenge.message || challenge;
        }
        if (typeof msg == 'string') {
          req.session.messages = req.session.messages || [];
          req.session.messages.push(msg);
        }
      }
      if (options.failureRedirect) {
        return res.redirect(options.failureRedirect);
      }
    
      // When failure handling is not delegated to the application, the default
      // is to respond with 401 Unauthorized.  Note that the WWW-Authenticate
      // header will be set according to the strategies in use (see
      // actions#fail).  If multiple strategies failed, each of their challenges
      // will be included in the response.
      var rchallenge = []
        , rstatus, status;
      
      for (var j = 0, len = failures.length; j < len; j++) {
        failure = failures[j];
        challenge = failure.challenge;
        status = failure.status;
          
        rstatus = rstatus || status;
        if (typeof challenge == 'string') {
          rchallenge.push(challenge);
        }
      }
    
      res.statusCode = rstatus || 401;
      if (res.statusCode == 401 && rchallenge.length) {
        res.setHeader('WWW-Authenticate', rchallenge);
      }
      if (options.failWithError) {
        return next(new AuthenticationError(http.STATUS_CODES[res.statusCode], rstatus));
      }
      res.end(http.STATUS_CODES[res.statusCode]);
    }
    
    (function attempt(i) {
      var layer = name[i];
      // If no more strategies exist in the chain, authentication has failed.
      if (!layer) { return allFailed(); }
    
      // Get the strategy, which will be used as prototype from which to create
      // a new instance.  Action functions will then be bound to the strategy
      // within the context of the HTTP request/response pair.
      var strategy, prototype;
      if (typeof layer.authenticate == 'function') {
        strategy = layer;
      } else {
        prototype = passport._strategy(layer);
        if (!prototype) { return next(new Error('Unknown authentication strategy "' + layer + '"')); }
        
        strategy = Object.create(prototype);
      }
      
      
      // ----- BEGIN STRATEGY AUGMENTATION -----
      // Augment the new strategy instance with action functions.  These action
      // functions are bound via closure the the request/response pair.  The end
      // goal of the strategy is to invoke *one* of these action methods, in
      // order to indicate successful or failed authentication, redirect to a
      // third-party identity provider, etc.
      
      /**
       * Authenticate `user`, with optional `info`.
       *
       * Strategies should call this function to successfully authenticate a
       * user.  `user` should be an object supplied by the application after it
       * has been given an opportunity to verify credentials.  `info` is an
       * optional argument containing additional user information.  This is
       * useful for third-party authentication strategies to pass profile
       * details.
       *
       * @param {Object} user
       * @param {Object} info
       * @api public
       */
      strategy.success = function(user, info) {
        if (callback) {
          return callback(null, user, info);
        }
      
        info = info || {};
        var msg;
      
        if (options.successFlash) {
          var flash = options.successFlash;
          if (typeof flash == 'string') {
            flash = { type: 'success', message: flash };
          }
          flash.type = flash.type || 'success';
        
          var type = flash.type || info.type || 'success';
          msg = flash.message || info.message || info;
          if (typeof msg == 'string') {
            req.flash(type, msg);
          }
        }
        if (options.successMessage) {
          msg = options.successMessage;
          if (typeof msg == 'boolean') {
            msg = info.message || info;
          }
          if (typeof msg == 'string') {
            req.session.messages = req.session.messages || [];
            req.session.messages.push(msg);
          }
        }
        if (options.assignProperty) {
          req[options.assignProperty] = user;
          return next();
        }
      
        req.logIn(user, options, function(err) {
          if (err) { return next(err); }
          
          function complete() {
            if (options.successReturnToOrRedirect) {
              var url = options.successReturnToOrRedirect;
              if (req.session && req.session.returnTo) {
                url = req.session.returnTo;
                delete req.session.returnTo;
              }
              return res.redirect(url);
            }
            if (options.successRedirect) {
              return res.redirect(options.successRedirect);
            }
            next();
          }
          
          if (options.authInfo !== false) {
            passport.transformAuthInfo(info, req, function(err, tinfo) {
              if (err) { return next(err); }
              req.authInfo = tinfo;
              complete();
            });
          } else {
            complete();
          }
        });
      };
      
      /**
       * Fail authentication, with optional `challenge` and `status`, defaulting
       * to 401.
       *
       * Strategies should call this function to fail an authentication attempt.
       *
       * @param {String} challenge
       * @param {Number} status
       * @api public
       */
      strategy.fail = function(challenge, status) {
        if (typeof challenge == 'number') {
          status = challenge;
          challenge = undefined;
        }
        
        // push this failure into the accumulator and attempt authentication
        // using the next strategy
        failures.push({ challenge: challenge, status: status });
        attempt(i + 1);
      };
      
      /**
       * Redirect to `url` with optional `status`, defaulting to 302.
       *
       * Strategies should call this function to redirect the user (via their
       * user agent) to a third-party website for authentication.
       *
       * @param {String} url
       * @param {Number} status
       * @api public
       */
      strategy.redirect = function(url, status) {
        // NOTE: Do not use `res.redirect` from Express, because it can't decide
        //       what it wants.
        //
        //       Express 2.x: res.redirect(url, status)
        //       Express 3.x: res.redirect(status, url) -OR- res.redirect(url, status)
        //         - as of 3.14.0, deprecated warnings are issued if res.redirect(url, status)
        //           is used
        //       Express 4.x: res.redirect(status, url)
        //         - all versions (as of 4.8.7) continue to accept res.redirect(url, status)
        //           but issue deprecated versions
        
        res.statusCode = status || 302;
        res.setHeader('Location', url);
        res.setHeader('Content-Length', '0');
        res.end();
      };
      
      /**
       * Pass without making a success or fail decision.
       *
       * Under most circumstances, Strategies should not need to call this
       * function.  It exists primarily to allow previous authentication state
       * to be restored, for example from an HTTP session.
       *
       * @api public
       */
      strategy.pass = function() {
        next();
      };
      
      /**
       * Internal error while performing authentication.
       *
       * Strategies should call this function when an internal error occurs
       * during the process of performing authentication; for example, if the
       * user directory is not available.
       *
       * @param {Error} err
       * @api public
       */
      strategy.error = function(err) {
        if (callback) {
          return callback(err);
        }
        
        next(err);
      };
      
      // ----- END STRATEGY AUGMENTATION -----
    
      strategy.authenticate(req, options);
    })(0); // attempt
  };
};


/***/ }),

/***/ "./node_modules/passport/lib/middleware/initialize.js":
/*!************************************************************!*\
  !*** ./node_modules/passport/lib/middleware/initialize.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Passport initialization.
 *
 * Intializes Passport for incoming requests, allowing authentication strategies
 * to be applied.
 *
 * If sessions are being utilized, applications must set up Passport with
 * functions to serialize a user into and out of a session.  For example, a
 * common pattern is to serialize just the user ID into the session (due to the
 * fact that it is desirable to store the minimum amount of data in a session).
 * When a subsequent request arrives for the session, the full User object can
 * be loaded from the database by ID.
 *
 * Note that additional middleware is required to persist login state, so we
 * must use the `connect.session()` middleware _before_ `passport.initialize()`.
 *
 * If sessions are being used, this middleware must be in use by the
 * Connect/Express application for Passport to operate.  If the application is
 * entirely stateless (not using sessions), this middleware is not necessary,
 * but its use will not have any adverse impact.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @return {Function}
 * @api public
 */
module.exports = function initialize(passport) {
  
  return function initialize(req, res, next) {
    req._passport = {};
    req._passport.instance = passport;

    if (req.session && req.session[passport._key]) {
      // load data from existing session
      req._passport.session = req.session[passport._key];
    }

    next();
  };
};


/***/ }),

/***/ "./node_modules/passport/lib/sessionmanager.js":
/*!*****************************************************!*\
  !*** ./node_modules/passport/lib/sessionmanager.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function SessionManager(options, serializeUser) {
  if (typeof options == 'function') {
    serializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  this._key = options.key || 'passport';
  this._serializeUser = serializeUser;
}

SessionManager.prototype.logIn = function(req, user, cb) {
  var self = this;
  this._serializeUser(user, req, function(err, obj) {
    if (err) {
      return cb(err);
    }
    if (!req._passport.session) {
      req._passport.session = {};
    }
    req._passport.session.user = obj;
    if (!req.session) {
      req.session = {};
    }
    req.session[self._key] = req._passport.session;
    cb();
  });
}

SessionManager.prototype.logOut = function(req, cb) {
  if (req._passport && req._passport.session) {
    delete req._passport.session.user;
  }
  cb && cb();
}


module.exports = SessionManager;


/***/ }),

/***/ "./node_modules/passport/lib/strategies/session.js":
/*!*********************************************************!*\
  !*** ./node_modules/passport/lib/strategies/session.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var pause = __webpack_require__(/*! pause */ "./node_modules/pause/index.js")
  , util = __webpack_require__(/*! util */ "util")
  , Strategy = __webpack_require__(/*! passport-strategy */ "./node_modules/passport-strategy/lib/index.js");


/**
 * `SessionStrategy` constructor.
 *
 * @api public
 */
function SessionStrategy(options, deserializeUser) {
  if (typeof options == 'function') {
    deserializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  Strategy.call(this);
  this.name = 'session';
  this._deserializeUser = deserializeUser;
}

/**
 * Inherit from `Strategy`.
 */
util.inherits(SessionStrategy, Strategy);

/**
 * Authenticate request based on the current session state.
 *
 * The session authentication strategy uses the session to restore any login
 * state across requests.  If a login session has been established, `req.user`
 * will be populated with the current user.
 *
 * This strategy is registered automatically by Passport.
 *
 * @param {Object} req
 * @param {Object} options
 * @api protected
 */
SessionStrategy.prototype.authenticate = function(req, options) {
  if (!req._passport) { return this.error(new Error('passport.initialize() middleware not in use')); }
  options = options || {};

  var self = this, 
      su;
  if (req._passport.session) {
    su = req._passport.session.user;
  }

  if (su || su === 0) {
    // NOTE: Stream pausing is desirable in the case where later middleware is
    //       listening for events emitted from request.  For discussion on the
    //       matter, refer to: https://github.com/jaredhanson/passport/pull/106
    
    var paused = options.pauseStream ? pause(req) : null;
    this._deserializeUser(su, req, function(err, user) {
      if (err) { return self.error(err); }
      if (!user) {
        delete req._passport.session.user;
      } else {
        // TODO: Remove instance access
        var property = req._passport.instance._userProperty || 'user';
        req[property] = user;
      }
      self.pass();
      if (paused) {
        paused.resume();
      }
    });
  } else {
    self.pass();
  }
};


/**
 * Expose `SessionStrategy`.
 */
module.exports = SessionStrategy;


/***/ }),

/***/ "./node_modules/pause/index.js":
/*!*************************************!*\
  !*** ./node_modules/pause/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = function(obj){
  var onData
    , onEnd
    , events = [];

  // buffer data
  obj.on('data', onData = function(data, encoding){
    events.push(['data', data, encoding]);
  });

  // buffer end
  obj.on('end', onEnd = function(data, encoding){
    events.push(['end', data, encoding]);
  });

  return {
    end: function(){
      obj.removeListener('data', onData);
      obj.removeListener('end', onEnd);
    },
    resume: function(){
      this.end();
      for (var i = 0, len = events.length; i < len; ++i) {
        obj.emit.apply(obj, events[i]);
      }
    }
  };
};

/***/ }),

/***/ "./node_modules/sax/lib/sax.js":
/*!*************************************!*\
  !*** ./node_modules/sax/lib/sax.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (sax) { // wrapper for non-node envs
  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
  sax.SAXParser = SAXParser
  sax.SAXStream = SAXStream
  sax.createStream = createStream

  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.
  sax.MAX_BUFFER_LENGTH = 64 * 1024

  var buffers = [
    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
    'procInstName', 'procInstBody', 'entity', 'attribName',
    'attribValue', 'cdata', 'script'
  ]

  sax.EVENTS = [
    'text',
    'processinginstruction',
    'sgmldeclaration',
    'doctype',
    'comment',
    'opentagstart',
    'attribute',
    'opentag',
    'closetag',
    'opencdata',
    'cdata',
    'closecdata',
    'error',
    'end',
    'ready',
    'script',
    'opennamespace',
    'closenamespace'
  ]

  function SAXParser (strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt)
    }

    var parser = this
    clearBuffers(parser)
    parser.q = parser.c = ''
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
    parser.opt = opt || {}
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase'
    parser.tags = []
    parser.closed = parser.closedRoot = parser.sawRoot = false
    parser.tag = parser.error = null
    parser.strict = !!strict
    parser.noscript = !!(strict || parser.opt.noscript)
    parser.state = S.BEGIN
    parser.strictEntities = parser.opt.strictEntities
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES)
    parser.attribList = []

    // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.
    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS)
    }

    // mostly just for error reporting
    parser.trackPosition = parser.opt.position !== false
    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0
    }
    emit(parser, 'onready')
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F () {}
      F.prototype = o
      var newf = new F()
      return newf
    }
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = []
      for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
      return a
    }
  }

  function checkBufferLength (parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    var maxActual = 0
    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length
      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser)
            break

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata)
            parser.cdata = ''
            break

          case 'script':
            emitNode(parser, 'onscript', parser.script)
            parser.script = ''
            break

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i])
        }
      }
      maxActual = Math.max(maxActual, len)
    }
    // schedule the next check for the earliest possible buffer overrun.
    var m = sax.MAX_BUFFER_LENGTH - maxActual
    parser.bufferCheckPosition = m + parser.position
  }

  function clearBuffers (parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = ''
    }
  }

  function flushBuffers (parser) {
    closeText(parser)
    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata)
      parser.cdata = ''
    }
    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }
  }

  SAXParser.prototype = {
    end: function () { end(this) },
    write: write,
    resume: function () { this.error = null; return this },
    close: function () { return this.write(null) },
    flush: function () { flushBuffers(this) }
  }

  var Stream
  try {
    Stream = __webpack_require__(/*! stream */ "stream").Stream
  } catch (ex) {
    Stream = function () {}
  }

  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end'
  })

  function createStream (strict, opt) {
    return new SAXStream(strict, opt)
  }

  function SAXStream (strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt)
    }

    Stream.apply(this)

    this._parser = new SAXParser(strict, opt)
    this.writable = true
    this.readable = true

    var me = this

    this._parser.onend = function () {
      me.emit('end')
    }

    this._parser.onerror = function (er) {
      me.emit('error', er)

      // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.
      me._parser.error = null
    }

    this._decoder = null

    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function () {
          return me._parser['on' + ev]
        },
        set: function (h) {
          if (!h) {
            me.removeAllListeners(ev)
            me._parser['on' + ev] = h
            return h
          }
          me.on(ev, h)
        },
        enumerable: true,
        configurable: false
      })
    })
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  })

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = __webpack_require__(/*! string_decoder */ "string_decoder").StringDecoder
        this._decoder = new SD('utf8')
      }
      data = this._decoder.write(data)
    }

    this._parser.write(data.toString())
    this.emit('data', data)
    return true
  }

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk)
    }
    this._parser.end()
    return true
  }

  SAXStream.prototype.on = function (ev, handler) {
    var me = this
    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
        args.splice(0, 0, ev)
        me.emit.apply(me, args)
      }
    }

    return Stream.prototype.on.call(me, ev, handler)
  }

  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  var CDATA = '[CDATA['
  var DOCTYPE = 'DOCTYPE'
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'
  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  // This implementation works on strings, a single character at a time
  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  // without a significant breaking change to either this  parser, or the
  // JavaScript language.  Implementation of an emoji-capable xml parser
  // is left as an exercise for the reader.
  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  function isWhitespace (c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
  }

  function isQuote (c) {
    return c === '"' || c === '\''
  }

  function isAttribEnd (c) {
    return c === '>' || isWhitespace(c)
  }

  function isMatch (regex, c) {
    return regex.test(c)
  }

  function notMatch (regex, c) {
    return !isMatch(regex, c)
  }

  var S = 0
  sax.STATE = {
    BEGIN: S++, // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++, // leading whitespace
    TEXT: S++, // general stuff
    TEXT_ENTITY: S++, // &amp and such.
    OPEN_WAKA: S++, // <
    SGML_DECL: S++, // <!BLARG
    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
    DOCTYPE: S++, // <!DOCTYPE
    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++, // <!-
    COMMENT: S++, // <!--
    COMMENT_ENDING: S++, // <!-- blah -
    COMMENT_ENDED: S++, // <!-- blah --
    CDATA: S++, // <![CDATA[ something
    CDATA_ENDING: S++, // ]
    CDATA_ENDING_2: S++, // ]]
    PROC_INST: S++, // <?hi
    PROC_INST_BODY: S++, // <?hi there
    PROC_INST_ENDING: S++, // <?hi "there" ?
    OPEN_TAG: S++, // <strong
    OPEN_TAG_SLASH: S++, // <strong /
    ATTRIB: S++, // <a
    ATTRIB_NAME: S++, // <a foo
    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
    ATTRIB_VALUE: S++, // <a foo=
    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
    CLOSE_TAG: S++, // </a
    CLOSE_TAG_SAW_WHITE: S++, // </a   >
    SCRIPT: S++, // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <
  }

  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  }

  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  }

  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
  })

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s
  }

  // shorthand
  S = sax.STATE

  function emit (parser, event, data) {
    parser[event] && parser[event](data)
  }

  function emitNode (parser, nodeType, data) {
    if (parser.textNode) closeText(parser)
    emit(parser, nodeType, data)
  }

  function closeText (parser) {
    parser.textNode = textopts(parser.opt, parser.textNode)
    if (parser.textNode) emit(parser, 'ontext', parser.textNode)
    parser.textNode = ''
  }

  function textopts (opt, text) {
    if (opt.trim) text = text.trim()
    if (opt.normalize) text = text.replace(/\s+/g, ' ')
    return text
  }

  function error (parser, er) {
    closeText(parser)
    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line +
        '\nColumn: ' + parser.column +
        '\nChar: ' + parser.c
    }
    er = new Error(er)
    parser.error = er
    emit(parser, 'onerror', er)
    return parser
  }

  function end (parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag')
    if ((parser.state !== S.BEGIN) &&
      (parser.state !== S.BEGIN_WHITESPACE) &&
      (parser.state !== S.TEXT)) {
      error(parser, 'Unexpected end')
    }
    closeText(parser)
    parser.c = ''
    parser.closed = true
    emit(parser, 'onend')
    SAXParser.call(parser, parser.strict, parser.opt)
    return parser
  }

  function strictFail (parser, message) {
    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail')
    }
    if (parser.strict) {
      error(parser, message)
    }
  }

  function newTag (parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
    var parent = parser.tags[parser.tags.length - 1] || parser
    var tag = parser.tag = { name: parser.tagName, attributes: {} }

    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
    if (parser.opt.xmlns) {
      tag.ns = parent.ns
    }
    parser.attribList.length = 0
    emitNode(parser, 'onopentagstart', tag)
  }

  function qname (name, attribute) {
    var i = name.indexOf(':')
    var qualName = i < 0 ? [ '', name ] : name.split(':')
    var prefix = qualName[0]
    var local = qualName[1]

    // <x "xmlns"="http://foo">
    if (attribute && name === 'xmlns') {
      prefix = 'xmlns'
      local = ''
    }

    return { prefix: prefix, local: local }
  }

  function attrib (parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]()
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = ''
      return
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true)
      var prefix = qn.prefix
      var local = qn.local

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser,
            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser,
            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else {
          var tag = parser.tag
          var parent = parser.tags[parser.tags.length - 1] || parser
          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns)
          }
          tag.ns[local] = parser.attribValue
        }
      }

      // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order
      parser.attribList.push([parser.attribName, parser.attribValue])
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      })
    }

    parser.attribName = parser.attribValue = ''
  }

  function openTag (parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag

      // add namespace info to tag
      var qn = qname(parser.tagName)
      tag.prefix = qn.prefix
      tag.local = qn.local
      tag.uri = tag.ns[qn.prefix] || ''

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' +
          JSON.stringify(parser.tagName))
        tag.uri = qn.prefix
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          })
        })
      }

      // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting
      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i]
        var name = nv[0]
        var value = nv[1]
        var qualName = qname(name, true)
        var prefix = qualName.prefix
        var local = qualName.local
        var uri = prefix === '' ? '' : (tag.ns[prefix] || '')
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri
        }

        // if there's any attributes with an undefined namespace,
        // then fail on them now.
        if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' +
            JSON.stringify(prefix))
          a.uri = prefix
        }
        parser.tag.attributes[name] = a
        emitNode(parser, 'onattribute', a)
      }
      parser.attribList.length = 0
    }

    parser.tag.isSelfClosing = !!selfClosing

    // process the tag
    parser.sawRoot = true
    parser.tags.push(parser.tag)
    emitNode(parser, 'onopentag', parser.tag)
    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT
      } else {
        parser.state = S.TEXT
      }
      parser.tag = null
      parser.tagName = ''
    }
    parser.attribName = parser.attribValue = ''
    parser.attribList.length = 0
  }

  function closeTag (parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.')
      parser.textNode += '</>'
      parser.state = S.TEXT
      return
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>'
        parser.tagName = ''
        parser.state = S.SCRIPT
        return
      }
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }

    // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.
    var t = parser.tags.length
    var tagName = parser.tagName
    if (!parser.strict) {
      tagName = tagName[parser.looseCase]()
    }
    var closeTo = tagName
    while (t--) {
      var close = parser.tags[t]
      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag')
      } else {
        break
      }
    }

    // didn't find it.  we already failed for strict, so just abort.
    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName)
      parser.textNode += '</' + parser.tagName + '>'
      parser.state = S.TEXT
      return
    }
    parser.tagName = tagName
    var s = parser.tags.length
    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop()
      parser.tagName = parser.tag.name
      emitNode(parser, 'onclosetag', parser.tagName)

      var x = {}
      for (var i in tag.ns) {
        x[i] = tag.ns[i]
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p]
          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n })
        })
      }
    }
    if (t === 0) parser.closedRoot = true
    parser.tagName = parser.attribValue = parser.attribName = ''
    parser.attribList.length = 0
    parser.state = S.TEXT
  }

  function parseEntity (parser) {
    var entity = parser.entity
    var entityLC = entity.toLowerCase()
    var num
    var numStr = ''

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity]
    }
    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC]
    }
    entity = entityLC
    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2)
        num = parseInt(entity, 16)
        numStr = num.toString(16)
      } else {
        entity = entity.slice(1)
        num = parseInt(entity, 10)
        numStr = num.toString(10)
      }
    }
    entity = entity.replace(/^0+/, '')
    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity')
      return '&' + parser.entity + ';'
    }

    return String.fromCodePoint(num)
  }

  function beginWhiteSpace (parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA
      parser.startTagPosition = parser.position
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.')
      parser.textNode = c
      parser.state = S.TEXT
    }
  }

  function charAt (chunk, i) {
    var result = ''
    if (i < chunk.length) {
      result = chunk.charAt(i)
    }
    return result
  }

  function write (chunk) {
    var parser = this
    if (this.error) {
      throw this.error
    }
    if (parser.closed) {
      return error(parser,
        'Cannot write after close. Assign an onready handler.')
    }
    if (chunk === null) {
      return end(parser)
    }
    if (typeof chunk === 'object') {
      chunk = chunk.toString()
    }
    var i = 0
    var c = ''
    while (true) {
      c = charAt(chunk, i++)
      parser.c = c

      if (!c) {
        break
      }

      if (parser.trackPosition) {
        parser.position++
        if (c === '\n') {
          parser.line++
          parser.column = 0
        } else {
          parser.column++
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE
          if (c === '\uFEFF') {
            continue
          }
          beginWhiteSpace(parser, c)
          continue

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c)
          continue

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1
            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++)
              if (c && parser.trackPosition) {
                parser.position++
                if (c === '\n') {
                  parser.line++
                  parser.column = 0
                } else {
                  parser.column++
                }
              }
            }
            parser.textNode += chunk.substring(starti, i - 1)
          }
          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA
            parser.startTagPosition = parser.position
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.')
            }
            if (c === '&') {
              parser.state = S.TEXT_ENTITY
            } else {
              parser.textNode += c
            }
          }
          continue

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING
          } else {
            parser.script += c
          }
          continue

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG
          } else {
            parser.script += '<' + c
            parser.state = S.SCRIPT
          }
          continue

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL
            parser.sgmlDecl = ''
          } else if (isWhitespace(c)) {
            // wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG
            parser.tagName = c
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG
            parser.tagName = ''
          } else if (c === '?') {
            parser.state = S.PROC_INST
            parser.procInstName = parser.procInstBody = ''
          } else {
            strictFail(parser, 'Unencoded <')
            // if there was some whitespace, then add that in.
            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition
              c = new Array(pad).join(' ') + c
            }
            parser.textNode += '<' + c
            parser.state = S.TEXT
          }
          continue

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata')
            parser.state = S.CDATA
            parser.sgmlDecl = ''
            parser.cdata = ''
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT
            parser.comment = ''
            parser.sgmlDecl = ''
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE
            if (parser.doctype || parser.sawRoot) {
              strictFail(parser,
                'Inappropriately located doctype declaration')
            }
            parser.doctype = ''
            parser.sgmlDecl = ''
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl)
            parser.sgmlDecl = ''
            parser.state = S.TEXT
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED
            parser.sgmlDecl += c
          } else {
            parser.sgmlDecl += c
          }
          continue

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL
            parser.q = ''
          }
          parser.sgmlDecl += c
          continue

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT
            emitNode(parser, 'ondoctype', parser.doctype)
            parser.doctype = true // just remember that we saw it.
          } else {
            parser.doctype += c
            if (c === '[') {
              parser.state = S.DOCTYPE_DTD
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED
              parser.q = c
            }
          }
          continue

        case S.DOCTYPE_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.q = ''
            parser.state = S.DOCTYPE
          }
          continue

        case S.DOCTYPE_DTD:
          parser.doctype += c
          if (c === ']') {
            parser.state = S.DOCTYPE
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED
            parser.q = c
          }
          continue

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD
            parser.q = ''
          }
          continue

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING
          } else {
            parser.comment += c
          }
          continue

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED
            parser.comment = textopts(parser.opt, parser.comment)
            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment)
            }
            parser.comment = ''
          } else {
            parser.comment += '-' + c
            parser.state = S.COMMENT
          }
          continue

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment')
            // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "
            parser.comment += '--' + c
            parser.state = S.COMMENT
          } else {
            parser.state = S.TEXT
          }
          continue

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING
          } else {
            parser.cdata += c
          }
          continue

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2
          } else {
            parser.cdata += ']' + c
            parser.state = S.CDATA
          }
          continue

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata)
            }
            emitNode(parser, 'onclosecdata')
            parser.cdata = ''
            parser.state = S.TEXT
          } else if (c === ']') {
            parser.cdata += ']'
          } else {
            parser.cdata += ']]' + c
            parser.state = S.CDATA
          }
          continue

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY
          } else {
            parser.procInstName += c
          }
          continue

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else {
            parser.procInstBody += c
          }
          continue

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            })
            parser.procInstName = parser.procInstBody = ''
            parser.state = S.TEXT
          } else {
            parser.procInstBody += '?' + c
            parser.state = S.PROC_INST_BODY
          }
          continue

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else {
            newTag(parser)
            if (c === '>') {
              openTag(parser)
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name')
              }
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true)
            closeTag(parser)
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >')
            parser.state = S.ATTRIB
          }
          continue

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value')
            parser.attribValue = parser.attribName
            attrib(parser)
            openTag(parser)
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (isWhitespace(c)) {
            continue
          } else {
            strictFail(parser, 'Attribute without value')
            parser.tag.attributes[parser.attribName] = ''
            parser.attribValue = ''
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            })
            parser.attribName = ''
            if (c === '>') {
              openTag(parser)
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c
              parser.state = S.ATTRIB_NAME
            } else {
              strictFail(parser, 'Invalid attribute name')
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue
          } else if (isQuote(c)) {
            parser.q = c
            parser.state = S.ATTRIB_VALUE_QUOTED
          } else {
            strictFail(parser, 'Unquoted attribute value')
            parser.state = S.ATTRIB_VALUE_UNQUOTED
            parser.attribValue = c
          }
          continue

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          parser.q = ''
          parser.state = S.ATTRIB_VALUE_CLOSED
          continue

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes')
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          if (c === '>') {
            openTag(parser)
          } else {
            parser.state = S.ATTRIB
          }
          continue

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c
                parser.state = S.SCRIPT
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.')
              }
            } else {
              parser.tagName = c
            }
          } else if (c === '>') {
            closeTag(parser)
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else if (parser.script) {
            parser.script += '</' + parser.tagName
            parser.tagName = ''
            parser.state = S.SCRIPT
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag')
            }
            parser.state = S.CLOSE_TAG_SAW_WHITE
          }
          continue

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue
          }
          if (c === '>') {
            closeTag(parser)
          } else {
            strictFail(parser, 'Invalid characters in closing tag')
          }
          continue

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState
          var buffer
          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT
              buffer = 'textNode'
              break

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED
              buffer = 'attribValue'
              break

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED
              buffer = 'attribValue'
              break
          }

          if (c === ';') {
            parser[buffer] += parseEntity(parser)
            parser.entity = ''
            parser.state = returnState
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c
          } else {
            strictFail(parser, 'Invalid character in entity name')
            parser[buffer] += '&' + parser.entity + c
            parser.entity = ''
            parser.state = returnState
          }

          continue

        default:
          throw new Error(parser, 'Unknown state: ' + parser.state)
      }
    } // while

    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser)
    }
    return parser
  }

  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  /* istanbul ignore next */
  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode
      var floor = Math.floor
      var fromCodePoint = function () {
        var MAX_SIZE = 0x4000
        var codeUnits = []
        var highSurrogate
        var lowSurrogate
        var index = -1
        var length = arguments.length
        if (!length) {
          return ''
        }
        var result = ''
        while (++index < length) {
          var codePoint = Number(arguments[index])
          if (
            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) !== codePoint // not an integer
          ) {
            throw RangeError('Invalid code point: ' + codePoint)
          }
          if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint)
          } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000
            highSurrogate = (codePoint >> 10) + 0xD800
            lowSurrogate = (codePoint % 0x400) + 0xDC00
            codeUnits.push(highSurrogate, lowSurrogate)
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits)
            codeUnits.length = 0
          }
        }
        return result
      }
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        })
      } else {
        String.fromCodePoint = fromCodePoint
      }
    }())
  }
})( false ? undefined : exports)


/***/ }),

/***/ "./node_modules/tar/index.js":
/*!***********************************!*\
  !*** ./node_modules/tar/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// high-level commands
exports.c = exports.create = __webpack_require__(/*! ./lib/create.js */ "./node_modules/tar/lib/create.js")
exports.r = exports.replace = __webpack_require__(/*! ./lib/replace.js */ "./node_modules/tar/lib/replace.js")
exports.t = exports.list = __webpack_require__(/*! ./lib/list.js */ "./node_modules/tar/lib/list.js")
exports.u = exports.update = __webpack_require__(/*! ./lib/update.js */ "./node_modules/tar/lib/update.js")
exports.x = exports.extract = __webpack_require__(/*! ./lib/extract.js */ "./node_modules/tar/lib/extract.js")

// classes
exports.Pack = __webpack_require__(/*! ./lib/pack.js */ "./node_modules/tar/lib/pack.js")
exports.Unpack = __webpack_require__(/*! ./lib/unpack.js */ "./node_modules/tar/lib/unpack.js")
exports.Parse = __webpack_require__(/*! ./lib/parse.js */ "./node_modules/tar/lib/parse.js")
exports.ReadEntry = __webpack_require__(/*! ./lib/read-entry.js */ "./node_modules/tar/lib/read-entry.js")
exports.WriteEntry = __webpack_require__(/*! ./lib/write-entry.js */ "./node_modules/tar/lib/write-entry.js")
exports.Header = __webpack_require__(/*! ./lib/header.js */ "./node_modules/tar/lib/header.js")
exports.Pax = __webpack_require__(/*! ./lib/pax.js */ "./node_modules/tar/lib/pax.js")
exports.types = __webpack_require__(/*! ./lib/types.js */ "./node_modules/tar/lib/types.js")


/***/ }),

/***/ "./node_modules/tar/lib/buffer.js":
/*!****************************************!*\
  !*** ./node_modules/tar/lib/buffer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Buffer in node 4.x < 4.5.0 doesn't have working Buffer.from
// or Buffer.alloc, and Buffer in node 10 deprecated the ctor.
// .M, this is fine .\^/M..
let B = Buffer
/* istanbul ignore next */
if (!B.alloc) {
  B = __webpack_require__(/*! safe-buffer */ "safe-buffer").Buffer
}
module.exports = B


/***/ }),

/***/ "./node_modules/tar/lib/create.js":
/*!****************************************!*\
  !*** ./node_modules/tar/lib/create.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// tar -c
const hlo = __webpack_require__(/*! ./high-level-opt.js */ "./node_modules/tar/lib/high-level-opt.js")

const Pack = __webpack_require__(/*! ./pack.js */ "./node_modules/tar/lib/pack.js")
const fs = __webpack_require__(/*! fs */ "fs")
const fsm = __webpack_require__(/*! fs-minipass */ "./node_modules/fs-minipass/index.js")
const t = __webpack_require__(/*! ./list.js */ "./node_modules/tar/lib/list.js")
const path = __webpack_require__(/*! path */ "path")

const c = module.exports = (opt_, files, cb) => {
  if (typeof files === 'function')
    cb = files

  if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  return opt.file && opt.sync ? createFileSync(opt, files)
    : opt.file ? createFile(opt, files, cb)
    : opt.sync ? createSync(opt, files)
    : create(opt, files)
}

const createFileSync = (opt, files) => {
  const p = new Pack.Sync(opt)
  const stream = new fsm.WriteStreamSync(opt.file, {
    mode: opt.mode || 0o666
  })
  p.pipe(stream)
  addFilesSync(p, files)
}

const createFile = (opt, files, cb) => {
  const p = new Pack(opt)
  const stream = new fsm.WriteStream(opt.file, {
    mode: opt.mode || 0o666
  })
  p.pipe(stream)

  const promise = new Promise((res, rej) => {
    stream.on('error', rej)
    stream.on('close', res)
    p.on('error', rej)
  })

  addFilesAsync(p, files)

  return cb ? promise.then(cb, cb) : promise
}

const addFilesSync = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@')
      t({
        file: path.resolve(p.cwd, file.substr(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry)
      })
    else
      p.add(file)
  })
  p.end()
}

const addFilesAsync = (p, files) => {
  while (files.length) {
    const file = files.shift()
    if (file.charAt(0) === '@')
      return t({
        file: path.resolve(p.cwd, file.substr(1)),
        noResume: true,
        onentry: entry => p.add(entry)
      }).then(_ => addFilesAsync(p, files))
    else
      p.add(file)
  }
  p.end()
}

const createSync = (opt, files) => {
  const p = new Pack.Sync(opt)
  addFilesSync(p, files)
  return p
}

const create = (opt, files) => {
  const p = new Pack(opt)
  addFilesAsync(p, files)
  return p
}


/***/ }),

/***/ "./node_modules/tar/lib/extract.js":
/*!*****************************************!*\
  !*** ./node_modules/tar/lib/extract.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// tar -x
const hlo = __webpack_require__(/*! ./high-level-opt.js */ "./node_modules/tar/lib/high-level-opt.js")
const Unpack = __webpack_require__(/*! ./unpack.js */ "./node_modules/tar/lib/unpack.js")
const fs = __webpack_require__(/*! fs */ "fs")
const fsm = __webpack_require__(/*! fs-minipass */ "./node_modules/fs-minipass/index.js")
const path = __webpack_require__(/*! path */ "path")

const x = module.exports = (opt_, files, cb) => {
  if (typeof opt_ === 'function')
    cb = opt_, files = null, opt_ = {}
  else if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (typeof files === 'function')
    cb = files, files = null

  if (!files)
    files = []
  else
    files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  if (files.length)
    filesFilter(opt, files)

  return opt.file && opt.sync ? extractFileSync(opt)
    : opt.file ? extractFile(opt, cb)
    : opt.sync ? extractSync(opt)
    : extract(opt)
}

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [f.replace(/\/+$/, ''), true]))
  const filter = opt.filter

  const mapHas = (file, r) => {
    const root = r || path.parse(file).root || '.'
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path.dirname(file), root)

    map.set(file, ret)
    return ret
  }

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(file.replace(/\/+$/, ''))
    : file => mapHas(file.replace(/\/+$/, ''))
}

const extractFileSync = opt => {
  const u = new Unpack.Sync(opt)

  const file = opt.file
  let threw = true
  let fd
  const stat = fs.statSync(file)
  // This trades a zero-byte read() syscall for a stat
  // However, it will usually result in less memory allocation
  const readSize = opt.maxReadSize || 16*1024*1024
  const stream = new fsm.ReadStreamSync(file, {
    readSize: readSize,
    size: stat.size
  })
  stream.pipe(u)
}

const extractFile = (opt, cb) => {
  const u = new Unpack(opt)
  const readSize = opt.maxReadSize || 16*1024*1024

  const file = opt.file
  const p = new Promise((resolve, reject) => {
    u.on('error', reject)
    u.on('close', resolve)

    // This trades a zero-byte read() syscall for a stat
    // However, it will usually result in less memory allocation
    fs.stat(file, (er, stat) => {
      if (er)
        reject(er)
      else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size
        })
        stream.on('error', reject)
        stream.pipe(u)
      }
    })
  })
  return cb ? p.then(cb, cb) : p
}

const extractSync = opt => {
  return new Unpack.Sync(opt)
}

const extract = opt => {
  return new Unpack(opt)
}


/***/ }),

/***/ "./node_modules/tar/lib/header.js":
/*!****************************************!*\
  !*** ./node_modules/tar/lib/header.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// parse a 512-byte header block to a data object, or vice-versa
// encode returns `true` if a pax extended header is needed, because
// the data could not be faithfully encoded in a simple header.
// (Also, check header.needPax to see if it needs a pax header.)

const Buffer = __webpack_require__(/*! ./buffer.js */ "./node_modules/tar/lib/buffer.js")
const types = __webpack_require__(/*! ./types.js */ "./node_modules/tar/lib/types.js")
const pathModule = __webpack_require__(/*! path */ "path").posix
const large = __webpack_require__(/*! ./large-numbers.js */ "./node_modules/tar/lib/large-numbers.js")

const SLURP = Symbol('slurp')
const TYPE = Symbol('type')

class Header {
  constructor (data, off, ex, gex) {
    this.cksumValid = false
    this.needPax = false
    this.nullBlock = false

    this.block = null
    this.path = null
    this.mode = null
    this.uid = null
    this.gid = null
    this.size = null
    this.mtime = null
    this.cksum = null
    this[TYPE] = '0'
    this.linkpath = null
    this.uname = null
    this.gname = null
    this.devmaj = 0
    this.devmin = 0
    this.atime = null
    this.ctime = null

    if (Buffer.isBuffer(data))
      this.decode(data, off || 0, ex, gex)
    else if (data)
      this.set(data)
  }

  decode (buf, off, ex, gex) {
    if (!off)
      off = 0

    if (!buf || !(buf.length >= off + 512))
      throw new Error('need 512 bytes for header')

    this.path = decString(buf, off, 100)
    this.mode = decNumber(buf, off + 100, 8)
    this.uid = decNumber(buf, off + 108, 8)
    this.gid = decNumber(buf, off + 116, 8)
    this.size = decNumber(buf, off + 124, 12)
    this.mtime = decDate(buf, off + 136, 12)
    this.cksum = decNumber(buf, off + 148, 12)

    // if we have extended or global extended headers, apply them now
    // See https://github.com/npm/node-tar/pull/187
    this[SLURP](ex)
    this[SLURP](gex, true)

    // old tar versions marked dirs as a file with a trailing /
    this[TYPE] = decString(buf, off + 156, 1)
    if (this[TYPE] === '')
      this[TYPE] = '0'
    if (this[TYPE] === '0' && this.path.substr(-1) === '/')
      this[TYPE] = '5'

    // tar implementations sometimes incorrectly put the stat(dir).size
    // as the size in the tarball, even though Directory entries are
    // not able to have any body at all.  In the very rare chance that
    // it actually DOES have a body, we weren't going to do anything with
    // it anyway, and it'll just be a warning about an invalid header.
    if (this[TYPE] === '5')
      this.size = 0

    this.linkpath = decString(buf, off + 157, 100)
    if (buf.slice(off + 257, off + 265).toString() === 'ustar\u000000') {
      this.uname = decString(buf, off + 265, 32)
      this.gname = decString(buf, off + 297, 32)
      this.devmaj = decNumber(buf, off + 329, 8)
      this.devmin = decNumber(buf, off + 337, 8)
      if (buf[off + 475] !== 0) {
        // definitely a prefix, definitely >130 chars.
        const prefix = decString(buf, off + 345, 155)
        this.path = prefix + '/' + this.path
      } else {
        const prefix = decString(buf, off + 345, 130)
        if (prefix)
          this.path = prefix + '/' + this.path
        this.atime = decDate(buf, off + 476, 12)
        this.ctime = decDate(buf, off + 488, 12)
      }
    }

    let sum = 8 * 0x20
    for (let i = off; i < off + 148; i++) {
      sum += buf[i]
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i]
    }
    this.cksumValid = sum === this.cksum
    if (this.cksum === null && sum === 8 * 0x20)
      this.nullBlock = true
  }

  [SLURP] (ex, global) {
    for (let k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path'))
        this[k] = ex[k]
    }
  }

  encode (buf, off) {
    if (!buf) {
      buf = this.block = Buffer.alloc(512)
      off = 0
    }

    if (!off)
      off = 0

    if (!(buf.length >= off + 512))
      throw new Error('need 512 bytes for header')

    const prefixSize = this.ctime || this.atime ? 130 : 155
    const split = splitPrefix(this.path || '', prefixSize)
    const path = split[0]
    const prefix = split[1]
    this.needPax = split[2]

    this.needPax = encString(buf, off, 100, path) || this.needPax
    this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax
    this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax
    this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax
    this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax
    this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax
    buf[off + 156] = this[TYPE].charCodeAt(0)
    this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax
    buf.write('ustar\u000000', off + 257, 8)
    this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax
    this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax
    this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax
    this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax
    this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax
    if (buf[off + 475] !== 0)
      this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax
    else {
      this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax
      this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax
      this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax
    }

    let sum = 8 * 0x20
    for (let i = off; i < off + 148; i++) {
      sum += buf[i]
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i]
    }
    this.cksum = sum
    encNumber(buf, off + 148, 8, this.cksum)
    this.cksumValid = true

    return this.needPax
  }

  set (data) {
    for (let i in data) {
      if (data[i] !== null && data[i] !== undefined)
        this[i] = data[i]
    }
  }

  get type () {
    return types.name.get(this[TYPE]) || this[TYPE]
  }

  get typeKey () {
    return this[TYPE]
  }

  set type (type) {
    if (types.code.has(type))
      this[TYPE] = types.code.get(type)
    else
      this[TYPE] = type
  }
}

const splitPrefix = (p, prefixSize) => {
  const pathSize = 100
  let pp = p
  let prefix = ''
  let ret
  const root = pathModule.parse(p).root || '.'

  if (Buffer.byteLength(pp) < pathSize)
    ret = [pp, prefix, false]
  else {
    // first set prefix to the dir, and path to the base
    prefix = pathModule.dirname(pp)
    pp = pathModule.basename(pp)

    do {
      // both fit!
      if (Buffer.byteLength(pp) <= pathSize &&
          Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp, prefix, false]

      // prefix fits in prefix, but path doesn't fit in path
      else if (Buffer.byteLength(pp) > pathSize &&
          Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp.substr(0, pathSize - 1), prefix, true]

      else {
        // make path take a bit from prefix
        pp = pathModule.join(pathModule.basename(prefix), pp)
        prefix = pathModule.dirname(prefix)
      }
    } while (prefix !== root && !ret)

    // at this point, found no resolution, just truncate
    if (!ret)
      ret = [p.substr(0, pathSize - 1), '', true]
  }
  return ret
}

const decString = (buf, off, size) =>
  buf.slice(off, off + size).toString('utf8').replace(/\0.*/, '')

const decDate = (buf, off, size) =>
  numToDate(decNumber(buf, off, size))

const numToDate = num => num === null ? null : new Date(num * 1000)

const decNumber = (buf, off, size) =>
  buf[off] & 0x80 ? large.parse(buf.slice(off, off + size))
    : decSmallNumber(buf, off, size)

const nanNull = value => isNaN(value) ? null : value

const decSmallNumber = (buf, off, size) =>
  nanNull(parseInt(
    buf.slice(off, off + size)
      .toString('utf8').replace(/\0.*$/, '').trim(), 8))

// the maximum encodable as a null-terminated octal, by field size
const MAXNUM = {
  12: 0o77777777777,
  8 : 0o7777777
}

const encNumber = (buf, off, size, number) =>
  number === null ? false :
  number > MAXNUM[size] || number < 0
    ? (large.encode(number, buf.slice(off, off + size)), true)
    : (encSmallNumber(buf, off, size, number), false)

const encSmallNumber = (buf, off, size, number) =>
  buf.write(octalString(number, size), off, size, 'ascii')

const octalString = (number, size) =>
  padOctal(Math.floor(number).toString(8), size)

const padOctal = (string, size) =>
  (string.length === size - 1 ? string
  : new Array(size - string.length - 1).join('0') + string + ' ') + '\0'

const encDate = (buf, off, size, date) =>
  date === null ? false :
  encNumber(buf, off, size, date.getTime() / 1000)

// enough to fill the longest string we've got
const NULLS = new Array(156).join('\0')
// pad with nulls, return true if it's longer or non-ascii
const encString = (buf, off, size, string) =>
  string === null ? false :
  (buf.write(string + NULLS, off, size, 'utf8'),
   string.length !== Buffer.byteLength(string) || string.length > size)

module.exports = Header


/***/ }),

/***/ "./node_modules/tar/lib/high-level-opt.js":
/*!************************************************!*\
  !*** ./node_modules/tar/lib/high-level-opt.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// turn tar(1) style args like `C` into the more verbose things like `cwd`

const argmap = new Map([
  ['C', 'cwd'],
  ['f', 'file'],
  ['z', 'gzip'],
  ['P', 'preservePaths'],
  ['U', 'unlink'],
  ['strip-components', 'strip'],
  ['stripComponents', 'strip'],
  ['keep-newer', 'newer'],
  ['keepNewer', 'newer'],
  ['keep-newer-files', 'newer'],
  ['keepNewerFiles', 'newer'],
  ['k', 'keep'],
  ['keep-existing', 'keep'],
  ['keepExisting', 'keep'],
  ['m', 'noMtime'],
  ['no-mtime', 'noMtime'],
  ['p', 'preserveOwner'],
  ['L', 'follow'],
  ['h', 'follow']
])

const parse = module.exports = opt => opt ? Object.keys(opt).map(k => [
  argmap.has(k) ? argmap.get(k) : k, opt[k]
]).reduce((set, kv) => (set[kv[0]] = kv[1], set), Object.create(null)) : {}


/***/ }),

/***/ "./node_modules/tar/lib/large-numbers.js":
/*!***********************************************!*\
  !*** ./node_modules/tar/lib/large-numbers.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Tar can encode large and negative numbers using a leading byte of
// 0xff for negative, and 0x80 for positive.

const encode = exports.encode = (num, buf) => {
  if (!Number.isSafeInteger(num))
    // The number is so large that javascript cannot represent it with integer
    // precision.
    throw TypeError('cannot encode number outside of javascript safe integer range')
  else if (num < 0)
    encodeNegative(num, buf)
  else
    encodePositive(num, buf)
  return buf
}

const encodePositive = (num, buf) => {
  buf[0] = 0x80

  for (var i = buf.length; i > 1; i--) {
    buf[i-1] = num & 0xff
    num = Math.floor(num / 0x100)
  }
}

const encodeNegative = (num, buf) => {
  buf[0] = 0xff
  var flipped = false
  num = num * -1
  for (var i = buf.length; i > 1; i--) {
    var byte = num & 0xff
    num = Math.floor(num / 0x100)
    if (flipped)
      buf[i-1] = onesComp(byte)
    else if (byte === 0)
      buf[i-1] = 0
    else {
      flipped = true
      buf[i-1] = twosComp(byte)
    }
  }
}

const parse = exports.parse = (buf) => {
  var post = buf[buf.length - 1]
  var pre = buf[0]
  var value;
  if (pre === 0x80)
    value = pos(buf.slice(1, buf.length))
  else if (pre === 0xff)
    value = twos(buf)
  else
    throw TypeError('invalid base256 encoding')

  if (!Number.isSafeInteger(value))
    // The number is so large that javascript cannot represent it with integer
    // precision.
    throw TypeError('parsed number outside of javascript safe integer range')

  return value
}

const twos = (buf) => {
  var len = buf.length
  var sum = 0
  var flipped = false
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i]
    var f
    if (flipped)
      f = onesComp(byte)
    else if (byte === 0)
      f = byte
    else {
      flipped = true
      f = twosComp(byte)
    }
    if (f !== 0)
      sum -= f * Math.pow(256, len - i - 1)
  }
  return sum
}

const pos = (buf) => {
  var len = buf.length
  var sum = 0
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i]
    if (byte !== 0)
      sum += byte * Math.pow(256, len - i - 1)
  }
  return sum
}

const onesComp = byte => (0xff ^ byte) & 0xff

const twosComp = byte => ((0xff ^ byte) + 1) & 0xff


/***/ }),

/***/ "./node_modules/tar/lib/list.js":
/*!**************************************!*\
  !*** ./node_modules/tar/lib/list.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Buffer = __webpack_require__(/*! ./buffer.js */ "./node_modules/tar/lib/buffer.js")

// XXX: This shares a lot in common with extract.js
// maybe some DRY opportunity here?

// tar -t
const hlo = __webpack_require__(/*! ./high-level-opt.js */ "./node_modules/tar/lib/high-level-opt.js")
const Parser = __webpack_require__(/*! ./parse.js */ "./node_modules/tar/lib/parse.js")
const fs = __webpack_require__(/*! fs */ "fs")
const fsm = __webpack_require__(/*! fs-minipass */ "./node_modules/fs-minipass/index.js")
const path = __webpack_require__(/*! path */ "path")

const t = module.exports = (opt_, files, cb) => {
  if (typeof opt_ === 'function')
    cb = opt_, files = null, opt_ = {}
  else if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (typeof files === 'function')
    cb = files, files = null

  if (!files)
    files = []
  else
    files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  if (files.length)
    filesFilter(opt, files)

  if (!opt.noResume)
    onentryFunction(opt)

  return opt.file && opt.sync ? listFileSync(opt)
    : opt.file ? listFile(opt, cb)
    : list(opt)
}

const onentryFunction = opt => {
  const onentry = opt.onentry
  opt.onentry = onentry ? e => {
    onentry(e)
    e.resume()
  } : e => e.resume()
}

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [f.replace(/\/+$/, ''), true]))
  const filter = opt.filter

  const mapHas = (file, r) => {
    const root = r || path.parse(file).root || '.'
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path.dirname(file), root)

    map.set(file, ret)
    return ret
  }

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(file.replace(/\/+$/, ''))
    : file => mapHas(file.replace(/\/+$/, ''))
}

const listFileSync = opt => {
  const p = list(opt)
  const file = opt.file
  let threw = true
  let fd
  try {
    const stat = fs.statSync(file)
    const readSize = opt.maxReadSize || 16*1024*1024
    if (stat.size < readSize) {
      p.end(fs.readFileSync(file))
    } else {
      let pos = 0
      const buf = Buffer.allocUnsafe(readSize)
      fd = fs.openSync(file, 'r')
      while (pos < stat.size) {
        let bytesRead = fs.readSync(fd, buf, 0, readSize, pos)
        pos += bytesRead
        p.write(buf.slice(0, bytesRead))
      }
      p.end()
    }
    threw = false
  } finally {
    if (threw && fd)
      try { fs.closeSync(fd) } catch (er) {}
  }
}

const listFile = (opt, cb) => {
  const parse = new Parser(opt)
  const readSize = opt.maxReadSize || 16*1024*1024

  const file = opt.file
  const p = new Promise((resolve, reject) => {
    parse.on('error', reject)
    parse.on('end', resolve)

    fs.stat(file, (er, stat) => {
      if (er)
        reject(er)
      else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size
        })
        stream.on('error', reject)
        stream.pipe(parse)
      }
    })
  })
  return cb ? p.then(cb, cb) : p
}

const list = opt => new Parser(opt)


/***/ }),

/***/ "./node_modules/tar/lib/mkdir.js":
/*!***************************************!*\
  !*** ./node_modules/tar/lib/mkdir.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// wrapper around mkdirp for tar's needs.

// TODO: This should probably be a class, not functionally
// passing around state in a gazillion args.

const mkdirp = __webpack_require__(/*! mkdirp */ "mkdirp")
const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")
const chownr = __webpack_require__(/*! chownr */ "chownr")

class SymlinkError extends Error {
  constructor (symlink, path) {
    super('Cannot extract through symbolic link')
    this.path = path
    this.symlink = symlink
  }

  get name () {
    return 'SylinkError'
  }
}

class CwdError extends Error {
  constructor (path, code) {
    super(code + ': Cannot cd into \'' + path + '\'')
    this.path = path
    this.code = code
  }

  get name () {
    return 'CwdError'
  }
}

const mkdir = module.exports = (dir, opt, cb) => {
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask
  const mode = opt.mode | 0o0700
  const needChmod = (mode & umask) !== 0

  const uid = opt.uid
  const gid = opt.gid
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    ( uid !== opt.processUid || gid !== opt.processGid )

  const preserve = opt.preserve
  const unlink = opt.unlink
  const cache = opt.cache
  const cwd = opt.cwd

  const done = (er, created) => {
    if (er)
      cb(er)
    else {
      cache.set(dir, true)
      if (created && doChown)
        chownr(created, uid, gid, er => done(er))
      else if (needChmod)
        fs.chmod(dir, mode, cb)
      else
        cb()
    }
  }

  if (cache && cache.get(dir) === true)
    return done()

  if (dir === cwd)
    return fs.stat(dir, (er, st) => {
      if (er || !st.isDirectory())
        er = new CwdError(dir, er && er.code || 'ENOTDIR')
      done(er)
    })

  if (preserve)
    return mkdirp(dir, mode, done)

  const sub = path.relative(cwd, dir)
  const parts = sub.split(/\/|\\/)
  mkdir_(cwd, parts, mode, cache, unlink, cwd, null, done)
}

const mkdir_ = (base, parts, mode, cache, unlink, cwd, created, cb) => {
  if (!parts.length)
    return cb(null, created)
  const p = parts.shift()
  const part = base + '/' + p
  if (cache.get(part))
    return mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb))
}

const onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => er => {
  if (er) {
    if (er.path && path.dirname(er.path) === cwd &&
        (er.code === 'ENOTDIR' || er.code === 'ENOENT'))
      return cb(new CwdError(cwd, er.code))

    fs.lstat(part, (statEr, st) => {
      if (statEr)
        cb(statEr)
      else if (st.isDirectory())
        mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
      else if (unlink)
        fs.unlink(part, er => {
          if (er)
            return cb(er)
          fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb))
        })
      else if (st.isSymbolicLink())
        return cb(new SymlinkError(part, part + '/' + parts.join('/')))
      else
        cb(er)
    })
  } else {
    created = created || part
    mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  }
}

const mkdirSync = module.exports.sync = (dir, opt) => {
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask
  const mode = opt.mode | 0o0700
  const needChmod = (mode & umask) !== 0

  const uid = opt.uid
  const gid = opt.gid
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    ( uid !== opt.processUid || gid !== opt.processGid )

  const preserve = opt.preserve
  const unlink = opt.unlink
  const cache = opt.cache
  const cwd = opt.cwd

  const done = (created) => {
    cache.set(dir, true)
    if (created && doChown)
      chownr.sync(created, uid, gid)
    if (needChmod)
      fs.chmodSync(dir, mode)
  }

  if (cache && cache.get(dir) === true)
    return done()

  if (dir === cwd) {
    let ok = false
    let code = 'ENOTDIR'
    try {
      ok = fs.statSync(dir).isDirectory()
    } catch (er) {
      code = er.code
    } finally {
      if (!ok)
        throw new CwdError(dir, code)
    }
    done()
    return
  }

  if (preserve)
    return done(mkdirp.sync(dir, mode))

  const sub = path.relative(cwd, dir)
  const parts = sub.split(/\/|\\/)
  let created = null
  for (let p = parts.shift(), part = cwd;
       p && (part += '/' + p);
       p = parts.shift()) {

    if (cache.get(part))
      continue

    try {
      fs.mkdirSync(part, mode)
      created = created || part
      cache.set(part, true)
    } catch (er) {
      if (er.path && path.dirname(er.path) === cwd &&
          (er.code === 'ENOTDIR' || er.code === 'ENOENT'))
        return new CwdError(cwd, er.code)

      const st = fs.lstatSync(part)
      if (st.isDirectory()) {
        cache.set(part, true)
        continue
      } else if (unlink) {
        fs.unlinkSync(part)
        fs.mkdirSync(part, mode)
        created = created || part
        cache.set(part, true)
        continue
      } else if (st.isSymbolicLink())
        return new SymlinkError(part, part + '/' + parts.join('/'))
    }
  }

  return done(created)
}


/***/ }),

/***/ "./node_modules/tar/lib/mode-fix.js":
/*!******************************************!*\
  !*** ./node_modules/tar/lib/mode-fix.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (mode, isDir) => {
  mode &= 0o7777
  // if dirs are readable, then they should be listable
  if (isDir) {
    if (mode & 0o400)
      mode |= 0o100
    if (mode & 0o40)
      mode |= 0o10
    if (mode & 0o4)
      mode |= 0o1
  }
  return mode
}


/***/ }),

/***/ "./node_modules/tar/lib/pack.js":
/*!**************************************!*\
  !*** ./node_modules/tar/lib/pack.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Buffer = __webpack_require__(/*! ./buffer.js */ "./node_modules/tar/lib/buffer.js")

// A readable tar stream creator
// Technically, this is a transform stream that you write paths into,
// and tar format comes out of.
// The `add()` method is like `write()` but returns this,
// and end() return `this` as well, so you can
// do `new Pack(opt).add('files').add('dir').end().pipe(output)
// You could also do something like:
// streamOfPaths().pipe(new Pack()).pipe(new fs.WriteStream('out.tar'))

class PackJob {
  constructor (path, absolute) {
    this.path = path || './'
    this.absolute = absolute
    this.entry = null
    this.stat = null
    this.readdir = null
    this.pending = false
    this.ignore = false
    this.piped = false
  }
}

const MiniPass = __webpack_require__(/*! minipass */ "./node_modules/minipass/index.js")
const zlib = __webpack_require__(/*! minizlib */ "./node_modules/minizlib/index.js")
const ReadEntry = __webpack_require__(/*! ./read-entry.js */ "./node_modules/tar/lib/read-entry.js")
const WriteEntry = __webpack_require__(/*! ./write-entry.js */ "./node_modules/tar/lib/write-entry.js")
const WriteEntrySync = WriteEntry.Sync
const WriteEntryTar = WriteEntry.Tar
const Yallist = __webpack_require__(/*! yallist */ "yallist")
const EOF = Buffer.alloc(1024)
const ONSTAT = Symbol('onStat')
const ENDED = Symbol('ended')
const QUEUE = Symbol('queue')
const CURRENT = Symbol('current')
const PROCESS = Symbol('process')
const PROCESSING = Symbol('processing')
const PROCESSJOB = Symbol('processJob')
const JOBS = Symbol('jobs')
const JOBDONE = Symbol('jobDone')
const ADDFSENTRY = Symbol('addFSEntry')
const ADDTARENTRY = Symbol('addTarEntry')
const STAT = Symbol('stat')
const READDIR = Symbol('readdir')
const ONREADDIR = Symbol('onreaddir')
const PIPE = Symbol('pipe')
const ENTRY = Symbol('entry')
const ENTRYOPT = Symbol('entryOpt')
const WRITEENTRYCLASS = Symbol('writeEntryClass')
const WRITE = Symbol('write')
const ONDRAIN = Symbol('ondrain')

const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")
const warner = __webpack_require__(/*! ./warn-mixin.js */ "./node_modules/tar/lib/warn-mixin.js")

const Pack = warner(class Pack extends MiniPass {
  constructor (opt) {
    super(opt)
    opt = opt || Object.create(null)
    this.opt = opt
    this.cwd = opt.cwd || process.cwd()
    this.maxReadSize = opt.maxReadSize
    this.preservePaths = !!opt.preservePaths
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.prefix = (opt.prefix || '').replace(/(\\|\/)+$/, '')
    this.linkCache = opt.linkCache || new Map()
    this.statCache = opt.statCache || new Map()
    this.readdirCache = opt.readdirCache || new Map()

    this[WRITEENTRYCLASS] = WriteEntry
    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    this.zip = null
    if (opt.gzip) {
      if (typeof opt.gzip !== 'object')
        opt.gzip = {}
      this.zip = new zlib.Gzip(opt.gzip)
      this.zip.on('data', chunk => super.write(chunk))
      this.zip.on('end', _ => super.end())
      this.zip.on('drain', _ => this[ONDRAIN]())
      this.on('resume', _ => this.zip.resume())
    } else
      this.on('drain', this[ONDRAIN])

    this.portable = !!opt.portable
    this.noDirRecurse = !!opt.noDirRecurse
    this.follow = !!opt.follow
    this.noMtime = !!opt.noMtime
    this.mtime = opt.mtime || null

    this.filter = typeof opt.filter === 'function' ? opt.filter : _ => true

    this[QUEUE] = new Yallist
    this[JOBS] = 0
    this.jobs = +opt.jobs || 4
    this[PROCESSING] = false
    this[ENDED] = false
  }

  [WRITE] (chunk) {
    return super.write(chunk)
  }

  add (path) {
    this.write(path)
    return this
  }

  end (path) {
    if (path)
      this.write(path)
    this[ENDED] = true
    this[PROCESS]()
    return this
  }

  write (path) {
    if (this[ENDED])
      throw new Error('write after end')

    if (path instanceof ReadEntry)
      this[ADDTARENTRY](path)
    else
      this[ADDFSENTRY](path)
    return this.flowing
  }

  [ADDTARENTRY] (p) {
    const absolute = path.resolve(this.cwd, p.path)
    if (this.prefix)
      p.path = this.prefix + '/' + p.path.replace(/^\.(\/+|$)/, '')

    // in this case, we don't have to wait for the stat
    if (!this.filter(p.path, p))
      p.resume()
    else {
      const job = new PackJob(p.path, absolute, false)
      job.entry = new WriteEntryTar(p, this[ENTRYOPT](job))
      job.entry.on('end', _ => this[JOBDONE](job))
      this[JOBS] += 1
      this[QUEUE].push(job)
    }

    this[PROCESS]()
  }

  [ADDFSENTRY] (p) {
    const absolute = path.resolve(this.cwd, p)
    if (this.prefix)
      p = this.prefix + '/' + p.replace(/^\.(\/+|$)/, '')

    this[QUEUE].push(new PackJob(p, absolute))
    this[PROCESS]()
  }

  [STAT] (job) {
    job.pending = true
    this[JOBS] += 1
    const stat = this.follow ? 'stat' : 'lstat'
    fs[stat](job.absolute, (er, stat) => {
      job.pending = false
      this[JOBS] -= 1
      if (er)
        this.emit('error', er)
      else
        this[ONSTAT](job, stat)
    })
  }

  [ONSTAT] (job, stat) {
    this.statCache.set(job.absolute, stat)
    job.stat = stat

    // now we have the stat, we can filter it.
    if (!this.filter(job.path, stat))
      job.ignore = true

    this[PROCESS]()
  }

  [READDIR] (job) {
    job.pending = true
    this[JOBS] += 1
    fs.readdir(job.absolute, (er, entries) => {
      job.pending = false
      this[JOBS] -= 1
      if (er)
        return this.emit('error', er)
      this[ONREADDIR](job, entries)
    })
  }

  [ONREADDIR] (job, entries) {
    this.readdirCache.set(job.absolute, entries)
    job.readdir = entries
    this[PROCESS]()
  }

  [PROCESS] () {
    if (this[PROCESSING])
      return

    this[PROCESSING] = true
    for (let w = this[QUEUE].head;
         w !== null && this[JOBS] < this.jobs;
         w = w.next) {
      this[PROCESSJOB](w.value)
      if (w.value.ignore) {
        const p = w.next
        this[QUEUE].removeNode(w)
        w.next = p
      }
    }

    this[PROCESSING] = false

    if (this[ENDED] && !this[QUEUE].length && this[JOBS] === 0) {
      if (this.zip)
        this.zip.end(EOF)
      else {
        super.write(EOF)
        super.end()
      }
    }
  }

  get [CURRENT] () {
    return this[QUEUE] && this[QUEUE].head && this[QUEUE].head.value
  }

  [JOBDONE] (job) {
    this[QUEUE].shift()
    this[JOBS] -= 1
    this[PROCESS]()
  }

  [PROCESSJOB] (job) {
    if (job.pending)
      return

    if (job.entry) {
      if (job === this[CURRENT] && !job.piped)
        this[PIPE](job)
      return
    }

    if (!job.stat) {
      if (this.statCache.has(job.absolute))
        this[ONSTAT](job, this.statCache.get(job.absolute))
      else
        this[STAT](job)
    }
    if (!job.stat)
      return

    // filtered out!
    if (job.ignore)
      return

    if (!this.noDirRecurse && job.stat.isDirectory() && !job.readdir) {
      if (this.readdirCache.has(job.absolute))
        this[ONREADDIR](job, this.readdirCache.get(job.absolute))
      else
        this[READDIR](job)
      if (!job.readdir)
        return
    }

    // we know it doesn't have an entry, because that got checked above
    job.entry = this[ENTRY](job)
    if (!job.entry) {
      job.ignore = true
      return
    }

    if (job === this[CURRENT] && !job.piped)
      this[PIPE](job)
  }

  [ENTRYOPT] (job) {
    return {
      onwarn: (msg, data) => {
        this.warn(msg, data)
      },
      noPax: this.noPax,
      cwd: this.cwd,
      absolute: job.absolute,
      preservePaths: this.preservePaths,
      maxReadSize: this.maxReadSize,
      strict: this.strict,
      portable: this.portable,
      linkCache: this.linkCache,
      statCache: this.statCache,
      noMtime: this.noMtime,
      mtime: this.mtime
    }
  }

  [ENTRY] (job) {
    this[JOBS] += 1
    try {
      return new this[WRITEENTRYCLASS](job.path, this[ENTRYOPT](job))
        .on('end', () => this[JOBDONE](job))
        .on('error', er => this.emit('error', er))
    } catch (er) {
      this.emit('error', er)
    }
  }

  [ONDRAIN] () {
    if (this[CURRENT] && this[CURRENT].entry)
      this[CURRENT].entry.resume()
  }

  // like .pipe() but using super, because our write() is special
  [PIPE] (job) {
    job.piped = true

    if (job.readdir)
      job.readdir.forEach(entry => {
        const p = this.prefix ?
          job.path.slice(this.prefix.length + 1) || './'
          : job.path

        const base = p === './' ? '' : p.replace(/\/*$/, '/')
        this[ADDFSENTRY](base + entry)
      })

    const source = job.entry
    const zip = this.zip

    if (zip)
      source.on('data', chunk => {
        if (!zip.write(chunk))
          source.pause()
      })
    else
      source.on('data', chunk => {
        if (!super.write(chunk))
          source.pause()
      })
  }

  pause () {
    if (this.zip)
      this.zip.pause()
    return super.pause()
  }
})

class PackSync extends Pack {
  constructor (opt) {
    super(opt)
    this[WRITEENTRYCLASS] = WriteEntrySync
  }

  // pause/resume are no-ops in sync streams.
  pause () {}
  resume () {}

  [STAT] (job) {
    const stat = this.follow ? 'statSync' : 'lstatSync'
    this[ONSTAT](job, fs[stat](job.absolute))
  }

  [READDIR] (job, stat) {
    this[ONREADDIR](job, fs.readdirSync(job.absolute))
  }

  // gotta get it all in this tick
  [PIPE] (job) {
    const source = job.entry
    const zip = this.zip

    if (job.readdir)
      job.readdir.forEach(entry => {
        const p = this.prefix ?
          job.path.slice(this.prefix.length + 1) || './'
          : job.path

        const base = p === './' ? '' : p.replace(/\/*$/, '/')
        this[ADDFSENTRY](base + entry)
      })

    if (zip)
      source.on('data', chunk => {
        zip.write(chunk)
      })
    else
      source.on('data', chunk => {
        super[WRITE](chunk)
      })
  }
}

Pack.Sync = PackSync

module.exports = Pack


/***/ }),

/***/ "./node_modules/tar/lib/parse.js":
/*!***************************************!*\
  !*** ./node_modules/tar/lib/parse.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this[BUFFER] is the remainder of a chunk if we're waiting for
// the full 512 bytes of a header to come in.  We will Buffer.concat()
// it to the next write(), which is a mem copy, but a small one.
//
// this[QUEUE] is a Yallist of entries that haven't been emitted
// yet this can only get filled up if the user keeps write()ing after
// a write() returns false, or does a write() with more than one entry
//
// We don't buffer chunks, we always parse them and either create an
// entry, or push it into the active entry.  The ReadEntry class knows
// to throw data away if .ignore=true
//
// Shift entry off the buffer when it emits 'end', and emit 'entry' for
// the next one in the list.
//
// At any time, we're pushing body chunks into the entry at WRITEENTRY,
// and waiting for 'end' on the entry at READENTRY
//
// ignored entries get .resume() called on them straight away

const warner = __webpack_require__(/*! ./warn-mixin.js */ "./node_modules/tar/lib/warn-mixin.js")
const path = __webpack_require__(/*! path */ "path")
const Header = __webpack_require__(/*! ./header.js */ "./node_modules/tar/lib/header.js")
const EE = __webpack_require__(/*! events */ "events")
const Yallist = __webpack_require__(/*! yallist */ "yallist")
const maxMetaEntrySize = 1024 * 1024
const Entry = __webpack_require__(/*! ./read-entry.js */ "./node_modules/tar/lib/read-entry.js")
const Pax = __webpack_require__(/*! ./pax.js */ "./node_modules/tar/lib/pax.js")
const zlib = __webpack_require__(/*! minizlib */ "./node_modules/minizlib/index.js")
const Buffer = __webpack_require__(/*! ./buffer.js */ "./node_modules/tar/lib/buffer.js")

const gzipHeader = Buffer.from([0x1f, 0x8b])
const STATE = Symbol('state')
const WRITEENTRY = Symbol('writeEntry')
const READENTRY = Symbol('readEntry')
const NEXTENTRY = Symbol('nextEntry')
const PROCESSENTRY = Symbol('processEntry')
const EX = Symbol('extendedHeader')
const GEX = Symbol('globalExtendedHeader')
const META = Symbol('meta')
const EMITMETA = Symbol('emitMeta')
const BUFFER = Symbol('buffer')
const QUEUE = Symbol('queue')
const ENDED = Symbol('ended')
const EMITTEDEND = Symbol('emittedEnd')
const EMIT = Symbol('emit')
const UNZIP = Symbol('unzip')
const CONSUMECHUNK = Symbol('consumeChunk')
const CONSUMECHUNKSUB = Symbol('consumeChunkSub')
const CONSUMEBODY = Symbol('consumeBody')
const CONSUMEMETA = Symbol('consumeMeta')
const CONSUMEHEADER = Symbol('consumeHeader')
const CONSUMING = Symbol('consuming')
const BUFFERCONCAT = Symbol('bufferConcat')
const MAYBEEND = Symbol('maybeEnd')
const WRITING = Symbol('writing')
const ABORTED = Symbol('aborted')
const DONE = Symbol('onDone')

const noop = _ => true

module.exports = warner(class Parser extends EE {
  constructor (opt) {
    opt = opt || {}
    super(opt)

    if (opt.ondone)
      this.on(DONE, opt.ondone)
    else
      this.on(DONE, _ => {
        this.emit('prefinish')
        this.emit('finish')
        this.emit('end')
        this.emit('close')
      })

    this.strict = !!opt.strict
    this.maxMetaEntrySize = opt.maxMetaEntrySize || maxMetaEntrySize
    this.filter = typeof opt.filter === 'function' ? opt.filter : noop

    // have to set this so that streams are ok piping into it
    this.writable = true
    this.readable = false

    this[QUEUE] = new Yallist()
    this[BUFFER] = null
    this[READENTRY] = null
    this[WRITEENTRY] = null
    this[STATE] = 'begin'
    this[META] = ''
    this[EX] = null
    this[GEX] = null
    this[ENDED] = false
    this[UNZIP] = null
    this[ABORTED] = false
    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)
    if (typeof opt.onentry === 'function')
      this.on('entry', opt.onentry)
  }

  [CONSUMEHEADER] (chunk, position) {
    let header
    try {
      header = new Header(chunk, position, this[EX], this[GEX])
    } catch (er) {
      return this.warn('invalid entry', er)
    }

    if (header.nullBlock)
      this[EMIT]('nullBlock')
    else if (!header.cksumValid)
      this.warn('invalid entry', header)
    else if (!header.path)
      this.warn('invalid: path is required', header)
    else {
      const type = header.type
      if (/^(Symbolic)?Link$/.test(type) && !header.linkpath)
        this.warn('invalid: linkpath required', header)
      else if (!/^(Symbolic)?Link$/.test(type) && header.linkpath)
        this.warn('invalid: linkpath forbidden', header)
      else {
        const entry = this[WRITEENTRY] = new Entry(header, this[EX], this[GEX])

        if (entry.meta) {
          if (entry.size > this.maxMetaEntrySize) {
            entry.ignore = true
            this[EMIT]('ignoredEntry', entry)
            this[STATE] = 'ignore'
          } else if (entry.size > 0) {
            this[META] = ''
            entry.on('data', c => this[META] += c)
            this[STATE] = 'meta'
          }
        } else {

          this[EX] = null
          entry.ignore = entry.ignore || !this.filter(entry.path, entry)
          if (entry.ignore) {
            this[EMIT]('ignoredEntry', entry)
            this[STATE] = entry.remain ? 'ignore' : 'begin'
          } else {
            if (entry.remain)
              this[STATE] = 'body'
            else {
              this[STATE] = 'begin'
              entry.end()
            }

            if (!this[READENTRY]) {
              this[QUEUE].push(entry)
              this[NEXTENTRY]()
            } else
              this[QUEUE].push(entry)
          }
        }
      }
    }
  }

  [PROCESSENTRY] (entry) {
    let go = true

    if (!entry) {
      this[READENTRY] = null
      go = false
    } else if (Array.isArray(entry))
      this.emit.apply(this, entry)
    else {
      this[READENTRY] = entry
      this.emit('entry', entry)
      if (!entry.emittedEnd) {
        entry.on('end', _ => this[NEXTENTRY]())
        go = false
      }
    }

    return go
  }

  [NEXTENTRY] () {
    do {} while (this[PROCESSENTRY](this[QUEUE].shift()))

    if (!this[QUEUE].length) {
      // At this point, there's nothing in the queue, but we may have an
      // entry which is being consumed (readEntry).
      // If we don't, then we definitely can handle more data.
      // If we do, and either it's flowing, or it has never had any data
      // written to it, then it needs more.
      // The only other possibility is that it has returned false from a
      // write() call, so we wait for the next drain to continue.
      const re = this[READENTRY]
      const drainNow = !re || re.flowing || re.size === re.remain
      if (drainNow) {
        if (!this[WRITING])
          this.emit('drain')
      } else
        re.once('drain', _ => this.emit('drain'))
     }
  }

  [CONSUMEBODY] (chunk, position) {
    // write up to but no  more than writeEntry.blockRemain
    const entry = this[WRITEENTRY]
    const br = entry.blockRemain
    const c = (br >= chunk.length && position === 0) ? chunk
      : chunk.slice(position, position + br)

    entry.write(c)

    if (!entry.blockRemain) {
      this[STATE] = 'begin'
      this[WRITEENTRY] = null
      entry.end()
    }

    return c.length
  }

  [CONSUMEMETA] (chunk, position) {
    const entry = this[WRITEENTRY]
    const ret = this[CONSUMEBODY](chunk, position)

    // if we finished, then the entry is reset
    if (!this[WRITEENTRY])
      this[EMITMETA](entry)

    return ret
  }

  [EMIT] (ev, data, extra) {
    if (!this[QUEUE].length && !this[READENTRY])
      this.emit(ev, data, extra)
    else
      this[QUEUE].push([ev, data, extra])
  }

  [EMITMETA] (entry) {
    this[EMIT]('meta', this[META])
    switch (entry.type) {
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this[EX] = Pax.parse(this[META], this[EX], false)
        break

      case 'GlobalExtendedHeader':
        this[GEX] = Pax.parse(this[META], this[GEX], true)
        break

      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
        this[EX] = this[EX] || Object.create(null)
        this[EX].path = this[META].replace(/\0.*/, '')
        break

      case 'NextFileHasLongLinkpath':
        this[EX] = this[EX] || Object.create(null)
        this[EX].linkpath = this[META].replace(/\0.*/, '')
        break

      /* istanbul ignore next */
      default: throw new Error('unknown meta: ' + entry.type)
    }
  }

  abort (msg, error) {
    this[ABORTED] = true
    this.warn(msg, error)
    this.emit('abort', error)
    this.emit('error', error)
  }

  write (chunk) {
    if (this[ABORTED])
      return

    // first write, might be gzipped
    if (this[UNZIP] === null && chunk) {
      if (this[BUFFER]) {
        chunk = Buffer.concat([this[BUFFER], chunk])
        this[BUFFER] = null
      }
      if (chunk.length < gzipHeader.length) {
        this[BUFFER] = chunk
        return true
      }
      for (let i = 0; this[UNZIP] === null && i < gzipHeader.length; i++) {
        if (chunk[i] !== gzipHeader[i])
          this[UNZIP] = false
      }
      if (this[UNZIP] === null) {
        const ended = this[ENDED]
        this[ENDED] = false
        this[UNZIP] = new zlib.Unzip()
        this[UNZIP].on('data', chunk => this[CONSUMECHUNK](chunk))
        this[UNZIP].on('error', er =>
          this.abort(er.message, er))
        this[UNZIP].on('end', _ => {
          this[ENDED] = true
          this[CONSUMECHUNK]()
        })
        this[WRITING] = true
        const ret = this[UNZIP][ended ? 'end' : 'write' ](chunk)
        this[WRITING] = false
        return ret
      }
    }

    this[WRITING] = true
    if (this[UNZIP])
      this[UNZIP].write(chunk)
    else
      this[CONSUMECHUNK](chunk)
    this[WRITING] = false

    // return false if there's a queue, or if the current entry isn't flowing
    const ret =
      this[QUEUE].length ? false :
      this[READENTRY] ? this[READENTRY].flowing :
      true

    // if we have no queue, then that means a clogged READENTRY
    if (!ret && !this[QUEUE].length)
      this[READENTRY].once('drain', _ => this.emit('drain'))

    return ret
  }

  [BUFFERCONCAT] (c) {
    if (c && !this[ABORTED])
      this[BUFFER] = this[BUFFER] ? Buffer.concat([this[BUFFER], c]) : c
  }

  [MAYBEEND] () {
    if (this[ENDED] &&
        !this[EMITTEDEND] &&
        !this[ABORTED] &&
        !this[CONSUMING]) {
      this[EMITTEDEND] = true
      const entry = this[WRITEENTRY]
      if (entry && entry.blockRemain) {
        const have = this[BUFFER] ? this[BUFFER].length : 0
        this.warn('Truncated input (needed ' + entry.blockRemain +
                  ' more bytes, only ' + have + ' available)', entry)
        if (this[BUFFER])
          entry.write(this[BUFFER])
        entry.end()
      }
      this[EMIT](DONE)
    }
  }

  [CONSUMECHUNK] (chunk) {
    if (this[CONSUMING]) {
      this[BUFFERCONCAT](chunk)
    } else if (!chunk && !this[BUFFER]) {
      this[MAYBEEND]()
    } else {
      this[CONSUMING] = true
      if (this[BUFFER]) {
        this[BUFFERCONCAT](chunk)
        const c = this[BUFFER]
        this[BUFFER] = null
        this[CONSUMECHUNKSUB](c)
      } else {
        this[CONSUMECHUNKSUB](chunk)
      }

      while (this[BUFFER] && this[BUFFER].length >= 512 && !this[ABORTED]) {
        const c = this[BUFFER]
        this[BUFFER] = null
        this[CONSUMECHUNKSUB](c)
      }
      this[CONSUMING] = false
    }

    if (!this[BUFFER] || this[ENDED])
      this[MAYBEEND]()
  }

  [CONSUMECHUNKSUB] (chunk) {
    // we know that we are in CONSUMING mode, so anything written goes into
    // the buffer.  Advance the position and put any remainder in the buffer.
    let position = 0
    let length = chunk.length
    while (position + 512 <= length && !this[ABORTED]) {
      switch (this[STATE]) {
        case 'begin':
          this[CONSUMEHEADER](chunk, position)
          position += 512
          break

        case 'ignore':
        case 'body':
          position += this[CONSUMEBODY](chunk, position)
          break

        case 'meta':
          position += this[CONSUMEMETA](chunk, position)
          break

        /* istanbul ignore next */
        default:
          throw new Error('invalid state: ' + this[STATE])
      }
    }

    if (position < length) {
      if (this[BUFFER])
        this[BUFFER] = Buffer.concat([chunk.slice(position), this[BUFFER]])
      else
        this[BUFFER] = chunk.slice(position)
    }
  }

  end (chunk) {
    if (!this[ABORTED]) {
      if (this[UNZIP])
        this[UNZIP].end(chunk)
      else {
        this[ENDED] = true
        this.write(chunk)
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/tar/lib/pax.js":
/*!*************************************!*\
  !*** ./node_modules/tar/lib/pax.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Buffer = __webpack_require__(/*! ./buffer.js */ "./node_modules/tar/lib/buffer.js")
const Header = __webpack_require__(/*! ./header.js */ "./node_modules/tar/lib/header.js")
const path = __webpack_require__(/*! path */ "path")

class Pax {
  constructor (obj, global) {
    this.atime = obj.atime || null
    this.charset = obj.charset || null
    this.comment = obj.comment || null
    this.ctime = obj.ctime || null
    this.gid = obj.gid || null
    this.gname = obj.gname || null
    this.linkpath = obj.linkpath || null
    this.mtime = obj.mtime || null
    this.path = obj.path || null
    this.size = obj.size || null
    this.uid = obj.uid || null
    this.uname = obj.uname || null
    this.dev = obj.dev || null
    this.ino = obj.ino || null
    this.nlink = obj.nlink || null
    this.global = global || false
  }

  encode () {
    const body = this.encodeBody()
    if (body === '')
      return null

    const bodyLen = Buffer.byteLength(body)
    // round up to 512 bytes
    // add 512 for header
    const bufLen = 512 * Math.ceil(1 + bodyLen / 512)
    const buf = Buffer.allocUnsafe(bufLen)

    // 0-fill the header section, it might not hit every field
    for (let i = 0; i < 512; i++) {
      buf[i] = 0
    }

    new Header({
      // XXX split the path
      // then the path should be PaxHeader + basename, but less than 99,
      // prepend with the dirname
      path: ('PaxHeader/' + path.basename(this.path)).slice(0, 99),
      mode: this.mode || 0o644,
      uid: this.uid || null,
      gid: this.gid || null,
      size: bodyLen,
      mtime: this.mtime || null,
      type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
      linkpath: '',
      uname: this.uname || '',
      gname: this.gname || '',
      devmaj: 0,
      devmin: 0,
      atime: this.atime || null,
      ctime: this.ctime || null
    }).encode(buf)

    buf.write(body, 512, bodyLen, 'utf8')

    // null pad after the body
    for (let i = bodyLen + 512; i < buf.length; i++) {
      buf[i] = 0
    }

    return buf
  }

  encodeBody () {
    return (
      this.encodeField('path') +
      this.encodeField('ctime') +
      this.encodeField('atime') +
      this.encodeField('dev') +
      this.encodeField('ino') +
      this.encodeField('nlink') +
      this.encodeField('charset') +
      this.encodeField('comment') +
      this.encodeField('gid') +
      this.encodeField('gname') +
      this.encodeField('linkpath') +
      this.encodeField('mtime') +
      this.encodeField('size') +
      this.encodeField('uid') +
      this.encodeField('uname')
    )
  }

  encodeField (field) {
    if (this[field] === null || this[field] === undefined)
      return ''
    const v = this[field] instanceof Date ? this[field].getTime() / 1000
      : this[field]
    const s = ' ' +
      (field === 'dev' || field === 'ino' || field === 'nlink'
       ? 'SCHILY.' : '') +
      field + '=' + v + '\n'
    const byteLen = Buffer.byteLength(s)
    // the digits includes the length of the digits in ascii base-10
    // so if it's 9 characters, then adding 1 for the 9 makes it 10
    // which makes it 11 chars.
    let digits = Math.floor(Math.log(byteLen) / Math.log(10)) + 1
    if (byteLen + digits >= Math.pow(10, digits))
      digits += 1
    const len = digits + byteLen
    return len + s
  }
}

Pax.parse = (string, ex, g) => new Pax(merge(parseKV(string), ex), g)

const merge = (a, b) =>
  b ? Object.keys(a).reduce((s, k) => (s[k] = a[k], s), b) : a

const parseKV = string =>
  string
    .replace(/\n$/, '')
    .split('\n')
    .reduce(parseKVLine, Object.create(null))

const parseKVLine = (set, line) => {
  const n = parseInt(line, 10)

  // XXX Values with \n in them will fail this.
  // Refactor to not be a naive line-by-line parse.
  if (n !== Buffer.byteLength(line) + 1)
    return set

  line = line.substr((n + ' ').length)
  const kv = line.split('=')
  const k = kv.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1')
  if (!k)
    return set

  const v = kv.join('=')
  set[k] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(k)
    ?  new Date(v * 1000)
    : /^[0-9]+$/.test(v) ? +v
    : v
  return set
}

module.exports = Pax


/***/ }),

/***/ "./node_modules/tar/lib/read-entry.js":
/*!********************************************!*\
  !*** ./node_modules/tar/lib/read-entry.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const types = __webpack_require__(/*! ./types.js */ "./node_modules/tar/lib/types.js")
const MiniPass = __webpack_require__(/*! minipass */ "./node_modules/minipass/index.js")

const SLURP = Symbol('slurp')
module.exports = class ReadEntry extends MiniPass {
  constructor (header, ex, gex) {
    super()
    // read entries always start life paused.  this is to avoid the
    // situation where Minipass's auto-ending empty streams results
    // in an entry ending before we're ready for it.
    this.pause()
    this.extended = ex
    this.globalExtended = gex
    this.header = header
    this.startBlockSize = 512 * Math.ceil(header.size / 512)
    this.blockRemain = this.startBlockSize
    this.remain = header.size
    this.type = header.type
    this.meta = false
    this.ignore = false
    switch (this.type) {
      case 'File':
      case 'OldFile':
      case 'Link':
      case 'SymbolicLink':
      case 'CharacterDevice':
      case 'BlockDevice':
      case 'Directory':
      case 'FIFO':
      case 'ContiguousFile':
      case 'GNUDumpDir':
        break

      case 'NextFileHasLongLinkpath':
      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
      case 'GlobalExtendedHeader':
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this.meta = true
        break

      // NOTE: gnutar and bsdtar treat unrecognized types as 'File'
      // it may be worth doing the same, but with a warning.
      default:
        this.ignore = true
    }

    this.path = header.path
    this.mode = header.mode
    if (this.mode)
      this.mode = this.mode & 0o7777
    this.uid = header.uid
    this.gid = header.gid
    this.uname = header.uname
    this.gname = header.gname
    this.size = header.size
    this.mtime = header.mtime
    this.atime = header.atime
    this.ctime = header.ctime
    this.linkpath = header.linkpath
    this.uname = header.uname
    this.gname = header.gname

    if (ex) this[SLURP](ex)
    if (gex) this[SLURP](gex, true)
  }

  write (data) {
    const writeLen = data.length
    if (writeLen > this.blockRemain)
      throw new Error('writing more to entry than is appropriate')

    const r = this.remain
    const br = this.blockRemain
    this.remain = Math.max(0, r - writeLen)
    this.blockRemain = Math.max(0, br - writeLen)
    if (this.ignore)
      return true

    if (r >= writeLen)
      return super.write(data)

    // r < writeLen
    return super.write(data.slice(0, r))
  }

  [SLURP] (ex, global) {
    for (let k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path'))
        this[k] = ex[k]
    }
  }
}


/***/ }),

/***/ "./node_modules/tar/lib/replace.js":
/*!*****************************************!*\
  !*** ./node_modules/tar/lib/replace.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Buffer = __webpack_require__(/*! ./buffer.js */ "./node_modules/tar/lib/buffer.js")

// tar -r
const hlo = __webpack_require__(/*! ./high-level-opt.js */ "./node_modules/tar/lib/high-level-opt.js")
const Pack = __webpack_require__(/*! ./pack.js */ "./node_modules/tar/lib/pack.js")
const Parse = __webpack_require__(/*! ./parse.js */ "./node_modules/tar/lib/parse.js")
const fs = __webpack_require__(/*! fs */ "fs")
const fsm = __webpack_require__(/*! fs-minipass */ "./node_modules/fs-minipass/index.js")
const t = __webpack_require__(/*! ./list.js */ "./node_modules/tar/lib/list.js")
const path = __webpack_require__(/*! path */ "path")

// starting at the head of the file, read a Header
// If the checksum is invalid, that's our position to start writing
// If it is, jump forward by the specified size (round up to 512)
// and try again.
// Write the new Pack stream starting there.

const Header = __webpack_require__(/*! ./header.js */ "./node_modules/tar/lib/header.js")

const r = module.exports = (opt_, files, cb) => {
  const opt = hlo(opt_)

  if (!opt.file)
    throw new TypeError('file is required')

  if (opt.gzip)
    throw new TypeError('cannot append to compressed archives')

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  return opt.sync ? replaceSync(opt, files)
    : replace(opt, files, cb)
}

const replaceSync = (opt, files) => {
  const p = new Pack.Sync(opt)

  let threw = true
  let fd
  let position

  try {
    try {
      fd = fs.openSync(opt.file, 'r+')
    } catch (er) {
      if (er.code === 'ENOENT')
        fd = fs.openSync(opt.file, 'w+')
      else
        throw er
    }

    const st = fs.fstatSync(fd)
    const headBuf = Buffer.alloc(512)

    POSITION: for (position = 0; position < st.size; position += 512) {
      for (let bufPos = 0, bytes = 0; bufPos < 512; bufPos += bytes) {
        bytes = fs.readSync(
          fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos
        )

        if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b)
          throw new Error('cannot append to compressed archives')

        if (!bytes)
          break POSITION
      }

      let h = new Header(headBuf)
      if (!h.cksumValid)
        break
      let entryBlockSize = 512 * Math.ceil(h.size / 512)
      if (position + entryBlockSize + 512 > st.size)
        break
      // the 512 for the header we just parsed will be added as well
      // also jump ahead all the blocks for the body
      position += entryBlockSize
      if (opt.mtimeCache)
        opt.mtimeCache.set(h.path, h.mtime)
    }
    threw = false

    streamSync(opt, p, position, fd, files)
  } finally {
    if (threw)
      try { fs.closeSync(fd) } catch (er) {}
  }
}

const streamSync = (opt, p, position, fd, files) => {
  const stream = new fsm.WriteStreamSync(opt.file, {
    fd: fd,
    start: position
  })
  p.pipe(stream)
  addFilesSync(p, files)
}

const replace = (opt, files, cb) => {
  files = Array.from(files)
  const p = new Pack(opt)

  const getPos = (fd, size, cb_) => {
    const cb = (er, pos) => {
      if (er)
        fs.close(fd, _ => cb_(er))
      else
        cb_(null, pos)
    }

    let position = 0
    if (size === 0)
      return cb(null, 0)

    let bufPos = 0
    const headBuf = Buffer.alloc(512)
    const onread = (er, bytes) => {
      if (er)
        return cb(er)
      bufPos += bytes
      if (bufPos < 512 && bytes)
        return fs.read(
          fd, headBuf, bufPos, headBuf.length - bufPos,
          position + bufPos, onread
        )

      if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b)
        return cb(new Error('cannot append to compressed archives'))

      // truncated header
      if (bufPos < 512)
        return cb(null, position)

      const h = new Header(headBuf)
      if (!h.cksumValid)
        return cb(null, position)

      const entryBlockSize = 512 * Math.ceil(h.size / 512)
      if (position + entryBlockSize + 512 > size)
        return cb(null, position)

      position += entryBlockSize + 512
      if (position >= size)
        return cb(null, position)

      if (opt.mtimeCache)
        opt.mtimeCache.set(h.path, h.mtime)
      bufPos = 0
      fs.read(fd, headBuf, 0, 512, position, onread)
    }
    fs.read(fd, headBuf, 0, 512, position, onread)
  }

  const promise = new Promise((resolve, reject) => {
    p.on('error', reject)
    let flag = 'r+'
    const onopen = (er, fd) => {
      if (er && er.code === 'ENOENT' && flag === 'r+') {
        flag = 'w+'
        return fs.open(opt.file, flag, onopen)
      }

      if (er)
        return reject(er)

      fs.fstat(fd, (er, st) => {
        if (er)
          return reject(er)
        getPos(fd, st.size, (er, position) => {
          if (er)
            return reject(er)
          const stream = new fsm.WriteStream(opt.file, {
            fd: fd,
            start: position
          })
          p.pipe(stream)
          stream.on('error', reject)
          stream.on('close', resolve)
          addFilesAsync(p, files)
        })
      })
    }
    fs.open(opt.file, flag, onopen)
  })

  return cb ? promise.then(cb, cb) : promise
}

const addFilesSync = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@')
      t({
        file: path.resolve(p.cwd, file.substr(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry)
      })
    else
      p.add(file)
  })
  p.end()
}

const addFilesAsync = (p, files) => {
  while (files.length) {
    const file = files.shift()
    if (file.charAt(0) === '@')
      return t({
        file: path.resolve(p.cwd, file.substr(1)),
        noResume: true,
        onentry: entry => p.add(entry)
      }).then(_ => addFilesAsync(p, files))
    else
      p.add(file)
  }
  p.end()
}


/***/ }),

/***/ "./node_modules/tar/lib/types.js":
/*!***************************************!*\
  !*** ./node_modules/tar/lib/types.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// map types from key to human-friendly name
exports.name = new Map([
  ['0', 'File'],
  // same as File
  ['', 'OldFile'],
  ['1', 'Link'],
  ['2', 'SymbolicLink'],
  // Devices and FIFOs aren't fully supported
  // they are parsed, but skipped when unpacking
  ['3', 'CharacterDevice'],
  ['4', 'BlockDevice'],
  ['5', 'Directory'],
  ['6', 'FIFO'],
  // same as File
  ['7', 'ContiguousFile'],
  // pax headers
  ['g', 'GlobalExtendedHeader'],
  ['x', 'ExtendedHeader'],
  // vendor-specific stuff
  // skip
  ['A', 'SolarisACL'],
  // like 5, but with data, which should be skipped
  ['D', 'GNUDumpDir'],
  // metadata only, skip
  ['I', 'Inode'],
  // data = link path of next file
  ['K', 'NextFileHasLongLinkpath'],
  // data = path of next file
  ['L', 'NextFileHasLongPath'],
  // skip
  ['M', 'ContinuationFile'],
  // like L
  ['N', 'OldGnuLongPath'],
  // skip
  ['S', 'SparseFile'],
  // skip
  ['V', 'TapeVolumeHeader'],
  // like x
  ['X', 'OldExtendedHeader']
])

// map the other direction
exports.code = new Map(Array.from(exports.name).map(kv => [kv[1], kv[0]]))


/***/ }),

/***/ "./node_modules/tar/lib/unpack.js":
/*!****************************************!*\
  !*** ./node_modules/tar/lib/unpack.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const assert = __webpack_require__(/*! assert */ "assert")
const EE = __webpack_require__(/*! events */ "events").EventEmitter
const Parser = __webpack_require__(/*! ./parse.js */ "./node_modules/tar/lib/parse.js")
const fs = __webpack_require__(/*! fs */ "fs")
const fsm = __webpack_require__(/*! fs-minipass */ "./node_modules/fs-minipass/index.js")
const path = __webpack_require__(/*! path */ "path")
const mkdir = __webpack_require__(/*! ./mkdir.js */ "./node_modules/tar/lib/mkdir.js")
const mkdirSync = mkdir.sync
const wc = __webpack_require__(/*! ./winchars.js */ "./node_modules/tar/lib/winchars.js")

const ONENTRY = Symbol('onEntry')
const CHECKFS = Symbol('checkFs')
const ISREUSABLE = Symbol('isReusable')
const MAKEFS = Symbol('makeFs')
const FILE = Symbol('file')
const DIRECTORY = Symbol('directory')
const LINK = Symbol('link')
const SYMLINK = Symbol('symlink')
const HARDLINK = Symbol('hardlink')
const UNSUPPORTED = Symbol('unsupported')
const UNKNOWN = Symbol('unknown')
const CHECKPATH = Symbol('checkPath')
const MKDIR = Symbol('mkdir')
const ONERROR = Symbol('onError')
const PENDING = Symbol('pending')
const PEND = Symbol('pend')
const UNPEND = Symbol('unpend')
const ENDED = Symbol('ended')
const MAYBECLOSE = Symbol('maybeClose')
const SKIP = Symbol('skip')
const DOCHOWN = Symbol('doChown')
const UID = Symbol('uid')
const GID = Symbol('gid')
const crypto = __webpack_require__(/*! crypto */ "crypto")

// Unlinks on Windows are not atomic.
//
// This means that if you have a file entry, followed by another
// file entry with an identical name, and you cannot re-use the file
// (because it's a hardlink, or because unlink:true is set, or it's
// Windows, which does not have useful nlink values), then the unlink
// will be committed to the disk AFTER the new file has been written
// over the old one, deleting the new file.
//
// To work around this, on Windows systems, we rename the file and then
// delete the renamed file.  It's a sloppy kludge, but frankly, I do not
// know of a better way to do this, given windows' non-atomic unlink
// semantics.
//
// See: https://github.com/npm/node-tar/issues/183
/* istanbul ignore next */
const unlinkFile = (path, cb) => {
  if (process.platform !== 'win32')
    return fs.unlink(path, cb)

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex')
  fs.rename(path, name, er => {
    if (er)
      return cb(er)
    fs.unlink(name, cb)
  })
}

/* istanbul ignore next */
const unlinkFileSync = path => {
  if (process.platform !== 'win32')
    return fs.unlinkSync(path)

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex')
  fs.renameSync(path, name)
  fs.unlinkSync(name)
}

// this.gid, entry.gid, this.processUid
const uint32 = (a, b, c) =>
  a === a >>> 0 ? a
  : b === b >>> 0 ? b
  : c

class Unpack extends Parser {
  constructor (opt) {
    if (!opt)
      opt = {}

    opt.ondone = _ => {
      this[ENDED] = true
      this[MAYBECLOSE]()
    }

    super(opt)

    this.transform = typeof opt.transform === 'function' ? opt.transform : null

    this.writable = true
    this.readable = false

    this[PENDING] = 0
    this[ENDED] = false

    this.dirCache = opt.dirCache || new Map()

    if (typeof opt.uid === 'number' || typeof opt.gid === 'number') {
      // need both or neither
      if (typeof opt.uid !== 'number' || typeof opt.gid !== 'number')
        throw new TypeError('cannot set owner without number uid and gid')
      if (opt.preserveOwner)
        throw new TypeError(
          'cannot preserve owner in archive and also set owner explicitly')
      this.uid = opt.uid
      this.gid = opt.gid
      this.setOwner = true
    } else {
      this.uid = null
      this.gid = null
      this.setOwner = false
    }

    // default true for root
    if (opt.preserveOwner === undefined && typeof opt.uid !== 'number')
      this.preserveOwner = process.getuid && process.getuid() === 0
    else
      this.preserveOwner = !!opt.preserveOwner

    this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ?
      process.getuid() : null
    this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ?
      process.getgid() : null

    // mostly just for testing, but useful in some cases.
    // Forcibly trigger a chown on every entry, no matter what
    this.forceChown = opt.forceChown === true

    // turn ><?| in filenames into 0xf000-higher encoded forms
    this.win32 = !!opt.win32 || process.platform === 'win32'

    // do not unpack over files that are newer than what's in the archive
    this.newer = !!opt.newer

    // do not unpack over ANY files
    this.keep = !!opt.keep

    // do not set mtime/atime of extracted entries
    this.noMtime = !!opt.noMtime

    // allow .., absolute path entries, and unpacking through symlinks
    // without this, warn and skip .., relativize absolutes, and error
    // on symlinks in extraction path
    this.preservePaths = !!opt.preservePaths

    // unlink files and links before writing. This breaks existing hard
    // links, and removes symlink directories rather than erroring
    this.unlink = !!opt.unlink

    this.cwd = path.resolve(opt.cwd || process.cwd())
    this.strip = +opt.strip || 0
    this.processUmask = process.umask()
    this.umask = typeof opt.umask === 'number' ? opt.umask : this.processUmask
    // default mode for dirs created as parents
    this.dmode = opt.dmode || (0o0777 & (~this.umask))
    this.fmode = opt.fmode || (0o0666 & (~this.umask))
    this.on('entry', entry => this[ONENTRY](entry))
  }

  [MAYBECLOSE] () {
    if (this[ENDED] && this[PENDING] === 0) {
      this.emit('prefinish')
      this.emit('finish')
      this.emit('end')
      this.emit('close')
    }
  }

  [CHECKPATH] (entry) {
    if (this.strip) {
      const parts = entry.path.split(/\/|\\/)
      if (parts.length < this.strip)
        return false
      entry.path = parts.slice(this.strip).join('/')

      if (entry.type === 'Link') {
        const linkparts = entry.linkpath.split(/\/|\\/)
        if (linkparts.length >= this.strip)
          entry.linkpath = linkparts.slice(this.strip).join('/')
      }
    }

    if (!this.preservePaths) {
      const p = entry.path
      if (p.match(/(^|\/|\\)\.\.(\\|\/|$)/)) {
        this.warn('path contains \'..\'', p)
        return false
      }

      // absolutes on posix are also absolutes on win32
      // so we only need to test this one to get both
      if (path.win32.isAbsolute(p)) {
        const parsed = path.win32.parse(p)
        this.warn('stripping ' + parsed.root + ' from absolute path', p)
        entry.path = p.substr(parsed.root.length)
      }
    }

    // only encode : chars that aren't drive letter indicators
    if (this.win32) {
      const parsed = path.win32.parse(entry.path)
      entry.path = parsed.root === '' ? wc.encode(entry.path)
        : parsed.root + wc.encode(entry.path.substr(parsed.root.length))
    }

    if (path.isAbsolute(entry.path))
      entry.absolute = entry.path
    else
      entry.absolute = path.resolve(this.cwd, entry.path)

    return true
  }

  [ONENTRY] (entry) {
    if (!this[CHECKPATH](entry))
      return entry.resume()

    assert.equal(typeof entry.absolute, 'string')

    switch (entry.type) {
      case 'Directory':
      case 'GNUDumpDir':
        if (entry.mode)
          entry.mode = entry.mode | 0o700

      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
      case 'Link':
      case 'SymbolicLink':
        return this[CHECKFS](entry)

      case 'CharacterDevice':
      case 'BlockDevice':
      case 'FIFO':
        return this[UNSUPPORTED](entry)
    }
  }

  [ONERROR] (er, entry) {
    // Cwd has to exist, or else nothing works. That's serious.
    // Other errors are warnings, which raise the error in strict
    // mode, but otherwise continue on.
    if (er.name === 'CwdError')
      this.emit('error', er)
    else {
      this.warn(er.message, er)
      this[UNPEND]()
      entry.resume()
    }
  }

  [MKDIR] (dir, mode, cb) {
    mkdir(dir, {
      uid: this.uid,
      gid: this.gid,
      processUid: this.processUid,
      processGid: this.processGid,
      umask: this.processUmask,
      preserve: this.preservePaths,
      unlink: this.unlink,
      cache: this.dirCache,
      cwd: this.cwd,
      mode: mode
    }, cb)
  }

  [DOCHOWN] (entry) {
    // in preserve owner mode, chown if the entry doesn't match process
    // in set owner mode, chown if setting doesn't match process
    return this.forceChown ||
      this.preserveOwner &&
      ( typeof entry.uid === 'number' && entry.uid !== this.processUid ||
        typeof entry.gid === 'number' && entry.gid !== this.processGid )
      ||
      ( typeof this.uid === 'number' && this.uid !== this.processUid ||
        typeof this.gid === 'number' && this.gid !== this.processGid )
  }

  [UID] (entry) {
    return uint32(this.uid, entry.uid, this.processUid)
  }

  [GID] (entry) {
    return uint32(this.gid, entry.gid, this.processGid)
  }

  [FILE] (entry) {
    const mode = entry.mode & 0o7777 || this.fmode
    const stream = new fsm.WriteStream(entry.absolute, {
      mode: mode,
      autoClose: false
    })
    stream.on('error', er => this[ONERROR](er, entry))

    let actions = 1
    const done = er => {
      if (er)
        return this[ONERROR](er, entry)

      if (--actions === 0)
        fs.close(stream.fd, _ => this[UNPEND]())
    }

    stream.on('finish', _ => {
      // if futimes fails, try utimes
      // if utimes fails, fail with the original error
      // same for fchown/chown
      const abs = entry.absolute
      const fd = stream.fd

      if (entry.mtime && !this.noMtime) {
        actions++
        const atime = entry.atime || new Date()
        const mtime = entry.mtime
        fs.futimes(fd, atime, mtime, er =>
          er ? fs.utimes(abs, atime, mtime, er2 => done(er2 && er))
          : done())
      }

      if (this[DOCHOWN](entry)) {
        actions++
        const uid = this[UID](entry)
        const gid = this[GID](entry)
        fs.fchown(fd, uid, gid, er =>
          er ? fs.chown(abs, uid, gid, er2 => done(er2 && er))
          : done())
      }

      done()
    })

    const tx = this.transform ? this.transform(entry) || entry : entry
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry))
      entry.pipe(tx)
    }
    tx.pipe(stream)
  }

  [DIRECTORY] (entry) {
    const mode = entry.mode & 0o7777 || this.dmode
    this[MKDIR](entry.absolute, mode, er => {
      if (er)
        return this[ONERROR](er, entry)

      let actions = 1
      const done = _ => {
        if (--actions === 0) {
          this[UNPEND]()
          entry.resume()
        }
      }

      if (entry.mtime && !this.noMtime) {
        actions++
        fs.utimes(entry.absolute, entry.atime || new Date(), entry.mtime, done)
      }

      if (this[DOCHOWN](entry)) {
        actions++
        fs.chown(entry.absolute, this[UID](entry), this[GID](entry), done)
      }

      done()
    })
  }

  [UNSUPPORTED] (entry) {
    this.warn('unsupported entry type: ' + entry.type, entry)
    entry.resume()
  }

  [SYMLINK] (entry) {
    this[LINK](entry, entry.linkpath, 'symlink')
  }

  [HARDLINK] (entry) {
    this[LINK](entry, path.resolve(this.cwd, entry.linkpath), 'link')
  }

  [PEND] () {
    this[PENDING]++
  }

  [UNPEND] () {
    this[PENDING]--
    this[MAYBECLOSE]()
  }

  [SKIP] (entry) {
    this[UNPEND]()
    entry.resume()
  }

  // Check if we can reuse an existing filesystem entry safely and
  // overwrite it, rather than unlinking and recreating
  // Windows doesn't report a useful nlink, so we just never reuse entries
  [ISREUSABLE] (entry, st) {
    return entry.type === 'File' &&
      !this.unlink &&
      st.isFile() &&
      st.nlink <= 1 &&
      process.platform !== 'win32'
  }

  // check if a thing is there, and if so, try to clobber it
  [CHECKFS] (entry) {
    this[PEND]()
    this[MKDIR](path.dirname(entry.absolute), this.dmode, er => {
      if (er)
        return this[ONERROR](er, entry)
      fs.lstat(entry.absolute, (er, st) => {
        if (st && (this.keep || this.newer && st.mtime > entry.mtime))
          this[SKIP](entry)
        else if (er || this[ISREUSABLE](entry, st))
          this[MAKEFS](null, entry)
        else if (st.isDirectory()) {
          if (entry.type === 'Directory') {
            if (!entry.mode || (st.mode & 0o7777) === entry.mode)
              this[MAKEFS](null, entry)
            else
              fs.chmod(entry.absolute, entry.mode, er => this[MAKEFS](er, entry))
          } else
            fs.rmdir(entry.absolute, er => this[MAKEFS](er, entry))
        } else
          unlinkFile(entry.absolute, er => this[MAKEFS](er, entry))
      })
    })
  }

  [MAKEFS] (er, entry) {
    if (er)
      return this[ONERROR](er, entry)

    switch (entry.type) {
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
        return this[FILE](entry)

      case 'Link':
        return this[HARDLINK](entry)

      case 'SymbolicLink':
        return this[SYMLINK](entry)

      case 'Directory':
      case 'GNUDumpDir':
        return this[DIRECTORY](entry)
    }
  }

  [LINK] (entry, linkpath, link) {
    // XXX: get the type ('file' or 'dir') for windows
    fs[link](linkpath, entry.absolute, er => {
      if (er)
        return this[ONERROR](er, entry)
      this[UNPEND]()
      entry.resume()
    })
  }
}

class UnpackSync extends Unpack {
  constructor (opt) {
    super(opt)
  }

  [CHECKFS] (entry) {
    const er = this[MKDIR](path.dirname(entry.absolute), this.dmode)
    if (er)
      return this[ONERROR](er, entry)
    try {
      const st = fs.lstatSync(entry.absolute)
      if (this.keep || this.newer && st.mtime > entry.mtime)
        return this[SKIP](entry)
      else if (this[ISREUSABLE](entry, st))
        return this[MAKEFS](null, entry)
      else {
        try {
          if (st.isDirectory()) {
            if (entry.type === 'Directory') {
              if (entry.mode && (st.mode & 0o7777) !== entry.mode)
                fs.chmodSync(entry.absolute, entry.mode)
            } else
              fs.rmdirSync(entry.absolute)
          } else
            unlinkFileSync(entry.absolute)
          return this[MAKEFS](null, entry)
        } catch (er) {
          return this[ONERROR](er, entry)
        }
      }
    } catch (er) {
      return this[MAKEFS](null, entry)
    }
  }

  [FILE] (entry) {
    const mode = entry.mode & 0o7777 || this.fmode

    const oner = er => {
      try { fs.closeSync(fd) } catch (_) {}
      if (er)
        this[ONERROR](er, entry)
    }

    let stream
    let fd
    try {
      fd = fs.openSync(entry.absolute, 'w', mode)
    } catch (er) {
      return oner(er)
    }
    const tx = this.transform ? this.transform(entry) || entry : entry
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry))
      entry.pipe(tx)
    }

    tx.on('data', chunk => {
      try {
        fs.writeSync(fd, chunk, 0, chunk.length)
      } catch (er) {
        oner(er)
      }
    })

    tx.on('end', _ => {
      let er = null
      // try both, falling futimes back to utimes
      // if either fails, handle the first error
      if (entry.mtime && !this.noMtime) {
        const atime = entry.atime || new Date()
        const mtime = entry.mtime
        try {
          fs.futimesSync(fd, atime, mtime)
        } catch (futimeser) {
          try {
            fs.utimesSync(entry.absolute, atime, mtime)
          } catch (utimeser) {
            er = futimeser
          }
        }
      }

      if (this[DOCHOWN](entry)) {
        const uid = this[UID](entry)
        const gid = this[GID](entry)

        try {
          fs.fchownSync(fd, uid, gid)
        } catch (fchowner) {
          try {
            fs.chownSync(entry.absolute, uid, gid)
          } catch (chowner) {
            er = er || fchowner
          }
        }
      }

      oner(er)
    })
  }

  [DIRECTORY] (entry) {
    const mode = entry.mode & 0o7777 || this.dmode
    const er = this[MKDIR](entry.absolute, mode)
    if (er)
      return this[ONERROR](er, entry)
    if (entry.mtime && !this.noMtime) {
      try {
        fs.utimesSync(entry.absolute, entry.atime || new Date(), entry.mtime)
      } catch (er) {}
    }
    if (this[DOCHOWN](entry)) {
      try {
        fs.chownSync(entry.absolute, this[UID](entry), this[GID](entry))
      } catch (er) {}
    }
    entry.resume()
  }

  [MKDIR] (dir, mode) {
    try {
      return mkdir.sync(dir, {
        uid: this.uid,
        gid: this.gid,
        processUid: this.processUid,
        processGid: this.processGid,
        umask: this.processUmask,
        preserve: this.preservePaths,
        unlink: this.unlink,
        cache: this.dirCache,
        cwd: this.cwd,
        mode: mode
      })
    } catch (er) {
      return er
    }
  }

  [LINK] (entry, linkpath, link) {
    try {
      fs[link + 'Sync'](linkpath, entry.absolute)
      entry.resume()
    } catch (er) {
      return this[ONERROR](er, entry)
    }
  }
}

Unpack.Sync = UnpackSync
module.exports = Unpack


/***/ }),

/***/ "./node_modules/tar/lib/update.js":
/*!****************************************!*\
  !*** ./node_modules/tar/lib/update.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// tar -u

const hlo = __webpack_require__(/*! ./high-level-opt.js */ "./node_modules/tar/lib/high-level-opt.js")
const r = __webpack_require__(/*! ./replace.js */ "./node_modules/tar/lib/replace.js")
// just call tar.r with the filter and mtimeCache

const u = module.exports = (opt_, files, cb) => {
  const opt = hlo(opt_)

  if (!opt.file)
    throw new TypeError('file is required')

  if (opt.gzip)
    throw new TypeError('cannot append to compressed archives')

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  mtimeFilter(opt)
  return r(opt, files, cb)
}

const mtimeFilter = opt => {
  const filter = opt.filter

  if (!opt.mtimeCache)
    opt.mtimeCache = new Map()

  opt.filter = filter ? (path, stat) =>
    filter(path, stat) && !(opt.mtimeCache.get(path) > stat.mtime)
    : (path, stat) => !(opt.mtimeCache.get(path) > stat.mtime)
}


/***/ }),

/***/ "./node_modules/tar/lib/warn-mixin.js":
/*!********************************************!*\
  !*** ./node_modules/tar/lib/warn-mixin.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Base => class extends Base {
  warn (msg, data) {
    if (!this.strict)
      this.emit('warn', msg, data)
    else if (data instanceof Error)
      this.emit('error', data)
    else {
      const er = new Error(msg)
      er.data = data
      this.emit('error', er)
    }
  }
}


/***/ }),

/***/ "./node_modules/tar/lib/winchars.js":
/*!******************************************!*\
  !*** ./node_modules/tar/lib/winchars.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// When writing files on Windows, translate the characters to their
// 0xf000 higher-encoded versions.

const raw = [
  '|',
  '<',
  '>',
  '?',
  ':'
]

const win = raw.map(char =>
  String.fromCharCode(0xf000 + char.charCodeAt(0)))

const toWin = new Map(raw.map((char, i) => [char, win[i]]))
const toRaw = new Map(win.map((char, i) => [char, raw[i]]))

module.exports = {
  encode: s => raw.reduce((s, c) => s.split(c).join(toWin.get(c)), s),
  decode: s => win.reduce((s, c) => s.split(c).join(toRaw.get(c)), s)
}


/***/ }),

/***/ "./node_modules/tar/lib/write-entry.js":
/*!*********************************************!*\
  !*** ./node_modules/tar/lib/write-entry.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Buffer = __webpack_require__(/*! ./buffer.js */ "./node_modules/tar/lib/buffer.js")
const MiniPass = __webpack_require__(/*! minipass */ "./node_modules/minipass/index.js")
const Pax = __webpack_require__(/*! ./pax.js */ "./node_modules/tar/lib/pax.js")
const Header = __webpack_require__(/*! ./header.js */ "./node_modules/tar/lib/header.js")
const ReadEntry = __webpack_require__(/*! ./read-entry.js */ "./node_modules/tar/lib/read-entry.js")
const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")

const types = __webpack_require__(/*! ./types.js */ "./node_modules/tar/lib/types.js")
const maxReadSize = 16 * 1024 * 1024
const PROCESS = Symbol('process')
const FILE = Symbol('file')
const DIRECTORY = Symbol('directory')
const SYMLINK = Symbol('symlink')
const HARDLINK = Symbol('hardlink')
const HEADER = Symbol('header')
const READ = Symbol('read')
const LSTAT = Symbol('lstat')
const ONLSTAT = Symbol('onlstat')
const ONREAD = Symbol('onread')
const ONREADLINK = Symbol('onreadlink')
const OPENFILE = Symbol('openfile')
const ONOPENFILE = Symbol('onopenfile')
const CLOSE = Symbol('close')
const MODE = Symbol('mode')
const warner = __webpack_require__(/*! ./warn-mixin.js */ "./node_modules/tar/lib/warn-mixin.js")
const winchars = __webpack_require__(/*! ./winchars.js */ "./node_modules/tar/lib/winchars.js")

const modeFix = __webpack_require__(/*! ./mode-fix.js */ "./node_modules/tar/lib/mode-fix.js")

const WriteEntry = warner(class WriteEntry extends MiniPass {
  constructor (p, opt) {
    opt = opt || {}
    super(opt)
    if (typeof p !== 'string')
      throw new TypeError('path is required')
    this.path = p
    // suppress atime, ctime, uid, gid, uname, gname
    this.portable = !!opt.portable
    // until node has builtin pwnam functions, this'll have to do
    this.myuid = process.getuid && process.getuid()
    this.myuser = process.env.USER || ''
    this.maxReadSize = opt.maxReadSize || maxReadSize
    this.linkCache = opt.linkCache || new Map()
    this.statCache = opt.statCache || new Map()
    this.preservePaths = !!opt.preservePaths
    this.cwd = opt.cwd || process.cwd()
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.noMtime = !!opt.noMtime
    this.mtime = opt.mtime || null

    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    if (!this.preservePaths && path.win32.isAbsolute(p)) {
      // absolutes on posix are also absolutes on win32
      // so we only need to test this one to get both
      const parsed = path.win32.parse(p)
      this.warn('stripping ' + parsed.root + ' from absolute path', p)
      this.path = p.substr(parsed.root.length)
    }

    this.win32 = !!opt.win32 || process.platform === 'win32'
    if (this.win32) {
      this.path = winchars.decode(this.path.replace(/\\/g, '/'))
      p = p.replace(/\\/g, '/')
    }

    this.absolute = opt.absolute || path.resolve(this.cwd, p)

    if (this.path === '')
      this.path = './'

    if (this.statCache.has(this.absolute))
      this[ONLSTAT](this.statCache.get(this.absolute))
    else
      this[LSTAT]()
  }

  [LSTAT] () {
    fs.lstat(this.absolute, (er, stat) => {
      if (er)
        return this.emit('error', er)
      this[ONLSTAT](stat)
    })
  }

  [ONLSTAT] (stat) {
    this.statCache.set(this.absolute, stat)
    this.stat = stat
    if (!stat.isFile())
      stat.size = 0
    this.type = getType(stat)
    this.emit('stat', stat)
    this[PROCESS]()
  }

  [PROCESS] () {
    switch (this.type) {
      case 'File': return this[FILE]()
      case 'Directory': return this[DIRECTORY]()
      case 'SymbolicLink': return this[SYMLINK]()
      // unsupported types are ignored.
      default: return this.end()
    }
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory')
  }

  [HEADER] () {
    if (this.type === 'Directory' && this.portable)
      this.noMtime = true

    this.header = new Header({
      path: this.path,
      linkpath: this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this[MODE](this.stat.mode),
      uid: this.portable ? null : this.stat.uid,
      gid: this.portable ? null : this.stat.gid,
      size: this.stat.size,
      mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
      type: this.type,
      uname: this.portable ? null :
        this.stat.uid === this.myuid ? this.myuser : '',
      atime: this.portable ? null : this.stat.atime,
      ctime: this.portable ? null : this.stat.ctime
    })

    if (this.header.encode() && !this.noPax)
      this.write(new Pax({
        atime: this.portable ? null : this.header.atime,
        ctime: this.portable ? null : this.header.ctime,
        gid: this.portable ? null : this.header.gid,
        mtime: this.noMtime ? null : this.mtime || this.header.mtime,
        path: this.path,
        linkpath: this.linkpath,
        size: this.header.size,
        uid: this.portable ? null : this.header.uid,
        uname: this.portable ? null : this.header.uname,
        dev: this.portable ? null : this.stat.dev,
        ino: this.portable ? null : this.stat.ino,
        nlink: this.portable ? null : this.stat.nlink
      }).encode())
    this.write(this.header.block)
  }

  [DIRECTORY] () {
    if (this.path.substr(-1) !== '/')
      this.path += '/'
    this.stat.size = 0
    this[HEADER]()
    this.end()
  }

  [SYMLINK] () {
    fs.readlink(this.absolute, (er, linkpath) => {
      if (er)
        return this.emit('error', er)
      this[ONREADLINK](linkpath)
    })
  }

  [ONREADLINK] (linkpath) {
    this.linkpath = linkpath
    this[HEADER]()
    this.end()
  }

  [HARDLINK] (linkpath) {
    this.type = 'Link'
    this.linkpath = path.relative(this.cwd, linkpath)
    this.stat.size = 0
    this[HEADER]()
    this.end()
  }

  [FILE] () {
    if (this.stat.nlink > 1) {
      const linkKey = this.stat.dev + ':' + this.stat.ino
      if (this.linkCache.has(linkKey)) {
        const linkpath = this.linkCache.get(linkKey)
        if (linkpath.indexOf(this.cwd) === 0)
          return this[HARDLINK](linkpath)
      }
      this.linkCache.set(linkKey, this.absolute)
    }

    this[HEADER]()
    if (this.stat.size === 0)
      return this.end()

    this[OPENFILE]()
  }

  [OPENFILE] () {
    fs.open(this.absolute, 'r', (er, fd) => {
      if (er)
        return this.emit('error', er)
      this[ONOPENFILE](fd)
    })
  }

  [ONOPENFILE] (fd) {
    const blockLen = 512 * Math.ceil(this.stat.size / 512)
    const bufLen = Math.min(blockLen, this.maxReadSize)
    const buf = Buffer.allocUnsafe(bufLen)
    this[READ](fd, buf, 0, buf.length, 0, this.stat.size, blockLen)
  }

  [READ] (fd, buf, offset, length, pos, remain, blockRemain) {
    fs.read(fd, buf, offset, length, pos, (er, bytesRead) => {
      if (er)
        return this[CLOSE](fd, _ => this.emit('error', er))
      this[ONREAD](fd, buf, offset, length, pos, remain, blockRemain, bytesRead)
    })
  }

  [CLOSE] (fd, cb) {
    fs.close(fd, cb)
  }

  [ONREAD] (fd, buf, offset, length, pos, remain, blockRemain, bytesRead) {
    if (bytesRead <= 0 && remain > 0) {
      const er = new Error('encountered unexpected EOF')
      er.path = this.absolute
      er.syscall = 'read'
      er.code = 'EOF'
      this[CLOSE](fd, _ => _)
      return this.emit('error', er)
    }

    if (bytesRead > remain) {
      const er = new Error('did not encounter expected EOF')
      er.path = this.absolute
      er.syscall = 'read'
      er.code = 'EOF'
      this[CLOSE](fd, _ => _)
      return this.emit('error', er)
    }

    // null out the rest of the buffer, if we could fit the block padding
    if (bytesRead === remain) {
      for (let i = bytesRead; i < length && bytesRead < blockRemain; i++) {
        buf[i + offset] = 0
        bytesRead ++
        remain ++
      }
    }

    const writeBuf = offset === 0 && bytesRead === buf.length ?
      buf : buf.slice(offset, offset + bytesRead)
    remain -= bytesRead
    blockRemain -= bytesRead
    pos += bytesRead
    offset += bytesRead

    this.write(writeBuf)

    if (!remain) {
      if (blockRemain)
        this.write(Buffer.alloc(blockRemain))
      this.end()
      this[CLOSE](fd, _ => _)
      return
    }

    if (offset >= length) {
      buf = Buffer.allocUnsafe(length)
      offset = 0
    }
    length = buf.length - offset
    this[READ](fd, buf, offset, length, pos, remain, blockRemain)
  }
})

class WriteEntrySync extends WriteEntry {
  constructor (path, opt) {
    super(path, opt)
  }

  [LSTAT] () {
    this[ONLSTAT](fs.lstatSync(this.absolute))
  }

  [SYMLINK] () {
    this[ONREADLINK](fs.readlinkSync(this.absolute))
  }

  [OPENFILE] () {
    this[ONOPENFILE](fs.openSync(this.absolute, 'r'))
  }

  [READ] (fd, buf, offset, length, pos, remain, blockRemain) {
    let threw = true
    try {
      const bytesRead = fs.readSync(fd, buf, offset, length, pos)
      this[ONREAD](fd, buf, offset, length, pos, remain, blockRemain, bytesRead)
      threw = false
    } finally {
      if (threw)
        try { this[CLOSE](fd) } catch (er) {}
    }
  }

  [CLOSE] (fd) {
    fs.closeSync(fd)
  }
}

const WriteEntryTar = warner(class WriteEntryTar extends MiniPass {
  constructor (readEntry, opt) {
    opt = opt || {}
    super(opt)
    this.preservePaths = !!opt.preservePaths
    this.portable = !!opt.portable
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.noMtime = !!opt.noMtime

    this.readEntry = readEntry
    this.type = readEntry.type
    if (this.type === 'Directory' && this.portable)
      this.noMtime = true

    this.path = readEntry.path
    this.mode = this[MODE](readEntry.mode)
    this.uid = this.portable ? null : readEntry.uid
    this.gid = this.portable ? null : readEntry.gid
    this.uname = this.portable ? null : readEntry.uname
    this.gname = this.portable ? null : readEntry.gname
    this.size = readEntry.size
    this.mtime = this.noMtime ? null : opt.mtime || readEntry.mtime
    this.atime = this.portable ? null : readEntry.atime
    this.ctime = this.portable ? null : readEntry.ctime
    this.linkpath = readEntry.linkpath

    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    if (path.isAbsolute(this.path) && !this.preservePaths) {
      const parsed = path.parse(this.path)
      this.warn(
        'stripping ' + parsed.root + ' from absolute path',
        this.path
      )
      this.path = this.path.substr(parsed.root.length)
    }

    this.remain = readEntry.size
    this.blockRemain = readEntry.startBlockSize

    this.header = new Header({
      path: this.path,
      linkpath: this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this.mode,
      uid: this.portable ? null : this.uid,
      gid: this.portable ? null : this.gid,
      size: this.size,
      mtime: this.noMtime ? null : this.mtime,
      type: this.type,
      uname: this.portable ? null : this.uname,
      atime: this.portable ? null : this.atime,
      ctime: this.portable ? null : this.ctime
    })

    if (this.header.encode() && !this.noPax)
      super.write(new Pax({
        atime: this.portable ? null : this.atime,
        ctime: this.portable ? null : this.ctime,
        gid: this.portable ? null : this.gid,
        mtime: this.noMtime ? null : this.mtime,
        path: this.path,
        linkpath: this.linkpath,
        size: this.size,
        uid: this.portable ? null : this.uid,
        uname: this.portable ? null : this.uname,
        dev: this.portable ? null : this.readEntry.dev,
        ino: this.portable ? null : this.readEntry.ino,
        nlink: this.portable ? null : this.readEntry.nlink
      }).encode())

    super.write(this.header.block)
    readEntry.pipe(this)
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory')
  }

  write (data) {
    const writeLen = data.length
    if (writeLen > this.blockRemain)
      throw new Error('writing more to entry than is appropriate')
    this.blockRemain -= writeLen
    return super.write(data)
  }

  end () {
    if (this.blockRemain)
      this.write(Buffer.alloc(this.blockRemain))
    return super.end()
  }
})

WriteEntry.Sync = WriteEntrySync
WriteEntry.Tar = WriteEntryTar

const getType = stat =>
  stat.isFile() ? 'File'
  : stat.isDirectory() ? 'Directory'
  : stat.isSymbolicLink() ? 'SymbolicLink'
  : 'Unsupported'

module.exports = WriteEntry


/***/ }),

/***/ "./node_modules/wide-align/align.js":
/*!******************************************!*\
  !*** ./node_modules/wide-align/align.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stringWidth = __webpack_require__(/*! string-width */ "string-width")

exports.center = alignCenter
exports.left = alignLeft
exports.right = alignRight

// lodash's way of generating pad characters.

function createPadding (width) {
  var result = ''
  var string = ' '
  var n = width
  do {
    if (n % 2) {
      result += string;
    }
    n = Math.floor(n / 2);
    string += string;
  } while (n);

  return result;
}

function alignLeft (str, width) {
  var trimmed = str.trimRight()
  if (trimmed.length === 0 && str.length >= width) return str
  var padding = ''
  var strWidth = stringWidth(trimmed)

  if (strWidth < width) {
    padding = createPadding(width - strWidth)
  }

  return trimmed + padding
}

function alignRight (str, width) {
  var trimmed = str.trimLeft()
  if (trimmed.length === 0 && str.length >= width) return str
  var padding = ''
  var strWidth = stringWidth(trimmed)

  if (strWidth < width) {
    padding = createPadding(width - strWidth)
  }

  return padding + trimmed
}

function alignCenter (str, width) {
  var trimmed = str.trim()
  if (trimmed.length === 0 && str.length >= width) return str
  var padLeft = ''
  var padRight = ''
  var strWidth = stringWidth(trimmed)

  if (strWidth < width) {
    var padLeftBy = parseInt((width - strWidth) / 2, 10) 
    padLeft = createPadding(padLeftBy)
    padRight = createPadding(width - (strWidth + padLeftBy))
  }

  return padLeft + trimmed + padRight
}


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
const passport = __webpack_require__(/*! passport */ "./node_modules/passport/lib/index.js");
const path = __webpack_require__(/*! path */ "path");
const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
// 라우터
// import indexRouter from './routes';
// import authRouter from './routes/auth';
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
app.use('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('3000번 포트 서버 대기!');
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
const config = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../../config/config'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))[env];
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
        User.find({ where: { id } })
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
const localStrategy = __webpack_require__(/*! passport-local */ "./node_modules/passport-local/lib/index.js");
const bcrypt = __webpack_require__(/*! bcrypt */ "./node_modules/bcrypt/bcrypt.js");
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
const LocalStrategy = localStrategy.Strategy;
const { User } = models_1.default;
exports.default = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield User.find({ where: { email } });
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
            // eslint-disable-next-line no-console
            console.error(err);
            done(err);
        }
    })));
};


/***/ }),

/***/ "aproba":
/*!*************************!*\
  !*** external "aproba" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aproba");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "chownr":
/*!*************************!*\
  !*** external "chownr" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chownr");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

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

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "iconv-lite":
/*!*****************************!*\
  !*** external "iconv-lite" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),

/***/ "minimatch":
/*!****************************!*\
  !*** external "minimatch" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("minimatch");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),

/***/ "nopt":
/*!***********************!*\
  !*** external "nopt" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nopt");

/***/ }),

/***/ "object-assign":
/*!********************************!*\
  !*** external "object-assign" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ "rc":
/*!*********************!*\
  !*** external "rc" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rc");

/***/ }),

/***/ "readable-stream":
/*!**********************************!*\
  !*** external "readable-stream" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("readable-stream");

/***/ }),

/***/ "rimraf":
/*!*************************!*\
  !*** external "rimraf" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rimraf");

/***/ }),

/***/ "safe-buffer":
/*!******************************!*\
  !*** external "safe-buffer" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("safe-buffer");

/***/ }),

/***/ "semver":
/*!*************************!*\
  !*** external "semver" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("semver");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "set-blocking":
/*!*******************************!*\
  !*** external "set-blocking" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("set-blocking");

/***/ }),

/***/ "signal-exit":
/*!******************************!*\
  !*** external "signal-exit" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("signal-exit");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "string-width":
/*!*******************************!*\
  !*** external "string-width" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("string-width");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),

/***/ "strip-ansi":
/*!*****************************!*\
  !*** external "strip-ansi" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("strip-ansi");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "yallist":
/*!**************************!*\
  !*** external "yallist" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yallist");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map