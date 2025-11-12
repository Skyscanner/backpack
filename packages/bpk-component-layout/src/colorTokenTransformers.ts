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
 * Backpack color token names mapped to CSS custom property names
 * These CSS variables are defined by Backpack's theming system
 */
const BPK_COLOR_TOKEN_MAP: Record<string, string> = {
  // Text colors
  'text-primary': 'var(--bpk-text-primary-day, rgb(17, 18, 54))',
  'text-secondary': 'var(--bpk-text-secondary-day, rgb(104, 113, 130))',
  'text-disabled': 'var(--bpk-text-disabled-day, rgb(181, 189, 200))',
  'text-on-dark': 'var(--bpk-text-on-dark-day, rgb(255, 255, 255))',
  'text-on-light': 'var(--bpk-text-on-light-day, rgb(17, 18, 54))',
  'text-link': 'var(--bpk-text-link-day, rgb(0, 98, 227))',
  'text-error': 'var(--bpk-text-error-day, rgb(207, 47, 47))',
  'text-success': 'var(--bpk-text-success-day, rgb(0, 138, 0))',
  'text-hero': 'var(--bpk-text-hero-day, rgb(17, 18, 54))',
  'text-primary-inverse': 'var(--bpk-text-primary-inverse-day, rgb(255, 255, 255))',
  'text-disabled-on-dark': 'var(--bpk-text-disabled-on-dark-day, rgb(181, 189, 200))',

  // Background colors
  'canvas': 'var(--bpk-canvas-day, rgb(255, 255, 255))',
  'canvas-contrast': 'var(--bpk-canvas-contrast-day, rgb(247, 249, 252))',
  'surface-default': 'var(--bpk-surface-default-day, rgb(255, 255, 255))',
  'surface-highlight': 'var(--bpk-surface-highlight-day, rgb(239, 243, 248))',
  'surface-elevated': 'var(--bpk-surface-elevated-day, rgb(255, 255, 255))',

  // Brand colors
  'core-primary': 'var(--bpk-core-primary-day, rgb(0, 98, 227))',
  'core-accent': 'var(--bpk-core-accent-day, rgb(0, 215, 117))',
  'core-primary-dark': 'var(--bpk-core-primary-day, rgb(0, 78, 180))',

  // Border colors
  'line': 'var(--bpk-line-day, rgb(230, 234, 240))',
  'line-on-dark': 'var(--bpk-line-on-dark-day, rgba(255, 255, 255, 0.2))',

  // Status colors
  'status-success': 'var(--bpk-status-success-day, rgb(0, 138, 0))',
  'status-success-fill': 'var(--bpk-status-success-fill-day, rgb(230, 255, 230))',
  'status-warning': 'var(--bpk-status-warning-day, rgb(255, 187, 0))',
  'status-warning-fill': 'var(--bpk-status-warning-fill-day, rgb(255, 250, 230))',
  'status-error': 'var(--bpk-status-error-day, rgb(207, 47, 47))',
  'status-error-fill': 'var(--bpk-status-error-fill-day, rgb(255, 230, 230))',
} as const;

export type BpkColorToken = keyof typeof BPK_COLOR_TOKEN_MAP;

/**
 * Exported color tokens constant for programmatic use (similar to TEXT_COLORS in BpkText)
 */
export const BPK_COLOR_TOKENS = {
  // Text colors
  textPrimary: 'text-primary',
  textSecondary: 'text-secondary',
  textDisabled: 'text-disabled',
  textOnDark: 'text-on-dark',
  textOnLight: 'text-on-light',
  textLink: 'text-link',
  textError: 'text-error',
  textSuccess: 'text-success',
  textHero: 'text-hero',
  textPrimaryInverse: 'text-primary-inverse',
  textDisabledOnDark: 'text-disabled-on-dark',

  // Background colors
  canvas: 'canvas',
  canvasContrast: 'canvas-contrast',
  surfaceDefault: 'surface-default',
  surfaceHighlight: 'surface-highlight',
  surfaceElevated: 'surface-elevated',

  // Brand colors
  corePrimary: 'core-primary',
  coreAccent: 'core-accent',
  corePrimaryDark: 'core-primary-dark',

  // Border colors
  line: 'line',
  lineOnDark: 'line-on-dark',

  // Status colors
  statusSuccess: 'status-success',
  statusSuccessFill: 'status-success-fill',
  statusWarning: 'status-warning',
  statusWarningFill: 'status-warning-fill',
  statusError: 'status-error',
  statusErrorFill: 'status-error-fill',
} as const;

