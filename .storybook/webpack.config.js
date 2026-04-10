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

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const postCssPlugins = require('../scripts/webpack/postCssPlugins');

const { BPK_TOKENS } = process.env;
const rootDir = path.resolve(__dirname, '../');
const devMode = process.env.NODE_ENV !== "production";

module.exports = ({ config }) => {
  // Locally, enable a named filesystem cache partition ('storybook-local') to
  // speed up subsequent Storybook startups.  In CI each job starts from a clean
  // environment so a persistent filesystem cache would be written and immediately
  // discarded — use a plain memory cache instead to avoid carrying over any
  // filesystem-only cache options (e.g. buildDependencies, name) that could
  // cause webpack schema-validation errors when type is 'memory'.
  // Using separate strategies also prevents stale module-resolution entries
  // (PackFileCacheStrategy restore warnings) when switching between local and CI.
  const existingCache =
    config.cache && typeof config.cache === 'object' && !Array.isArray(config.cache)
      ? config.cache
      : {};
  /* eslint-disable-next-line no-param-reassign */
  config.cache = process.env.CI
    ? { type: 'memory' }
    : { ...existingCache, type: 'filesystem', name: 'storybook-local' };

  config.plugins.push(new MiniCssExtractPlugin());
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    exclude: /node_modules\/(?!bpk-).*/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [['@babel/preset-env']],
    },
  });
  config.module.rules.push({
    test: /\.(js|jsx)?$/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['babel-plugin-react-docgen'],
    },
  });
  config.resolve.extensions.push('.tsx');
  config.resolve.extensions.push('.ts');
  /* eslint-disable-next-line no-param-reassign */
  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.join(rootDir, 'node_modules/react'),
    'react-dom': path.join(rootDir, 'node_modules/react-dom'),
  };
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    include: /node_modules\/@skyscanner\/bpk-svgs.*/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [['@babel/preset-env']],
    },
  });
  config.module.rules.push({
    test: /\.css/,
    use: [
      {
        loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]-[hash:base64:5]',
            namedExport: false,
            exportLocalsConvention: 'as-is',
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
        loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]-[hash:base64:5]',
            namedExport: false,
            exportLocalsConvention: 'as-is',
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
        },
      },
    ],
  });
  return config;
};
