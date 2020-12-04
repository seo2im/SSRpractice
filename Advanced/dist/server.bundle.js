/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 92:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(297));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Abount() {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "About Page"));
}

var _default = Abount;
exports.default = _default;

/***/ }),

/***/ 288:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(297));

var _Home = _interopRequireDefault(__webpack_require__(857));

var _About = _interopRequireDefault(__webpack_require__(92));

var _profile = _interopRequireDefault(__webpack_require__(747));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function fetchUsername() {
  var usernames = ['lim', '2im', '3im'];
  return new Promise(function (resolve) {
    var username = usernames[Math.random() * 3];
    setTimeout(function () {
      return resolve(username);
    }, 100);
  });
}

function App(_ref) {
  var firstPage = _ref.firstPage;

  var _useState = (0, _react.useState)(firstPage),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      username = _useState4[0],
      setUsername = _useState4[1];

  (0, _react.useEffect)(function () {
    /* onpopstate is event handle when history change(pagination) */
    window.onpopstate = function (event) {
      setPage(event.state);
    };
  }, []);
  (0, _react.useEffect)(function () {
    fetchUsername().then(function (data) {
      return setUsername(data);
    });
  }, []);

  function OnChange(e) {
    var newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', "/".concat(newPage));
    setPage(newPage);
  }

  var PageComponent = page === 'home' || page === '' ? _Home["default"] : _About["default"];
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
    src: _profile["default"]
  }), /*#__PURE__*/_react["default"].createElement("button", {
    "data-page": "home",
    onClick: OnChange
  }, "Home"), /*#__PURE__*/_react["default"].createElement("button", {
    "data-page": "about",
    onClick: OnChange
  }, "About"), /*#__PURE__*/_react["default"].createElement(PageComponent, {
    username: username
  }));
}

var _default = App;
exports.default = _default;

/***/ }),

/***/ 857:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(297));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Home(_ref) {
  var username = _ref.username;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Home Page"), username && /*#__PURE__*/_react["default"].createElement("p", null, "`Hello! $", username, "`"));
}

var _default = Home;
exports.default = _default;

/***/ }),

/***/ 601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.renderPage = renderPage;
exports.prerenderPages = void 0;

var _fs = _interopRequireDefault(__webpack_require__(826));

var _path = _interopRequireDefault(__webpack_require__(622));

var _server = __webpack_require__(250);

var _react = _interopRequireDefault(__webpack_require__(297));

var _App = _interopRequireDefault(__webpack_require__(288));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* page read html */
var html = _fs["default"].readFileSync(_path["default"].resolve(__dirname, '../dist/index.html'), 'utf8');
/* page list */


var prerenderPages = ['home'];
/* pre render page function */

exports.prerenderPages = prerenderPages;

function renderPage(page) {
  var renderString = (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_App["default"], {
    firstPage: page
  }));
  var result = html.replace('<div id="root"></div>', "<div id=\"root\">".concat(renderString, "</div>"));
  return result;
}

/***/ }),

/***/ 747:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9ce3b610dd92d1640c6c70656e3a09ef.jpg");

/***/ }),

/***/ 127:
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ 826:
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ 8:
/***/ ((module) => {

module.exports = require("lru-cache");;

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = require("react");;

/***/ }),

/***/ 250:
/***/ ((module) => {

module.exports = require("react-dom/server");;

/***/ }),

/***/ 413:
/***/ ((module) => {

module.exports = require("stream");;

/***/ }),

/***/ 835:
/***/ ((module) => {

module.exports = require("url");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(__webpack_require__(297));

var _App = _interopRequireDefault(__webpack_require__(288));

var _server = __webpack_require__(250);

var _stream = __webpack_require__(413);

var _express = _interopRequireDefault(__webpack_require__(127));

var _fs = _interopRequireDefault(__webpack_require__(826));

var _path = _interopRequireDefault(__webpack_require__(622));

var url = _interopRequireWildcard(__webpack_require__(835));

var _common = __webpack_require__(601);

var _lruCache = _interopRequireDefault(__webpack_require__(8));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ssrCache = new _lruCache["default"]({
  max: 100,
  maxAge: 1000 * 60
});
/* Stream for cache */

function createCacheStream(cacheKey, prefix, postfix) {
  var chunks = [];
  return new _stream.Transform({
    transform: function transform(data, _, callback) {
      chunks.push(data);
      callback(null, data);
    },
    flush: function flush(callback) {
      var data = [prefix, Buffer.concat(chunks).toString(), postfix];
      ssrCache.set(cacheKey, data.join(''));
      callback();
    }
  });
}

var app = (0, _express["default"])();
/* Read preredner html */

var prerenderHtml = {};

var _iterator = _createForOfIteratorHelper(_common.prerenderPages),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var page = _step.value;

    var pageHtml = _fs["default"].readFileSync(_path["default"].resolve(__dirname, "../dist/".concat(page, ".html")), 'utf8');

    prerenderHtml[page] = pageHtml;
  }
  /* Stream render function */

} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var html = _fs["default"].readFileSync(_path["default"].resolve(__dirname, '../dist/index.html'), 'utf8');

app.use('/dist', _express["default"]["static"]('dist'));
/* web favicon reject in '*' */

app.get('./favicon.ico', function (req, res) {
  return res.sendStatus(204);
});
app.get('*', function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var cacheKey = parsedUrl.path;
  /* Get cache */

  if (ssrCache.has(cacheKey)) {
    res.send(ssrCache.get(cacheKey));
    return;
  }

  var page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
  var initialData = {
    page: page
  };
  /* render only when no pre rendering */

  var isPrerender = _common.prerenderPages.includes(page);

  var result = (isPrerender ? prerenderHtml[page] : html).replace('__DATA_FROM_SERVER__', JSON.stringify(initialData));

  if (isPrerender) {
    /* Save cache */
    ssrCache.set(cacheKey, result);
    res.send(result);
  } else {
    /* stream start is prefix ; end is posfix */
    var ROOT_TEXT = '<div id="root">';
    var prefix = result.substr(0, result.indexOf(ROOT_TEXT) + ROOT_TEXT.length);
    var postfix = result.substr(prefix.length);
    res.write(prefix);
    var stream = (0, _server.renderToNodeStream)( /*#__PURE__*/_react["default"].createElement(_App["default"], {
      page: page
    }));
    /* make cache stream pipe */

    var cacheStream = createCacheStream(cacheKey, prefix, postfix);
    cacheStream.pipe(res);
    stream.pipe(cacheStream, // res => cacheStream
    {
      end: false
    });
    stream.on('end', function () {
      res.end(postfix);
    });
  }
});
app.listen(3000);
})();

/******/ })()
;