
const win = typeof window !== 'undefined' && window;
const doc = typeof document !== 'undefined' && document;
const docElem = doc && doc.documentElement;

function viewportW() {
    const a = docElem['clientWidth'];
    const b = win['innerWidth'];
    return a < b ? b : a;
}

function viewportH() {
    const a = docElem['clientHeight'];
    const b = win['innerHeight'];
    return a < b ? b : a;
}

function getBoundingClientRect(el) {
    return el.getBoundingClientRect();
}

/**
 * @description 判断元素是否在viewport中
 * @category cqaso-kit-dom
 * @param  {Object} el 目标元素
 * @param  {Object} parent 父元素
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
    const bound = getBoundingClientRect(el);

    if (parent && parent.nodeType === 1) {
        // 父元素存在
        const parentBound = getBoundingClientRect(parent);


        const relativeBound = {
            top: bound.top - parentBound.top,
            left: bound.left - parentBound.left,
            // NOTE: 父元素parentBound.right/bottom没有考虑滚动条的影响
            // parent.clientWidth不包含滚动条
            right: parentBound.left + parent.clientWidth - bound.right,
            bottom: parentBound.top + parent.clientHeight - bound.bottom,
        };

        return relativeBound.bottom >= 0 &&
                relativeBound.right >= 0 &&
                relativeBound.top <= parent.clientHeight &&
                relativeBound.left <= parent.clientWidth;
    }

    // 父元素不存在（默认相对窗口）
    return !!bound &&
        bound.bottom >= 0 &&
        bound.right >= 0 &&
        bound.top <= viewportH() &&
        bound.left <= viewportW();
}

export default inViewport;
