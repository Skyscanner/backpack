import fs from 'fs'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'

import * as ROUTES from './packages/bpk-docs/src/constants/routes'

const { BPK_TOKENS } = process.env

const staticSiteGeneratorConfig = {
  paths: [
    ROUTES.HOME,

    ROUTES.DOCS,
    ROUTES.GETTING_STARTED,

    ROUTES.BONDS,
    ROUTES.BASE_STYLESHEET,
    ROUTES.COLORS,
    ROUTES.SPACING,
    ROUTES.TYPE_UNITS,
    ROUTES.LAYOUT,

    ROUTES.ATOMS,
    ROUTES.TYPOGRAPHY,
    ROUTES.BUTTONS,
    ROUTES.ICONS,
    ROUTES.SPINNERS,
    ROUTES.LOGOS,

    ROUTES.MOLECULES,

    ROUTES.ORGANISMS,

    ROUTES.DOWNLOADS
  ]
}

const config = {
  entry: {
    docs: './packages/bpk-docs/src/index.js'
  },

  output: {
    filename: '[name]_[chunkhash].js',
    path: 'dist',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules\/(?!bpk-).*/, loader: 'babel'
      },
      {
        test: /base\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?config=sass')
      },
      {
        test: /\.scss$/,
        exclude: /base\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]!postcss!sass?config=sass')
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.json$/, loader: 'json'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name]_[contenthash].css'),
    new StaticSiteGeneratorPlugin('docs', staticSiteGeneratorConfig.paths, staticSiteGeneratorConfig)
  ],

  postcss: () => [ autoprefixer({ browsers: [ 'last 20 versions' ] }) ],

  sass: {
    data: BPK_TOKENS ? fs.readFileSync(`packages/bpk-tokens/tokens/${BPK_TOKENS}.scss`) : ''
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
