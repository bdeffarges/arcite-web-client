// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');

const cssLoader = 'css?importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]';
const styleLoader = 'style?sourceMap';

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    loaders: [
        {
            test: /\.sass?$/,
            loaders: [
                styleLoader, cssLoader, 'postcss', 'sass',
            ],
            include: path.join(__dirname, '../src'),
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
        },
    ],
  },
};
