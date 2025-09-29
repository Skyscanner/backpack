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

import BpkSelect from '../../packages/bpk-component-select/src/BpkSelect';

import {
  DefaultExample,
  InvalidExample,
  InvalidWithImageExample,
  DisabledExample,
  LargeExample,
  DockedExample,
  DockedWithImagesExample,
  ManuallyDockedExample,
  ManuallyDockedWithImagesExample,
  WithImageExample,
  WithImageLargeExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-select',
  component: BpkSelect,
};

export const Example = DefaultExample;
export const Invalid = InvalidExample;
export const InvalidWithImage = InvalidWithImageExample;

export const Disabled = DisabledExample;
export const Large = LargeExample;
export const Docked = DockedExample;
export const DockedWithImages = DockedWithImagesExample;

export const ManuallyDocked = ManuallyDockedExample;

export const ManuallyDockedWithImages = ManuallyDockedWithImagesExample;

export const WithImage = WithImageExample;
export const WithImageLarge = WithImageLargeExample;
export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  }
};
