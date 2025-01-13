/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');

const postCssPlugins = require('../../scripts/webpack/postCssPlugins');

const TEXT = `
Backpack - Skyscanner's Design System

Copyright 2016 Skyscanner Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;

const licenseHeader = `/*
${TEXT.replace(/^/gm, ' * ')}
 */`;

module.exports = {
  mode: 'production',
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
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
              importLoaders: 1,
              modules: 'global',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postCssPlugins],
              },
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
              importLoaders: 1,
              modules: 'global',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postCssPlugins],
              },
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
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
};
