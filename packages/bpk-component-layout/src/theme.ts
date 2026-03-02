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

import type { ChakraBreakpointKey } from './tokens';

// Import tokens from Backpack foundations
// Note: Some tokens may not be in TypeScript definitions but exist at runtime

const bpkTokens = require('@skyscanner/bpk-foundations-web/tokens/base.es6');

// NOTE:
// We intentionally do not use the raw breakpoint *values* from foundations here.
// Foundations exports breakpoint values such as `breakpointMobile = "32rem"` which
// are used primarily for max-width queries (e.g. `(max-width: 32rem)`).
//
// Backpack layout responsive values in this package are mobile-first and behave
// like Chakra breakpoints (min-width thresholds). To align with Backpack’s
// intended breakpoint ranges we define lower-bound (min-width) thresholds:
//
// - small-mobile: 320px+
// - mobile: 360px+
// - small-tablet: 513px+
// - tablet: 769px+
// - desktop: 1025px+

// Note: Spacing tokens are defined as SCSS functions in Backpack foundations,
// not as direct values. We need to use the actual rem values from the SCSS functions.
// Based on @skyscanner/bpk-foundations-web/tokens/base.default.scss:
// - bpk-spacing-sm() returns .25rem
// - bpk-spacing-md() returns .5rem
// - bpk-spacing-lg() returns 1.5rem
// - bpk-spacing-xl() returns 2rem (needs verification)
// - bpk-spacing-xxl() returns 2.5rem
// - bpk-spacing-base() returns 1rem (standard base spacing)
// TODO: CLOV-1021 - will add spacing tokens to Backpack Foundations package and use them here after we ship the PoC
const spacingXs = '.125rem'; // 2px
const spacingSm = '.25rem';
const spacingBase = '1rem'; // Standard base spacing
const spacingMd = '.5rem';
const spacingLg = '1.5rem';
const spacingXl = '2rem';
const spacingXxl = '2.5rem';

/**
 * Backpack Theme Configuration for Chakra UI
 *
 * This theme maps Backpack design tokens from @skyscanner/bpk-foundations-web
 * to Chakra UI's theme structure.
 */

/**
 * Maps Backpack spacing tokens to actual rem values.
 * These come directly from @skyscanner/bpk-foundations-web.
 */
// Spacing tokens - directly imported from foundations
const spacingMap: Record<string, { value: string }> = {
  'bpk-spacing-none': { value: '0' },
  // Temporary: Foundations does not yet export a 2px spacing token. This will be
  // replaced with a foundations value once available.
  'bpk-spacing-xs': { value: spacingXs },
  'bpk-spacing-sm': { value: spacingSm },
  'bpk-spacing-base': { value: spacingBase },
  'bpk-spacing-md': { value: spacingMd },
  'bpk-spacing-lg': { value: spacingLg },
  'bpk-spacing-xl': { value: spacingXl },
  'bpk-spacing-xxl': { value: spacingXxl },
};

/**
 * Maps Backpack border size tokens to actual border width values
 * These come directly from @skyscanner/bpk-foundations-web
 */
const borderSizeMap: Record<string, string> = {
  'bpk-border-size-sm': bpkTokens.borderSizeSm,
  'bpk-border-size-lg': bpkTokens.borderSizeLg,
  'bpk-border-size-xl': bpkTokens.borderSizeXl,
};

/**
 * Maps Backpack border radius tokens to actual radius values.
 * These come directly from @skyscanner/bpk-foundations-web.
 */
const borderRadiusMap: Record<string, string> = {
  'bpk-border-radius-none': '0',
  'bpk-border-radius-xs': bpkTokens.borderRadiusXs,
  'bpk-border-radius-sm': bpkTokens.borderRadiusSm,
  'bpk-border-radius-md': bpkTokens.borderRadiusMd,
  'bpk-border-radius-lg': bpkTokens.borderRadiusLg,
  'bpk-border-radius-xl': bpkTokens.borderRadiusXl,
  'bpk-border-radius-full': bpkTokens.borderRadiusFull,
};

/**
 * Maps Backpack shadow tokens to actual box-shadow values
 * These come directly from @skyscanner/bpk-foundations-web
 */
const shadowMap: Record<string, string> = {
  'bpk-shadow-sm': bpkTokens.boxShadowSm,
  'bpk-shadow-lg': bpkTokens.boxShadowLg,
  'bpk-shadow-xl': bpkTokens.boxShadowXl,
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
 * Exports spacing map for use in tokenUtils
 * This allows tokenUtils to look up actual spacing values
 *
 * @returns {Record<string, string>} A map of spacing token names to values.
 */
export function getSpacingMap(): Record<string, string> {
  // Return simple string values for backward compatibility with utilities
  const simpleMap: Record<string, string> = {};
  Object.entries(spacingMap).forEach(([key, obj]) => {
    simpleMap[key] = obj.value;
  });
  return simpleMap;
}

/**
 * Gets the actual spacing value for a Backpack spacing token
 *
 * @param {string} token - Backpack spacing token name.
 * @returns {string | undefined} The actual spacing value.
 */
export function getSpacingValue(token: string): string | undefined {
  return spacingMap[token]?.value;
}

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
      breakpoints: chakraBreakpoints,
    },
  });
}
