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

/**
 * Backpack spacing token names mapped to Chakra UI spacing scale values
 * Based on Backpack spacing tokens: https://www.skyscanner.design/latest/foundations/spacing/overview-jCiTHnBD
 * Chakra UI uses a 4px base scale, so we map Backpack tokens accordingly
 */
const BPK_SPACING_MAP = {
  none: 0, // 0px (bpk-spacing-none)
  sm: 1, // 4px (bpk-spacing-sm)
  md: 2, // 8px (bpk-spacing-md)
  base: 4, // 16px (bpk-spacing-base)
  lg: 6, // 24px (bpk-spacing-lg)
  xl: 8, // 32px (bpk-spacing-xl)
  xxl: 10, // 40px (bpk-spacing-xxl)
  xxxl: 16, // 64px (bpk-spacing-xxxl)
  xxxxl: 24, // 96px (bpk-spacing-xxxxl)
} as const;

export type BpkSpacingToken = keyof typeof BPK_SPACING_MAP;

/**
 * Extended Backpack spacing tokens that can be defined in layout components
 * This allows custom spacing values beyond the standard Backpack tokens
 * Maps pixel values to Chakra UI spacing scale (4px base)
 */
const EXTENDED_BPK_SPACING_MAP: Record<number, number> = {
  // Standard Backpack tokens (already in BPK_SPACING_MAP)
  // Extended tokens for fine-grained spacing
  // Format: px value -> Chakra UI spacing scale value (px / 4)
};

/**
 * Converts a numeric pixel value directly to Chakra UI spacing scale value
 * Chakra UI uses a 4px base scale, so: Chakra value = px / 4
 * This allows fine-grained spacing values like 2px (0.5), 6px (1.5), etc.
 *
 * @param {number} px - The pixel value to convert
 * @returns {number} The Chakra UI spacing scale value
 */
const convertPxToChakraSpacing = (px: number): number => {
  // Check if there's a custom mapping in extended tokens
  if (px in EXTENDED_BPK_SPACING_MAP) {
    return EXTENDED_BPK_SPACING_MAP[px];
  }

  // Direct conversion: Chakra UI spacing scale = px / 4
  // This allows fine-grained values like 2px (0.5), 6px (1.5), 10px (2.5), etc.
  return px / 4;
};

/**
 * Backpack breakpoint names mapped to Chakra UI breakpoint names
 */
const BPK_BREAKPOINT_MAP = {
  smallMobile: 'sm',
  mobile: 'md',
  smallTablet: 'lg',
  tablet: 'xl',
  desktop: '2xl',
} as const;

export type BpkBreakpointToken = keyof typeof BPK_BREAKPOINT_MAP;

/**
 * Chakra UI breakpoint names mapped to Backpack breakpoint names
 * Used to convert Chakra UI breakpoint names to Backpack breakpoint names
 */
const CHAKRA_TO_BPK_BREAKPOINT_MAP: Record<string, BpkBreakpointToken> = {
  sm: 'smallMobile',
  md: 'mobile',
  lg: 'smallTablet',
  xl: 'tablet',
  '2xl': 'desktop',
};

/**
 * Transforms a Backpack spacing token (string) or numeric pixel value to Chakra UI spacing value (number)
 * - If input is a number (px), converts directly to Chakra UI spacing scale (px / 4)
 *   This allows fine-grained spacing like 2px (0.5), 6px (1.5), 10px (2.5), etc.
 * - If input is a Backpack token string (e.g., "sm"), converts to Chakra UI value via BPK_SPACING_MAP
 * - Otherwise returns as-is (could be a custom CSS value like "1rem")
 *
 * @param {string | number | undefined | null} value - The spacing token string or pixel number to transform
 * @returns {number | string | undefined | null} The Chakra UI spacing value or the original value
 */
