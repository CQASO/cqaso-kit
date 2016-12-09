webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _transition = __webpack_require__(1);

	var _css = __webpack_require__(3);

	var element = document.getElementById('box');

	(0, _css.addCss)(element, {
	    scaleY: '.8',
	    skewX: '20deg'
	});

	(0, _transition.transition)(element, {
	    scale: "1.5",
	    rotate: "180deg"
	}, {
	    duration: 2000
	});

/***/ }
])