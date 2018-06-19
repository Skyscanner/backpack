/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */
/* eslint-disable import/no-mutable-exports */

// HACK:
// This code exists to overcome an issue in react-native@0.55.3 affecting
// iOS 11 whereby font weights for System font (San Francisco) are being
// applied incorrectly e.g. textStyle=xxl renders `.SFUIDisplay-Semibold`
// instead of `.SFUIDisplay-Bold`.
//
// We limit this fix to react-native@0.55.3 specifically because we know
// it is fixed in the upcoming release 0.56.0 release, see the following
// commit:
// https://github.com/facebook/react-native/commit/f50df4f5eca4b4324ff18a49dcf8be3694482b51

import { Platform } from 'react-native';

export let RN_VERSION = null;
export const IOS_VERSION =
  Platform.OS === 'ios' && parseInt(Platform.Version, 10);

export let shouldApplyFontWeightFix = false;

try {
  // eslint-disable-next-line global-require
  RN_VERSION = require('react-native/Libraries/Core/ReactNativeVersion');

  const {
    version: { major, minor },
  } = RN_VERSION;

  const isAffectedRNVersion = major === 0 && minor === 55;

  shouldApplyFontWeightFix = isAffectedRNVersion && IOS_VERSION === 11;
} catch (e) {
  // do nothing
}
