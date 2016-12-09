webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _transition = __webpack_require__(1);

	var _css = __webpack_require__(3);

	var element = document.getElementById('box');

	(0, _transition.transition)(element).to({ translateY: '100px' }, { duration: 1000 }).to({ translateX: '200px' }, { duration: 800 }).to({ translateY: '300px' }, { duration: 1000 });

/***/ }
])