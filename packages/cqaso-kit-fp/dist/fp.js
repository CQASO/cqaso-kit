(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.fp = factory());
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

var filter = curry(function (fn, arr) {
  return arr.filter(fn);
});

/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * 
 */

var sort = curry(function (fn, arr) {
  return arr.sort(fn);
});

var compose = function () {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduce(function (v, f) {
      return f(v);
    }, x);
  };
};

var slice = curry(function (params, arr) {
  return arr.slice.apply(arr, params);
});

/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * 
 */

function unique(arr) {
    var n = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < arr.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (!_contains(n, arr[i])) n.push(arr[i]);
    }
    return n;
}

function _contains(arr, element) {
    return arr.some(function (val) {
        return val === element || val !== val && element !== element;
    });
}

var fp = {
    map: map,
    filter: filter,
    sort: sort,
    compose: compose,
    slice: slice,
    unique: unique
};

return fp;

})));
