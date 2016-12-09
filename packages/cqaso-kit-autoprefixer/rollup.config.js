const babel = require('rollup-plugin-babel');
const fs = require('fs');
const path = require('path');
const babelRc = JSON.parse(fs.readFileSync('.babelrc','utf8'));
export default {
    entry: 'src/index.js',
    plugins: [
        babel({
            babelrc: false,
            presets: ['es2015-minimal-rollup'].concat(babelRc.presets.slice(1)),
            plugins: babelRc.plugins,
            exclude: 'node_modules/**'
        })
    ],
    format: 'umd',
    sourceMap: false,
};
