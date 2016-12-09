/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

/* ------------------------------------
 * css
 * ------------------------------------ */

import { addPrefix, camelCase } from 'cqaso-kit-autoprefixer';

const transformTypes = ['scale', 'scaleX', 'scaleY', 'scale3d', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'skew', 'skewX', 'skewY', 'matrix', 'matrix3d', 'perspective'];

export function addCss(element, props, options) {
    const transforms = [];

    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            const value = props[key];
            if (~transformTypes.indexOf(key)) {
                transforms.push(`${key}(${value})`);
                delete props[key];
            }
        }
    }

    if (transforms.length) {
        props['transform'] = transforms.join(' ');
    }

    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            const styleName = camelCase(addPrefix(key));
            element.style[styleName] = props[key];
        }
    }
}
