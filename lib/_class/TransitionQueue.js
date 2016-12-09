/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * Class Queue
 */

export default class TransitionQueue {
    constructor() {
        this._queuelist = [];
        this._queueing = false;
    }

    queue(item) {
        this._queuelist.push(item);
        if (!this._queueing) {
            this._queueing = true;
            item();
        }
    }

    dequeue() {
        this._queuelist.shift();
        if (this._queuelist.length) {
            this._queuelist[0]();
        } else {
            this._queueing = false;
        }
    }
}
