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
  badgeThemeAttributes,
  badgeNormalThemeAttributes,
  badgeWarningThemeAttributes,
  badgeSuccessThemeAttributes,
  badgeCriticalThemeAttributes,
  badgeInverseThemeAttributes,
  badgeOutlineThemeAttributes,
  badgeStrongThemeAttributes,
  badgeBrandThemeAttributes,
} from '../index';

describe('badge component themeAttributes', () => {
  it('should export the correct general theme attributes', () => {
    expect(badgeThemeAttributes).toEqual([
      'badgeFontSize',
      'badgeFontWeight',
      'badgeLineHeight',
      'badgeBorderRadius',
    ]);
  });

  it('should export the correct normal theme attributes', () => {
    expect(badgeNormalThemeAttributes).toEqual([
      'badgeNormalBackgroundColor',
      'badgeNormalTextColor',
      'badgeNormalIconColor',
    ]);
  });

  it('should export the correct warning theme attributes', () => {
    expect(badgeWarningThemeAttributes).toEqual([
      'badgeWarningBackgroundColor',
      'badgeWarningTextColor',
      'badgeWarningIconColor',
    ]);
  });

  it('should export the correct success theme attributes', () => {
    expect(badgeSuccessThemeAttributes).toEqual([
      'badgeSuccessBackgroundColor',
      'badgeSuccessTextColor',
      'badgeSuccessIconColor',
    ]);
  });

  it('should export the correct critical theme attributes', () => {
    expect(badgeCriticalThemeAttributes).toEqual([
      'badgeCriticalBackgroundColor',
      'badgeCriticalTextColor',
      'badgeCriticalIconColor',
    ]);
  });

  it('should export the correct inverse theme attributes', () => {
    expect(badgeInverseThemeAttributes).toEqual([
      'badgeInverseBackgroundColor',
      'badgeInverseTextColor',
      'badgeInverseIconColor',
    ]);
  });

  it('should export the correct outline theme attributes', () => {
    expect(badgeOutlineThemeAttributes).toEqual([
      'badgeOutlineBackgroundColor',
      'badgeOutlineTextColor',
      'badgeOutlineIconColor',
    ]);
  });

  it('should export the correct strong theme attributes', () => {
    expect(badgeStrongThemeAttributes).toEqual([
      'badgeStrongBackgroundColor',
      'badgeStrongTextColor',
      'badgeStrongIconColor',
    ]);
  });

  it('should export the correct brand theme attributes', () => {
    expect(badgeBrandThemeAttributes).toEqual([
      'badgeBrandBackgroundColor',
      'badgeBrandTextColor',
      'badgeBrandIconColor',
    ]);
  });

  it('should export a combined themeAttributes array with all variant attributes in order', () => {
    expect(themeAttributes).toEqual([
      ...badgeThemeAttributes,
      ...badgeNormalThemeAttributes,
      ...badgeWarningThemeAttributes,
      ...badgeSuccessThemeAttributes,
      ...badgeCriticalThemeAttributes,
      ...badgeInverseThemeAttributes,
      ...badgeOutlineThemeAttributes,
      ...badgeStrongThemeAttributes,
      ...badgeBrandThemeAttributes,
    ]);
  });
});
