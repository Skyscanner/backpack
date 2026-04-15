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

// Import only the specific tokens needed for text styles, rather than the
// entire foundations module. This avoids pulling unused tokens (colors,
// shadows, borders, etc.) into the layout bundle.
import {
  fontSizeXs,
  fontSizeSm,
  fontSizeBase,
  fontSizeLg,
  fontSizeXl,
  fontSizeXxl,
  fontSizeXxxl,
  fontSizeXxxxl,
  fontSizeXxxxxl,
  fontSize6Xl,
  fontSize7Xl,
  fontSize8Xl,
  lineHeightXs,
  lineHeightSm,
  lineHeightBase,
  lineHeightBaseTight,
  lineHeightLg,
  lineHeightLgTight,
  lineHeightXl,
  lineHeightXlTight,
  lineHeightXxl,
  lineHeightXxxl,
  lineHeightXxxxl,
  lineHeightXxxxxl,
  lineHeight6Xl,
  lineHeight7Xl,
  lineHeight8Xl,
  fontWeightBook,
  fontWeightBold,
  fontWeightBlack,
  fontWeightLight,
  letterSpacingTight,
  letterSpacingHero,
  fontFamilyLarken,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkBreakpointToChakraKey } from './tokens';

import type { BpkBreakpointToken } from './tokens';

/**
 * Maps Backpack text style tokens to concrete CSS properties.
 *
 * This map is intentionally kept outside the Chakra theme config so that
 * layout-only consumers (who never use textStyle) do not pay for it.
 * Components that use textStyle expand it inline via `expandTextStyleProps`.
 */
const TEXT_STYLE_MAP: Record<string, Record<string, string>> = {
  xs: { fontSize: fontSizeXs, lineHeight: lineHeightXs, fontWeight: fontWeightBook },
  sm: { fontSize: fontSizeSm, lineHeight: lineHeightSm, fontWeight: fontWeightBook },
  base: { fontSize: fontSizeBase, lineHeight: lineHeightBase, fontWeight: fontWeightBook },
  lg: { fontSize: fontSizeLg, lineHeight: lineHeightLg, fontWeight: fontWeightBook },
  xl: { fontSize: fontSizeXl, lineHeight: lineHeightXl, fontWeight: fontWeightBook },
  xxl: { fontSize: fontSizeXxl, lineHeight: lineHeightXxl, fontWeight: fontWeightBold },
  xxxl: { fontSize: fontSizeXxxl, lineHeight: lineHeightXxxl, fontWeight: fontWeightBold },
  xxxxl: { fontSize: fontSizeXxxxl, lineHeight: lineHeightXxxxl, fontWeight: fontWeightBold, letterSpacing: letterSpacingTight },
  xxxxxl: { fontSize: fontSizeXxxxxl, lineHeight: lineHeightXxxxxl, fontWeight: fontWeightBold, letterSpacing: letterSpacingTight },
  caption: { fontSize: fontSizeXs, lineHeight: lineHeightXs, fontWeight: fontWeightBook },
  footnote: { fontSize: fontSizeSm, lineHeight: lineHeightSm, fontWeight: fontWeightBook },
  'label-1': { fontSize: fontSizeBase, lineHeight: lineHeightBase, fontWeight: fontWeightBold },
  'label-2': { fontSize: fontSizeSm, lineHeight: lineHeightSm, fontWeight: fontWeightBold },
  'label-3': { fontSize: fontSizeXs, lineHeight: lineHeightXs, fontWeight: fontWeightBold },
  'body-default': { fontSize: fontSizeBase, lineHeight: lineHeightBase, fontWeight: fontWeightBook },
  'body-longform': { fontSize: fontSizeLg, lineHeight: lineHeightLg, fontWeight: fontWeightBook },
  subheading: { fontSize: fontSizeXl, lineHeight: lineHeightXl, fontWeight: fontWeightBook },
  'heading-1': { fontSize: fontSizeXxxl, lineHeight: lineHeightXxxl, fontWeight: fontWeightBold },
  'heading-2': { fontSize: fontSizeXxl, lineHeight: lineHeightXxl, fontWeight: fontWeightBold },
  'heading-3': { fontSize: fontSizeXl, lineHeight: lineHeightXlTight, fontWeight: fontWeightBold },
  'heading-4': { fontSize: fontSizeLg, lineHeight: lineHeightLgTight, fontWeight: fontWeightBold },
  'heading-5': { fontSize: fontSizeBase, lineHeight: lineHeightBaseTight, fontWeight: fontWeightBold },
  'hero-1': { fontSize: fontSize8Xl, lineHeight: lineHeight8Xl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero },
  'hero-2': { fontSize: fontSize7Xl, lineHeight: lineHeight7Xl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero },
  'hero-3': { fontSize: fontSize6Xl, lineHeight: lineHeight6Xl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero },
  'hero-4': { fontSize: fontSizeXxxxxl, lineHeight: lineHeightXxxxxl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero },
  'hero-5': { fontSize: fontSizeXxxxl, lineHeight: lineHeightXxxl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero },
  'hero-6': { fontSize: fontSizeXxxl, lineHeight: lineHeightXxl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero },
  'editorial-1': { fontFamily: `var(--bpk-larken-font-stack, ${fontFamilyLarken})`, fontSize: fontSizeXxxxl, lineHeight: lineHeightXxxxl, fontWeight: fontWeightLight },
  'editorial-2': { fontFamily: `var(--bpk-larken-font-stack, ${fontFamilyLarken})`, fontSize: fontSizeXxl, lineHeight: lineHeightXxl, fontWeight: fontWeightLight },
  'editorial-3': { fontFamily: `var(--bpk-larken-font-stack, ${fontFamilyLarken})`, fontSize: fontSizeLg, lineHeight: lineHeightLg, fontWeight: fontWeightBook },
};

