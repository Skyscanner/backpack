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
  allButtonThemeAttributes,
  buttonThemeAttributes,
  destructiveThemeAttributes,
  featuredThemeAttributes,
  linkThemeAttributes,
  primaryOnDarkThemeAttributes,
  primaryOnLightThemeAttributes,
  primaryThemeAttributes,
  secondaryOnDarkThemeAttributes,
  secondaryThemeAttributes,
} from './themeAttributes';

describe('themeAttributes', () => {
  it('should export the correct general theme attributes', () => {
    expect(buttonThemeAttributes).toEqual([
      'privateButtonDimensionRadius',
      'privateButtonDimensionMinHeightDefault',
      'privateButtonDimensionPaddingHorizontalDefault',
      'privateButtonDimensionMinHeightLarge',
      'privateButtonDimensionPaddingHorizontalLarge',
      'privateButtonColourBgDisabled',
    ]);
  });

  it('should export the correct primary theme attributes', () => {
    expect(primaryThemeAttributes).toEqual([
      'privateButtonColourBgPrimary',
      'privateButtonColourBgPrimaryPressed',
    ]);
  });

  it('should export the correct primaryOnDark theme attributes', () => {
    expect(primaryOnDarkThemeAttributes).toEqual([
      'privateButtonColourBgPrimaryOnDark',
      'privateButtonColourBgPrimaryOnDarkPressed',
    ]);
  });

  it('should export the correct primaryOnLight theme attributes', () => {
    expect(primaryOnLightThemeAttributes).toEqual([
      'privateButtonColourBgPrimaryOnLight',
      'privateButtonColourBgPrimaryOnLightPressed',
    ]);
  });

  it('should export the correct secondary theme attributes', () => {
    expect(secondaryThemeAttributes).toEqual([
      'privateButtonColourTextSecondary',
      'privateButtonColourBgSecondary',
      'privateButtonColourBgSecondaryPressed',
    ]);
  });

  it('should export the correct secondaryOnDark theme attributes', () => {
    expect(secondaryOnDarkThemeAttributes).toEqual([
      'privateButtonColourBgSecondaryOnDark',
      'privateButtonColourBgSecondaryOnDarkPressed',
      'privateButtonColourBgSecondaryOnDarkDisabled',
    ]);
  });

  it('should export the correct destructive theme attributes', () => {
    expect(destructiveThemeAttributes).toEqual([
      'privateButtonColourTextDestructive',
      'privateButtonColourBgDestructive',
      'privateButtonColourBgDestructivePressed',
    ]);
  });

  it('should export the correct featured theme attributes', () => {
    expect(featuredThemeAttributes).toEqual([
      'privateButtonColourTextFeature',
      'privateButtonColourBgFeatured',
      'privateButtonColourBgFeaturePressed',
    ]);
  });

  it('should export the correct link theme attributes', () => {
    expect(linkThemeAttributes).toEqual(['privateButtonColourTextLinkOnDark']);
  });

  it('should export allButtonThemeAttributes with all unique private button tokens', () => {
    expect(allButtonThemeAttributes).toEqual([
      'privateButtonDimensionRadius',
      'privateButtonDimensionMinHeightDefault',
      'privateButtonDimensionPaddingHorizontalDefault',
      'privateButtonDimensionMinHeightLarge',
      'privateButtonDimensionPaddingHorizontalLarge',
      'privateButtonColourBgDisabled',
      'privateButtonColourBgPrimary',
      'privateButtonColourBgPrimaryPressed',
      'privateButtonColourBgPrimaryOnDark',
      'privateButtonColourBgPrimaryOnDarkPressed',
      'privateButtonColourBgPrimaryOnLight',
      'privateButtonColourBgPrimaryOnLightPressed',
      'privateButtonColourTextSecondary',
      'privateButtonColourBgSecondary',
      'privateButtonColourBgSecondaryPressed',
      'privateButtonColourBgSecondaryOnDark',
      'privateButtonColourBgSecondaryOnDarkPressed',
      'privateButtonColourBgSecondaryOnDarkDisabled',
      'privateButtonColourTextFeature',
      'privateButtonColourBgFeatured',
      'privateButtonColourBgFeaturePressed',
      'privateButtonColourTextDestructive',
      'privateButtonColourBgDestructive',
      'privateButtonColourBgDestructivePressed',
      'privateButtonColourTextLinkOnDark',
    ]);
  });
});
