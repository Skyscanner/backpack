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

import { getSpacingValue } from './theme';
import {
  BpkBreakpointToChakraKey,
  isValidSpacingValue,
  isValidSizeValue,
  isValidPositionValue,
  isPercentage,
} from './tokens';

import StackOptionKeys from './BpkStack.constant';

import type {
  BpkBreakpointToken} from './tokens';

export type BpkLayoutComponentName = 'BpkBox' | 'BpkFlex' | 'BpkGrid' | 'BpkStack';

/**
 * Allowlisted, component-scoped prop groups that are eligible for Backpack responsive value
 * processing (Backpack breakpoint keys -> Chakra breakpoint keys).
 *
 * NOTE:
 * - Spacing/size/position props are processed separately via `processBpkProps` and therefore
 *   are intentionally NOT included here.
 * - These groups are meant to keep the responsive surface predictable per component, while
 *   avoiding duplicated per-component breakpoint mapping logic.
 */
export const BPK_RESPONSIVE_PROP_KEYS_BY_COMPONENT: Record<
  BpkLayoutComponentName,
  readonly string[]
> = {
  BpkBox: [
    // Display
    'display',
    // Flex container props
    'flexDirection',
    'flexWrap',
    'justifyContent',
    'alignItems',
    'alignContent',
    // Flex item props
    'flex',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'order',
    'alignSelf',
    'justifySelf',
    // Grid container props
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridTemplateAreas',
    'gridAutoFlow',
    'gridAutoRows',
    'gridAutoColumns',
    // Grid item placement props (useful on Box when composing grids)
    'gridColumn',
    'gridRow',
  ],
  // Note: BpkFlex maps its public API props to these Chakra keys.
  BpkFlex: [
    'flexDirection',
    'justifyContent',
    'alignItems',
    'flexWrap',
    'flexGrow',
    'flexShrink',
    'flexBasis',
  ],
  // Note: BpkGrid maps its public API props to these Chakra keys.
  BpkGrid: [
    'justifyContent',
    'alignItems',
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridTemplateAreas',
    'gridAutoFlow',
    'gridAutoRows',
    'gridAutoColumns',
    'gridColumn',
    'gridRow',
  ],
  // Note: BpkStack uses Chakra Stack option prop names directly.
  BpkStack: StackOptionKeys as unknown as readonly string[],
};

export type ProcessBpkComponentPropsOptions = {
  component: BpkLayoutComponentName;
  /**
   * Optional map of responsive props. When provided, it will be filtered to the
   * allowlist for the given component, then breakpoint-normalised.
   *
   * This is useful for components like `BpkFlex` and `BpkGrid` that expose a
   * public API with different prop names.
   */
  responsiveProps?: Record<string, any>;
  /**
   * Optional mapping of source prop name -> target prop name.
   * Primarily kept for parity with `processResponsiveProps`.
   */
  propNameMap?: Record<string, string>;
};

function filterToAllowlist(
  props: Record<string, any>,
  allowlist: readonly string[],
): Record<string, any> {
  const allowed = new Set(allowlist);
  const result: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (allowed.has(key) && props[key] !== undefined) {
      result[key] = props[key];
    }
  });
  return result;
}

/**
 * Process a component's props in one place:
 * - strip className/style
 * - process spacing/size/position props (including breakpoint mapping + token conversion)
 * - process allowlisted non-spacing responsive layout props (breakpoint mapping only)
 *
 * The allowlist is grouped by component via `BPK_RESPONSIVE_PROP_KEYS_BY_COMPONENT`.
 */
export function processBpkComponentProps<T extends Record<string, any>>(
  props: T,
  options: ProcessBpkComponentPropsOptions,
): Record<string, any> {
  const processed = processBpkProps(props);

  const allowlist = BPK_RESPONSIVE_PROP_KEYS_BY_COMPONENT[options.component];
  const responsiveSource = options.responsiveProps
    ? filterToAllowlist(options.responsiveProps, allowlist)
    : filterToAllowlist(processed, allowlist);

  if (Object.keys(responsiveSource).length === 0) {
    return processed;
  }

  // Ensure allowlisted layout props do NOT fall through unprocessed (e.g. array responsive values).
  // These props must be provided via the responsive processing pipeline only.
  const cleanedProcessed: Record<string, any> = { ...processed };
  allowlist.forEach((key) => {
    if (key in cleanedProcessed) {
      delete cleanedProcessed[key];
    }
  });

  const responsiveProcessed = processResponsiveProps(
    responsiveSource,
    options.propNameMap,
  );

  // Remove keys that ended up as `undefined` (e.g. array responsive values are rejected).
  Object.keys(responsiveProcessed).forEach((key) => {
    if (responsiveProcessed[key] === undefined) {
      delete responsiveProcessed[key];
    }
  });

  return { ...cleanedProcessed, ...responsiveProcessed };
}

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
 * Recursively processes responsive values (arrays or objects) to validate and convert tokens
 *
 * @param {*} value - The value to process (could be string, array, or object)
 * @param {Function} converter - Function to convert valid tokens to actual values
 * @param {Function} validator - Function to validate if a token is allowed
 * @param {string} propName - The name of the prop being processed (for warning messages)
 * @returns {*} The processed value with tokens converted, or undefined for invalid tokens
 */
