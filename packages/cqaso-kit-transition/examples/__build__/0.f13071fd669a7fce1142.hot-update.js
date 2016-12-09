webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _transition = __webpack_require__(1);

	var _css = __webpack_require__(3);

	var element = document.getElementById('box');

	(0, _css.addCss)(element, {
	    translateY: '50px'
	});

	(0, _transition.transition)(element).to({ translateY: 100 }, { duration: 1000 }).to({ translateX: 200 }, { duration: 800 }).to({ translateY: 300 }, { duration: 1000 });

/***/ }
])