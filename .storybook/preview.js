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
import TOKENS from '@skyscanner/bpk-foundations-web/tokens/base.common';
import { withA11y } from '@storybook/addon-a11y';

import 'bpk-stylesheets';
import 'bpk-stylesheets/font';

import BpkRtlToggle from '../packages/bpk-component-rtl-toggle';
import BpkThemeToggle, {
  updateOnThemeChange,
} from '../packages/bpk-component-theme-toggle';
import BpkThemeProvider from '../packages/bpk-theming';

import themeableAttributes from './themeableAttributes';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);

const preview = {
  decorators: [
    (story) => (
      <div style={{ padding: TOKENS.spacingBase }}>
        <EnhancedThemeProvider themeAttributes={themeableAttributes}>
          {story()}
        </EnhancedThemeProvider>
        <br />
        <BpkRtlToggle />
        <br />
        <div style={{ width: '10rem' }}>
          <BpkThemeToggle />
        </div>
      </div>
    ),
  ],
};

export default preview;
