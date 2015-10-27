var path = require('path');
var webpack = require('webpack');
var optimize = webpack.optimize;
var DefinePlugin = webpack.DefinePlugin;

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

  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
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
        loader: 'null-loader'
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
