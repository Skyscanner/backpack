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
    expect(badgeThemeAttributes).toEqual([
      'badgeFontSize',
      'badgeFontWeight',
      'badgeLineHeight',
      'radiusXs',
    ]);
  });

  it('should export the correct normal theme attributes', () => {
    expect(badgeNormalThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'textPrimary',
    ]);
  });

  it('should export the correct warning theme attributes', () => {
    expect(badgeWarningThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'textPrimary',
      'statusWarningSpot',
    ]);
  });

  it('should export the correct success theme attributes', () => {
    expect(badgeSuccessThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'textPrimary',
      'statusSuccessSpot',
    ]);
  });

  it('should export the correct critical theme attributes', () => {
    expect(badgeCriticalThemeAttributes).toEqual([
      'privateBadgeColourBgDefault',
      'textPrimary',
      'statusDangerSpot',
    ]);
  });

  it('should export the correct inverse theme attributes', () => {
    expect(badgeInverseThemeAttributes).toEqual([
      'privateBadgeColourBgInverse',
      'textPrimary',
    ]);
  });

  it('should export the correct outline theme attributes', () => {
    expect(badgeOutlineThemeAttributes).toEqual([
      'privateBadgeColourBgOutline',
      'privateBadgeColourStrokeOutline',
      'textOnDark',
    ]);
  });

  it('should export the correct strong theme attributes', () => {
    expect(badgeStrongThemeAttributes).toEqual([
      'corePrimary',
      'textOnDark',
    ]);
  });

  it('should export the correct brand theme attributes', () => {
    expect(badgeBrandThemeAttributes).toEqual([
      'coreAccent',
      'textInverse',
    ]);
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
      'textPrimary',
    ]);
  });

  it('should export allBadgeThemeAttributes with all variant attributes in order', () => {
    expect(allBadgeThemeAttributes).toEqual([
      ...badgeThemeAttributes,
      ...badgeNormalThemeAttributes,
      ...badgeWarningThemeAttributes,
      ...badgeSuccessThemeAttributes,
      ...badgeCriticalThemeAttributes,
      ...badgeInverseThemeAttributes,
      ...badgeOutlineThemeAttributes,
      ...badgeStrongThemeAttributes,
      ...badgeBrandThemeAttributes,
      ...badgeSubtleThemeAttributes,
    ]);
  });
});
