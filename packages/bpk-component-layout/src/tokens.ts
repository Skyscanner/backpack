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
  Sm: 'bpk-spacing-sm',
  Base: 'bpk-spacing-base',
  Md: 'bpk-spacing-md',
  Lg: 'bpk-spacing-lg',
  Xl: 'bpk-spacing-xl',
  Xxl: 'bpk-spacing-xxl',
} as const;

export type BpkSpacingToken = typeof BpkSpacing[keyof typeof BpkSpacing];

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
 * Helper type for values that can be Backpack tokens or percentages
 * but NOT px/rem values
 */
export type BpkSpacingValue = BpkSpacingToken | `${number}%`;
export type BpkColorValue = BpkColorToken | 'transparent' | 'currentColor';
export type BpkBreakpointValue = BpkBreakpointToken;

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
