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

import type { CSSProperties } from 'react';

import { BPK_COLOR_TOKENS } from './colorTokenTransformers';
import {
  combineClassNames,
  generateCSSVariables,
  responsiveColorToClassNames,
  responsiveSpacingToClassNames,
  responsiveValueToClassNames,
} from './styleUtils';

import type { ResponsiveValue, SpacingValue, ColorValue } from './BpkBox/BpkBox.types';

/**
 * Options for transforming layout props to CSS classes and styles
 */
export interface TransformBpkLayoutPropsOptions {
  /**
   * List of props to explicitly disallow (e.g., ['className'])
   * @default ['className']
   */
  disallowedProps?: string[];
}

/**
 * Result of transforming layout props
 */
export interface TransformedLayoutProps {
  className: string;
  style: CSSProperties;
  restProps: Record<string, any>;
}

/**
 * Transforms Backpack layout component props to CSS classes and inline styles.
 * This replaces the Chakra UI transformation with CSS Modules approach.
 *
 * @param {Record<string, any>} props - The props object to transform
 * @param {TransformBpkLayoutPropsOptions} options - Options for transformation
 * @returns {TransformedLayoutProps} Object with className, style, and rest props
 */
export const transformBpkLayoutProps = (
  props: Record<string, any>,
  options: TransformBpkLayoutPropsOptions = {},
): TransformedLayoutProps => {
  const { disallowedProps = ['className'] } = options;

  // Filter out disallowed props
  const allowedProps = { ...props };
  disallowedProps.forEach((prop) => {
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  const classNames: string[] = [];
  const style: CSSProperties = {};
  const restProps: Record<string, any> = {};

  // Handle spacing props
  const spacingProps = [
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingX',
    'paddingY',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginX',
    'marginY',
    'gap',
    'rowGap',
    'columnGap',
  ];

  for (const prop of spacingProps) {
    const value = allowedProps[prop];
    if (value !== undefined) {
      const classes = responsiveSpacingToClassNames(prop, value as SpacingValue);
      classNames.push(...classes);
      delete allowedProps[prop];
    }
  }

  // Handle color props
  const colorProps = ['bg', 'backgroundColor', 'color', 'borderColor'];
  for (const prop of colorProps) {
    const value = allowedProps[prop];
    if (value !== undefined) {
      // Map color token to class name
      // Check if value is a Backpack color token (either key or value)
      if (typeof value === 'string') {
        // Check if it's a key in BPK_COLOR_TOKENS
        if (value in BPK_COLOR_TOKENS) {
          // It's a key like 'canvasContrast', convert to camelCase class name
          const colorKey = value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          classNames.push(`bpk-${prop === 'bg' ? 'bg' : prop}-${colorKey}`);
        } else {
          // Check if it's a value in BPK_COLOR_TOKENS (like 'canvas-contrast')
          const tokenKey = Object.keys(BPK_COLOR_TOKENS).find(
            (key) => BPK_COLOR_TOKENS[key as keyof typeof BPK_COLOR_TOKENS] === value
          );
          if (tokenKey) {
            // Convert token key to camelCase class name
            const colorKey = tokenKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            classNames.push(`bpk-${prop === 'bg' ? 'bg' : prop}-${colorKey}`);
          } else {
            // Not a recognized token, use responsive color handler
            const classes = responsiveColorToClassNames(prop, value as ColorValue);
            classNames.push(...classes);
          }
        }
      } else {
        // Responsive value or other type
        const classes = responsiveColorToClassNames(prop, value as ColorValue);
        classNames.push(...classes);
      }
      delete allowedProps[prop];
    }
  }

  // Handle display props
  if (allowedProps.display !== undefined) {
    const value = allowedProps.display;
    if (typeof value === 'string') {
      // Convert kebab-case to camelCase to match SCSS class names
      const displayClass = value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      classNames.push(`bpk-display-${displayClass}`);
    } else if (typeof value === 'object' && value !== null) {
      // Handle responsive display
      const breakpoints = Object.keys(value);
      for (const breakpoint of breakpoints) {
        const breakpointValue = value[breakpoint];
        if (breakpointValue) {
          const displayClass = typeof breakpointValue === 'string'
            ? breakpointValue.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
            : breakpointValue;
          classNames.push(`bpk-display-${displayClass}-${breakpoint}`);
        }
      }
    }
    delete allowedProps.display;
  }

  // Handle flexbox props
  const flexProps = ['flexDirection', 'flexWrap', 'alignItems', 'justifyContent'];
  for (const prop of flexProps) {
    const value = allowedProps[prop];
    if (value !== undefined) {
      // Convert camelCase to kebab-case for class names
      const propName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      const classes = responsiveValueToClassNames(propName, value as ResponsiveValue<string>);
      classNames.push(...classes);
      delete allowedProps[prop];
    }
  }

  // Handle overflow props
  if (allowedProps.overflow !== undefined) {
    const classes = responsiveValueToClassNames('overflow', allowedProps.overflow);
    classNames.push(...classes);
    delete allowedProps.overflow;
  }

  if (allowedProps.overflowX !== undefined) {
    const classes = responsiveValueToClassNames('overflow-x', allowedProps.overflowX);
    classNames.push(...classes);
    delete allowedProps.overflowX;
  }

  if (allowedProps.overflowY !== undefined) {
    const classes = responsiveValueToClassNames('overflow-y', allowedProps.overflowY);
    classNames.push(...classes);
    delete allowedProps.overflowY;
  }

  // Handle border radius
  if (allowedProps.borderRadius !== undefined) {
    const value = allowedProps.borderRadius;
    if (typeof value === 'string' && ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)) {
      classNames.push(`border-radius-${value}`);
    } else {
      // Use inline style for dynamic values
      style.borderRadius = typeof value === 'number' ? `${value}px` : value;
    }
    delete allowedProps.borderRadius;
  }

  // Handle border
  if (allowedProps.border !== undefined) {
    if (allowedProps.border === 'none') {
      classNames.push('border-none');
    } else if (allowedProps.border === '1' || allowedProps.border === 1) {
      classNames.push('border-1');
    } else if (allowedProps.border === '2' || allowedProps.border === 2) {
      classNames.push('border-2');
    } else {
      style.border = allowedProps.border;
    }
    delete allowedProps.border;
  }

  // Generate CSS variables for dynamic values
  const cssVars = generateCSSVariables(allowedProps);
  Object.assign(style, cssVars);

  // Handle dynamic width/height values
  const sizeProps = ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'];
  for (const prop of sizeProps) {
    const value = allowedProps[prop];
    if (value !== undefined) {
      // If it's a responsive object, we'll need to handle it with CSS variables
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // For responsive values, use CSS variables
        const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        // Use the base value or first breakpoint value
        const firstValue = Object.values(value)[0];
        if (firstValue !== undefined) {
          (style as any)[cssVarName] = typeof firstValue === 'number' ? `${firstValue}px` : firstValue;
        }
      } else if (typeof value === 'string' || typeof value === 'number') {
        (style as any)[prop] = typeof value === 'number' ? `${value}px` : value;
      }
      delete allowedProps[prop];
    }
  }

  // Copy remaining props (event handlers, accessibility props, etc.)
  Object.assign(restProps, allowedProps);

  return {
    className: combineClassNames(classNames),
    style,
    restProps,
  };
};
