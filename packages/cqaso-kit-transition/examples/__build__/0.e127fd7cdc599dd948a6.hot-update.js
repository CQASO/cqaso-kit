webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _transition = __webpack_require__(1);

	var _css = __webpack_require__(3);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var element = document.getElementById('box');

	(0, _transition.transition)(element).to(_defineProperty({ rotateY: '100deg' }, 'rotateY', '100deg')).to(_defineProperty({ translateX: '200px', rotateY: '100deg' }, 'rotateY', '100deg')).to(_defineProperty({ translateY: '300px', rotateY: '100deg' }, 'rotateY', '100deg'));

/***/ }
])