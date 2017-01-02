(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cqaso-kit-autoprefixer')) :
    typeof define === 'function' && define.amd ? define(['exports', 'cqaso-kit-autoprefixer'], factory) :
    (factory((global.css = global.css || {}, global.css.js = global.css.js || {}),global.cqasoKitAutoprefixer));
}(this, (function (exports,cqasoKitAutoprefixer) { 'use strict';

/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

/**
 * @module cqaso-kit-css
 *
 * @description
 * 包括导出的函数:addCss
 */

var transformTypes = ['scale', 'scaleX', 'scaleY', 'scale3d', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'skew', 'skewX', 'skewY', 'matrix', 'matrix3d', 'perspective'];

/**
 * @description 添加css类
 * @category cqaso-kit-css
 *
 * @param  {Object}  element 目标元素
 * @param  {Object}  props   css属性对象
 *
 * @example
 * const {addCss} = require('cqaso-kit-css');
 * addCss(element, {
 *   translate: '100px',
 *   rotate: '90deg'
 * });
 */
function addCss(element, props) {
    var transforms = [];

    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            var value = props[key];
            if (~transformTypes.indexOf(key)) {
                transforms.push(key + '(' + value + ')');
                delete props[key];
            }
        }
    }

    if (transforms.length) {
        props['transform'] = transforms.join(' ');
    }

    for (var _key in props) {
        if (props.hasOwnProperty(_key)) {
            var styleName = cqasoKitAutoprefixer.camelCase(cqasoKitAutoprefixer.addPrefix(_key));
            element.style[styleName] = props[_key];
        }
    }
}

exports.addCss = addCss;

Object.defineProperty(exports, '__esModule', { value: true });

})));
