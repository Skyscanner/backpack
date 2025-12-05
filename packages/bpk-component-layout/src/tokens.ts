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
 * Backpack Border Width Tokens
 * Use these constants to ensure type safety when passing border width props
 */
export const BpkBorderWidth = {
  SM: 'bpk-border-size-sm',
  LG: 'bpk-border-size-lg',
  XL: 'bpk-border-size-xl',
} as const;

export type BpkBorderWidthToken = typeof BpkBorderWidth[keyof typeof BpkBorderWidth];

/**
 * Backpack Border Radius Tokens
 * Use these constants to ensure type safety when passing border radius props
 */
export const BpkBorderRadius = {
  None: 'bpk-border-radius-none',
  XS: 'bpk-border-radius-xs',
  SM: 'bpk-border-radius-sm',
  MD: 'bpk-border-radius-md',
  LG: 'bpk-border-radius-lg',
  XL: 'bpk-border-radius-xl',
  Full: 'bpk-border-radius-full',
} as const;

export type BpkBorderRadiusToken = typeof BpkBorderRadius[keyof typeof BpkBorderRadius];

/**
 * Backpack Color Tokens
 * Use these constants to ensure type safety when passing color props
 */
export const BpkColor = {
  // Text colors
  TextPrimary: 'bpk-text-primary-day',
  TextSecondary: 'bpk-text-secondary-day',
  TextDisabled: 'bpk-text-disabled-day',
  TextOnDark: 'bpk-text-on-dark-day',
  TextLink: 'bpk-text-link-day',
  TextError: 'bpk-text-error-day',
  TextSuccess: 'bpk-text-success-day',
  TextHero: 'bpk-text-hero-day',

  // Background colors
  Canvas: 'bpk-canvas-day',
  CanvasContrast: 'bpk-canvas-contrast-day',
  SurfaceHighlight: 'bpk-surface-highlight-day',
  SurfaceDefault: 'bpk-surface-default-day',
  SurfaceElevated: 'bpk-surface-elevated-day',

  // Brand colors
  CorePrimary: 'bpk-core-primary-day',
  CoreAccent: 'bpk-core-accent-day',

  // Border colors
  Line: 'bpk-line-day',
  LineOnDark: 'bpk-line-on-dark-day',
} as const;

export type BpkColorToken = typeof BpkColor[keyof typeof BpkColor];

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
 * Backpack Shadow Tokens
 * Use these constants to ensure type safety when applying shadows
 */
export const BpkShadow = {
  SM: 'bpk-shadow-sm',
  LG: 'bpk-shadow-lg',
  XL: 'bpk-shadow-xl',
} as const;

export type BpkShadowToken = typeof BpkShadow[keyof typeof BpkShadow];

/**
 * Helper type for values that can be Backpack tokens or percentages
 * but NOT px/rem values
 */
export type BpkSpacingValue = BpkSpacingToken | `${number}%`;
export type BpkColorValue = BpkColorToken | 'transparent' | 'currentColor';
export type BpkBreakpointValue = BpkBreakpointToken;
export type BpkBorderWidthValue = BpkBorderWidthToken;
export type BpkShadowValue = BpkShadowToken;
export type BpkBorderRadiusValue = BpkBorderRadiusToken;

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
 * Validates if a color value is valid (token or special values)
 *
 * @param {string} value - The color value to validate
 * @returns {boolean} True if the value is a valid Backpack color token or special value
 */
export function isValidColorValue(value: string): boolean {
  return Object.values(BpkColor).includes(value as BpkColorToken) ||
         value === 'transparent' ||
         value === 'currentColor';
}

/**
 * Validates if a border width value is valid
 *
 * @param {string} value - The border width value to validate
 * @returns {boolean} True if the value is a valid Backpack border width token
 */
export function isValidBorderWidthValue(value: string): boolean {
  return Object.values(BpkBorderWidth).includes(value as BpkBorderWidthToken);
}

/**
 * Validates if a shadow value is valid
 *
 * @param {string} value - The shadow value to validate
 * @returns {boolean} True if the value is a valid Backpack shadow token
 */
export function isValidShadowValue(value: string): boolean {
  return Object.values(BpkShadow).includes(value as BpkShadowToken);
}

/**
 * Validates if a border radius value is valid
 *
 * @param {string} value - The border radius value to validate
 * @returns {boolean} True if the value is a valid Backpack border radius token
 */
export function isValidBorderRadiusValue(value: string): boolean {
  return Object.values(BpkBorderRadius).includes(value as BpkBorderRadiusToken);
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
