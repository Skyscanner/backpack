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

import { BpkInsetBannerSponsored } from '../../packages/bpk-component-inset-banner/src/bpk-component-inset-banner-v2/src/BpkInsetBannerSponsored';

import {
  WithCtaTextAndBottomSheetExampleLightV2,
  WithCustomBottomSheetWidthAndMarginsExampleV2,
  WithImageAndBottomSheetExampleV2
} from './examples';

export default {
  title: 'bpk-component-inset-banner-v2',
  component: BpkInsetBannerSponsored,
};

export const SponsoredBannerWithCtaTextAndPopoverLight = WithCtaTextAndBottomSheetExampleLightV2;
export const SponsoredBannerWithCustomPopoverWidthAndMargins = WithCustomBottomSheetWidthAndMarginsExampleV2;
export const SponsoredBannerWithImageAndBottomSheet = WithImageAndBottomSheetExampleV2;
