(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.autoprefixer = global.autoprefixer || {}, global.autoprefixer.js = global.autoprefixer.js || {})));
}(this, (function (exports) { 'use strict';

/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

/**
 * @module cqaso-kit-autoprefixer
 *
 * @description
 * cqaso自定义的autoprefixer,包括导出的函数:
 * camelCase, deCamelCase, getPrefix, addPrefix, isSupport
 */

// 统计前缀
var prefixes = {};

// 前缀属性对象
var properties = [];

// 缓存css属性名
var propertiesCache = {};

var style = window.getComputedStyle(document.documentElement, null);
var dummy = document.createElement('div').style;

function iterate(property) {
    if (property.charAt(0) === '-') {
        properties.push(property);

        var parts = property.split('-');
        var _prefix = parts[1];

        // Count prefix uses
        prefixes[_prefix] = ++prefixes[_prefix] || 1;

        // This helps determining shorthands
        while (parts.length > 3) {
            parts.pop();
            var shorthand = parts.join('-');
            if (supported(shorthand) && properties.indexOf(shorthand) === -1) {
                properties.push(shorthand);
            }
        }
    }
}

function supported(property) {
    return camelCase(property) in dummy;
}

// Some browsers have numerical indices for the properties, some don't
if (style && style.length > 0) {
    for (var i = 0; i < style.length; i++) {
        iterate(style[i]);
    }
} else {
    for (var property in style) {
        if (style.hasOwnProperty(property)) {
            iterate(deCamelCase(property));
        }
    }
}

var prefix = Object.keys(prefixes)[0];

/**
 * @description 驼峰写法
 * @category cqaso-kit-autoprefixer
 *
 * @param  {String} str css属性字符串
 * @return {Stirng}     驼峰写法的字符串
 *
 * @example
 * const autoprefixer = require('cqaso-kit-autoprefixer');
 * autoprefixer.camelCase('-webkit-transiform');
 * => WebkitTransiform
 */
function camelCase(str) {
    return str.replace(/-([a-z])/g, function ($0, $1) {
        return $1.toUpperCase();
    }).replace('-', '');
}

/**
 * @description css属性写法
 * @category cqaso-kit-autoprefixer
 *
 * @param  {String} str 驼峰写法字符串
 * @return {String}     css属性字符串
 *
 * @example
 * const autoprefixer = require('cqaso-kit-autoprefixer');
 * autoprefixer.deCamelCase('WebkitTransiform');
 * => -webkit-transiform
 */
function deCamelCase(str) {
    return str.replace(/[A-Z]/g, function ($0) {
        return '-' + $0.toLowerCase();
    });
}

/**
 * @description 获得css浏览器前缀
 * @category cqaso-kit-autoprefixer
 *
 * @return {String} css前缀
 *
 * @example
 * const autoprefixer = require('cqaso-kit-autoprefixer');
 * autoprefixer.getPrefix('WebkitTransiform');
 * => -webkit-
 */
function getPrefix() {
    return prefix;
}

/**
 * @description 为css属性名添加前缀
 * @category cqaso-kit-autoprefixer
 *
 * @param {String} property css属性名
 *
 * @example
 * const autoprefixer = require('cqaso-kit-autoprefixer');
 * autoprefixer.addPrefix('transiform');
 * => -webkit-transiform
 */
function addPrefix(property) {
    if (propertiesCache[property]) return propertiesCache[property];

    var index = properties.indexOf('-' + prefix + '-' + property);

    propertiesCache[property] = ~index ? properties[index] : property;

    return propertiesCache[property];
}

/**
 * @description 检测浏览器是否支持
 * @category cqaso-kit-autoprefixer
 *
 * @param  {String}  propertyName css属性名
 * @return {Boolean}              浏览器是否支持该属性
 *
 * @example
 * const autoprefixer = require('cqaso-kit-autoprefixer');
 * autoprefixer.isSupport('transiform');
 * => true
 */
function isSupport(propertyName) {
    var elm = document.createElement('div'),
        propertyName = camelCase(propertyName);

    if (elm.style[propertyName] != undefined) return true;

    var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
        domPrefixes = 'Webkit Moz ms O'.split(' ');

    for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined) return true;
    }

    return false;
}

exports.camelCase = camelCase;
exports.deCamelCase = deCamelCase;
exports.getPrefix = getPrefix;
exports.addPrefix = addPrefix;
exports.isSupport = isSupport;

Object.defineProperty(exports, '__esModule', { value: true });

})));
