webpackHotUpdate(0,{

/***/ 4:
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
	        this._queueing = false;
	    }

	    _createClass(Queue, [{
	        key: "queue",
	        value: function queue(item) {
	            if (this._queueing) {
	                this._queuelist.push(item);
	            } else {
	                this._queueing = true;
	                item();
	            }
	        }
	    }, {
	        key: "dequeue",
	        value: function dequeue() {
	            this._queuelist.shift();
	            if (this._queuelist.length) {
	                this._queuelist[0]();
	            } else {
	                this._queueing = false;
	            }
	        }
	    }]);

	    return Queue;
	}();

	exports.default = Queue;

/***/ }

})