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
  canvasDay,
  coreAccentDay,
  colorWhite,
  lineDay,
  surfaceContrastDay,
  surfaceLowContrastDay,
  textDisabledDay,
  textOnDarkDay,
  textPrimaryDay,
  textSecondaryDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

/**
 * Theme attributes for BpkCheckboxCard component.
 *
 * These attributes can be customized using BpkThemeProvider to override
 * the default colors and styles of the checkbox card.
 *
 * Use `createCheckboxCardTheme` to build a partial theme — only specify
 * the attributes you want to change; the rest fall back to design tokens.
 *
 * @example
 * import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';
 * import {
 *   BpkCheckboxCard,
 *   CHECKBOX_CARD_THEME_ATTRIBUTES,
 *   createCheckboxCardTheme,
 * } from '@skyscanner/backpack-web/bpk-component-checkbox-card';
 *
 * const theme = createCheckboxCardTheme({
 *   checkboxCardBgChecked: '#FFFFFF',
 *   checkboxCardFgChecked: '#111236',
 *   checkboxCardBorderChecked: '#111236',
 *   checkboxCardIndicatorColor: '#111236',
 * });
 *
 * <BpkThemeProvider theme={theme} themeAttributes={CHECKBOX_CARD_THEME_ATTRIBUTES}>
 *   <BpkCheckboxCard.Root>
 *     ...
 *   </BpkCheckboxCard.Root>
 * </BpkThemeProvider>
 */
const CHECKBOX_CARD_THEME_ATTRIBUTES = [
  'checkboxCardBgDefault',
  'checkboxCardFgDefault',
  'checkboxCardFgSecondary',
  'checkboxCardBgHover',
  'checkboxCardBorderDefault',
  'checkboxCardBorderHover',
  'checkboxCardBgChecked',
  'checkboxCardFgChecked',
  'checkboxCardBorderChecked',
  'checkboxCardBgDisabled',
  'checkboxCardFgDisabled',
  'checkboxCardIndicatorColor',
  'checkboxCardIndicatorFg',
] as const;

type CheckboxCardThemeKey = (typeof CHECKBOX_CARD_THEME_ATTRIBUTES)[number];
type CheckboxCardTheme = Record<CheckboxCardThemeKey, string>;

/** Default theme values matching the SCSS token fallbacks */
const CHECKBOX_CARD_DEFAULT_THEME: CheckboxCardTheme = {
  checkboxCardBgDefault: canvasDay,
  checkboxCardFgDefault: textPrimaryDay,
  checkboxCardFgSecondary: textSecondaryDay,
  checkboxCardBgHover: surfaceLowContrastDay,
  checkboxCardBorderDefault: lineDay,
  checkboxCardBorderHover: lineDay,
  checkboxCardBgChecked: surfaceContrastDay,
  checkboxCardFgChecked: textOnDarkDay,
  checkboxCardBorderChecked: 'transparent',
  checkboxCardBgDisabled: canvasDay,
  checkboxCardFgDisabled: textDisabledDay,
  checkboxCardIndicatorColor: coreAccentDay,
  checkboxCardIndicatorFg: colorWhite,
};

/**
 * Creates a complete BpkCheckboxCard theme by merging your overrides with the
 * default design-token values. Pass only the attributes you want to change.
 *
 * @example
 * const theme = createCheckboxCardTheme({
 *   checkboxCardBgChecked: '#FFFFFF',
 *   checkboxCardBorderChecked: '#111236',
 *   checkboxCardIndicatorColor: '#111236',
 * });
 */

export function createCheckboxCardTheme(
  overrides: Partial<CheckboxCardTheme> = {},
): CheckboxCardTheme {
  return { ...CHECKBOX_CARD_DEFAULT_THEME, ...overrides };
}

export default CHECKBOX_CARD_THEME_ATTRIBUTES;
