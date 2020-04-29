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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Computed {\r\n\r\n    constructor(target, handlersObj) {\r\n        this.target = target;\r\n        this.handlersObj = handlersObj;\r\n        this.dependences = {};\r\n        this.insideComputedProperty = false;\r\n        this.savedValues = {};\r\n        this.initProps();\r\n        this.initComputedFunctions();\r\n    }\r\n\r\n    initProps() {\r\n        for(let key in this.target){\r\n            let prop = this.target[key];\r\n            let descriptor = {}\r\n            descriptor.get = () => {\r\n                if(this.insideComputedProperty)\r\n                    this.addDependency(this.insideComputedProperty, key);\r\n                return prop;\r\n            };\r\n            descriptor.set = (newValue) => {\r\n                this.resetDependValues(key);\r\n                prop = newValue;\r\n                return newValue;\r\n            };\r\n            Object.defineProperty(this, key, descriptor);\r\n        }\r\n    }\r\n\r\n    initComputedFunctions() {\r\n        for(let key in this.handlersObj){\r\n            let handler = this.handlersObj[key];\r\n            let descriptor = {};\r\n            descriptor.get = () => {\r\n                if(typeof this.savedValues[key] !== \"undefined\")\r\n                    return this.savedValues[key];\r\n                this.setInsideComputed(key);\r\n                let result = handler.call(this);\r\n                this.unsetInsideComputed();\r\n                this.savedValues[key] = result;\r\n                return result;\r\n            };\r\n            Object.defineProperty(this, key, descriptor);\r\n        }\r\n    }\r\n\r\n    addDependency(computedKey, key) {\r\n        if(typeof this.dependences[key] === 'undefined')\r\n            this.dependences[key] = new Set([computedKey]);\r\n        else if(!this.dependences[key].has(computedKey))\r\n            this.dependences[key].add(computedKey);\r\n    }\r\n\r\n    setInsideComputed(key){\r\n        this.insideComputedProperty = key;\r\n    }\r\n\r\n    unsetInsideComputed(){\r\n        this.insideComputedProperty = false;\r\n    }\r\n\r\n    resetDependValues(key){\r\n        if(typeof this.dependences[key] !== 'undefined'){\r\n            for(let computedKey of this.dependences[key]){\r\n                if(typeof this.savedValues[computedKey] !== 'undefined')\r\n                    delete this.savedValues[computedKey];\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });