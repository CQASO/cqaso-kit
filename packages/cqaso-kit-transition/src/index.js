/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

/* ------------------------------------
 * transition
 * ------------------------------------ */

import { getPrefix } from 'cqaso-kit-autoprefixer';
import { addCss } from 'cqaso-kit-css';
import Queue from '../../../lib/_class/TransitionQueue.js';
import event from '../../../lib/_utils/event.js';
import assign from 'lodash.assign';

const prefix = getPrefix();
const transitionend_name = prefix ? prefix + 'TransitionEnd' : 'transitionend';
const defaults = {
    duration: 400,
    queue: true,
    easing: '',
};

/**
 * Class Transition
 */
class Transition extends Queue {
    constructor(element) {
        super();
        this._element = element;
    }

    to(props, options) {
        const opts = assign({}, defaults, options);
        // 插入到队列
        this.queue(this.transition(this._element, props, opts));
        return this;
    }

    transition(element, props, options) {
        return () => {
            props['transition'] = `all ${options.duration}ms ${options.easing}`;
            transitionEnd(element, () => {
                addCss(element, { 'transition': '' });
                // 一个动画结束后，从队列中注销
                this.dequeue();
            });

            // 保证transitionend触发
            verifyTransitionEnd(element, options.duration);
            addCss(element, props);
        };
    }

    delay(duration) {
        this.queue(() => {
            window.setTimeout(() => this.dequeue(), duration);
        });
        return this;
    }

    end(callback) {
        this.queue(callback);
    }
}

export function transition(element) {
    return new Transition(element);
}

/**
 * 保证transitionend触发
 * @param  {Object} element  element
 * @param  {number} duration 毫秒
 * @return
 */
function verifyTransitionEnd (element, duration) {
  let called = false;
  element.addEventListener(transitionend_name, () => {
      called = true;
  });

  setTimeout(() => {
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

/**
 * transitiionend事件绑定
 * @param  {Object}   element  元素
 * @param  {function} callback 回调函数
 * @return
 */
function transitionEnd(element, callback) {
    event.one(element, transitionend_name, callback);
}
