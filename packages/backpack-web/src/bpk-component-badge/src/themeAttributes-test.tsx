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

import { themeAttributes, allBadgeThemeAttributes, badgeThemeAttributes } from '../index';

describe('badge component themeAttributes', () => {
  it('should export badgeThemeAttributes as an empty array', () => {
    expect(badgeThemeAttributes).toEqual([]);
  });

  it('should export the deprecated themeAttributes default with the legacy keys', () => {
    expect(themeAttributes).toEqual([
      'badgeBackgroundColor',
      'badgeSuccessBackgroundColor',
      'badgeDestructiveBackgroundColor',
    ]);
  });

  it('should export allBadgeThemeAttributes with all unique private badge tokens', () => {
    expect(allBadgeThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'privateBadgeDimensionPaddingHorizontalDefault',
      'privateBadgeColourBgInverse',
      'privateBadgeColourBgOutline',
      'privateBadgeColourStrokeOutline',
      'privateBadgeColourBgSubtle',
      'privateBadgeDimensionPaddingHorizontalSubtle',
    ]);
  });
});
