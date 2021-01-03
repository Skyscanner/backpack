/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow strict */

import BpkButton from './src/BpkButton'; // eslint-disable-line import/no-cycle
import BpkButtonPrimary from './src/BpkButtonPrimary';
import BpkButtonSecondary from './src/BpkButtonSecondary';
import BpkButtonDestructive from './src/BpkButtonDestructive';
import BpkButtonLink from './src/BpkButtonLink';
import BpkButtonFeatured from './src/BpkButtonFeatured';
import BpkButtonOutline from './src/BpkButtonOutline';

export {
  buttonThemeAttributes,
  primaryThemeAttributes,
  secondaryThemeAttributes,
  featuredThemeAttributes,
  destructiveThemeAttributes,
} from './themeAttributes';

export default BpkButton;

export {
  BpkButtonPrimary,
  BpkButtonSecondary,
  BpkButtonDestructive,
  BpkButtonLink,
  BpkButtonFeatured,
  BpkButtonOutline,
};
