var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = __dirname;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  resolve: {
    extensions: ['', '.js', '.css']
  },
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(ROOT_PATH, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        include: [
          path.resolve(ROOT_PATH, 'src'),
          path.resolve(ROOT_PATH, 'node_modules/normalize.css')
        ]
      }
    ]
  },
  postcss: function () {
    return [
      require('autoprefixer')({browsers: ['last 2 versions']}),
      require('lost'),
      require('postcss-simple-vars')({
        variables: function () {
          return require(path.resolve(ROOT_PATH, 'lib/cssVariables.js'));
        }
      })
    ];
  }
};
