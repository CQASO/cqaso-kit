webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.transition = transition;

	var _autoprefixer = __webpack_require__(2);

	var _css = __webpack_require__(3);

	var _Queue2 = __webpack_require__(4);

	var _Queue3 = _interopRequireDefault(_Queue2);

	var _event = __webpack_require__(5);

	var _event2 = _interopRequireDefault(_event);

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
	var transitionend_name = prefix ? prefix + 'TransitionEnd' : 'transitionend';

	var defaults = {
	    duration: 400,
	    queue: true,
	    easing: ''
	};

	var Transition = function (_Queue) {
	    _inherits(Transition, _Queue);

	    function Transition(element) {
	        _classCallCheck(this, Transition);

	        var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this));

	        _this._element = element;
	        return _this;
	    }

	    _createClass(Transition, [{
	        key: 'to',
	        value: function to(props, options) {
	            var opts = Object.assign({}, defaults, options);
	            this.queue(this.transition(this._element, props, opts));
	            return this;
	        }
	    }, {
	        key: 'transition',
	        value: function transition(element, props, options) {
	            var _this2 = this;

	            return function () {
	                props['transition'] = 'all ' + options.duration + 'ms ' + options.easing;
	                transitionEnd(element, function () {
	                    (0, _css.addCss)(element, { 'transition': '' });
	                    _this2.dequeue();
	                });

	                verifyTransitionEnd(element, options.duration);
	                (0, _css.addCss)(element, props);
	            };
	        }
	    }, {
	        key: 'end',
	        value: function end(callback) {
	            this.queue(callback);
	        }
	    }]);

	    return Transition;
	}(_Queue3.default);

	function transition(element) {
	    return new Transition(element);
	}

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
	    _event2.default.one(element, transitionend_name, callback);
	}

/***/ }
])