/**
 * Validates if a string is a valid Backpack color token
 *
 * @param {string} value - The string to validate
 * @returns {boolean} True if the value is a valid Backpack color token
 */
const isValidBpkColorToken = (value: string): value is BpkColorToken => value in BPK_COLOR_TOKEN_MAP;

/**
 * Transforms a Backpack color token (string) to CSS custom property
 * Only accepts Backpack color tokens - throws a warning for invalid values in development
 *
 * @param {string | undefined | null} value - The color token string to transform
 * @returns {string | undefined | null} The CSS custom property or undefined if invalid
 */
export const transformColorToken = (
  value: string | undefined | null,
): string | undefined | null => {
  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value !== 'string') {
    return value;
  }

  // Check if it's a Backpack color token
  if (isValidBpkColorToken(value)) {
    return BPK_COLOR_TOKEN_MAP[value];
  }

  // In development, warn about invalid color tokens
  if (process.env.NODE_ENV !== 'production') {
    // Check if it looks like a Chakra UI color token (e.g., "blue.500", "gray.100")
    if (value.includes('.') && /^[a-z]+\.[0-9]+$/i.test(value)) {
      console.warn(
        `BpkBox: Chakra UI color token "${value}" is not allowed. Use Backpack color tokens instead (e.g., "core-primary", "canvas-contrast"). See BPK_COLOR_TOKENS for available options.`,
      );
    }
  }

  // Return undefined for invalid tokens to prevent them from being applied
  // This enforces strict Backpack token usage
  return undefined;
};

/**
 * Transforms responsive color prop values (object with breakpoint keys)
 * Converts Backpack color tokens to CSS custom properties
 *
 * @param {T | Record<string, T> | undefined | null} value - The color value or responsive color object to transform.
 * @returns {T | Record<string, T> | undefined | null} The transformed color value or object with Backpack tokens converted to CSS custom properties.
 */
export const transformResponsiveColorProp = <T extends string>(
  value: T | Record<string, T> | undefined | null,
): T | Record<string, T> | undefined | null => {
  if (value === undefined || value === null || typeof value !== 'object') {
    // For non-object values, transform color if it's a string
    if (typeof value === 'string') {
      return transformColorToken(value) as T;
    }
    return value;
  }

  // For responsive objects, transform color values
  const transformed: Record<string, T> = {};
  for (const [key, val] of Object.entries(value)) {
    const transformedValue =
      typeof val === 'string' ? (transformColorToken(val) as T) : val;
    transformed[key] = transformedValue;
  }
  return transformed;
};

/**
 * Transforms color-related props (bg, backgroundColor, color, borderColor, etc.)
 * Accepts Backpack token strings and converts them to CSS custom properties
 *
 * @param {Record<string, any>} props - The props object containing color-related properties.
 * @returns {Record<string, any>} The transformed props object with color tokens converted to CSS custom properties.
 */
export const transformColorProps = (props: Record<string, any>) => {
  const colorProps = [
    'bg',
    'backgroundColor',
    'color',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
  ];

  const transformed = { ...props };

  colorProps.forEach((prop) => {
    if (prop in transformed) {
      transformed[prop] = transformResponsiveColorProp(transformed[prop]);
    }
  });

  return transformed;
};

/**
 * Exported color token map for reference and programmatic use
 */
export { BPK_COLOR_TOKEN_MAP };

