/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';

import { blockComment as licenseHeader } from './packages/bpk-tokens/formatters/license-header';
import sassFunctions from './packages/bpk-mixins/sass-functions';
import * as ROUTES from './packages/bpk-docs/src/constants/routes';

const { BPK_TOKENS } = process.env;
const useCssModules = process.env.ENABLE_CSS_MODULES !== 'false';
const isProduction = process.env.NODE_ENV === 'production';
const WrapperPlugin = require('wrapper-webpack-plugin');


const staticSiteGeneratorConfig = {
  paths: Object.keys(ROUTES).map(key => ROUTES[key]),
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
                minimize: true,
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
    new WrapperPlugin({
      test: /\.css$/,
      header: licenseHeader,
    }),
    new ExtractTextPlugin(`[name]${isProduction ? '_[contenthash]' : ''}.css`),
  ],

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
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
