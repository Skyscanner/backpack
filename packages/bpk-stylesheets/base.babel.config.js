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

/**
 * Babel config used to create the `base.js` file.
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // Based on the list of supported browsers
          browsers: [
            'chrome >= 63',
            'safari >= 10',
            'ie >= 11',
            'firefox >= 58',
            'edge >= 16',
            'samsung >= 6',
          ],
        },
      },
    ],
    // TODO: Remove this once we have migrated all flow types.
    '@babel/preset-flow',
    '@babel/preset-typescript',
  ],
  // This tells babel not to include polyfills and assume it will be available during runtime,
  // as a lib project this is what we want.
  // In case we add code that requires polyfills we should document it.
  plugins: ['@babel/plugin-transform-runtime'],
};
