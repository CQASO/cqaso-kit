(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.map = factory());
}(this, (function () { 'use strict';

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

return map;

})));
