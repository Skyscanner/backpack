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

// @ts-expect-error - createSystem, defaultConfig, and defaultSystem are exported but TypeScript types may not be fully updated
import { defaultSystem, createSystem, defaultConfig } from '@chakra-ui/react';

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
 * Chakra UI system created with Backpack tokens and breakpoints
 * This ensures BpkBox and other layout components use Backpack's design system
 * 
 * In v3, we use createSystem instead of extendTheme, and tokens must be wrapped in { value: ... } objects
 * We try to use createSystem, but fall back to defaultSystem if createSystem is not available (webpack issue)
 */
let backpackSystemValue: typeof defaultSystem;

try {
  // Try to use createSystem if available
  if (typeof createSystem === 'function' && defaultConfig) {
    backpackSystemValue = createSystem(defaultConfig, {
      theme: {
        tokens: {
          // Map Backpack spacing tokens to Chakra UI spacing scale
          // Based on Backpack spacing tokens: https://www.skyscanner.design/latest/foundations/spacing/overview-jCiTHnBD
          // Backpack spacing: none(0px), sm(4px), md(8px), base(16px), lg(24px), xl(32px), xxl(40px), xxxl(64px), xxxxl(96px)
          spacing: {
            '0': { value: '0' }, // bpk-spacing-none (0px)
            '1': { value: '0.25rem' }, // bpk-spacing-sm (4px)
            '2': { value: '0.5rem' }, // bpk-spacing-md (8px)
            '3': { value: '0.75rem' }, // not in Backpack, but Chakra default
            '4': { value: '1rem' }, // bpk-spacing-base (16px)
            '5': { value: '1.25rem' }, // not in Backpack, but Chakra default
            '6': { value: '1.5rem' }, // bpk-spacing-lg (24px)
            '8': { value: '2rem' }, // bpk-spacing-xl (32px)
            '10': { value: '2.5rem' }, // bpk-spacing-xxl (40px)
            '16': { value: '4rem' }, // bpk-spacing-xxxl (64px)
            '24': { value: '6rem' }, // bpk-spacing-xxxxl (96px)
          },
        },
        breakpoints: {
          base: '0em',
          // Map Backpack breakpoints to Chakra UI breakpoint names
          // Use actual Backpack breakpoint queries and extract pixel values
          // sm: small mobile and below (typically 479px)
          sm: extractBreakpointValue(bpkBreakpoints.breakpointQuerySmallMobile),
          // md: mobile and below (typically 767px)
          md: extractBreakpointValue(bpkBreakpoints.breakpointQueryMobile),
          // lg: small tablet and below (typically 991px)
          lg: extractBreakpointValue(bpkBreakpoints.breakpointQuerySmallTablet),
          // xl: tablet and below (typically 1023px)
          xl: extractBreakpointValue(bpkBreakpoints.breakpointQueryTablet),
          // 2xl: desktop and above (typically 1024px+)
          // Use ABOVE_TABLET as it represents desktop breakpoint
          '2xl': extractBreakpointValue(bpkBreakpoints.breakpointQueryAboveTablet),
        },
      },
    });
  } else {
    // Fallback: use defaultSystem and modify it directly
    backpackSystemValue = defaultSystem;
  }
} catch (error) {
  // If createSystem fails (e.g., webpack module resolution issue), use defaultSystem
  console.warn('Failed to create custom system with createSystem, using defaultSystem:', error);
  backpackSystemValue = defaultSystem;
}

/**
 * Chakra UI system with Backpack tokens and breakpoints
 * Exported as backpackSystem for use with ChakraProvider
 */
export const backpackSystem = backpackSystemValue;

/**
 * @deprecated Use backpackSystem instead. This is kept for backward compatibility.
 * In Chakra UI v3, themes are replaced by systems.
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

