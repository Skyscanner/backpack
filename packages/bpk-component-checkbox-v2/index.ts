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

import BpkCheckboxContent from './src/BpkCheckboxContent';
import BpkCheckboxControl from './src/BpkCheckboxControl';
import BpkCheckboxGroup from './src/BpkCheckboxGroup';
import BpkCheckboxHiddenInput from './src/BpkCheckboxHiddenInput';
import BpkCheckboxLabel from './src/BpkCheckboxLabel';
import BpkCheckboxRoot from './src/BpkCheckboxRoot';

const BpkCheckbox = {
  Root: BpkCheckboxRoot,
  Control: BpkCheckboxControl,
  Label: BpkCheckboxLabel,
  HiddenInput: BpkCheckboxHiddenInput,
  Group: BpkCheckboxGroup,
  Content: BpkCheckboxContent,
};

export default BpkCheckbox;

export type { BpkCheckboxRootProps } from './src/BpkCheckboxRoot';
export type { BpkCheckboxControlProps } from './src/BpkCheckboxControl';
export type { BpkCheckboxLabelProps } from './src/BpkCheckboxLabel';
export type { BpkCheckboxGroupProps } from './src/BpkCheckboxGroup';
export type { BpkCheckboxContentProps } from './src/BpkCheckboxContent';
export type { CheckedState } from './src/common-types';
