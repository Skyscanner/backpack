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

import { extendTheme } from '@chakra-ui/react';

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
 * Chakra UI theme extended with Backpack tokens and breakpoints
 * This ensures BpkBox and other layout components use Backpack's design system
 */
export const backpackTheme = extendTheme({
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
  // Map Backpack spacing tokens to Chakra UI spacing scale
  // Based on Backpack spacing tokens: https://www.skyscanner.design/latest/foundations/spacing/overview-jCiTHnBD
  // Backpack spacing: none(0px), sm(4px), md(8px), base(16px), lg(24px), xl(32px), xxl(40px), xxxl(64px), xxxxl(96px)
  space: {
    // Chakra UI uses a 4px base scale, so we map Backpack tokens accordingly
    // 0 = 0px (none)
    0: '0',
    // 1 = 4px (sm)
    1: '0.25rem', // bpk-spacing-sm
    // 2 = 8px (md)
    2: '0.5rem', // bpk-spacing-md
    // 3 = 12px (not in Backpack, but Chakra default)
    3: '0.75rem',
    // 4 = 16px (base)
    4: '1rem', // bpk-spacing-base
    // 5 = 20px (not in Backpack, but Chakra default)
    5: '1.25rem',
    // 6 = 24px (lg)
    6: '1.5rem', // bpk-spacing-lg
    // 8 = 32px (xl)
    8: '2rem', // bpk-spacing-xl
    // 10 = 40px (xxl)
    10: '2.5rem', // bpk-spacing-xxl
    // 16 = 64px (xxxl)
    16: '4rem', // bpk-spacing-xxxl
    // 24 = 96px (xxxxl)
    24: '6rem', // bpk-spacing-xxxxl
  },
});

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

