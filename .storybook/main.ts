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

import path from 'path';
import { fileURLToPath } from 'url';

import type { StorybookConfig } from '@storybook/react-webpack5';

// ESM compatibility: __filename and __dirname are not available in ES modules
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    '../packages/**/src/stories.@(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-webpack5-compiler-babel'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    defaultName: 'Documentation'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldIncludePropTagMap: true,
      propFilter: (prop) => {
        const isHTMLElementProp =
            prop.parent?.fileName.includes("node_modules") ?? false

        return !isHTMLElementProp
      },
    },
  },
  webpackFinal: async (webpackConfig) => {
    if (webpackConfig.resolve) {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@backpack': path.resolve(__dirname, '../packages'),
        'bpk-storybook-utils': path.resolve(__dirname, '../examples/bpk-storybook-utils'),
      };
    }
    return webpackConfig;
  },
};
export default config;
