var css =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function(Sheet_proto){
	var originalInsertRule = Sheet_proto.insertRule;
  
	if (originalInsertRule.length === 2){ // 2 mandatory arguments: (selector, rules)
	  Sheet_proto.insertRule = function(selectorAndRule){
		// First, separate the selector from the rule
		a: for (var i=0, Len=selectorAndRule.length, isEscaped=0, newCharCode=0; i !== Len; ++i) {
		  newCharCode = selectorAndRule.charCodeAt(i);
		  if (!isEscaped && (newCharCode === 123)) { // 123 = "{".charCodeAt(0)
			// Secondly, find the last closing bracket
			var openBracketPos = i, closeBracketPos = -1;
  
			for (; i !== Len; ++i) {
			  newCharCode = selectorAndRule.charCodeAt(i);
			  if (!isEscaped && (newCharCode === 125)) { // 125 = "}".charCodeAt(0)
				closeBracketPos = i;
			  }
			  isEscaped ^= newCharCode===92?1:isEscaped; // 92 = "\\".charCodeAt(0)
			}
  
			if (closeBracketPos === -1) break a; // No closing bracket was found!
			  /*else*/ return originalInsertRule.call(
			  this, // the sheet to be changed
			  selectorAndRule.substring(0, openBracketPos), // The selector
			  selectorAndRule.substring(closeBracketPos), // The rule
			  arguments[3] // The insert index
			);
		  }
  
		  // Works by if the char code is a backslash, then isEscaped
		  // gets flipped (XOR-ed by 1), and if it is not a backslash
		  // then isEscaped gets XORed by itself, zeroing it
		  isEscaped ^= newCharCode===92?1:isEscaped; // 92 = "\\".charCodeAt(0)
		}
		// Else, there is no unescaped bracket
		return originalInsertRule.call(this, selectorAndRule, "", arguments[2]);
	  };
	}
  })(CSSStyleSheet.prototype);

function css(rule)
{
	var sheets = document.styleSheets;
	if(sheets.length == 0)
	{
		var head = document.head || document.getElementsByTagName("head")[0],
		style = document.createElement("style");

		style.type = "text/css";
		head.appendChild(style);
	}
	
	var sheet = sheets[sheets.length - 1];
	sheet.insertRule(rule, (sheet.cssRules || sheet.rules).length);
}

module.exports = css;

/***/ })
/******/ ]);