'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const IS_DEBUG = ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, 'server'),

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
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('.modules.css')
  ],

  devtool: IS_DEBUG ? 'source-map' : '',

  resolve: {
    root: __dirname
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.node$/,
        loader: 'node'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'null'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'null'
      }
    ]
  }
};
