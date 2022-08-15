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

/*
 * The purpose of this file is to provide a babel config file for building and distributing Backpack components.
 *
 * For configuration and use with storybook there is a separate config file in the .storybook/babel.config.js folder,
 * which provides configuration for running the storybook development system.
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    // TODO: Remove this once we have migrated all flow types.
    '@babel/preset-flow',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    dev: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./packages'],
            alias: {
              '^bpk-(.+)': ([name]) => `../${name}`,
              '@skyscanner/bpk-foundations-web/tokens/base.es6':
                '@skyscanner/bpk-foundations-web/tokens/base.common',
              '^@skyscanner/bpk-svgs/dist/js/(.+)': (stats) =>
                `@skyscanner/bpk-svgs/dist/svgs/${stats[1]}.svg`,
              'd3-array': './d3-array/src',
              'd3-color': './d3-color/src',
              'd3-format': './d3-format/src',
              'd3-interpolate': './d3-interpolate/src',
              'd3-scale': './d3-scale/src',
              'd3-time': './d3-time/src',
              'd3-time-format': './d3-time-format/src',
              internmap: './internmap/src',
              'react-virtualized': 'react-virtualized/dist/commonjs',
            },
          },
        ],
        [
          'css-modules-transform',
          {
            extensions: ['.scss', '.css'],
            preprocessCss: '../../scripts/transpilation/preprocess-css.js',
            extractCss: './dist/index.css',
          },
        ],
        'inline-react-svg',
      ],
      ignore: [
        (fileName) =>
          !!(
            fileName.includes('-test') ||
            fileName.includes('-Test') ||
            fileName.includes('dist') ||
            /\/node_modules\//.test(fileName)
          ),
      ],
    },
    test: {
      // Prevent errors from require.context not existing when running Storyshots.
      plugins: ['require-context-hook'],
    },
  },
};
