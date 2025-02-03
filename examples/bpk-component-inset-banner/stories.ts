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

import BpkInsetBanner from '../../packages/bpk-component-inset-banner/src/BpkInsetBanner';

import {
  DefaultExampleTitleOnly,
  DefaultExampleTitleAndSubheadline,
  WithLogoAndCtaTextExampleLight,
  WithBodyTextExampleLight,
  WithBodyTextAndLinkExampleDark,
  WithCtaTextAndPopoverExampleLight,
} from './examples';

export default {
  title: 'bpk-component-inset-banner',
  component: BpkInsetBanner,
};

export const DefaultWithTitle = DefaultExampleTitleOnly;
export const DefaultWithTitleAndSubheadline = DefaultExampleTitleAndSubheadline;
export const WithLogoAndCtaTextLight = WithLogoAndCtaTextExampleLight;
export const WithBodyTextLight = WithBodyTextExampleLight;
export const WithBodyTextAndLinkDark = WithBodyTextAndLinkExampleDark;
export const VisualTestDark = WithBodyTextAndLinkExampleDark;
export const VisualTestLight = WithLogoAndCtaTextExampleLight;
export const WithCtaTextAndPopoverLight = WithCtaTextAndPopoverExampleLight;
