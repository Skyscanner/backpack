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

import BpkInputV2 from '../../packages/bpk-component-input/src/BpkInputV2';

import {
  DefaultExample,
  WithStartAdornmentExample,
  WithEndAdornmentExample,
  WithBothAdornmentsExample,
  ValidStateExample,
  InvalidStateExample,
  DockedInputGroupExample,
  DockedInputGroupThreeExample,
  DockedInputGroupWithAdornmentsExample,
  LargeVariantExample,
  CustomGapExample,
  DisabledStateExample,
  RTLModeExample,
  MultipleEndAdornmentsExample,
  ValidStateWithStartAdornmentExample,
  InvalidStateWithEndAdornmentExample,
  ValidStateWithBothAdornmentsExample,
  ClearableAlwaysExample,
  ClearableWhileEditingExample,
  ClearableWithValidationExample,
  ValidationIconWithoutClearableExample,
  ClearableWithAdornmentsExample,
  ClearableWithAllFeaturesExample,
} from './examples';

const BpkInput = BpkInputV2;

export default {
  title: 'bpk-component-input-v2',
  component: BpkInput.Root,
  subcomponents: {
    Input: BpkInput.Input,
    InputAdornment: BpkInput.InputAdornment,
  },
};

export const Default = DefaultExample;

export const WithStartAdornment = WithStartAdornmentExample;

export const WithEndAdornment = WithEndAdornmentExample;

export const WithBothAdornments = WithBothAdornmentsExample;

export const ValidState = ValidStateExample;

export const InvalidState = InvalidStateExample;

export const DockedInputGroup = DockedInputGroupExample;

export const DockedInputGroupThree = DockedInputGroupThreeExample;

export const DockedInputGroupWithAdornments = DockedInputGroupWithAdornmentsExample;

export const LargeVariant = LargeVariantExample;

export const CustomGap = CustomGapExample;

export const DisabledState = DisabledStateExample;

export const RTLMode = RTLModeExample;

export const MultipleEndAdornments = MultipleEndAdornmentsExample;

export const ValidStateWithStartAdornment = ValidStateWithStartAdornmentExample;

export const InvalidStateWithEndAdornment = InvalidStateWithEndAdornmentExample;

export const ValidStateWithBothAdornments = ValidStateWithBothAdornmentsExample;

export const ClearableAlways = ClearableAlwaysExample;

export const ClearableWhileEditing = ClearableWhileEditingExample;

export const ClearableWithValidation = ClearableWithValidationExample;

export const ValidationIconWithoutClearable = ValidationIconWithoutClearableExample;

export const ClearableWithAdornments = ClearableWithAdornmentsExample;

export const ClearableWithAllFeatures = ClearableWithAllFeaturesExample;

export const VisualTest = DefaultExample;

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
