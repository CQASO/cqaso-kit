webpackHotUpdate(0,{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addCss = addCss;

	var _autoprefixer = __webpack_require__(2);

	var transformTypes = ['scale', 'scaleX', 'scaleY', 'scale3d', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'skew', 'skewX', 'skewY', 'matrix', 'matrix3d', 'perspective']; /**
	                                                                                                                                                                                                                                                            * Copyright (c) 2016-present, rainie, Inc.
	                                                                                                                                                                                                                                                            * All rights reserved.
	                                                                                                                                                                                                                                                            *
	                                                                                                                                                                                                                                                            * @flow
	                                                                                                                                                                                                                                                            */

	/* ------------------------------------
	 * css
	 * ------------------------------------ */

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
	            var styleName = (0, _autoprefixer.camelCase)((0, _autoprefixer.addPrefix)(_key));
	            element.style[styleName] = props[_key];
	        }
	    }
	}

/***/ }

})