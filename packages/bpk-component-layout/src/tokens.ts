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
 * Backpack Design Tokens for Layout Components
 *
 * This file provides token mappings from Backpack design tokens to Chakra UI theme.
 * All tokens are sourced from @skyscanner/bpk-foundations-web
 */

/**
 * Backpack Spacing Tokens
 * Use these constants to ensure type safety when passing spacing props
 */
export const BpkSpacing = {
  None: 'bpk-spacing-none',
  XS: 'bpk-spacing-xs',
  SM: 'bpk-spacing-sm',
  Base: 'bpk-spacing-base',
  MD: 'bpk-spacing-md',
  LG: 'bpk-spacing-lg',
  XL: 'bpk-spacing-xl',
  XXL: 'bpk-spacing-xxl',
} as const;

export type BpkSpacingToken = typeof BpkSpacing[keyof typeof BpkSpacing];

/**
 * Backpack Breakpoint Tokens
 * Use these constants to ensure type safety when defining responsive overrides
 * These map to the simplified keys defined in the Chakra theme
 */
export const BpkBreakpoint = {
  SmallMobile: 'small-mobile',
  Mobile: 'mobile',
  SmallTablet: 'small-tablet',
  Tablet: 'tablet',
  Desktop: 'desktop',
} as const;

export type BpkBreakpointToken = typeof BpkBreakpoint[keyof typeof BpkBreakpoint];

export type ChakraBreakpointKey = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const BpkBreakpointToChakraKey: Record<BpkBreakpointToken, ChakraBreakpointKey> = {
  // Keep this mapping in sync with the breakpoints configured in `theme.ts`.
  // `base` is reserved for "default value" and is not a breakpoint token.
  'small-mobile': 'sm',
  mobile: 'md',
  'small-tablet': 'lg',
  tablet: 'xl',
  desktop: '2xl',
};

/**
 * Helper type for values that can be Backpack tokens or percentages
 * but NOT px/rem values
 */
export type BpkSpacingValue = BpkSpacingToken | `${number}%`;
export type BpkBreakpointValue = BpkBreakpointToken;

/**
 * Helper type for size props that can use rem, percentages or semantic values.
 * This is intentionally separate from BpkSpacingValue to avoid encouraging
 * spacing tokens for explicit sizes.
 */
export type BpkSizeValue =
  | `${number}rem`
  | `${number}%`
  | 'auto'
  | 'full'
  | 'fit-content';

/**
 * Helper type for position props that can use rem or percentages.
 * We intentionally do not allow semantic values like 'auto' here.
 */
export type BpkPositionValue =
  | `${number}rem`
  | `${number}%`;

/**
 * Helper type for flex-basis prop that can use rem, percentages or semantic values.
 * Excludes 'px' values to enforce design system constraints.
 */
export type BpkBasisValue =
  | `${number}rem`
  | `${number}%`
  | 'auto'
  | 'content'
  | 'fit-content'
  | 'max-content'
  | 'min-content'
  | 'initial'
  | 'inherit';

/**
 * Helper type for responsive values based on Backpack breakpoints.
 *
 * We intentionally only support:
 * - a single scalar value (non-responsive)
 * - an object keyed by Backpack breakpoint tokens (and optional base)
 *
 * We do NOT support array-based responsive values in the public API.
 */
export type BpkResponsiveValue<T> =
  | T
  | Partial<Record<BpkBreakpointToken | 'base', T>>;

/**
 * Validates if a value is a percentage string
 *
 * @param {string} value - The value to validate
 * @returns {boolean} True if the value is a valid percentage string
 */
export function isPercentage(value: string): boolean {
  return /^\d+(\.\d+)?%$/.test(value);
}

/**
 * Validates if a spacing value is valid (token or percentage)
 *
 * @param {string} value - The spacing value to validate
 * @returns {boolean} True if the value is a valid Backpack spacing token or percentage
 */
export function isValidSpacingValue(value: string): boolean {
  return Object.values(BpkSpacing).includes(value as BpkSpacingToken) || isPercentage(value);
}

/**
 * Validates if a size value is valid
 *
 * @param {string} value - The size value to validate
 * @returns {boolean} True if the value is a valid rem/percentage/semantic size
 */
export function isValidSizeValue(value: string): boolean {
  return (
    /^-?\d+(\.\d+)?rem$/.test(value) || // rem values
    isPercentage(value) || // percentage values
    value === 'auto' ||
    value === 'full' ||
    value === 'fit-content'
  );
}

/**
 * Validates if a position value is valid
 *
 * @param {string} value - The position value to validate
 * @returns {boolean} True if the value is a valid rem or percentage
 */
export function isValidPositionValue(value: string): boolean {
  return (
    /^-?\d+(\.\d+)?rem$/.test(value) || // rem values
    isPercentage(value) // percentage values
  );
}

/**
 * Backpack Text Style Tokens for Layout Components
 *
 * These mirror the semantic text styles available in BpkText, but are defined
 * independently here to maintain a clear boundary between layout and text components.
 * The values correspond to named textStyles registered in the Chakra theme.
 */
export const BpkTextStyle = {
  Xs: 'bpk-text-xs',
  Sm: 'bpk-text-sm',
  Base: 'bpk-text-base',
  Lg: 'bpk-text-lg',
  Xl: 'bpk-text-xl',
  Xxl: 'bpk-text-xxl',
  Xxxl: 'bpk-text-xxxl',
  Xxxxl: 'bpk-text-xxxxl',
  Xxxxxl: 'bpk-text-xxxxxl',
  Caption: 'bpk-text-caption',
  Footnote: 'bpk-text-footnote',
  Label1: 'bpk-text-label-1',
  Label2: 'bpk-text-label-2',
  Label3: 'bpk-text-label-3',
  BodyDefault: 'bpk-text-body-default',
  BodyLongform: 'bpk-text-body-longform',
  Subheading: 'bpk-text-subheading',
  Heading1: 'bpk-text-heading-1',
  Heading2: 'bpk-text-heading-2',
  Heading3: 'bpk-text-heading-3',
  Heading4: 'bpk-text-heading-4',
  Heading5: 'bpk-text-heading-5',
  Hero1: 'bpk-text-hero-1',
  Hero2: 'bpk-text-hero-2',
  Hero3: 'bpk-text-hero-3',
  Hero4: 'bpk-text-hero-4',
  Hero5: 'bpk-text-hero-5',
  Hero6: 'bpk-text-hero-6',
  Editorial1: 'bpk-text-editorial-1',
  Editorial2: 'bpk-text-editorial-2',
  Editorial3: 'bpk-text-editorial-3',
} as const;

export type BpkTextStyleToken = typeof BpkTextStyle[keyof typeof BpkTextStyle];

