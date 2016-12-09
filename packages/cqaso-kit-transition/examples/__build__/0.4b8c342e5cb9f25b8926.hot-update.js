webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _transition = __webpack_require__(1);

	var _css = __webpack_require__(3);

	var element = document.getElementById('box');

	(0, _css.addCss)(element, {
	    translateX: 0,
	    translateY: 0
	});

	(0, _transition.transition)(element, {
	    translateX: '100px'
	}, {
	    duration: 1000
	});

	(0, _transition.transition)(element, {
	    translateY: '100px'
	}, {
	    duration: 2000
	});

/***/ }
])