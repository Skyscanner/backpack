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

import BpkBadge from './BpkBadge';
import {
  DefaultExample,
  WarningExample,
  SuccessExample,
  CriticalExample,
  InverseExample,
  OutlineExample,
  StrongExample,
  BrandExample,
  CenteredExample,
  DockedLeadingExample,
  DockedTrailingExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-badge',
  component: BpkBadge
};

export const Default = DefaultExample;
export const Warning = WarningExample;
export const Success = SuccessExample;
export const Critical = CriticalExample;
export const Strong = StrongExample;
export const Brand = BrandExample;
export const Inverse = InverseExample;
export const Outline = OutlineExample;
export const Centered = CenteredExample;
export const DockedRight = DockedLeadingExample;
export const DockedLeft = DockedTrailingExample;
export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};