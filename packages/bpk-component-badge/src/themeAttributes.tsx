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

export const badgeThemeAttributes = [
  'badgeFontSize',
  'badgeFontWeight',
  'badgeLineHeight',
  'badgeBorderRadius',
];

export const badgeNormalThemeAttributes = [
  'badgeNormalBackgroundColor',
  'badgeNormalTextColor',
  'badgeNormalIconColor',
];

export const badgeWarningThemeAttributes = [
  'badgeWarningBackgroundColor',
  'badgeWarningTextColor',
  'badgeWarningIconColor',
];

export const badgeSuccessThemeAttributes = [
  'badgeSuccessBackgroundColor',
  'badgeSuccessTextColor',
  'badgeSuccessIconColor',
];

export const badgeCriticalThemeAttributes = [
  'badgeCriticalBackgroundColor',
  'badgeCriticalTextColor',
  'badgeCriticalIconColor',
];

export const badgeInverseThemeAttributes = [
  'badgeInverseBackgroundColor',
  'badgeInverseTextColor',
  'badgeInverseIconColor',
];

export const badgeOutlineThemeAttributes = [
  'badgeOutlineBackgroundColor',
  'badgeOutlineTextColor',
  'badgeOutlineIconColor',
];

export const badgeStrongThemeAttributes = [
  'badgeStrongBackgroundColor',
  'badgeStrongTextColor',
  'badgeStrongIconColor',
];

export const badgeBrandThemeAttributes = [
  'badgeBrandBackgroundColor',
  'badgeBrandTextColor',
  'badgeBrandIconColor',
];

/**
 * Combined array of all badge theme attributes across all variants and shared properties.
 * Requires all these attributes to be present in the BpkThemeProvider theme object or theming
 * will be silently ignored. Prefer per-variant arrays (e.g. badgeNormalThemeAttributes) for
 * targeted theming.
 */
export const allBadgeThemeAttributes = [
  ...badgeThemeAttributes,
  ...badgeNormalThemeAttributes,
  ...badgeWarningThemeAttributes,
  ...badgeSuccessThemeAttributes,
  ...badgeCriticalThemeAttributes,
  ...badgeInverseThemeAttributes,
  ...badgeOutlineThemeAttributes,
  ...badgeStrongThemeAttributes,
  ...badgeBrandThemeAttributes,
];

/**
 * @deprecated The keys in this array pre-date full badge theming support and map to CSS variables
 * that were never wired up in the SCSS (the previous mixin used static token values directly).
 * Use per-variant arrays (e.g. badgeNormalThemeAttributes) for fine-grained theming, or
 * allBadgeThemeAttributes for the complete list.
 * Will be removed in the next major release.
 */
const themeAttributes = [
  'badgeBackgroundColor',
  'badgeSuccessBackgroundColor',
  'badgeDestructiveBackgroundColor',
];

export default themeAttributes;
