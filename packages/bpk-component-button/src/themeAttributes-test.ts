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
// @ts-nocheck

import {
  buttonThemeAttributes,
  primaryThemeAttributes,
  primaryOnDarkThemeAttributes,
  primaryOnLightThemeAttributes,
  secondaryThemeAttributes,
  secondaryOnDarkThemeAttributes,
  destructiveThemeAttributes,
  featuredThemeAttributes,
} from './themeAttributes';

describe('themeAttributes', () => {
  it('should export the correct general theme attributes', () => {
    expect(buttonThemeAttributes).toEqual(['buttonFontSize']);
  });

  it('should export the correct primary theme attributes', () => {
    expect(primaryThemeAttributes).toEqual([
      'buttonPrimaryTextColor',
      'buttonPrimaryHoverTextColor',
      'buttonPrimaryActiveTextColor',
      'buttonPrimaryGradientStartColor',
      'buttonPrimaryGradientEndColor',
      'buttonPrimaryBackgroundColor',
      'buttonPrimaryHoverBackgroundColor',
      'buttonPrimaryActiveBackgroundColor',
    ]);
  });

  it('should export the correct primaryOnDark theme attributes', () => {
    expect(primaryOnDarkThemeAttributes).toEqual([
      'buttonPrimaryOnDarkTextColor',
      'buttonPrimaryOnDarkHoverTextColor',
      'buttonPrimaryOnDarkActiveTextColor',
      'buttonPrimaryOnDarkBackgroundColor',
      'buttonPrimaryOnDarkHoverBackgroundColor',
      'buttonPrimaryOnDarkActiveBackgroundColor',
    ]);
  });

  it('should export the correct primaryOnLight theme attributes', () => {
    expect(primaryOnLightThemeAttributes).toEqual([
      'buttonPrimaryOnLightTextColor',
      'buttonPrimaryOnLightHoverTextColor',
      'buttonPrimaryOnLightActiveTextColor',
      'buttonPrimaryOnLightBackgroundColor',
      'buttonPrimaryOnLightHoverBackgroundColor',
      'buttonPrimaryOnLightActiveBackgroundColor',
    ]);
  });

  it('should export the correct secondary theme attributes', () => {
    expect(secondaryThemeAttributes).toEqual([
      'buttonSecondaryTextColor',
      'buttonSecondaryHoverTextColor',
      'buttonSecondaryActiveTextColor',
      'buttonSecondaryBorderColor',
      'buttonSecondaryHoverBorderColor',
      'buttonSecondaryActiveBorderColor',
      'buttonSecondaryBackgroundColor',
      'buttonSecondaryHoverBackgroundColor',
      'buttonSecondaryActiveBackgroundColor',
    ]);
  });

  it('should export the correct secondaryOnDark theme attributes', () => {
    expect(secondaryOnDarkThemeAttributes).toEqual([
      'buttonSecondaryOnDarkTextColor',
      'buttonSecondaryOnDarkHoverTextColor',
      'buttonSecondaryOnDarkActiveTextColor',
      'buttonSecondaryOnDarkBackgroundColor',
      'buttonSecondaryOnDarkHoverBackgroundColor',
      'buttonSecondaryOnDarkActiveBackgroundColor',
    ]);
  });

  it('should export the correct destructive theme attributes', () => {
    expect(destructiveThemeAttributes).toEqual([
      'buttonDestructiveTextColor',
      'buttonDestructiveHoverTextColor',
      'buttonDestructiveActiveTextColor',
      'buttonDestructiveBorderColor',
      'buttonDestructiveHoverBorderColor',
      'buttonDestructiveActiveBorderColor',
      'buttonDestructiveBackgroundColor',
      'buttonDestructiveHoverBackgroundColor',
      'buttonDestructiveActiveBackgroundColor',
    ]);
  });

  it('should export the correct featured theme attributes', () => {
    expect(featuredThemeAttributes).toEqual([
      'buttonFeaturedTextColor',
      'buttonFeaturedHoverTextColor',
      'buttonFeaturedActiveTextColor',
      'buttonFeaturedGradientStartColor',
      'buttonFeaturedGradientEndColor',
      'buttonFeaturedBackgroundColor',
      'buttonFeaturedHoverBackgroundColor',
      'buttonFeaturedActiveBackgroundColor',
    ]);
  });
});
