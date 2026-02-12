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

import BpkThumb from '../../packages/bpk-component-thumb/src/BpkThumb';

import {
  DefaultExample,
  SelectedExample,
  InteractiveExample,
  DisabledExample,
  DisabledSelectedExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-thumb',
  component: BpkThumb,
};

export const Default = DefaultExample;
export const Selected = SelectedExample;
export const Interactive = InteractiveExample;
export const Disabled = DisabledExample;
export const DisabledSelected = DisabledSelectedExample;
export const Mixed = MixedExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: MixedExample,
  args: {
    zoomEnabled: true,
  },
};
