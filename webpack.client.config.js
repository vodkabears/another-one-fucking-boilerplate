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
    path: path.resolve(__dirname, 'build'),
    filename: 'assets.json'
  }),
  new ExtractTextPlugin('bundle_[hash].css')
];

module.exports = {
  entry: path.resolve(__dirname, 'src', 'client'),

  output: {
    path: path.resolve(__dirname, 'build', 'public', 'assets'),
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
    root: path.resolve(__dirname, 'src')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', IS_DEBUG ?
          'css?modules&importLoaders=1!postcss-loader' :
          'css?modules&importLoaders=1&minimize!postcss-loader')
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
