/**
 * Copyright (c) 2015-present, rainie, Inc.
 * All rights reserved.
 *
 */

'use strict';

const path = require('path');

const plugins = [
    // class { handleClick = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),
    // { ...todo, completed: true }
    require.resolve('babel-plugin-transform-object-rest-spread'),
    // function* () { yield 42; yield 43; }
    [
        require.resolve('babel-plugin-transform-regenerator'), {
            // Async functions are converted to generators by babel-preset-latest
            async: false
        },
    ],
    // Polyfills the runtime needed for async/await and generators
    [
        require.resolve('babel-plugin-transform-runtime'), {
            helpers: false,
            polyfill: false,
            regenerator: true,
            // Resolve the Babel runtime relative to the config.
            moduleName: path.dirname(require.resolve('babel-runtime/package')),
        },
    ],
];

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
    throw new Error('Using `babel-preset-cqaso-kit` requires that you specify `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' + JSON.stringify(env) + '.');
}

if (env === 'development' || env === 'test') {
    plugins.push.apply(plugins, [
        // Adds component stack to warning messages
        require.resolve('babel-plugin-transform-react-jsx-source'),
        // Adds __self attribute to JSX which React will use for some warnings
        require.resolve('babel-plugin-transform-react-jsx-self'),
    ]);
}

if (env === 'test') {
    module.exports = {
        presets: [
            // ES features necessary for user's Node version
            [
                require('babel-preset-env').default, {
                    targets: {
                        node: parseFloat(process.versions.node)
                    }
                },
            ],
            // JSX, Flow
            require.resolve('babel-preset-react'),
        ],
        plugins: plugins,
    };
} else {
    module.exports = {
        presets: [
            // Latest stable ECMAScript features
            [
                require('babel-preset-latest'), {
                    'es2015': {
                      'modules': false
                    }
                }
            ],
            // JSX, Flow
            require.resolve('babel-preset-react'),
        ],
        plugins: plugins,
    };

    if (env === 'production') {
        // Optimization: hoist JSX that never changes out of render()
        // Disabled because of issues:
        // * https://github.com/facebookincubator/create-react-app/issues/525
        // * https://phabricator.babeljs.io/search/query/pCNlnC2xzwzx/
        // * https://github.com/babel/babel/issues/4516
        // TODO: Enable again when these issues are resolved.
        // plugins.push.apply(plugins, [
        //   require.resolve('babel-plugin-transform-react-constant-elements')
        // ]);
    }
}
