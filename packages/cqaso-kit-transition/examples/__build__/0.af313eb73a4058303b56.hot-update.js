webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _transition = __webpack_require__(1);

	var _css = __webpack_require__(3);

	var element = document.getElementById('box');

	(0, _css.addCss)({
	    rotateY: 0
	});

	(0, _transition.transition)(element).to({ rotateY: '100deg' }).to({ translateX: '200px' });
	// .to({ translateY: '300px' }, { duration: 3000 })
	// .end(() => {
	//     console.log('transition flow end ...');
	// });

/***/ }
])