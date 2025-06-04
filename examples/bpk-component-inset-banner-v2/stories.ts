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

import BpkInsetBanner from '../../packages/bpk-component-inset-banner-v2/src/BpkInsetBanner';

import {
  WithBodyTextAndLinkExampleDarkV2,
  WithCtaTextAndPopoverExampleLightV2,
  WithCustomPopoverWidthAndMarginsExampleV2,
} from './examples';

export default {
  title: 'bpk-component-inset-banner-v2',
  component: BpkInsetBanner,
};

export const WithBodyTextAndLinkDark = WithBodyTextAndLinkExampleDarkV2;
export const VisualTestDark = WithBodyTextAndLinkExampleDarkV2;
export const WithCtaTextAndPopoverLight = WithCtaTextAndPopoverExampleLightV2;
export const WithCustomPopoverWidthAndMargins = WithCustomPopoverWidthAndMarginsExampleV2;
