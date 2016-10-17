const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    base: './index.js'
  },

  output: {
    filename: 'base.js',
    path: ''
  },

  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel'
      },
      {
        test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('base.css')
  ],

  postcss: function () {
    return [ autoprefixer({ browsers: [ 'last 20 versions' ] }) ]
  }
}
