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

const fs = require('fs');
const path = require('path');

const sassFunctions = require('../packages/bpk-mixins/sass-functions');

const postCssPlugins = require('../scripts/webpack/postCssPlugins');

const { BPK_TOKENS } = process.env;
const rootDir = path.resolve(__dirname, '../');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    exclude: /node_modules\/(?!bpk-).*/,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env']],
    },
  });
  config.resolve.extensions.push('.tsx');
  config.resolve.extensions.push('.ts');
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    include: /node_modules\/@skyscanner\/bpk-svgs.*/,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env']],
    },
  });
  config.module.rules.push({
    test: /\.css/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]-[hash:base64:5]',
          },
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
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]-[hash:base64:5]',
          },
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
        options: {
          additionalData: BPK_TOKENS
            ? fs.readFileSync(
                path.join(
                  rootDir,
                  `node_modules/@skyscanner/bpk-foundations-web/tokens/${BPK_TOKENS}.scss`,
                ),
              )
            : '',
          sassOptions: {
            functions: sassFunctions,
          },
        },
      },
    ],
  });
  return config;
};
