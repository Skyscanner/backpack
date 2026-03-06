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

import BpkCheckbox from '../../packages/bpk-component-checkbox-v2/src/BpkCheckbox';

import {
  DefaultCheckedExample,
  DisabledCheckedExample,
  DisabledExample,
  IndeterminateExample,
  InlineLinkInLabelExample,
  InvalidExample,
  MixedExample,
  SimpleLabelExample,
  TitleAndSubtitleExample,
} from './examples';

export default {
  title: 'bpk-component-checkbox-v2',
  component: BpkCheckbox.Root,
};

export const SimpleLabel = SimpleLabelExample;
export const TitleAndSubtitle = TitleAndSubtitleExample;
export const InlineLinkInLabel = InlineLinkInLabelExample;
export const DefaultChecked = DefaultCheckedExample;
export const Disabled = DisabledExample;
export const DisabledChecked = DisabledCheckedExample;
export const Indeterminate = IndeterminateExample;
export const Invalid = InvalidExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: MixedExample,
  args: {
    zoomEnabled: true,
  },
};
