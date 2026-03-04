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

// V2 API - Compound Component (New, Recommended)
export { BpkCheckboxCard, default } from './src/BpkCheckboxCard';

// V2 API - Backward Compatible Simple Wrapper
export { BpkCheckboxCardSimple } from './src/BpkCheckboxCardSimple/BpkCheckboxCardSimple';

// Export all types
export type {
  BpkCheckboxCardRootProps,
  BpkCheckboxCardContentProps,
  BpkCheckboxCardIconProps,
  BpkCheckboxCardImageProps,
  BpkCheckboxCardLabelProps,
  BpkCheckboxCardDescriptionProps,
  BpkCheckboxCardPriceProps,
  BpkCheckboxCardStackProps,
  CheckboxCardContextValue,
} from './src/BpkCheckboxCard';

// Export common types and constants
export {
  CHECKBOX_CARD_VARIANTS,
  CHECKBOX_CARD_RADIUS,
  CHECKBOX_CARD_SIZES,
  type CheckboxCardVariant,
  type CheckboxCardRadius,
  type CheckboxCardSize,
  useCheckboxCardContext,
} from './src/BpkCheckboxCard';

// Export theme attributes and helper for BpkThemeProvider
export { default as CHECKBOX_CARD_THEME_ATTRIBUTES, createCheckboxCardTheme } from './src/themeAttributes';

