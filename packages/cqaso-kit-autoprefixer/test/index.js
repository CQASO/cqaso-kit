import {camelCase} from '../src/index.js';

describe('autoprefixer', () => {
    // 测试驼峰写法
    it('测试 export: function => camelCase', () => {
        expect(camelCase('-webkit-transform')).to.equal('webkitTransform');
    });
});
