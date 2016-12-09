webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.transition = transition;

	var _autoprefixer = __webpack_require__(2);

	var _css = __webpack_require__(3);

	/**
	 * Copyright (c) 2016-present, rainie, Inc.
	 * All rights reserved.
	 *
	 * @flow
	 */

	/* ------------------------------------
	 * transition
	 * ------------------------------------ */

	var prefix = (0, _autoprefixer.getPrefix)();
	var transition_name = (0, _autoprefixer.addPrefix)('transition');
	var transitionend_name = prefix ? prefix + 'TransitionEnd' : 'transitionend';

	var defaults = {
	    duration: 400,
	    queue: true,
	    easing: ''
	};

	/**
	 * 保证transitionend触发
	 * @param  {Object} element  element
	 * @param  {number} duration 毫秒
	 * @return
	 */
	function verifyTransitionEnd(element, duration) {
	    var called = false;
	    element.addEventListener(transitionend_name, function () {
	        called = true;
	    });

	    setTimeout(function () {
	        if (!called) {
	            element.dispatchEvent(transitionend_name);
	        }
	    }, duration + 50);
	}

	function transitionEnd(element, callback) {
	    element.addEventListener(transitionend_name, callback);
	}

	function transition(element, props, options) {
	    var opts = Object.assign({}, options, defaults);
	    props[transition_name] = 'all ' + ops.duration + 'ms opts.easing';
	    transitionEnd(elment, function () {
	        props[transition_name] = '';
	    });
	    (0, _css.addCss)(element, props);
	    verifyTransitionEnd();
	}

/***/ }
])