(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.inViewport = factory());
}(this, (function () { 'use strict';

var win = typeof window !== 'undefined' && window;
var doc = typeof document !== 'undefined' && document;
var docElem = doc && doc.documentElement;

function viewportW() {
    var a = docElem['clientWidth'];
    var b = win['innerWidth'];
    return a < b ? b : a;
}

function viewportH() {
    var a = docElem['clientHeight'];
    var b = win['innerHeight'];
    return a < b ? b : a;
}

function getBoundingClientRect(el) {
    return el.getBoundingClientRect();
}

/**
 * @description 判断元素是否在viewport中
 * @category cqaso-kit-dom
 * @param  {Object} el 目标元素
 * @return {Boolean}   是否在viewport中
 *
 * @example
 * const dom = require('cqaso-kit-dom');
 * dom.inViewport(element);
 * => true
 */
function inViewport(el, parent) {
    if (!el || 1 !== el.nodeType) return false;

    // ClientRect { bottom, height, left, right, top, width }
    var bound = getBoundingClientRect(el);

    if (parent && parent.nodeType === 1) {
        // 父元素存在
        var parentBound = getBoundingClientRect(parent);

        var relativeBound = {
            top: bound.top - parentBound.top,
            left: bound.left - parentBound.left,
            // NOTE: 父元素parentBound.right/bottom没有考虑滚动条的影响
            // parent.clientWidth不包含滚动条
            right: parentBound.left + parent.clientWidth - bound.right,
            bottom: parentBound.top + parent.clientHeight - bound.bottom
        };

        return relativeBound.bottom >= 0 && relativeBound.right >= 0 && relativeBound.top <= parent.clientHeight && relativeBound.left <= parent.clientWidth;
    }

    // 父元素不存在（默认相对窗口）
    return !!bound && bound.bottom >= 0 && bound.right >= 0 && bound.top <= viewportH() && bound.left <= viewportW();
}

return inViewport;

})));
