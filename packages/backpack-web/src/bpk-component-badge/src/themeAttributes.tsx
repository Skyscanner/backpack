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

export const badgeThemeAttributes: string[] = [];

/**
 * Combined deduplicated array of all badge private theme attributes.
 * Only exposes component-scoped (private) badge tokens — global semantic vars
 * (text, status, core colours) can be overridden at the theme level independently.
 */
export const allBadgeThemeAttributes = [
  'privateBadgeColourBgDefault',
  'privateBadgeDimensionPaddingHorizontalDefault',
  'privateBadgeColourBgInverse',
  'privateBadgeColourBgOutline',
  'privateBadgeColourStrokeOutline',
  'privateBadgeColourBgSubtle',
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
