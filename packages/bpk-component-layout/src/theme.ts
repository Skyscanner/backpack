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

import { defineConfig } from '@chakra-ui/react';

// Named imports from Backpack foundations — only the tokens actually used.
// This enables tree-shaking of the full foundations module.
import {
  // Border sizes
  borderSizeSm,
  borderSizeLg,
  borderSizeXl,
  // Border radii
  borderRadiusXs,
  borderRadiusSm,
  borderRadiusMd,
  borderRadiusLg,
  borderRadiusXl,
  borderRadiusFull,
  // Box shadows
  boxShadowSm,
  boxShadowLg,
  boxShadowXl,
  // Font sizes
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
  // Line heights
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
  // Font weights
  fontWeightBook,
  fontWeightBold,
  fontWeightBlack,
  fontWeightLight,
  // Letter spacing
  letterSpacingTight,
  letterSpacingHero,
  // Font family
  fontFamilyLarken,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { spacingMap } from './spacingMap';

import type { ChakraBreakpointKey } from './tokens';

// NOTE:
// We intentionally do not use the raw breakpoint *values* from foundations here.
// Foundations exports breakpoint values such as `breakpointMobile = "32rem"` which
// are used primarily for max-width queries (e.g. `(max-width: 32rem)`).
//
// Backpack layout responsive values in this package are mobile-first and behave
// like Chakra breakpoints (min-width thresholds). To align with Backpack's
// intended breakpoint ranges we define lower-bound (min-width) thresholds:
//
// - small-mobile: 320px+
// - mobile: 360px+
// - small-tablet: 513px+
// - tablet: 769px+
// - desktop: 1025px+

/**
 * Maps Backpack border size tokens to actual border width values
 * These come directly from @skyscanner/bpk-foundations-web
 */
const borderSizeMap: Record<string, string> = {
  'bpk-border-size-sm': borderSizeSm,
  'bpk-border-size-lg': borderSizeLg,
  'bpk-border-size-xl': borderSizeXl,
};

/**
 * Maps Backpack border radius tokens to actual radius values.
 * These come directly from @skyscanner/bpk-foundations-web.
 */
const borderRadiusMap: Record<string, string> = {
  'bpk-border-radius-none': '0',
  'bpk-border-radius-xs': borderRadiusXs,
  'bpk-border-radius-sm': borderRadiusSm,
  'bpk-border-radius-md': borderRadiusMd,
  'bpk-border-radius-lg': borderRadiusLg,
  'bpk-border-radius-xl': borderRadiusXl,
  'bpk-border-radius-full': borderRadiusFull,
};

/**
 * Maps Backpack shadow tokens to actual box-shadow values
 * These come directly from @skyscanner/bpk-foundations-web
 */
const shadowMap: Record<string, string> = {
  'bpk-shadow-sm': boxShadowSm,
  'bpk-shadow-lg': boxShadowLg,
  'bpk-shadow-xl': boxShadowXl,
};

/**
 * Chakra expects raw width values (e.g. "48rem"), not full media queries.
 * The media query construction is handled internally by Chakra's system.
 *
 * We align Backpack breakpoint tokens to Chakra's keys like this:
 * - base: 0 (implicit)
 * - sm: small-mobile (>= 320px)
 * - md: mobile (>= 360px)
 * - lg: small-tablet (>= 513px)
 * - xl: tablet (>= 769px)
 * - 2xl: desktop (>= 1025px)
 */
// TODO: CLOV-1021 - will add breakpoint boundary tokens to Backpack Foundations package and use them here after we ship the PoC
const breakpointMap: Record<ChakraBreakpointKey, string> = {
  base: '0rem',
  sm: '20rem', // 320px
  md: '22.5rem', // 360px
  lg: '32.0625rem', // 513px
  xl: '48.0625rem', // 769px
  '2xl': '64.0625rem', // 1025px
};

/**
 * Gets the actual border width value for a Backpack border size token
 *
 * @param {string} token - Backpack border size token name.
 * @returns {string | undefined} The actual border width value.
 */
export function getBorderSizeValue(token: string): string | undefined {
  return borderSizeMap[token];
}

/**
 * Gets the actual border radius value for a Backpack border radius token
 *
 * @param {string} token - Backpack border radius token name.
 * @returns {string | undefined} The actual border radius value.
 */
export function getBorderRadiusValue(token: string): string | undefined {
  return borderRadiusMap[token];
}

/**
 * Gets the actual box-shadow value for a Backpack shadow token
 *
 * @param {string} token - Backpack shadow token name.
 * @returns {string | undefined} The actual box-shadow value.
 */
export function getShadowValue(token: string): string | undefined {
  return shadowMap[token];
}

/**
 * Maps Backpack text style tokens to Chakra UI textStyles.
 * CSS property values are sourced from @skyscanner/bpk-foundations-web/tokens/base.es6.
 * Each entry mirrors the corresponding SCSS mixin in bpk-mixins/_typography.scss.
 */
const textStylesMap: Record<string, { value: Record<string, string> }> = {
  xs: { value: { fontSize: fontSizeXs, lineHeight: lineHeightXs, fontWeight: fontWeightBook } },
  sm: { value: { fontSize: fontSizeSm, lineHeight: lineHeightSm, fontWeight: fontWeightBook } },
  base: { value: { fontSize: fontSizeBase, lineHeight: lineHeightBase, fontWeight: fontWeightBook } },
  lg: { value: { fontSize: fontSizeLg, lineHeight: lineHeightLg, fontWeight: fontWeightBook } },
  xl: { value: { fontSize: fontSizeXl, lineHeight: lineHeightXl, fontWeight: fontWeightBook } },
  xxl: { value: { fontSize: fontSizeXxl, lineHeight: lineHeightXxl, fontWeight: fontWeightBold } },
  xxxl: { value: { fontSize: fontSizeXxxl, lineHeight: lineHeightXxxl, fontWeight: fontWeightBold } },
  xxxxl: { value: { fontSize: fontSizeXxxxl, lineHeight: lineHeightXxxxl, fontWeight: fontWeightBold, letterSpacing: letterSpacingTight } },
  xxxxxl: { value: { fontSize: fontSizeXxxxxl, lineHeight: lineHeightXxxxxl, fontWeight: fontWeightBold, letterSpacing: letterSpacingTight } },
  caption: { value: { fontSize: fontSizeXs, lineHeight: lineHeightXs, fontWeight: fontWeightBook } },
  footnote: { value: { fontSize: fontSizeSm, lineHeight: lineHeightSm, fontWeight: fontWeightBook } },
  'label-1': { value: { fontSize: fontSizeBase, lineHeight: lineHeightBase, fontWeight: fontWeightBold } },
  'label-2': { value: { fontSize: fontSizeSm, lineHeight: lineHeightSm, fontWeight: fontWeightBold } },
  'label-3': { value: { fontSize: fontSizeXs, lineHeight: lineHeightXs, fontWeight: fontWeightBold } },
  'body-default': { value: { fontSize: fontSizeBase, lineHeight: lineHeightBase, fontWeight: fontWeightBook } },
  'body-longform': { value: { fontSize: fontSizeLg, lineHeight: lineHeightLg, fontWeight: fontWeightBook } },
  subheading: { value: { fontSize: fontSizeXl, lineHeight: lineHeightXl, fontWeight: fontWeightBook } },
  'heading-1': { value: { fontSize: fontSizeXxxl, lineHeight: lineHeightXxxl, fontWeight: fontWeightBold } },
  'heading-2': { value: { fontSize: fontSizeXxl, lineHeight: lineHeightXxl, fontWeight: fontWeightBold } },
  'heading-3': { value: { fontSize: fontSizeXl, lineHeight: lineHeightXlTight, fontWeight: fontWeightBold } },
  'heading-4': { value: { fontSize: fontSizeLg, lineHeight: lineHeightLgTight, fontWeight: fontWeightBold } },
  'heading-5': { value: { fontSize: fontSizeBase, lineHeight: lineHeightBaseTight, fontWeight: fontWeightBold } },
  'hero-1': { value: { fontSize: fontSize8Xl, lineHeight: lineHeight8Xl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero } },
  'hero-2': { value: { fontSize: fontSize7Xl, lineHeight: lineHeight7Xl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero } },
  'hero-3': { value: { fontSize: fontSize6Xl, lineHeight: lineHeight6Xl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero } },
  'hero-4': { value: { fontSize: fontSizeXxxxxl, lineHeight: lineHeightXxxxxl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero } },
  'hero-5': { value: { fontSize: fontSizeXxxxl, lineHeight: lineHeightXxxl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero } },
  'hero-6': { value: { fontSize: fontSizeXxxl, lineHeight: lineHeightXxl, fontWeight: fontWeightBlack, letterSpacing: letterSpacingHero } },
  'editorial-1': { value: { fontFamily: `var(--bpk-larken-font-stack, ${fontFamilyLarken})`, fontSize: fontSizeXxxxl, lineHeight: lineHeightXxxxl, fontWeight: fontWeightLight } },
  'editorial-2': { value: { fontFamily: `var(--bpk-larken-font-stack, ${fontFamilyLarken})`, fontSize: fontSizeXxl, lineHeight: lineHeightXxl, fontWeight: fontWeightLight } },
  'editorial-3': { value: { fontFamily: `var(--bpk-larken-font-stack, ${fontFamilyLarken})`, fontSize: fontSizeLg, lineHeight: lineHeightLg, fontWeight: fontWeightBook } },
};

export function createBpkConfig() {
  // Convert breakpoint map to Chakra UI format
  // Breakpoints in Chakra v3 are typically simple strings in the breakpoints object
  const chakraBreakpoints: Record<string, string> = {};
  Object.entries(breakpointMap).forEach(([token, value]) => {
    chakraBreakpoints[token] = value;
  });

  return defineConfig({
    // Disable Chakra's preflight (CSS reset) so it does not override Backpack's
    // global font styles, in particular the `-webkit-font-smoothing: antialiased`
    // setting applied by Backpack.
    preflight: false,
    cssVarsPrefix: 'bpk',
    theme: {
      tokens: {
        spacing: spacingMap,
      },
      textStyles: textStylesMap,
      breakpoints: chakraBreakpoints,
    },
  });
}
