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

// Import color mapping
import { BACKPACK_COLOR_MAPPING } from './colorMapping';

// Import tokens from Backpack foundations
// Note: Some tokens may not be in TypeScript definitions but exist at runtime
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const bpkTokens = require('@skyscanner/bpk-foundations-web/tokens/base.es6');

// Extract breakpoint tokens (kept for potential future use)
const {
  breakpoints,
} = bpkTokens;

// Note: Spacing tokens are defined as SCSS functions in Backpack foundations,
// not as direct values. We need to use the actual rem values from the SCSS functions.
// Based on @skyscanner/bpk-foundations-web/tokens/base.default.scss:
// - bpk-spacing-sm() returns .25rem
// - bpk-spacing-md() returns .5rem
// - bpk-spacing-lg() returns 1.5rem
// - bpk-spacing-xl() returns 2rem (needs verification)
// - bpk-spacing-xxl() returns 2.5rem
// - bpk-spacing-base() returns 1rem (standard base spacing)
const spacingSm = '.25rem';
const spacingBase = '1rem'; // Standard base spacing
const spacingMd = '.5rem';
const spacingLg = '1.5rem';
const spacingXl = '2rem';
const spacingXxl = '2.5rem';

/**
 * Maps Backpack spacing tokens to actual rem values.
 * These values are used by tokenUtils to convert spacing tokens to concrete CSS values.
 */
export const spacingMap: Record<string, { value: string }> = {
  'bpk-spacing-none': { value: '0' },
  'bpk-spacing-sm': { value: spacingSm },
  'bpk-spacing-base': { value: spacingBase },
  'bpk-spacing-md': { value: spacingMd },
  'bpk-spacing-lg': { value: spacingLg },
  'bpk-spacing-xl': { value: spacingXl },
  'bpk-spacing-xxl': { value: spacingXxl },
};

/**
 * Maps Backpack color tokens to actual color values.
 * Uses the centralized color mapping from colorMapping.ts to ensure consistency.
 */
export const colorMap: Record<string, string> = BACKPACK_COLOR_MAPPING;

/**
 * Maps Backpack breakpoint tokens to media query values.
 * These are kept for potential future use with responsive helpers.
 *
 * Backpack provides 6 standard breakpoints which we map as follows:
 */
export const breakpointMap: Record<string, string> = {
  'small-mobile': breakpoints.breakpointQuerySmallMobile,
  'mobile': breakpoints.breakpointQueryMobile,
  'small-tablet': breakpoints.breakpointQuerySmallTablet,
  'tablet': breakpoints.breakpointQueryTablet,
  'desktop': breakpoints.breakpointQueryAboveTablet,
  'large-desktop': breakpoints.breakpointQueryAboveDesktop,
};

/**
 * Exports color map for use in tokenUtils.
 * This allows tokenUtils to look up actual color values.
 */
export function getColorMap(): Record<string, string> {
  return { ...colorMap };
}

/**
 * Gets the actual color value for a Backpack color token.
 */
export function getColorValue(token: string): string | undefined {
  return colorMap[token];
}

/**
 * Exports spacing map for use in tokenUtils.
 * This allows tokenUtils to look up actual spacing values.
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
 * Gets the actual spacing value for a Backpack spacing token.
 */
export function getSpacingValue(token: string): string | undefined {
  return spacingMap[token]?.value;
}

// Exported for completeness in case responsive helpers need direct access.
export function getBreakpointMap(): Record<string, string> {
  return { ...breakpointMap };
}
