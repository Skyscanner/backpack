import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';

import sassFunctions from './packages/bpk-mixins/sass-functions';
import * as ROUTES from './packages/bpk-docs/src/constants/routes';

const { BPK_TOKENS } = process.env;
const useCssModules = process.env.ENABLE_CSS_MODULES !== 'false';
const isProduction = process.env.NODE_ENV === 'production';

const staticSiteGeneratorConfig = {
  paths: [
    ROUTES.HOME,

    ROUTES.DOCS,
    ROUTES.USING_BACKPACK,

    ROUTES.GETTING_STARTED,
    ROUTES.BACKPACK_REACT_SCRIPTS,
    ROUTES.BASE_STYLESHEET,

    ROUTES.STYLE,

    ROUTES.BONDS,
    ROUTES.COLORS,
    ROUTES.TYPESETTING,
    ROUTES.RADII,
    ROUTES.SHADOWS,
    ROUTES.BORDERS,
    ROUTES.LAYOUT,
    ROUTES.ANIMATION,

    ROUTES.ATOMS,
    ROUTES.TYPOGRAPHY,
    ROUTES.BUTTONS,
    ROUTES.ICONS,
    ROUTES.SPINNERS,
    ROUTES.FORMS,
    ROUTES.CARDS,
    ROUTES.CHIPS,
    ROUTES.BADGE,
    ROUTES.PANELS,

    ROUTES.MOLECULES,
    ROUTES.NOTIFICATIONS,
    ROUTES.MODALS,
    ROUTES.AUTOSUGGEST,
    ROUTES.POPOVERS,
    ROUTES.CALENDAR,
    ROUTES.DATEPICKER,
    ROUTES.TOOLTIPS,
    ROUTES.ACCORDIONS,
    ROUTES.NUDGERS,
    ROUTES.PROGRESS,
    ROUTES.TICKETS,
    ROUTES.HORIZONTAL_NAV,
    ROUTES.FIELDSETS,
    ROUTES.BARCHARTS,
    ROUTES.STAR_RATING,

    ROUTES.PATTERNS,
    ROUTES.VERTICAL_RHYTHM,
    ROUTES.STATEFULNESS,
    ROUTES.UNITS,

    ROUTES.RESOURCES,

    ROUTES.GRID_COLUMN_DEMO,
    ROUTES.GRID_OFFSET_DEMO,
  ],
};

const sassOptions = {
  data: BPK_TOKENS ? fs.readFileSync(`packages/bpk-tokens/tokens/${BPK_TOKENS}.scss`) : '',
  functions: sassFunctions,
};

const postCssPlugins = () => [
  autoprefixer({
    browsers: [
      'last 2 versions',
      '> 10%',
      'Chrome >= 34',
      'Safari >= 6',
      'IE >= 9',
      'Firefox >= 34',
      'Opera >= 30',
    ],
  }),
];

const config = {
  entry: {
    docs: './packages/bpk-docs/src/index.js',
  },

  output: {
    filename: `[name]${isProduction ? '_[chunkhash]' : ''}.js`,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules\/(?!bpk-).*/, use: ['babel-loader'],
      },
      {
        test: /base\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: postCssPlugins,
              },
            },
            {
              loader: 'sass-loader',
              options: sassOptions,
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        exclude: /base\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: useCssModules,
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: postCssPlugins,
              },
            },
            {
              loader: 'sass-loader',
              options: sassOptions,
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            query: {
              limit: 10000,
              name: '[name]_[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /favicon\.ico$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /readme\.md$/,
        use: ['raw-loader'],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(`[name]${isProduction ? '_[contenthash]' : ''}.css`),
  ],

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: {
      index: 'index.html',
    },
  },

};

if (isProduction) {
  config.plugins.push(
    new StaticSiteGeneratorPlugin({
      entry: 'docs',
      paths: staticSiteGeneratorConfig.paths,
      locals: staticSiteGeneratorConfig,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
  );
}

export default config;
