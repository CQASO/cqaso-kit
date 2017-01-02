(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.fp = global.fp || {})));
}(this, (function (exports) { 'use strict';

function curry(fn) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return fn.bind.apply(fn, [null].concat(args));
    };
}

var map = curry(function (fn, arr) {
  return arr.map(fn);
});

var filter = curry(function (fn, arr) {
  return arr.filter(fn);
});

exports.map = map;
exports.filter = filter;

Object.defineProperty(exports, '__esModule', { value: true });

})));
