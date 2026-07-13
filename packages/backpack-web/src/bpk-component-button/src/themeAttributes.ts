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
  'privateButtonDimensionMinHeightLarge',
  'privateButtonDimensionPaddingHorizontalLarge',
];

export const primaryThemeAttributes = [
  'privateButtonColourBgPrimary',
  'privateButtonColourBgPrimaryPressed',
];

export const primaryOnDarkThemeAttributes = [
  'privateButtonColourBgPrimaryOnDark',
  'privateButtonColourBgPrimaryOnDarkPressed',
];

export const primaryOnLightThemeAttributes = [
  'privateButtonColourBgPrimaryOnLight',
  'privateButtonColourBgPrimaryOnLightPressed',
];

export const secondaryThemeAttributes = [
  'privateButtonColourTextSecondary',
  'privateButtonColourBgSecondary',
  'privateButtonColourBgSecondaryPressed',
];

export const secondaryOnDarkThemeAttributes = [
  'privateButtonColourBgSecondaryOnDark',
  'privateButtonColourBgSecondaryOnDarkPressed',
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

export const linkThemeAttributes = ['privateButtonColourTextLinkOnDark'];

/**
 * Combined deduplicated array of all button private theme attributes.
 * Only exposes component-scoped (private) button tokens — global semantic vars
 * (text, core, status colours) can be overridden at the theme level independently.
 */
export const allButtonThemeAttributes = [
  ...buttonThemeAttributes,
  ...primaryThemeAttributes,
  ...primaryOnDarkThemeAttributes,
  ...primaryOnLightThemeAttributes,
  ...secondaryThemeAttributes,
  ...secondaryOnDarkThemeAttributes,
  ...featuredThemeAttributes,
  ...destructiveThemeAttributes,
  ...linkThemeAttributes,
];

/**
 * @deprecated The keys in this array pre-date the CSS custom properties migration and map to
 * CSS variables that are no longer wired up in the SCSS (the mixin now uses the
 * --bpk-private-button-* vars directly). Use the named exports above (e.g.
 * primaryThemeAttributes) for fine-grained theming, or allButtonThemeAttributes for the
 * complete list. Will be removed in the next major release.
 */
const legacyThemeAttributes = [
  'buttonFontSize',
  'buttonBorderRadius',
  'buttonPrimaryTextColor',
  'buttonPrimaryHoverTextColor',
  'buttonPrimaryActiveTextColor',
  'buttonPrimaryGradientStartColor',
  'buttonPrimaryGradientEndColor',
  'buttonPrimaryBackgroundColor',
  'buttonPrimaryHoverBackgroundColor',
  'buttonPrimaryActiveBackgroundColor',
  'buttonPrimaryOnDarkTextColor',
  'buttonPrimaryOnDarkHoverTextColor',
  'buttonPrimaryOnDarkActiveTextColor',
  'buttonPrimaryOnDarkBackgroundColor',
  'buttonPrimaryOnDarkHoverBackgroundColor',
  'buttonPrimaryOnDarkActiveBackgroundColor',
  'buttonPrimaryOnLightTextColor',
  'buttonPrimaryOnLightHoverTextColor',
  'buttonPrimaryOnLightActiveTextColor',
  'buttonPrimaryOnLightBackgroundColor',
  'buttonPrimaryOnLightHoverBackgroundColor',
  'buttonPrimaryOnLightActiveBackgroundColor',
  'buttonSecondaryTextColor',
  'buttonSecondaryHoverTextColor',
  'buttonSecondaryActiveTextColor',
  'buttonSecondaryBorderColor',
  'buttonSecondaryHoverBorderColor',
  'buttonSecondaryActiveBorderColor',
  'buttonSecondaryBackgroundColor',
  'buttonSecondaryHoverBackgroundColor',
  'buttonSecondaryActiveBackgroundColor',
  'buttonSecondaryOnDarkTextColor',
  'buttonSecondaryOnDarkHoverTextColor',
  'buttonSecondaryOnDarkActiveTextColor',
  'buttonSecondaryOnDarkBackgroundColor',
  'buttonSecondaryOnDarkHoverBackgroundColor',
  'buttonSecondaryOnDarkActiveBackgroundColor',
  'buttonFeaturedTextColor',
  'buttonFeaturedHoverTextColor',
  'buttonFeaturedActiveTextColor',
  'buttonFeaturedGradientStartColor',
  'buttonFeaturedGradientEndColor',
  'buttonFeaturedBackgroundColor',
  'buttonFeaturedHoverBackgroundColor',
  'buttonFeaturedActiveBackgroundColor',
  'buttonDestructiveTextColor',
  'buttonDestructiveHoverTextColor',
  'buttonDestructiveActiveTextColor',
  'buttonDestructiveBorderColor',
  'buttonDestructiveHoverBorderColor',
  'buttonDestructiveActiveBorderColor',
  'buttonDestructiveBackgroundColor',
  'buttonDestructiveHoverBackgroundColor',
  'buttonDestructiveActiveBackgroundColor',
  'buttonLinkLoadingColor',
];

export default legacyThemeAttributes;
