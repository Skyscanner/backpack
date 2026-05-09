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

import BpkInsetBanner, {
  type Props as BpkInsetBannerProps,
} from './src/BpkInsetBanner';
import BpkInsetBannerSponsored from './src/BpkInsetBannerV2/BpkInsetBannerSponsored';
import { type CommonProps as BpkInsetBannerSponsoredProps } from './src/BpkInsetBannerV2/common-types';
import { VARIANT } from './src/BpkInsetBannerV2/common-types';
import BpkInsetBannerV3 from './src/BpkInsetBannerV3/BpkInsetBannerV3';

import type {
  RootProps as BpkInsetBannerV3RootProps,
  HeaderProps as BpkInsetBannerV3HeaderProps,
  LeadingAccessoryProps as BpkInsetBannerV3LeadingAccessoryProps,
  ContentProps as BpkInsetBannerV3ContentProps,
  BodyProps as BpkInsetBannerV3BodyProps,
  TrailingAccessoryProps as BpkInsetBannerV3TrailingAccessoryProps,
} from './src/BpkInsetBannerV3/BpkInsetBannerV3';

export type { BpkInsetBannerProps };
export type { BpkInsetBannerSponsoredProps };
export type {
  BpkInsetBannerV3RootProps,
  BpkInsetBannerV3HeaderProps,
  BpkInsetBannerV3LeadingAccessoryProps,
  BpkInsetBannerV3ContentProps,
  BpkInsetBannerV3BodyProps,
  BpkInsetBannerV3TrailingAccessoryProps,
};

export { VARIANT };
export { BpkInsetBannerSponsored, BpkInsetBanner, BpkInsetBannerV3 };
