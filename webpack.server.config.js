'use strict';

let path = require('path');
let webpack = require('webpack');
let optimize = webpack.optimize;
let DefinePlugin = webpack.DefinePlugin;
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const IS_DEBUG = ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'server'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  cache: IS_DEBUG,

  debug: IS_DEBUG,

  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
    new ExtractTextPlugin('.modules.css'),
    new optimize.OccurenceOrderPlugin()
  ],

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
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'null-loader'
      }
    ]
  }
};
