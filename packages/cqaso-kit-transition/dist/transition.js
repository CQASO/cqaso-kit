(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cqaso-kit-autoprefixer'), require('cqaso-kit-css'), require('lodash.assign')) :
  typeof define === 'function' && define.amd ? define(['exports', 'cqaso-kit-autoprefixer', 'cqaso-kit-css', 'lodash.assign'], factory) :
  (factory((global.css = global.css || {}, global.css.js = global.css.js || {}),global.cqasoKitAutoprefixer,global.cqasoKitCss,global.assign));
}(this, (function (exports,cqasoKitAutoprefixer,cqasoKitCss,assign) { 'use strict';

assign = 'default' in assign ? assign['default'] : assign;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * Class Queue
 */

var TransitionQueue = function () {
    function TransitionQueue() {
        classCallCheck(this, TransitionQueue);

        this._queuelist = [];
        this._queueing = false;
    }

    TransitionQueue.prototype.queue = function queue(item) {
        this._queuelist.push(item);
        if (!this._queueing) {
            this._queueing = true;
            item();
        }
    };

    TransitionQueue.prototype.dequeue = function dequeue() {
        this._queuelist.shift();
        if (this._queuelist.length) {
            this._queuelist[0]();
        } else {
            this._queueing = false;
        }
    };

    return TransitionQueue;
}();

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
var unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
var prefix$1 = bind !== 'addEventListener' ? 'on' : '';

var event = {
    one: function (node, eventNames, eventListener) {
        var typeArray = eventNames.split(' ');
        var recursiveFunction = function recursiveFunction(e) {
            e.target.removeEventListener(e.type, recursiveFunction);
            return eventListener(e);
        };

        for (var i = typeArray.length; i--;) {
            this.on(node, typeArray[i], recursiveFunction);
        }
    },


    /**
     * Bind `node` event `eventName` to `eventListener`.
     *
     * @param {Element} node
     * @param {String} eventName
     * @param {Function} eventListener
     * @param {Boolean} capture
     * @return {Obejct}
     * @api public
     */

    on: function (node, eventName, eventListener) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        node[bind](prefix$1 + eventName, eventListener);

        return {
            off: function off() {
                node[unbind](prefix$1 + eventName, eventListener, capture);
            }
        };
    },


    /**
     * Unbind `node` event `eventName`'s callback `eventListener`.
     *
     * @param {Element} node
     * @param {String} eventName
     * @param {Function} eventListener
     * @param {Boolean} capture
     * @return {Function}
     * @api public
     */

    off: function (node, eventName, eventListener) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        node[unbind](prefix$1 + eventName, eventListener, capture);
        return eventListener;
    }
};

/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

/* ------------------------------------
 * transition
 * ------------------------------------ */

var prefix = cqasoKitAutoprefixer.getPrefix();
var transitionend_name = prefix ? prefix + 'TransitionEnd' : 'transitionend';
var defaults$$1 = {
    duration: 400,
    queue: true,
    easing: ''
};

/**
 * Class Transition
 */

var Transition = function (_Queue) {
    inherits(Transition, _Queue);

    function Transition(element) {
        classCallCheck(this, Transition);

        var _this = possibleConstructorReturn(this, _Queue.call(this));

        _this._element = element;
        return _this;
    }

    Transition.prototype.to = function to(props, options) {
        var opts = assign({}, defaults$$1, options);
        // 插入到队列
        this.queue(this.transition(this._element, props, opts));
        return this;
    };

    Transition.prototype.transition = function transition(element, props, options) {
        var _this2 = this;

        return function () {
            props['transition'] = 'all ' + options.duration + 'ms ' + options.easing;
            transitionEnd(element, function () {
                cqasoKitCss.addCss(element, { 'transition': '' });
                // 一个动画结束后，从队列中注销
                _this2.dequeue();
            });

            // 保证transitionend触发
            verifyTransitionEnd(element, options.duration);
            cqasoKitCss.addCss(element, props);
        };
    };

    Transition.prototype.delay = function delay(duration) {
        var _this3 = this;

        this.queue(function () {
            window.setTimeout(function () {
                return _this3.dequeue();
            }, duration);
        });
        return this;
    };

    Transition.prototype.end = function end(callback) {
        this.queue(callback);
    };

    return Transition;
}(TransitionQueue);

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
            var event$$1 = new MouseEvent(transitionend_name, {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });

            element.dispatchEvent(event$$1);
        }
    }, duration + 50);
}

/**
 * transitiionend事件绑定
 * @param  {Object}   element  元素
 * @param  {function} callback 回调函数
 * @return
 */
function transitionEnd(element, callback) {
    event.one(element, transitionend_name, callback);
}

exports.transition = transition;

Object.defineProperty(exports, '__esModule', { value: true });

})));
