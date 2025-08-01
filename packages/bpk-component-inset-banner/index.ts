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

export type { BpkInsetBannerProps };
export type { BpkInsetBannerSponsoredProps };

export { VARIANT };
export { BpkInsetBannerSponsored, BpkInsetBanner };
