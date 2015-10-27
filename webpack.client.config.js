var path = require('path');
var webpack = require('webpack');
var optimize = webpack.optimize;
var DefinePlugin = webpack.DefinePlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const IS_DEBUG = ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'client'),

  output: {
    path: path.resolve(__dirname, 'build', 'public', 'assets'),
    filename: 'bundle.js'
  },

  cache: IS_DEBUG,

  debug: IS_DEBUG,

  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
    new ExtractTextPlugin('bundle.css'),
    new optimize.DedupePlugin(),
    new optimize.OccurenceOrderPlugin(),
    new optimize.AggressiveMergingPlugin(),
    new optimize.UglifyJsPlugin({ comments: false })
  ],

  cssnext: {
    browsers: '> 0.1%'
  },

  devtool: IS_DEBUG ? 'source-map' : '',

  resolve: {
    root: path.resolve(__dirname, 'src')
  },

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
