var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var EXAMPLES_DIR = path.resolve(__dirname, 'examples');

module.exports = {
    entry: buildEntries(),
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: 'examples/__build__',
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: "[name].chunk.js"
    },
    devTool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};


function buildEntries() {
    return fs.readdirSync(EXAMPLES_DIR).reduce(function (a, b) {
        if (b === '__build__') {
            return a;
        }

        var isDraft = b.charAt(0) === '_';

        if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, b))) {
            a[b] = path.join(EXAMPLES_DIR, b, 'index.js');
        }

        return a;
    }, {});
}


function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}
