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

// Extract color tokens (keeping for backward compatibility)
const {
  textPrimaryDay,
  textSecondaryDay,
  textDisabledDay,
  textOnDarkDay,
  textLinkDay,
  textErrorDay,
  textSuccessDay,
  textHeroDay,
  canvasDay,
  canvasContrastDay,
  surfaceHighlightDay,
  surfaceDefaultDay,
  surfaceElevatedDay,
  corePrimaryDay,
  coreAccentDay,
  lineDay,
  lineOnDarkDay,
  // Breakpoint tokens
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

// Note: Chakra UI v3 might have a different API
// For now, we'll create a theme object that can be used with ChakraProvider
// If extendTheme is not available, we'll create the theme object directly

/**
 * Backpack Theme Configuration for Chakra UI
 *
 * This theme maps Backpack design tokens from @skyscanner/bpk-foundations-web
 * to Chakra UI's theme structure.
 */

/**
 * Maps Backpack spacing tokens to actual rem values
 * These come directly from @skyscanner/bpk-foundations-web
 */
// Spacing tokens - directly imported from foundations
const spacingMap: Record<string, string> = {
  'bpk-spacing-none': '0',
  'bpk-spacing-sm': spacingSm,
  'bpk-spacing-base': spacingBase,
  'bpk-spacing-md': spacingMd,
  'bpk-spacing-lg': spacingLg,
  'bpk-spacing-xl': spacingXl,
  'bpk-spacing-xxl': spacingXxl,
};

/**
 * Maps Backpack color tokens to actual color values
 * These come directly from @skyscanner/bpk-foundations-web
 * 
 * Uses the centralized color mapping from colorMapping.ts to ensure consistency
 */
const colorMap: Record<string, string> = BACKPACK_COLOR_MAPPING;

/**
 * Maps Backpack breakpoint tokens to media query values
 * These come directly from @skyscanner/bpk-foundations-web
 */
const breakpointMap: Record<string, string> = {
  'bpk-breakpoint-small-mobile': breakpoints.breakpointQuerySmallMobile,
  'bpk-breakpoint-mobile': breakpoints.breakpointQueryMobile,
  'bpk-breakpoint-small-tablet': breakpoints.breakpointQuerySmallTablet,
  'bpk-breakpoint-tablet': breakpoints.breakpointQueryTablet,
  'bpk-breakpoint-above-tablet': breakpoints.breakpointQueryAboveTablet,
  'bpk-breakpoint-above-desktop': breakpoints.breakpointQueryAboveDesktop,
};

/**
 * Exports color map for use in tokenUtils
 * This allows tokenUtils to look up actual color values
 */
export function getColorMap(): Record<string, string> {
  return { ...colorMap };
}

/**
 * Gets the actual color value for a Backpack color token
 */
export function getColorValue(token: string): string | undefined {
  return colorMap[token];
}

/**
 * Exports spacing map for use in tokenUtils
 * This allows tokenUtils to look up actual spacing values
 */
export function getSpacingMap(): Record<string, string> {
  return { ...spacingMap };
}

/**
 * Gets the actual spacing value for a Backpack spacing token
 */
export function getSpacingValue(token: string): string | undefined {
  return spacingMap[token];
}

/**
 * Creates Chakra UI theme with Backpack token mappings
 * Only uses full token names (no short names) to enforce explicit token usage
 */
export function createBpkTheme() {
  // Convert spacing map to Chakra UI format
  // Only use full token names - no short names to enforce explicit usage
  const space: Record<string, string> = {};
  Object.entries(spacingMap).forEach(([token, value]) => {
    space[token] = value; // Only use full token name
  });

  // Convert color map to Chakra UI format
  const colors: Record<string, string> = {};
  Object.entries(colorMap).forEach(([token, value]) => {
    colors[token] = value;
  });

  // Convert breakpoint map to Chakra UI format
  const breakpoints: Record<string, string> = {};
  Object.entries(breakpointMap).forEach(([token, value]) => {
    breakpoints[token] = value;
  });

  // Create theme object compatible with Chakra UI
  // Chakra UI 3.30.0 doesn't have extendTheme, so we return theme object directly
  // The theme will be used by ChakraProvider
  // 
  // Color structure: colors.bpk['bpk-core-primary-day'] = 'rgb(5, 32, 60)'
  // Chakra UI resolves 'bpk.bpk-core-primary-day' to colors.bpk['bpk-core-primary-day']
  return {
    space,
    colors: {
      bpk: colors,
    },
    breakpoints,
  };
}

