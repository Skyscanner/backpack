/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { blockComment as licenseHeader } from 'bpk-tokens/formatters/license-header';

import postCssPlugins from '../../scripts/webpack/postCssPlugins';

module.exports = {
  entry: {
    base: './index.js',
  },

  output: {
    filename: 'base.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
    ],
  },

  plugins: [
    new WrapperPlugin({
      test: /\.css$/,
      header: licenseHeader,
    }),
    new ExtractTextPlugin({
      filename: 'base.css',
    }),
  ],
};
