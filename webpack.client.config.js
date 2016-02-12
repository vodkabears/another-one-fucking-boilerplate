'use strict';

let path = require('path');
let webpack = require('webpack');
let cssnext = require('postcss-cssnext');
let optimize = webpack.optimize;
let AssetsPlugin = require('assets-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const IS_DEBUG = ENV === 'development';
const PLUGINS = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
  new webpack.ProvidePlugin({ React: 'react' }),
  new optimize.DedupePlugin(),
  new optimize.OccurenceOrderPlugin(),
  new optimize.AggressiveMergingPlugin(),
  new AssetsPlugin({
    path: path.join(__dirname, 'build'),
    filename: 'assets.json'
  }),
  new ExtractTextPlugin('bundle_[hash].css')
];

module.exports = {
  entry: path.join(__dirname, 'client'),

  output: {
    path: path.join(__dirname, 'build', 'public', 'assets'),
    filename: 'bundle_[hash].js'
  },

  cache: IS_DEBUG,

  debug: IS_DEBUG,

  plugins: IS_DEBUG ?
    PLUGINS : PLUGINS.concat(new optimize.UglifyJsPlugin({ comments: false })),

  postcss: [
    cssnext({
      browsers: '> 0.1%',
      url: false
    })
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', IS_DEBUG ?
          'css?modules&importLoaders=1!postcss' :
          'css?modules&importLoaders=1&minimize!postcss')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url?limit=32768!image-webpack'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url?limit=32768'
      }
    ]
  }
};
