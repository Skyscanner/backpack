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
// @ts-nocheck



import BpkPhoneInput from '../../packages/bpk-component-phone-input/src/BpkPhoneInput';

import {
  DefaultExample,
  LargeExample,
  WithValidationExample,
  WithDialingCodeMaskExample,
  DisabledExample,
  RequiredExample,
  DoubleLengthLabelExamples,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-phone-input',
  component: BpkPhoneInput,
};

export const Default = DefaultExample;
export const Large = LargeExample;
export const WithValidation = WithValidationExample;
export const WithDialingCodeMask = WithDialingCodeMaskExample;

export const Disabled = DisabledExample;
export const Required = RequiredExample;
export const DoubleLengthLabels = DoubleLengthLabelExamples;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
