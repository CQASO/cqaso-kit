/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

/* ------------------------------------
 * autoprefixer
 * ------------------------------------ */

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

// 驼峰写法
export function camelCase(str) {
    return str.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()).replace('-', '');
}

// css属性写法
export function deCamelCase(str) {
    return str.replace(/[A-Z]/g, ($0) => '-' + $0.toLowerCase());
}

// 获得前缀
export function getPrefix() {
    return prefix;
}

// 添加前缀
export function addPrefix(property) {
    if (propertiesCache[property]) return propertiesCache[property];

    const index = properties.indexOf(`-${prefix}-${property}`);

    propertiesCache[property] = (~index) ? properties[index] : property;

    return propertiesCache[property];
}

// 检测浏览器是否支持
export function isSupport(propertyName) {
    var elm = document.createElement('div'),
        propertyName = camelCase(propertyName);

    if (elm.style[propertyName] != undefined)
      return true;

    var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
      domPrefixes = 'Webkit Moz ms O'.split(' ');

    for (var i = 0; i < domPrefixes.length; i++) {
      if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined)
        return true;
    }

    return false;
}
