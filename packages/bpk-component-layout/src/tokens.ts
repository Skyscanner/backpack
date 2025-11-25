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

// Note: In a real implementation, these values would be imported from
// @skyscanner/bpk-foundations-web. For now, we'll define the structure
// and mapping. The actual values should be extracted from the foundations package.

/**
 * Backpack Spacing Tokens
 * These map to bpk-spacing-*() functions from Backpack
 */
export const BPK_SPACING_TOKENS = {
  none: 'bpk-spacing-none',
  sm: 'bpk-spacing-sm',
  base: 'bpk-spacing-base',
  md: 'bpk-spacing-md',
  lg: 'bpk-spacing-lg',
  xl: 'bpk-spacing-xl',
  xxl: 'bpk-spacing-xxl',
} as const;

export type BpkSpacingToken = typeof BPK_SPACING_TOKENS[keyof typeof BPK_SPACING_TOKENS];

/**
 * Backpack Color Tokens
 * These map to Backpack color tokens from the foundations package
 */
export const BPK_COLOR_TOKENS = {
  // Text colors
  'text-primary': 'bpk-text-primary-day',
  'text-secondary': 'bpk-text-secondary-day',
  'text-disabled': 'bpk-text-disabled-day',
  'text-on-dark': 'bpk-text-on-dark-day',
  'text-link': 'bpk-text-link-day',
  'text-error': 'bpk-text-error-day',
  'text-success': 'bpk-text-success-day',
  'text-hero': 'bpk-text-hero-day',
  
  // Background colors
  'canvas': 'bpk-canvas-day',
  'canvas-contrast': 'bpk-canvas-contrast-day',
  'surface-highlight': 'bpk-surface-highlight-day',
  'surface-default': 'bpk-surface-default-day',
  'surface-elevated': 'bpk-surface-elevated-day',
  
  // Brand colors
  'core-primary': 'bpk-core-primary-day',
  'core-accent': 'bpk-core-accent-day',
  
  // Border colors
  'line': 'bpk-line-day',
  'line-on-dark': 'bpk-line-on-dark-day',
} as const;

export type BpkColorToken = typeof BPK_COLOR_TOKENS[keyof typeof BPK_COLOR_TOKENS];

/**
 * Backpack Breakpoint Tokens
 * These map to Backpack breakpoint queries
 */
export const BPK_BREAKPOINT_TOKENS = {
  'small-mobile': 'bpk-breakpoint-small-mobile',
  'mobile': 'bpk-breakpoint-mobile',
  'small-tablet': 'bpk-breakpoint-small-tablet',
  'tablet': 'bpk-breakpoint-tablet',
  'desktop': 'bpk-breakpoint-above-tablet',
  'large-desktop': 'bpk-breakpoint-above-desktop',
} as const;

export type BpkBreakpointToken = typeof BPK_BREAKPOINT_TOKENS[keyof typeof BPK_BREAKPOINT_TOKENS];

/**
 * Helper type for values that can be Backpack tokens or percentages
 * but NOT px/rem values
 */
export type BpkSpacingValue = BpkSpacingToken | `${number}%`;
export type BpkColorValue = BpkColorToken | 'transparent' | 'currentColor';
export type BpkBreakpointValue = BpkBreakpointToken;

/**
 * Validates if a value is a percentage string
 */
export function isPercentage(value: string): boolean {
  return /^\d+(\.\d+)?%$/.test(value);
}

/**
 * Validates if a spacing value is valid (token or percentage)
 */
export function isValidSpacingValue(value: string): boolean {
  return Object.values(BPK_SPACING_TOKENS).includes(value as BpkSpacingToken) || isPercentage(value);
}

/**
 * Validates if a color value is valid (token or special values)
 */
export function isValidColorValue(value: string): boolean {
  return Object.values(BPK_COLOR_TOKENS).includes(value as BpkColorToken) ||
         value === 'transparent' ||
         value === 'currentColor';
}

