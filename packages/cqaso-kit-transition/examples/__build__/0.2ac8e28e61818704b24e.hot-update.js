webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = __webpack_require__(3);

	var element = document.getElementById('flip');
	var front = document.querySelector('.front');
	var back = document.querySelector('.back');

	var frontBackStyle = {
	    position: 'absolute',
	    width: '100%',
	    height: '100%',
	    display: 'block',
	    'backface-visibility': 'hidden'
	};

	(0, _index2.addCss)(front, frontBackStyle);
	(0, _index2.addCss)(back, frontBackStyle);

	(0, _index2.addCss)(back, {
	    rotateY: '-180deg'
	});

	setTimeout(function () {
	    (0, _index.transition)(front).to({ 'rotateY': '180deg' });
	    (0, _index.transition)(back).to({ 'rotateY': '0' });
	}, 1000);

/***/ }
])