export const transformSpacingToken = (
  value: string | number | undefined | null,
): number | string | undefined | null => {
  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value === 'number') {
    // Convert pixel value directly to Chakra UI spacing scale (4px base)
    // Examples: 0px → 0, 2px → 0.5, 4px → 1, 6px → 1.5, 8px → 2, etc.
    return convertPxToChakraSpacing(value);
  }

  if (typeof value === 'string' && value in BPK_SPACING_MAP) {
    // Backpack token string → Chakra UI value
    return BPK_SPACING_MAP[value as BpkSpacingToken];
  }

  // Return as-is if it's not a Backpack token (could be a custom CSS value like "1rem")
  return value;
};

/**
 * Transforms a Backpack breakpoint token (string) or Chakra UI breakpoint name to Chakra UI breakpoint name
 * - If input is a Backpack breakpoint token, converts directly to Chakra UI breakpoint name
 * - If input is a Chakra UI breakpoint name, converts to Backpack breakpoint token first, then to Chakra UI breakpoint name
 * - Otherwise returns as-is
 *
 * @param {string | undefined | null} value - The breakpoint token string to transform
 * @returns {string | undefined | null} The Chakra UI breakpoint name or the original value
 */
export const transformBreakpointToken = (
  value: string | undefined | null,
): string | undefined | null => {
  if (value === undefined || value === null) {
    return value;
  }

  // First check if it's a Backpack breakpoint token
  if (typeof value === 'string' && value in BPK_BREAKPOINT_MAP) {
    return BPK_BREAKPOINT_MAP[value as BpkBreakpointToken];
  }

  // If not a Backpack token, check if it's a Chakra UI breakpoint name
  if (typeof value === 'string' && value in CHAKRA_TO_BPK_BREAKPOINT_MAP) {
    // Convert Chakra UI breakpoint to Backpack breakpoint, then to Chakra UI breakpoint
    const bpkBreakpoint = CHAKRA_TO_BPK_BREAKPOINT_MAP[value];
    return BPK_BREAKPOINT_MAP[bpkBreakpoint];
  }

  // Return as-is if it's not a recognized breakpoint token
  return value;
};

/**
 * Transforms responsive prop values (object with breakpoint keys)
 * Converts Backpack breakpoint tokens and Chakra UI breakpoint names to Chakra UI breakpoint names
 * Converts numeric pixel values and Backpack spacing tokens to Chakra UI spacing values
 *
 * @param {T | Record<string, T> | undefined | null} value - The value to transform, can be a single value or an object with breakpoint keys.
 * @returns {T | Record<string, T> | undefined | null} The transformed value with Backpack tokens converted to Chakra equivalents.
 */
export const transformResponsiveProp = <T extends string | number>(
  value: T | Record<string, T> | undefined | null,
): T | Record<string, T> | undefined | null => {
  if (value === undefined || value === null || typeof value !== 'object') {
    // For non-object values, transform spacing (supports both string tokens and numeric pixel values)
    return transformSpacingToken(value as string | number | undefined | null) as T;
  }

  // For responsive objects, transform both keys (breakpoints) and values (spacing)
  const transformed: Record<string, T> = {};
  for (const [key, val] of Object.entries(value)) {
    const transformedKey = transformBreakpointToken(key) || key;
    // Transform spacing value (supports both string tokens and numeric pixel values)
    const transformedValue = transformSpacingToken(val as string | number | undefined | null) as T;
    transformed[transformedKey] = transformedValue;
  }
  return transformed;
};

/**
 * Transforms spacing-related props (padding, margin, gap, etc.)
 * Accepts Backpack token strings and converts them to Chakra values
 *
 * @param {Record<string, any>} props - The props object containing spacing-related properties.
 * @returns {Record<string, any>} The transformed props object with Backpack tokens converted to Chakra values.
 */
export const transformSpacingProps = (props: Record<string, any>) => {
  const spacingProps = [
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingX',
    'paddingY',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginX',
    'marginY',
    'gap',
    'rowGap',
    'columnGap',
    'gridGap',
    'gridColumnGap',
    'gridRowGap',
    'spacing',
    'spacingX',
    'spacingY',
  ];

  const transformed = { ...props };

  spacingProps.forEach((prop) => {
    if (prop in transformed) {
      transformed[prop] = transformResponsiveProp(transformed[prop]);
    }
  });

  return transformed;
};

