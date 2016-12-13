module.exports = {
    npm: {
        install: 'npm install cqaso-kit-xxx --save',
        example: `
const transition = require('cqaso-kit-transition');
transition(element)
    .delay(600)
    .to({rotateY: '180deg'})
    .delay(600)
    .to({rotateY: '0deg'});`,
    }
};
