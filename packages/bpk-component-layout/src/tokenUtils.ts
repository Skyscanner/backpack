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

import { getBackpackColorValue } from './colorMapping';
import { getColorValue, getSpacingValue } from './theme';
import { isValidSpacingValue, isValidColorValue, isPercentage } from './tokens';

/**
 * Converts Backpack spacing token to Chakra UI compatible value
 * Returns the actual spacing value from the theme, not a token path
 *
 * @param {string} value - Backpack spacing token (e.g., 'bpk-spacing-base') or percentage
 * @returns {string} The actual spacing value in rem or the percentage string
 */
export function convertBpkSpacingToChakra(value: string): string {
  if (isPercentage(value)) {
    return value; // Percentages pass through
  }

  // Look up the actual spacing value from the theme
  const spacingValue = getSpacingValue(value);
  if (spacingValue !== undefined) {
    return spacingValue;
  }

  // Fallback: if token not found, return the value as-is (will cause a warning)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      `Spacing token "${value}" not found in theme. Returning as-is.`
    );
  }
  return value;
}

/**
 * Converts Backpack color token to actual color value
 * Returns the actual color value (RGB/hex) that Chakra UI can use directly
 *
 * Chakra UI 3.0 does not properly resolve nested color token paths like 'bpk.bpk-line-day'.
 * Therefore, we return the actual color value directly instead of a token path.
 *
 * The color values come from Backpack foundations and are in RGB format (e.g., 'rgb(193, 199, 207)').
 * Chakra UI accepts RGB, RGBA, HEX, and other standard CSS color formats.
 *
 * @param {string} value - Backpack color token (e.g., 'bpk-text-primary-day') or special value
 * @returns {string} The actual color value (e.g., 'rgb(22, 22, 22)') or special value
 */
export function convertBpkColorToChakra(value: string): string {
  if (value === 'transparent' || value === 'currentColor') {
    return value;
  }

  // Get the actual color value from Backpack color mapping
  const colorValue = getBackpackColorValue(value);
  if (colorValue) {
    // Return the actual color value directly
    // Chakra UI 3.0 accepts RGB, RGBA, HEX, and other standard CSS color formats
    return colorValue;
  }

  // Fallback: check legacy getColorValue for backward compatibility
  const legacyValue = getColorValue(value);
  if (legacyValue) {
    return legacyValue;
  }

  // If token not found, return the value as-is (will cause a warning)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      `Color token "${value}" not found in Backpack color mapping. Returning as-is.`
    );
  }
  return value;
}

/**
 * Recursively processes a value that might be a responsive object/array
 *
 * @param {any} value - The value to process (string, array, or object)
 * @param {(v: string) => string} converter - Function to convert single values
 * @param {(v: string) => boolean} validator - Function to validate single values
 * @param {string} propName - Name of the prop being processed (for error messages)
 * @returns {any} The processed value
 */
function processResponsiveValue(
  value: any,
  converter: (v: string) => string,
  validator: (v: string) => boolean,
  propName: string
): any {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((v) => processResponsiveValue(v, converter, validator, propName));
  }

  if (typeof value === 'object') {
    const result: Record<string, any> = {};
    Object.keys(value).forEach((key) => {
      result[key] = processResponsiveValue(value[key], converter, validator, propName);
    });
    return result;
  }

  const strValue = String(value);
  if (!validator(strValue)) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid value "${strValue}" for prop "${propName}". ` +
        `Only Backpack tokens are allowed.`
      );
    }
    return undefined; // Invalid values are removed
  }

  return converter(strValue);
}

/**
 * Validates and converts spacing props for Chakra UI
 * Handles all spacing-related properties including padding, margin, gap, size, border radius, position, and typography
 *
 * @param {T} props - Component props object
 * @returns {Record<string, any>} Processed props with spacing tokens converted to actual values
 */
export function processSpacingProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  const spacingKeys = [
    // Padding props
    'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    // Margin props
    'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    // Gap and spacing
    'gap', 'spacing',
    // Size props
    'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
    // Border radius props
    'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius',
    'borderBottomLeftRadius', 'borderBottomRightRadius',
    // Position props
    'top', 'right', 'bottom', 'left',
    // Typography props that can use spacing tokens
    'fontSize', 'lineHeight',
  ];

  const processed: Record<string, any> = { ...props };

  spacingKeys.forEach((key) => {
    if (key in processed && processed[key] !== undefined) {
      const isSizeProp = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'].includes(key);
      const validator = (v: string) =>
        isValidSpacingValue(v) ||
        (isSizeProp && ['auto', 'full', 'fit-content'].includes(v));

      const processedValue = processResponsiveValue(
        processed[key],
        convertBpkSpacingToChakra,
        validator,
        key
      );

      if (processedValue !== undefined) {
        processed[key] = processedValue;
      } else {
        delete processed[key];
      }
    }
  });

  return processed;
}

/**
 * Validates and converts color props for Chakra UI
 * Handles all color-related properties including text color, background, and border colors
 *
 * @param {T} props - Component props object
 * @returns {Record<string, any>} Processed props with color tokens converted to actual values
 */
export function processColorProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  const colorKeys = [
    'color',
    'bg', 'backgroundColor',
    'borderColor', 'borderTopColor', 'borderRightColor',
    'borderBottomColor', 'borderLeftColor',
  ];

  const processed: Record<string, any> = { ...props };

  colorKeys.forEach((key) => {
    if (key in processed && processed[key] !== undefined) {
      const processedValue = processResponsiveValue(
        processed[key],
        convertBpkColorToChakra,
        isValidColorValue,
        key
      );

      if (processedValue !== undefined) {
        processed[key] = processedValue;
      } else {
        delete processed[key];
      }
    }
  });

  return processed;
}

/**
 * Processes all props to convert Backpack tokens to Chakra UI format
 * Also explicitly removes className to prevent style overrides
 *
 * Processing order:
 * 1. Remove className
 * 2. Process spacing props (includes border radius, position, typography)
 * 3. Process color props (includes all color-related properties)
 *
 * @param {T} props - Component props object
 * @returns {Record<string, any>} Processed props with tokens converted and className removed
 */
export function processBpkProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  // Explicitly remove className to prevent style overrides
  const { className, ...propsWithoutClassName } = props;

  if (className !== undefined && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      'className prop is not allowed on Backpack layout components. ' +
      'It has been removed to maintain design system consistency.'
    );
  }

  // Process spacing props (includes border radius, position, typography)
  let processed = processSpacingProps(propsWithoutClassName);
  // Process color props
  processed = processColorProps(processed);
  return processed;
}
