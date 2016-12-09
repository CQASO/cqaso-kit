webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = __webpack_require__(3);

	var element = document.getElementById('flip');
	var front = document.querySelector('.front');
	var back = document.querySelector('.back');

	var elementStyle = {
	    'position': 'relative',
	    'perspective': '600',
	    'transform-style': 'preserve-3d',
	    'transform-origin': '50% 50%',
	    'width': 120,
	    'height': 120
	};

	var frontBackStyle = {
	    position: 'absolute',
	    width: '100%',
	    height: '100%',
	    display: 'block',
	    'backface-visibility': 'hidden'
	};

	(0, _index2.addCss)(element, elementStyle);
	(0, _index2.addCss)(front, frontBackStyle);
	(0, _index2.addCss)(back, frontBackStyle);

	(0, _index2.addCss)(back, {
	    rotateY: '-180deg'
	});

	setTimeout(function () {
	    console.log('hehe');
	    (0, _index.transition)(front, {
	        'rotateY': '180deg'
	    });

	    (0, _index.transition)(back, {
	        'rotateY': '0'
	    });
	}, 1000);

	// transition(element)
	//     .to({ translateX: '100px' })
	//     .to({ translateY: '200px' }, { duration: 1000 })
	//     .end(() => {
	//         console.log('transition flow end ...');
	//     });

/***/ }
])