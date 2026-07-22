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

/**
 * Combined deduplicated array of all radio private theme attributes.
 * Only exposes component-scoped (private) radio tokens — global semantic vars
 * (text, deprecated-link) can be overridden at the theme level independently.
 *
 * Camelcase conversion: strip `--bpk-`, convert kebab to camelCase.
 * e.g. --bpk-private-radio-bg-default-on -> privateRadioBgDefaultOn
 */
export const allRadioThemeAttributes = [
  'privateRadioBgDefaultDisabled',
  'privateRadioBgDefaultOn',
  'privateRadioBgOnContrastOff',
  'privateRadioBgOnContrastOn',
  'privateRadioBorder',
  'privateRadioBorderDefaultOff',
];

/**
 * @deprecated Use allRadioThemeAttributes instead.
 * This key pre-dates the CSS custom property migration and mapped to
 * --bpk-radio-checked-color which is no longer used in the SCSS.
 * Will be removed in the next major release.
 */
const themeAttributes = ['radioCheckedColor'];

export default themeAttributes;
