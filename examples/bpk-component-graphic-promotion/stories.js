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

import { storiesOf } from '@storybook/react';

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
} from './examples';

export default {
  title: 'bpk-component-graphic-promotion',
};

export const DefaultNoBackgroundImage = NoStyleExample;

DefaultNoBackgroundImage.storyName = 'Default no background image';

export const DefaultWithBackgroundImage = DefaultExample;

DefaultWithBackgroundImage.storyName = 'Default with background image';

export const CenterAligned = CenterAlignedExample;
export const RightAligned = RightAlignedExample;
export const InvertedPortraitMode = InvertedPortraitExample;
export const Minimalistic = MinimalisticExample;
export const MinimalisticRightAligned = MinimalisticRightAlignedExample;
export const NonSponsored = NonSponsoredExample;

NonSponsored.storyName = 'Non-Sponsored';

export const NonSponsoredCenterAligned = NonSponsoredCenterAlignedExample;

NonSponsoredCenterAligned.storyName = 'Non-Sponsored Center Aligned';

export const NonSponsoredRightAligned = NonSponsoredRightAlignedExample;

NonSponsoredRightAligned.storyName = 'Non-Sponsored Right Aligned';

export const VisualTest = VisualTestExample;

VisualTest.storyName = 'Visual test';
