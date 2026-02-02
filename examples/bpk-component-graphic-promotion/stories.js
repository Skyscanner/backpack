/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import BpkGraphicPromotion from '../../packages/bpk-component-graphic-promotion/src/BpkGraphicPromo';

import {
  VisualTestExample,
  DefaultExample,
  CenterAlignedExample,
  RightAlignedExample,
  InvertedPortraitExample,
  MinimalisticExample,
  MinimalisticRightAlignedExample,
  NonSponsoredExample,
  NonSponsoredCenterAlignedExample,
  NonSponsoredRightAlignedExample,
  NoStyleExample,
  LinkWrapperExample,
} from './examples';

export default {
  title: 'bpk-component-graphic-promotion',
  component: BpkGraphicPromotion,
};

export const DefaultNoBackgroundImage = NoStyleExample;

export const DefaultWithBackgroundImage = DefaultExample;

export const CenterAligned = CenterAlignedExample;
export const RightAligned = RightAlignedExample;
export const InvertedPortraitMode = InvertedPortraitExample;
export const Minimalistic = MinimalisticExample;
export const MinimalisticRightAligned = MinimalisticRightAlignedExample;
export const NonSponsored = NonSponsoredExample;

export const NonSponsoredCenterAligned = NonSponsoredCenterAlignedExample;

export const NonSponsoredRightAligned = NonSponsoredRightAlignedExample;

export const LinkWrapper = LinkWrapperExample;

export const VisualTest = VisualTestExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
