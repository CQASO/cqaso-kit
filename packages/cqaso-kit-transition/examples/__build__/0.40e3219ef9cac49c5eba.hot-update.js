webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _transition = __webpack_require__(1);

	var _css = __webpack_require__(3);

	var element = document.getElementById('box');

	// addCss(element, {
	//     rotateX: 0,
	//     translateY: 0,
	// });

	(0, _transition.transition)(element, {
	    rotateZ: '90deg'
	}, {
	    duration: 1000
	});

/***/ }
])