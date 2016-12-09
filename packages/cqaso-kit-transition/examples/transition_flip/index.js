
import {transition} from '../../src/dom/transition/index.js';
import {addCss} from '../../src/dom/css/index.js';

const element = document.getElementById('flip');
const front = document.querySelector('.front');
const back = document.querySelector('.back');


const frontBackStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'block',
    'backface-visibility': 'hidden',
}

addCss(front, frontBackStyle);
addCss(back, frontBackStyle);

addCss(back, {
    rotateY: '-180deg',
});

element.addEventListener('mouseenter', function() {
    transition(front).to({rotateY: '180deg'});
    transition(back).to({rotateY: '0'});
});

element.addEventListener('mouseleave', function() {
    transition(front).to({rotateY: '0'});
    transition(back).to({rotateY: '-180deg'});
});
