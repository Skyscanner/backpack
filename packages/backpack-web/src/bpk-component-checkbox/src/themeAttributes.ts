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
 * Combined deduplicated array of all checkbox private theme attributes.
 * Only exposes component-scoped (private) checkbox tokens - global semantic vars
 * (text, status, core colours) can be overridden at the theme level independently.
 *
 * Camelcase keys map to CSS custom properties via BpkThemeProvider:
 *   privateCheckboxBgDefaultChecked        -> --bpk-private-checkbox-bg-default-checked
 *   privateCheckboxBgDefaultIntermediate   -> --bpk-private-checkbox-bg-default-intermediate
 *   privateCheckboxBgOnContrastChecked     -> --bpk-private-checkbox-bg-on-contrast-checked
 *   privateCheckboxBgOnContrastIntermediate -> --bpk-private-checkbox-bg-on-contrast-intermediate
 *   privateCheckboxBorderDefaultDisabled   -> --bpk-private-checkbox-border-default-disabled
 *   privateCheckboxBorderDefaultNotChecked -> --bpk-private-checkbox-border-default-not-checked
 *   privateCheckboxBorderOnContrastDisabled -> --bpk-private-checkbox-border-on-contrast-disabled
 *   privateCheckboxBorderOnContrastNotChecked -> --bpk-private-checkbox-border-on-contrast-not-checked
 *   privateCheckboxIconOnContrast          -> --bpk-private-checkbox-icon-on-contrast
 *   privateCheckboxStroke                  -> --bpk-private-checkbox-stroke
 */
export const allCheckboxThemeAttributes = [
  'privateCheckboxBgDefaultChecked',
  'privateCheckboxBgDefaultIntermediate',
  'privateCheckboxBgOnContrastChecked',
  'privateCheckboxBgOnContrastIntermediate',
  'privateCheckboxBorderDefaultDisabled',
  'privateCheckboxBorderDefaultNotChecked',
  'privateCheckboxBorderOnContrastDisabled',
  'privateCheckboxBorderOnContrastNotChecked',
  'privateCheckboxIconOnContrast',
  'privateCheckboxStroke',
];

/**
 * @deprecated Use allCheckboxThemeAttributes instead.
 * This legacy key maps to the old --bpk-checkbox-checked-color hook which is no
 * longer present in the migrated SCSS. Kept for backwards compatibility.
 * Will be removed in the next major release.
 */
const themeAttributes = ['checkboxCheckedColor'];

export default themeAttributes;
