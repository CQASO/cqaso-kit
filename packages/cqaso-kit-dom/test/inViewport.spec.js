import inViewport from '../src/inViewport.js';

describe('inViewport.js', () => {

    let box,
        container;

    before(() => {
        box = document.createElement('div');
        container = document.createElement('div');

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
    })

    it('应该返回false，当元素完全不在viewport中', () => {
        expect(inViewport(box, container)).to.be.false;
    });

    it('应该返回false，当元素在viewport一部分', () => {
        container.scrollTop = 78;
        expect(inViewport(box, container)).to.be.false;
    });

    it('应该返回true，当元素完全在viewport中', () => {
        container.scrollTop = 165;
        expect(inViewport(box, container)).to.be.true;
    });

    it('应该返回false，当元素被滚动条遮住', () => {
        container.scrollTop = 0;
        box.style.cssText += `;
            position: relative;
            top: 100px;
        `;
        expect(inViewport(box, container)).to.be.false;
    });

    it('应该返回true，当元素没被滚动条遮住', () => {
        container.scrollTop = 0;
        box.style.cssText += `;
            position: relative;
            top: 80px;
        `;
        expect(inViewport(box, container)).to.be.true;
    });
});
