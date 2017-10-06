/*
 *
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
 *
 */

import _ from 'lodash';

import androidTokens from '../tokens/android/base.raw.json';
import iosTokens from '../tokens/ios/base.raw.json';

const ANDROID_ONLY_PROPS = [
  'FONT_FAMILY_EMPHASIZE',
  'ELEVATION_XS',
  'ELEVATION_SM',
  'ELEVATION_BASE',
  'ELEVATION_LG',
  'ELEVATION_XL',
];
const IOS_ONLY_PROPS = [
  'BORDER_RADIUS_SM',
  'BORDER_RADIUS_PILL_LG',
  'UNDERLAY_COLOR',
  'UNDERLAY_OPACITY',
  'SHADOW_SM_COLOR',
  'SHADOW_SM_OFFSET_HEIGHT',
  'SHADOW_SM_OFFSET_WIDTH',
  'SHADOW_SM_OPACITY',
  'SHADOW_SM_RADIUS',
  'SHADOW_LG_COLOR',
  'SHADOW_LG_OFFSET_HEIGHT',
  'SHADOW_LG_OFFSET_WIDTH',
  'SHADOW_LG_OPACITY',
  'SHADOW_LG_RADIUS',
  'SHADOW_XL_COLOR',
  'SHADOW_XL_OFFSET_HEIGHT',
  'SHADOW_XL_OFFSET_WIDTH',
  'SHADOW_XL_OPACITY',
  'SHADOW_XL_RADIUS',
];

describe('React Native output', () => {
  it('Produces the same output for Android and iOS', () => {
    const androidCommonProps = _(androidTokens.propKeys).without(...ANDROID_ONLY_PROPS);
    const iosCommonProps = _(iosTokens.propKeys).without(...IOS_ONLY_PROPS);
    expect(androidCommonProps).toEqual(iosCommonProps);
  });
});
