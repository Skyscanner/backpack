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

import BpkInfoBanner from './src/BpkInfoBanner';
import BpkInfoBannerDismissable from './src/BpkInfoBannerDismissable';
import BpkInfoBannerExpandable from './src/BpkInfoBannerExpandable';
import { ALERT_TYPES, STYLE_TYPES } from './src/common-types';
import withBannerAlertState from './src/withBannerAlertState';

import type { WithBannerAlertStateProps } from './src/withBannerAlertState';

export type { WithBannerAlertStateProps };
export {
  ALERT_TYPES,
  STYLE_TYPES,
  BpkInfoBannerDismissable,
  BpkInfoBannerExpandable,
  withBannerAlertState,
};
export default BpkInfoBanner;
