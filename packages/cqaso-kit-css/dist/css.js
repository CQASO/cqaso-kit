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

/* ------------------------------------
 * css
 * ------------------------------------ */

var transformTypes = ['scale', 'scaleX', 'scaleY', 'scale3d', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'skew', 'skewX', 'skewY', 'matrix', 'matrix3d', 'perspective'];

function addCss(element, props, options) {
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
