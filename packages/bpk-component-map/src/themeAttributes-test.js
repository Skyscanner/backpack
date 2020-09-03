/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import {
  primaryMarkerThemeAttributes,
  secondaryMarkerThemeAttributes,
  plainMarkerThemeAttributes,
  priceMarkerThemeAttributes,
} from './themeAttributes';

describe('themeAttributes', () => {
  it('should export the correct primary theme attributes', () => {
    expect(primaryMarkerThemeAttributes).toEqual([
      'mapMarkerPrimaryBackgroundColor',
    ]);
  });

  it('should export the correct secondary theme attributes', () => {
    expect(secondaryMarkerThemeAttributes).toEqual([
      'mapMarkerSecondaryBackgroundColor',
    ]);
  });

  it('should export the correct plain theme attributes', () => {
    expect(plainMarkerThemeAttributes).toEqual([
      'mapMarkerPlainBackgroundColor',
    ]);
  });

  it('should export the correct price marker theme attributes', () => {
    expect(priceMarkerThemeAttributes).toEqual([
      'priceMarkerBackgroundColor',
      'priceMarkerSelectedBorderColor',
      'priceMarkerSelectedColor',
      'priceMarkerViewedBackgroundColor',
      'priceMarkerViewedBorderColor',
      'priceMarkerViewedColor',
    ]);
  });
});
