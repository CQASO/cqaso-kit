import inViewport from '../../src/inViewport.js';

const box = document.createElement('div');
const container = document.createElement('div');

container.appendChild(box);
document.body.appendChild(container);

container.style.cssText += `;
    overflow: scroll;
    margin-top: 100px;
    margin-left: 100px;
    width: 200px;
    height: 200px;
    border: 1px solid blue;
`;

box.style.cssText += `;
    position: relative;
    top: 200px;
    margin-bottom: 50px;
    margin-right: 50px;
    width: 100px;
    height: 100px;
    background: red;
`;

const cloneBox = box.cloneNode();
container.appendChild(cloneBox);

container.addEventListener('scroll', () => {
    console.log(inViewport(box, container));
});
