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
  LargeDesktop: 'large-desktop',
} as const;

export type BpkBreakpointToken = typeof BpkBreakpoint[keyof typeof BpkBreakpoint];

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