/**
 * Expands a textStyle token (or responsive object of tokens) into concrete
 * CSS property values that can be spread directly onto a Chakra component.
 *
 * Supports:
 * - Static values:     `textStyle="heading-3"` → `{ fontSize, lineHeight, fontWeight }`
 * - Responsive objects: `textStyle={{ mobile: 'heading-5', desktop: 'heading-3' }}`
 *   → `{ fontSize: { md: '...', '2xl': '...' }, lineHeight: { ... }, ... }`
 *
 * @param {any} value - A textStyle token string, responsive object, or undefined/null.
 * @returns {Record<string, any>} An object of CSS props to spread, or an empty object if no match.
 */
// eslint-disable-next-line import/prefer-default-export
export function expandTextStyleProps(value: any): Record<string, any> {
  if (value == null) return {};

  // Responsive object: { mobile: 'heading-5', desktop: 'heading-3' }
  if (typeof value === 'object' && !Array.isArray(value)) {
    // Normalise Backpack breakpoint keys to Chakra keys inline (avoids
    // circular dependency on tokenUtils).
    const normalized: Record<string, any> = {};
    Object.entries(value as Record<string, any>).forEach(([key, val]) => {
      if (key === 'base') {
        normalized.base = val;
      } else {
        const chakraKey = BpkBreakpointToChakraKey[key as BpkBreakpointToken];
        if (chakraKey) {
          normalized[chakraKey] = val;
        }
      }
    });

    // Pivot from { bp -> token } to { cssProp -> { bp -> cssValue } }
    const result: Record<string, Record<string, string>> = {};

    Object.entries(normalized).forEach(([bp, token]) => {
      const style = TEXT_STYLE_MAP[String(token)];
      if (!style) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(`Unknown textStyle token "${String(token)}" at breakpoint "${bp}".`);
        }
        return;
      }
      Object.entries(style).forEach(([cssProp, cssValue]) => {
        if (!result[cssProp]) {
          result[cssProp] = {};
        }
        result[cssProp][bp] = cssValue;
      });
    });

    return result;
  }

  // Static string value
  const style = TEXT_STYLE_MAP[String(value)];
  if (!style) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`Unknown textStyle token "${String(value)}".`);
    }
    return {};
  }
  return { ...style };
}
