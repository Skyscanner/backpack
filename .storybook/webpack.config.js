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
  // Exclude styled-system/ from Storybook's implicit CSS loaders to avoid conflicts
  // with our custom Panda CSS rule below.
  const styledSystemDir = path.resolve(rootDir, 'styled-system');
  config.module.rules = config.module.rules.map((rule) => {
    if (rule && rule.test && rule.test.toString().includes('css')) {
      return { ...rule, exclude: [].concat(rule.exclude || []).concat(styledSystemDir) };
    }
    // Handle Storybook's nested oneOf rules
    if (rule && rule.oneOf) {
      return {
        ...rule,
        oneOf: rule.oneOf.map((oneOfRule) => {
          if (oneOfRule && oneOfRule.test && oneOfRule.test.toString().includes('css')) {
            return { ...oneOfRule, exclude: [].concat(oneOfRule.exclude || []).concat(styledSystemDir) };
          }
          return oneOfRule;
        }),
      };
    }
    return rule;
  });

  config.plugins.push(new MiniCssExtractPlugin());
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    exclude: /node_modules\/(?!bpk-).*/,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env']],
    },
  });
  config.module.rules.push({
    test: /\.(js|jsx)?$/,
    loader: 'babel-loader',
    options: {
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
    'styled-system': path.join(rootDir, 'styled-system'),
  };
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    include: /node_modules\/@skyscanner\/bpk-svgs.*/,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env']],
    },
  });
  // Panda CSS generated styles (non-CSS-modules, global)
  config.module.rules.push({
    test: /\.css$/,
    include: path.resolve(rootDir, 'styled-system'),
    use: [
      { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
    ],
  });
  config.module.rules.push({
    test: /\.css/,
    exclude: path.resolve(rootDir, 'styled-system'),
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
