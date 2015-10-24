var path = require('path');
var optimize = require('webpack').optimize;

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
    new optimize.OccurenceOrderPlugin()
  ],

  devtool: 'source-map',

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
