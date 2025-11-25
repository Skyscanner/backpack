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

// Import tokens from Backpack foundations
// Note: Some tokens may not be in TypeScript definitions but exist at runtime
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const bpkTokens = require('@skyscanner/bpk-foundations-web/tokens/base.es6');

// Extract spacing tokens (they exist at runtime even if TypeScript doesn't know about them)
const {
  spacingSm,
  spacingBase,
  spacingMd,
  spacingLg,
  spacingXl,
  spacingXxl,
  // Color tokens
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
 */
const colorMap: Record<string, string> = {
  // Text colors
  'bpk-text-primary-day': textPrimaryDay,
  'bpk-text-secondary-day': textSecondaryDay,
  'bpk-text-disabled-day': textDisabledDay,
  'bpk-text-on-dark-day': textOnDarkDay,
  'bpk-text-link-day': textLinkDay,
  'bpk-text-error-day': textErrorDay,
  'bpk-text-success-day': textSuccessDay,
  'bpk-text-hero-day': textHeroDay,

  // Background colors
  'bpk-canvas-day': canvasDay,
  'bpk-canvas-contrast-day': canvasContrastDay,
  'bpk-surface-highlight-day': surfaceHighlightDay,
  'bpk-surface-default-day': surfaceDefaultDay,
  'bpk-surface-elevated-day': surfaceElevatedDay,

  // Brand colors
  'bpk-core-primary-day': corePrimaryDay,
  'bpk-core-accent-day': coreAccentDay,

  // Border colors
  'bpk-line-day': lineDay,
  'bpk-line-on-dark-day': lineOnDarkDay,
};

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
 * Creates Chakra UI theme with Backpack token mappings
 */
export function createBpkTheme() {
  // Convert spacing map to Chakra UI format
  const space: Record<string, string> = {};
  Object.entries(spacingMap).forEach(([token, value]) => {
    // Use token name as key (without bpk-spacing- prefix for cleaner API)
    const key = token.replace('bpk-spacing-', '');
    space[token] = value; // Keep full token name for internal use
    space[key] = value;   // Also provide short name for convenience
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
  return {
    space,
    colors: {
      bpk: colors,
    },
    breakpoints,
  };
}

