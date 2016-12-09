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

	var _Queue2 = __webpack_require__(4);

	var _Queue3 = _interopRequireDefault(_Queue2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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

	// transition(element)
	//     .to()
	//     .to()
	//     .delay()
	//     .to();


	var Transition = function (_Queue) {
	    _inherits(Transition, _Queue);

	    function Transition(props) {
	        _classCallCheck(this, Transition);

	        return _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this));
	    }

	    return Transition;
	}(_Queue3.default);

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
	            var event = new MouseEvent(transitionend_name, {
	                'view': window,
	                'bubbles': true,
	                'cancelable': true
	            });

	            element.dispatchEvent(event);
	        }
	    }, duration + 50);
	}

	function transitionEnd(element, callback) {
	    element.addEventListener(transitionend_name, callback);
	}

	function transition(element, props, options) {
	    var opts = Object.assign({}, options, defaults);
	    props[transition_name] = 'all ' + opts.duration + 'ms ' + opts.easing;
	    transitionEnd(element, function () {
	        return props[transition_name] = '';
	    });
	    verifyTransitionEnd(element, opts.duration);
	    (0, _css.addCss)(element, props);
	}

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright (c) 2016-present, rainie, Inc.
	 * All rights reserved.
	 *
	 * Class Queue
	 */

	var Queue = function () {
	    function Queue() {
	        _classCallCheck(this, Queue);

	        this._queuelist = [];
	    }

	    _createClass(Queue, [{
	        key: "queue",
	        value: function queue(item) {
	            this._queuelist.push(item);
	        }
	    }, {
	        key: "dequeue",
	        value: function dequeue() {
	            this._queuelist.shift();
	        }
	    }]);

	    return Queue;
	}();

	exports.default = Queue;

/***/ }
])