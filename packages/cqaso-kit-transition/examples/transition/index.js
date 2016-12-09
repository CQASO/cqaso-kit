import {transition} from '../../src/dom/transition/index.js';
import {addCss} from '../../src/dom/css/index.js';

const element = document.getElementById('box');

transition(element)
    .delay(600)
    .to({rotateY: '180deg'})
    .delay(600)
    .to({rotateY: '0deg'});
