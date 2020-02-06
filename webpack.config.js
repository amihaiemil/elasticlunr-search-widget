var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src/'),
  devtool: debug ? "inline-sourcemap" : null,
  devServer:{
        contentBase: 'src'
  },
  entry: "./js/elasticlunr-search-widget.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'src/'),
    filename: "elasticlunr-search-widget.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
