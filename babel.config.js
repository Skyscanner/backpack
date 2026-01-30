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
        modules: false,
      },
    ],
    // the option { runtime: 'automatic' } is passed to enable the new JSX transform where React is imported automatically
    ['@babel/preset-react', { runtime: 'automatic' }],
    // TODO: Remove this once we have migrated all flow types.
    '@babel/preset-flow',
    '@babel/preset-typescript',
  ],
  env: {
    dev: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./packages'],
            alias: {
              '@backpack': './packages',
              '^@skyscanner/bpk-svgs/dist/js/(.+)': (stats) =>
                `@skyscanner/bpk-svgs/dist/svgs/${stats[1]}.svg`,
            },
          },
        ],
        'inline-react-svg',
      ],
      ignore: [
        (fileName) =>
          !!(
            fileName.includes('-test') ||
            fileName.includes('-Test') ||
            /\/node_modules\//.test(fileName) ||
            fileName.includes('.d.ts') ||
            fileName.includes('.figma.tsx')
          ),
      ],
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        // the option { runtime: 'automatic' } is passed to enable the new JSX transform where React is imported automatically
        ['@babel/preset-react', { runtime: 'automatic' }],
        // TODO: Remove this once we have migrated all flow types.
        '@babel/preset-flow',
        '@babel/preset-typescript',
      ],
      // Prevent errors from require.context not existing when running Storyshots.
      plugins: [
        'require-context-hook',
        [
          'module-resolver',
          {
            root: ['./packages'],
            alias: {
              '@backpack': './packages',
            },
          },
        ],
      ],
    },
  },
};
