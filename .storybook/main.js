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
  stories: ['../examples/**/stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-actions', '@storybook/addon-viewport'],
  core: {
    builder: 'webpack5'
  },
  docs: {
    autodocs: true
  }
};