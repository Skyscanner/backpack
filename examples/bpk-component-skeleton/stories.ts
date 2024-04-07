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

import BpkBaseSkeleton from '../../packages/bpk-component-skeleton/src/BpkBaseSkeleton';

import {
  BaseSkeletonExample,
  ImageDefaultSizeWithDefaultStyleExample,
  ImageDefaultSizeWithRoundedStyleExample,
  ImageCustomNumberSizeWithDefaultStyleExample,
  ImageCustomStringSizeWithRoundedStyleExample,
  BodyTextSmallSizeExample,
  BodyTextDefaultSizeExample,
  BodyTextLargeSizeExample,
  BodyTextCustomSizeExample,
  CircleSmallSizeExample,
  CircleDefaultSizeExample,
  CircleCustomSizeExample,
  HeadlineSmallSizeExample,
  HeadlineDefaultSizeExample,
  HeadlineLargeSizeExample,
  HeadlineCustomSizeExample,
  VisualTestExample,
} from './examples';

export default {
  title: 'bpk-component-skeleton',
  component: BpkBaseSkeleton,
};

export const Base = BaseSkeletonExample;
export const ImageDefaultSizeWithDefaultStyle = ImageDefaultSizeWithDefaultStyleExample;
export const ImageDefaultSizeWithRoundedStyle = ImageDefaultSizeWithRoundedStyleExample;
export const ImageCustomNumberSizeWithDefaultStyle = ImageCustomNumberSizeWithDefaultStyleExample;
export const ImageCustomStringSizeWithRoundedStyle = ImageCustomStringSizeWithRoundedStyleExample;

export const BodyTextSmallSize = BodyTextSmallSizeExample;
export const BodyTextDefaultSize = BodyTextDefaultSizeExample;
export const BodyTextLargeSize = BodyTextLargeSizeExample;
export const BodyTextCustomSize = BodyTextCustomSizeExample;

export const CircleSmallSize = CircleSmallSizeExample;
export const CircleDefaultSize = CircleDefaultSizeExample;
export const CircleCustomSize = CircleCustomSizeExample;

export const HeadlineSmallSize = HeadlineSmallSizeExample;
export const HeadlineDefaultSize = HeadlineDefaultSizeExample;
export const HeadlineLargeSize = HeadlineLargeSizeExample;
export const HeadlineCustomSize =HeadlineCustomSizeExample;

export const VisualTest = VisualTestExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};