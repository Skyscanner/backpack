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

import { isValidSpacingValue, isValidColorValue, isPercentage } from './tokens';

/**
 * Converts Backpack spacing token to Chakra UI compatible value
 * In production, this would look up the actual value from the theme
 */
export function convertBpkSpacingToChakra(value: string): string {
  if (isPercentage(value)) {
    return value; // Percentages pass through
  }

  // For tokens, we use the token name directly in Chakra theme
  // The theme mapping will handle the conversion
  return value;
}

/**
 * Converts Backpack color token to Chakra UI compatible value
 */
export function convertBpkColorToChakra(value: string): string {
  if (value === 'transparent' || value === 'currentColor') {
    return value;
  }

  // For tokens, we use the token name in the bpk color namespace
  return `bpk.${value}`;
}

/**
 * Validates and converts spacing props for Chakra UI
 */
export function processSpacingProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  const spacingKeys = [
    'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'gap', 'spacing',
    'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  ];

  const processed: Record<string, any> = { ...props };

  spacingKeys.forEach((key) => {
    if (key in processed && processed[key] !== undefined) {
      const value = String(processed[key]);

      // Validate the value
      if (!isValidSpacingValue(value) && !['auto', 'full', 'fit-content'].includes(value)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `Invalid spacing value "${value}" for prop "${key}". ` +
            `Only Backpack spacing tokens or percentages are allowed. ` +
            `Found: ${value}`
          );
        }
        // In production, we might want to throw or use a fallback
        return;
      }

      processed[key] = convertBpkSpacingToChakra(value);
    }
  });

  return processed;
}

/**
 * Validates and converts color props for Chakra UI
 */
export function processColorProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  const colorKeys = ['color', 'bg', 'backgroundColor', 'borderColor'];

  const processed: Record<string, any> = { ...props };

  colorKeys.forEach((key) => {
    if (key in processed && processed[key] !== undefined) {
      const value = String(processed[key]);

      // Validate the value
      if (!isValidColorValue(value)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `Invalid color value "${value}" for prop "${key}". ` +
            `Only Backpack color tokens, "transparent", or "currentColor" are allowed. ` +
            `Found: ${value}`
          );
        }
        return;
      }

      processed[key] = convertBpkColorToChakra(value);
    }
  });

  return processed;
}

/**
 * Processes all props to convert Backpack tokens to Chakra UI format
 * Also explicitly removes className to prevent style overrides
 */
export function processBpkProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  // Explicitly remove className to prevent style overrides
  const propsWithoutClassName = { ...props };
  const className = propsWithoutClassName.className;
  delete propsWithoutClassName.className;

  if (className !== undefined && process.env.NODE_ENV !== 'production') {
    console.warn(
      'className prop is not allowed on Backpack layout components. ' +
      'It has been removed to maintain design system consistency.'
    );
  }

  let processed = processSpacingProps(propsWithoutClassName);
  processed = processColorProps(processed);
  return processed;
}

