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
 * The purpose of this file is to provide babel config for configuration and use with storybook.
 *
 * For babel config used in building and distributing Backpack components, there is a separate file
 * located in the root of the project.
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'chrome >= 63',
            'safari >= 10',
            'ie >= 11',
            'firefox >= 58',
            'edge >= 16',
            'samsung >= 6',
          ],
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
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
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
  env: {
    test: {
      // Prevent errors from require.context not existing when running Storyshots.
      plugins: ['require-context-hook'],
    },
  },
};
