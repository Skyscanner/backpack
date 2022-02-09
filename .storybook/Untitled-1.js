
preview.js

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
import React from 'react';
import { addDecorator } from '@storybook/react';
import TOKENS from '@skyscanner/bpk-foundations-web/tokens/base.common';

import '../packages/bpk-stylesheets';
import BpkGridToggle from '../packages/bpk-component-grid-toggle';
import BpkRtlToggle from '../packages/bpk-component-rtl-toggle';
import BpkThemeToggle, {
  updateOnThemeChange,
} from '../packages/bpk-component-theme-toggle';
import BpkThemeProvider from '../packages/bpk-theming';

import themeableAttributes from './themeableAttributes';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);

main.js
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

module.exports = {
//   webpackFinal: async (config, { configType }) => {
//     config.optimization = {
//       minimize: false,
//       minimizer: [],
//     };

//     return config;
//   },
  stories: ['../packages/backpack-component-accordion/stories.js'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
  ],
  
};

npx sb migrate storiesof-to-csf "--glob=packages/**/stories.js"