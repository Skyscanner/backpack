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

import { createSystem, defaultConfig } from '@chakra-ui/react';

import { breakpoints as bpkBreakpoints } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

/**
 * Maps Backpack breakpoint queries to pixel values for Chakra UI theme
 * Backpack breakpoints are defined as media queries, we extract the pixel values
 *
 * @param {string} query - The breakpoint query string (e.g., "(max-width: 767px)")
 * @returns {string} The breakpoint value in em units (e.g., "47.9375em")
 */
const extractBreakpointValue = (query: string): string => {
  // Backpack breakpoints are in format like "(max-width: 767px)" or "(min-width: 768px)"
  // We need to extract the pixel value and convert to em for Chakra UI
  const match = query.match(/(\d+)px/);
  if (match) {
    const px = parseInt(match[1], 10);
    // Convert px to em (assuming 16px base font size)
    const em = px / 16;
    return `${em}em`;
  }
  return query;
};

/**
 * Chakra UI system configuration with disabled styles
 * This disables Chakra UI's CSS-in-JS runtime generation while keeping component functionality
 * All styling is handled by CSS Modules instead
 */
const { globalCss: _, ...restConfig } = defaultConfig;

// In Chakra UI v3, breakpoints and space are configured differently
// Since we're using CSS Modules for all styling, we only need to disable layers
export const backpackSystem = createSystem(restConfig, {
  // Disable CSS cascade layers to prevent runtime CSS injection
  disableLayers: true,
  // Note: breakpoints and space are not needed here since we use CSS Modules
  // Chakra UI components will still work, but styling is handled by CSS Modules
});

/**
 * @deprecated Use backpackSystem instead. This is kept for backward compatibility.
 */
export const backpackTheme = backpackSystem;

/**
 * Backpack spacing token names mapped to Chakra UI spacing scale values
 * Based on Backpack spacing tokens: https://www.skyscanner.design/latest/foundations/spacing/overview-jCiTHnBD
 * Use these when you want to use Backpack spacing tokens with BpkBox
 */
export const BPK_SPACING_TOKENS = {
  none: 0, // bpk-spacing-none (0px)
  sm: 1, // bpk-spacing-sm (4px)
  md: 2, // bpk-spacing-md (8px)
  base: 4, // bpk-spacing-base (16px)
  lg: 6, // bpk-spacing-lg (24px)
  xl: 8, // bpk-spacing-xl (32px)
  xxl: 10, // bpk-spacing-xxl (40px)
  xxxl: 16, // bpk-spacing-xxxl (64px)
  xxxxl: 24, // bpk-spacing-xxxxl (96px)
} as const;

/**
 * Backpack breakpoint names mapped to Chakra UI breakpoint names
 * Use these for responsive props in BpkBox
 */
export const BPK_BREAKPOINT_TOKENS = {
  smallMobile: 'sm', // Backpack SMALL_MOBILE -> Chakra sm
  mobile: 'md', // Backpack MOBILE -> Chakra md
  smallTablet: 'lg', // Backpack SMALL_TABLET -> Chakra lg
  tablet: 'xl', // Backpack TABLET -> Chakra xl
  desktop: '2xl', // Backpack DESKTOP -> Chakra 2xl
} as const;
