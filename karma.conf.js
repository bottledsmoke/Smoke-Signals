var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: ['tests.webpack.js'],
    preprocessors: {
      'tests.webpack.js': [
        'webpack', 'sourcemap'
      ]
    },
    browserNoActivityTimeout: 100000,
    reporters: ['mocha'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            include: path.resolve(__dirname, 'src')
          },
          {
            test: /\.css$/,
            loaders: ['style', 'css', 'postcss'],
            include: path.resolve(__dirname, 'src')
          }
        ]
      },
      postcss: function () {
        return [
          require('autoprefixer')({browsers: ['last 2 versions']}),
          require('lost'),
          require('postcss-simple-vars')({
            variables: function () {
              return require(path.resolve(__dirname, 'lib/cssVariables.js'));
            }
          })
        ];
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
