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

import {
  SmallIconsExample,
  LargeIconsExample,
  TripleExtraLargeIconsExample,
  AlignToBaseTextExample,
  AlignToLargeTextExample,
  AlignSmallTextToIconExample,
  AlignTextToIconExample,
  AlignToButtonExample,
  AlignToLargeButtonExample,
  AlignToLargeButtonRTLExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-icon',
};

export const SmallIcons = SmallIconsExample;

export const LargeIcons = LargeIconsExample;

export const TripleExtraLargeIcons = TripleExtraLargeIconsExample

export const AlignToTextBase = AlignToBaseTextExample;

export const AlignToLargeText = AlignToLargeTextExample;

export const AlignSmallTextToIcon = AlignSmallTextToIconExample;

export const AlignTextToIcon = AlignTextToIconExample;

export const AlignToButton = AlignToButtonExample;

export const AlignToLargeButton = AlignToLargeButtonExample;

export const AlignToLargeButtonRtlSupport = AlignToLargeButtonRTLExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
