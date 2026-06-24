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

import {
  themeAttributes,
  allBadgeThemeAttributes,
  badgeThemeAttributes,
  badgeNormalThemeAttributes,
  badgeWarningThemeAttributes,
  badgeSuccessThemeAttributes,
  badgeCriticalThemeAttributes,
  badgeInverseThemeAttributes,
  badgeOutlineThemeAttributes,
  badgeStrongThemeAttributes,
  badgeBrandThemeAttributes,
  badgeSubtleThemeAttributes,
} from '../index';

describe('badge component themeAttributes', () => {
  it('should export the correct general theme attributes', () => {
    expect(badgeThemeAttributes).toEqual([]);
  });

  it('should export the correct normal theme attributes', () => {
    expect(badgeNormalThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'privateBadgeDimensionPaddingHorizontalDefault',
    ]);
  });

  it('should export the correct warning theme attributes', () => {
    expect(badgeWarningThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'privateBadgeDimensionPaddingHorizontalDefault',
    ]);
  });

  it('should export the correct success theme attributes', () => {
    expect(badgeSuccessThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'privateBadgeDimensionPaddingHorizontalDefault',
    ]);
  });

  it('should export the correct critical theme attributes', () => {
    expect(badgeCriticalThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'privateBadgeDimensionPaddingHorizontalDefault',
    ]);
  });

  it('should export the correct inverse theme attributes', () => {
    expect(badgeInverseThemeAttributes).toEqual([
      'privateBadgeColourBgInverse',
    ]);
  });

  it('should export the correct outline theme attributes', () => {
    expect(badgeOutlineThemeAttributes).toEqual([
      'privateBadgeColourBgOutline',
      'privateBadgeColourStrokeOutline',
    ]);
  });

  it('should export the correct strong theme attributes', () => {
    expect(badgeStrongThemeAttributes).toEqual([]);
  });

  it('should export the correct brand theme attributes', () => {
    expect(badgeBrandThemeAttributes).toEqual([]);
  });

  it('should export the deprecated themeAttributes default with the legacy keys', () => {
    expect(themeAttributes).toEqual([
      'badgeBackgroundColor',
      'badgeSuccessBackgroundColor',
      'badgeDestructiveBackgroundColor',
    ]);
  });

  it('should export the correct subtle theme attributes', () => {
    expect(badgeSubtleThemeAttributes).toEqual([
      'privateBadgeColourBgSubtle',
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
    ]);
  });
});
