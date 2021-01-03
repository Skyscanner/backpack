/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import WrapperPlugin from 'wrapper-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { blockComment as licenseHeader } from 'bpk-tokens/formatters/license-header';

import postCssPlugins from '../../scripts/webpack/postCssPlugins';

import babelConfig from './base.babel.config';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    base: './index.js',
  },

  output: {
    path: path.resolve(__dirname, ''),
    filename: 'base.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1,
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
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postCssPlugins,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new WrapperPlugin({
      test: /\.css$/,
      header: licenseHeader,
    }),
    new MiniCssExtractPlugin({
      filename: 'base.css',
    }),
  ],
};
