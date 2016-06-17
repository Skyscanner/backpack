import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'

import * as routes from './docs/constants/routes'

const locals = {
  paths: [
    routes.ROUTE_HOME,
    routes.ROUTE_ATOMS,
    routes.ROUTE_TYPOGRAPHY,
    routes.ROUTE_MOLECULES,
    routes.ROUTE_ORGANISMS
  ]
}

const postcss = () => {
  return [ autoprefixer({ browsers: [ 'last 20 versions' ] }) ]
}

const baseStylesheetConfig = {
  entry: './base.scss',

  output: {
    filename: 'base.js',
    path: ''
  },

  module: {
    loaders: [
      {
        test: /\.scss/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('base.css')
  ],

  postcss
}

const config = {
  entry: {
    docs: './docs/index.js'
  },

  output: {
    filename: '[name]_[chunkhash].js',
    path: 'dist',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'
      },
      {
        test: /\.scss/, loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]!postcss!sass')

      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.json$/, exclude: /node_modules/, loader: 'json'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name]_[contenthash].css'),
    new StaticSiteGeneratorPlugin('docs', locals.paths, locals)
  ],

  postcss,

  devServer: {
    host: '0.0.0.0'
  }

}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

export default [ baseStylesheetConfig, config ]
