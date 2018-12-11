const webpack = require('webpack');
const path = require('path');


const cssLoader = 'css?importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]';
const styleLoader = 'style?sourceMap';
module.exports = function defaultFunction() {
  return {
    devtool: 'source-map',
    entry: ['./src/index.js'],
    output: {
      path: path.join(__dirname, 'dist/public'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: path.join(__dirname, 'src'),
      },
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(__dirname, 'src'),
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
          },
        }, {
          test: /\.css?$/,
          loaders: [
            styleLoader, cssLoader, 'postcss',
          ],
          // include: path.join(__dirname, 'src'),
        }, {
          test: /\.sass?$/,
          loaders: [
            styleLoader, cssLoader, 'postcss', 'sass',
          ],
          include: path.join(__dirname, 'src'),
        }, {
          test: /\.(png|jpg|gif)$/,
          // loader: 'file-loader?name=img/img-[hash:6].[ext]',
          loader: 'file-loader',
        }, {
          test: /\.json$/,
          loader: 'json-loader',
        }, {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        }, {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
        },

        // {
            // test: /\.(png|jpg|gif)$/,
            // loader: 'url-loader?limit=5000&name=img/img-[hash:6].[ext]',
            // loader: 'url-loader?limit=5000',
        // },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ],
    /* eslint-disable */
    postcss: function() {
        return [require('autoprefixer'), require('precss'), require('postcss-normalize')];
    },
    /* eslint-enable */
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './dist/public',
    },
  };
};
