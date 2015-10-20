var path = require('path');
var optimize = require('webpack').optimize;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/App.js'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new optimize.OccurenceOrderPlugin(),
    new optimize.UglifyJsPlugin({ comments: false })
  ],

  cssnext: {
    browsers: '> 0.1%'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?minimize!cssnext')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=32768!image-webpack'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=32768'
      }
    ]
  }
};
