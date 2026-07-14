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

export const buttonThemeAttributes = [
  'privateButtonDimensionRadius',
  'privateButtonDimensionMinHeightDefault',
  'privateButtonDimensionPaddingHorizontalDefault',
  'privateButtonDimensionMinHeightLarge',
  'privateButtonDimensionPaddingHorizontalLarge',
  'privateButtonColourBgDisabled',
];

export const primaryThemeAttributes = [
  'privateButtonColourBgPrimary',
  'privateButtonColourBgPrimaryPressed',
  'privateButtonColourTextPrimary',
];

export const primaryOnDarkThemeAttributes = [
  'privateButtonColourBgPrimaryOnDark',
  'privateButtonColourBgPrimaryOnDarkPressed',
  'privateButtonColourTextPrimaryOnDark',
];

export const primaryOnLightThemeAttributes = [
  'privateButtonColourBgPrimaryOnLight',
  'privateButtonColourBgPrimaryOnLightPressed',
  'privateButtonColourTextPrimaryOnLight',
];

export const secondaryThemeAttributes = [
  'privateButtonColourTextSecondary',
  'privateButtonColourBgSecondary',
  'privateButtonColourBgSecondaryPressed',
];

export const secondaryOnDarkThemeAttributes = [
  'privateButtonColourBgSecondaryOnDark',
  'privateButtonColourBgSecondaryOnDarkPressed',
  'privateButtonColourBgSecondaryOnDarkDisabled',
  'privateButtonColourTextSecondaryOnDark',
];

export const featuredThemeAttributes = [
  'privateButtonColourTextFeature',
  'privateButtonColourBgFeatured',
  'privateButtonColourBgFeaturePressed',
];

export const destructiveThemeAttributes = [
  'privateButtonColourTextDestructive',
  'privateButtonColourBgDestructive',
  'privateButtonColourBgDestructivePressed',
];

export const linkThemeAttributes = ['privateButtonColourTextLink'];

export const linkOnDarkThemeAttributes = ['privateButtonColourTextLinkOnDark'];

/**
 * Combined deduplicated array of all button private theme attributes.
 * Only exposes component-scoped (private) button tokens — global semantic vars
 * (text, core, status colours) can be overridden at the theme level independently.
 */
export const allButtonThemeAttributes = Array.from(
  new Set([
    ...buttonThemeAttributes,
    ...primaryThemeAttributes,
    ...primaryOnDarkThemeAttributes,
    ...primaryOnLightThemeAttributes,
    ...secondaryThemeAttributes,
    ...secondaryOnDarkThemeAttributes,
    ...featuredThemeAttributes,
    ...destructiveThemeAttributes,
    ...linkThemeAttributes,
    ...linkOnDarkThemeAttributes,
  ]),
);
