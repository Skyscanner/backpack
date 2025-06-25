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


import BpkCheckbox from '../../packages/bpk-component-checkbox/src/BpkCheckbox';

import {
  DefaultExample,
  IndeterminateExample,
  InvalidExample,
  MultilineExample,
  WhiteExample,
  DisabledExample,
  RequiredExample,
  SmallLabelExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-checkbox',
  component: BpkCheckbox,
};

export const Default = DefaultExample;
export const Indeterminate = IndeterminateExample;
export const Invalid = InvalidExample;
export const Multiline = MultilineExample;
export const White = WhiteExample;
export const Disabled = DisabledExample;
export const Required = RequiredExample;
export const SmallLabel = SmallLabelExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {zoomEnabled: true}
}
