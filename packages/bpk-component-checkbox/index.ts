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

import BpkCheckbox, { type Props as BpkCheckboxProps } from './src/BpkCheckbox';
import BpkCheckboxV2 from './src/BpkCheckboxV2/BpkCheckboxV2';
import {
  checkboxSelectedColorThemeAttributes,
  checkboxBorderRadiusThemeAttributes,
} from './src/BpkCheckboxV2/themeAttributes';
import themeAttributes from './src/themeAttributes';

export type { BpkCheckboxProps };
export type { BpkCheckboxRootV2Props, BpkCheckedStateV2 } from './src/BpkCheckboxV2/BpkCheckboxRootV2';
export type { BpkCheckboxControlV2Props } from './src/BpkCheckboxV2/BpkCheckboxControlV2';
export type { BpkCheckboxLabelV2Props } from './src/BpkCheckboxV2/BpkCheckboxLabelV2';
export type { BpkCheckboxDescriptionV2Props } from './src/BpkCheckboxV2/BpkCheckboxDescriptionV2';
export default BpkCheckbox;
export {
  themeAttributes,
  checkboxSelectedColorThemeAttributes,
  checkboxBorderRadiusThemeAttributes,
  BpkCheckboxV2,
};


