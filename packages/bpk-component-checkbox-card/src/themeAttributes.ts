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
 * Theme attributes for BpkCheckboxCard component.
 *
 * These attributes can be customized using BpkThemeProvider to override
 * the default colors and styles of the checkbox card.
 *
 * @example
 * import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';
 * import { BpkCheckboxCard, CHECKBOX_CARD_THEME_ATTRIBUTES } from '@skyscanner/backpack-web/bpk-component-checkbox-card';
 *
 * const theme = {
 *   checkboxCardBgDefault: '#FFFFFF',
 *   checkboxCardFgDefault: '#111236',
 *   checkboxCardBgHover: '#F1F2F8',
 *   checkboxCardBgChecked: '#0062E3',
 *   checkboxCardFgChecked: '#FFFFFF',
 *   checkboxCardBorderDefault: '#B2B2BF',
 *   checkboxCardBorderHover: '#B2B2BF',
 *   checkboxCardBorderChecked: 'transparent',
 *   checkboxCardBgDisabled: '#F1F2F8',
 *   checkboxCardFgDisabled: '#B2B2BF',
 * };
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
];

export default CHECKBOX_CARD_THEME_ATTRIBUTES;
