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
 * Combined badge theme attributes.
 * @deprecated Use the per-variant theme attribute arrays instead (e.g. badgeNormalThemeAttributes,
 * badgeWarningThemeAttributes, etc.) for fine-grained theming control. Passing this combined
 * array to BpkThemeProvider requires supplying all 29 attributes or the theme is silently ignored.
 * This export's content changed in a breaking way and will be removed in the next major release.
 */
const themeAttributes = [
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

export default themeAttributes;
