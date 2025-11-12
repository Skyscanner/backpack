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
 */
const BPK_SPACING_MAP = {
  none: 0,
  sm: 2, // 0.5rem / 8px
  base: 4, // 1rem / 16px
  md: 5, // 1.25rem / 20px
  lg: 6, // 1.5rem / 24px
  xl: 8, // 2rem / 32px
} as const;

export type BpkSpacingToken = keyof typeof BPK_SPACING_MAP;

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
 * Transforms a Backpack spacing token (string) to Chakra UI spacing value (number)
 * If the value is already a number or not a Backpack token, returns it as-is
 *
 * @param {string | number | undefined | null} value - The spacing token string or number to transform
 * @returns {number | string | undefined | null} The Chakra UI spacing value or the original value
 */
export const transformSpacingToken = (
  value: string | number | undefined | null,
): number | string | undefined | null => {
  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string' && value in BPK_SPACING_MAP) {
    return BPK_SPACING_MAP[value as BpkSpacingToken];
  }

  // Return as-is if it's not a Backpack token (could be a Chakra token or custom value)
  return value;
};

/**
 * Transforms a Backpack breakpoint token (string) to Chakra UI breakpoint name
 * If the value is already a Chakra breakpoint or not a Backpack token, returns it as-is
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

  if (typeof value === 'string' && value in BPK_BREAKPOINT_MAP) {
    return BPK_BREAKPOINT_MAP[value as BpkBreakpointToken];
  }

  // Return as-is if it's not a Backpack token (could be a Chakra breakpoint)
  return value;
};

/**
 * Transforms responsive prop values (object with breakpoint keys)
 * Converts Backpack breakpoint tokens to Chakra UI breakpoint names
 *
 * @param {T | Record<string, T> | undefined | null} value - The value to transform, can be a single value or an object with breakpoint keys.
 * @returns {T | Record<string, T> | undefined | null} The transformed value with Backpack tokens converted to Chakra equivalents.
 */
export const transformResponsiveProp = <T extends string | number>(
  value: T | Record<string, T> | undefined | null,
): T | Record<string, T> | undefined | null => {
  if (value === undefined || value === null || typeof value !== 'object') {
    // For non-object values, transform spacing if it's a string
    if (typeof value === 'string') {
      return transformSpacingToken(value) as T;
    }
    return value;
  }

  // For responsive objects, transform both keys (breakpoints) and values (spacing)
  const transformed: Record<string, T> = {};
  for (const [key, val] of Object.entries(value)) {
    const transformedKey = transformBreakpointToken(key) || key;
    const transformedValue =
      typeof val === 'string' ? (transformSpacingToken(val) as T) : val;
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
    'p',
    'paddingTop',
    'pt',
    'paddingRight',
    'pr',
    'paddingBottom',
    'pb',
    'paddingLeft',
    'pl',
    'paddingX',
    'px',
    'paddingY',
    'py',
    'margin',
    'm',
    'marginTop',
    'mt',
    'marginRight',
    'mr',
    'marginBottom',
    'mb',
    'marginLeft',
    'ml',
    'marginX',
    'mx',
    'marginY',
    'my',
    'gap',
    'rowGap',
    'columnGap',
  ];

  const transformed = { ...props };

  spacingProps.forEach((prop) => {
    if (prop in transformed) {
      transformed[prop] = transformResponsiveProp(transformed[prop]);
    }
  });

  return transformed;
};

