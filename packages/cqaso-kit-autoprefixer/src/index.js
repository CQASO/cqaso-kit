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
const prefixes = {};

// 前缀属性对象
const properties = [];

// 缓存css属性名
const propertiesCache = {};

let style = window.getComputedStyle(document.documentElement, null),
    dummy = document.createElement('div').style;

function iterate(property) {
    if (property.charAt(0) === '-') {
        properties.push(property);

        const parts = property.split('-');
        const prefix = parts[1];

        // Count prefix uses
        prefixes[prefix] = ++prefixes[prefix] || 1;

        // This helps determining shorthands
        while (parts.length > 3) {
            parts.pop();
            const shorthand = parts.join('-');
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
    for (let i = 0; i < style.length; i++) {
        iterate(style[i]);
    }
} else {
    for (let property in style) {
        if (style.hasOwnProperty(property)) {
            iterate(deCamelCase(property));
        }
    }
}

const prefix = Object.keys(prefixes)[0];

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
export function camelCase(str) {
    return str.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()).replace('-', '');
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
export function deCamelCase(str) {
    return str.replace(/[A-Z]/g, ($0) => '-' + $0.toLowerCase());
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
export function getPrefix() {
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
export function addPrefix(property) {
    if (propertiesCache[property]) return propertiesCache[property];

    const index = properties.indexOf(`-${prefix}-${property}`);

    propertiesCache[property] = (~index) ? properties[index] : property;

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
export function isSupport(_propertyName) {
    var elm = document.createElement('div'),
        propertyName = camelCase(_propertyName);

    if (elm.style[propertyName] !== undefined)
        return true;

    var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
        domPrefixes = 'Webkit Moz ms O'.split(' ');

    for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + propertyNameCapital] !== undefined)
            return true;
    }

    return false;
}