export function normalizeResponsiveObject<T>(value: Record<string, T>): Record<string, T> {
  const normalized: Record<string, T> = {};
  Object.entries(value).forEach(([key, val]) => {
    if (key === 'base') {
      normalized.base = val;
      return;
    }

    const chakraKey = BpkBreakpointToChakraKey[key as BpkBreakpointToken];
    if (chakraKey) {
      normalized[chakraKey] = val;
    } else if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `Unknown breakpoint "${key}" used in responsive prop. ` +
        'Use Backpack breakpoint tokens such as mobile, tablet or desktop.'
      );
    }
  });
  return normalized;
}

export function processResponsiveValue(
  value: any,
  converter: (v: string) => string,
  validator: (v: string) => boolean,
  propName: string
): any {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `Array-based responsive values are not supported for prop "${propName}". ` +
        `Please use Backpack breakpoint keys instead.`
      );
    }
    return undefined;
  }

  if (typeof value === 'object') {
    const normalized = normalizeResponsiveObject(value);
    const result: Record<string, any> = {};
    Object.keys(normalized).forEach((key) => {
      const processedValue = processResponsiveValue(
        normalized[key],
        converter,
        validator,
        propName
      );
      if (processedValue !== undefined) {
        result[key] = processedValue;
      }
    });
    return Object.keys(result).length > 0 ? result : undefined;
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
 * Handles all spacing-related properties including padding, margin, gap, size, border radius and position
 *
 * @param {T} props - Component props object
 * @returns {Record<string, any>} Processed props with spacing tokens converted to actual values
 */
export function processSpacingProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  const spacingKeys = [
    // Padding props
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingStart', 'paddingEnd', 'paddingInline',
    // Margin props
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginStart', 'marginEnd', 'marginInline',
    // Gap and spacing
    'gap', 'spacing',
    'rowGap', 'columnGap',
    // Size props
    'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
    // Position props
    'top', 'right', 'bottom', 'left',
  ];

  const processed: Record<string, any> = { ...props };

  spacingKeys.forEach((key) => {
    if (key in processed && processed[key] !== undefined) {
      const sizeKeys = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'];
      const positionKeys = ['top', 'right', 'bottom', 'left'];

      const isSizeProp = sizeKeys.includes(key);
      const isPositionProp = positionKeys.includes(key);

      let converter: (v: string) => string;
      if (isSizeProp || isPositionProp) {
        converter = (v: string) => v;
      } else {
        converter = convertBpkSpacingToChakra;
      }

      let validator: (v: string) => boolean;
      if (isSizeProp) {
        validator = isValidSizeValue;
      } else if (isPositionProp) {
        validator = isValidPositionValue;
      } else {
        validator = isValidSpacingValue;
      }

      const processedValue = processResponsiveValue(
        processed[key],
        converter,
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
 * Processes all props to convert Backpack tokens to Chakra UI format
 * Also explicitly removes className and style to prevent ad-hoc overrides
 *
 * Processing order:
 * 1. Remove className & style
 * 2. Process spacing props (includes position)
 *
 * @param {T} props - Component props object
 * @returns {Record<string, any>} Processed props with tokens converted and disallowed props removed
 */
export function processBpkProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  // Explicitly remove className and style to prevent style overrides
  const { className, style, ...cleanProps } = props;

  if (className !== undefined && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      'className prop is not allowed on Backpack layout components. ' +
      'It has been removed to maintain design system consistency.'
    );
  }

  if (style !== undefined && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      'style prop is not allowed on Backpack layout components. ' +
      'It has been removed to maintain design system consistency.'
    );
  }

  // Process spacing props (includes position)
  return processSpacingProps(cleanProps);
}

/**
 * Processes responsive props that are simple string/enum values (non-spacing)
 * using Backpack breakpoint keys. Array syntax is rejected as in spacing.
 *
 * @param {*} value - The value to process
 * @param {string} propName - The name of the prop being processed
 * @returns {*} The processed value with breakpoint keys mapped to Chakra keys
 */
export function processResponsiveStringProp(value: any, propName: string): any {
  return processResponsiveValue(
    value,
    (v: string) => v,
    () => true,
    propName
  );
}

/**
 * Processes a collection of responsive props.
 * @param {Record<string, any>} props - Object containing prop values.
 * @param {Record<string, string>} propNameMap - Map of prop name to CSS/Chakra property name (for error messages and mapping).
 * @returns {Record<string, any>} Processed props object.
 */
export function processResponsiveProps(
  props: Record<string, any>,
  propNameMap?: Record<string, string>
): Record<string, any> {
  const processed: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (props[key] !== undefined) {
      const targetPropName = propNameMap ? propNameMap[key] || key : key;
      processed[targetPropName] = processResponsiveStringProp(
        props[key],
        targetPropName
      );
    }
  });
  return processed;
}
