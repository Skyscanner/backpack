import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'

import * as routes from './docs/constants/routes'

const locals = {
  paths: [
    routes.ROUTE_HOME,
    routes.ROUTE_COLOURS,
    routes.ROUTE_ICONS,
    routes.ROUTE_FORMS,
    routes.ROUTE_UNITS,
    routes.ROUTE_LOGOS,
    routes.ROUTE_SPINNERS
  ]
}

const config = {

  entry: {
    docs: './docs/index.jsx'
  },

  output: {
    filename: '[name].js',
    path: 'dist',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'
      },
      {
        test: /\.scss/, loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=ls-[name]__[local]!postcss!sass')
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
    new ExtractTextPlugin('[name].css'),
    new StaticSiteGeneratorPlugin('docs', locals.paths, locals)
  ],

  postcss: () => {
    return [ autoprefixer({ browsers: [ 'last 20 versions' ] }) ]
  },

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

export default config
