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
  };
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    include: /node_modules\/@skyscanner\/bpk-svgs.*/,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env']],
    },
  });

  return config;
};
