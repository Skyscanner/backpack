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

import type { ResponsiveValue } from './BpkBox/BpkBox.types';

/**
 * Backpack spacing token names
 */
export const BPK_SPACING_TOKENS = {
  none: 'none',
  sm: 'sm',
  md: 'md',
  base: 'base',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
  xxxl: 'xxxl',
  xxxxl: 'xxxxl',
} as const;

export type BpkSpacingToken = (typeof BPK_SPACING_TOKENS)[keyof typeof BPK_SPACING_TOKENS];

/**
 * Backpack breakpoint names
 */
export const BPK_BREAKPOINTS = {
  smallMobile: 'smallMobile',
  mobile: 'mobile',
  smallTablet: 'smallTablet',
  tablet: 'tablet',
  desktop: 'desktop',
} as const;

export type BpkBreakpoint = (typeof BPK_BREAKPOINTS)[keyof typeof BPK_BREAKPOINTS];

/**
 * Class name generator similar to cssModules utility
 * Returns a function that combines class names and filters out falsy values
 * 
 * @param {Record<string, any>} styles - CSS Modules styles object
 * @returns {Function} Function that takes class names and returns combined class string
 * 
 * @example
 * ```tsx
 * const getClass = getClassName(STYLES);
 * const className = getClass('bpk-box', 'padding-base', 'bg-surface-highlight');
 * ```
 */
export const getClassName = (styles: { [key: string]: any } = {}) =>
  (...classNames: Array<string | boolean | number | {} | null | undefined>): string =>
    classNames.reduce((className: string, currentClass) => {
      if (currentClass && typeof currentClass === 'string') {
        const realName = styles[currentClass] || currentClass;
        return className ? `${className} ${realName}` : realName;
      }
      return className;
    }, '');

/**
 * Converts a spacing value (token string or number) to a CSS class name suffix
 * @param {string | number | undefined | null} value - Spacing value (token string or number)
 * @returns {string} Class name suffix (e.g., 'sm', 'base', 'lg', or numeric value)
 */
export const spacingToClassSuffix = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  return value;
};

/**
 * Converts a responsive spacing value to class name parts
 * @param {string} propName - Property name (e.g., 'padding', 'margin')
 * @param {ResponsiveValue<string | number> | undefined | null} value - Responsive spacing value
 * @returns {string[]} Array of class name parts
 */
export const responsiveSpacingToClassNames = (
  propName: string,
  value: ResponsiveValue<string | number> | undefined | null,
): string[] => {
  if (!value) {
    return [];
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const suffix = spacingToClassSuffix(value);
    return suffix ? [`bpk-${propName}-${suffix}`] : [];
  }

  // Handle responsive object
  const classNames: string[] = [];
  const breakpoints = Object.keys(value) as BpkBreakpoint[];
  
  for (const breakpoint of breakpoints) {
    const breakpointValue = value[breakpoint];
    if (breakpointValue !== undefined && breakpointValue !== null) {
      const suffix = spacingToClassSuffix(breakpointValue);
      if (suffix) {
        classNames.push(`bpk-${propName}-${suffix}-${breakpoint}`);
      }
    }
  }

  return classNames;
};

/**
 * Converts a color token to a CSS class name suffix
 * @param {string | undefined | null} value - Color token value
 * @returns {string} Class name suffix
 */
export const colorToClassSuffix = (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }
  // Convert kebab-case to camelCase for class names
  // e.g., 'text-primary' -> 'textPrimary'
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Converts a responsive color value to class name parts
 * @param {string} propName - Property name (e.g., 'bg', 'color')
 * @param {ResponsiveValue<string> | undefined | null} value - Responsive color value
 * @returns {string[]} Array of class name parts
 */
export const responsiveColorToClassNames = (
  propName: string,
  value: ResponsiveValue<string> | undefined | null,
): string[] => {
  if (!value) {
    return [];
  }

  if (typeof value === 'string') {
    const suffix = colorToClassSuffix(value);
    return suffix ? [`bpk-${propName}-${suffix}`] : [];
  }

  // Handle responsive object
  const classNames: string[] = [];
  const breakpoints = Object.keys(value) as BpkBreakpoint[];
  
  for (const breakpoint of breakpoints) {
    const breakpointValue = value[breakpoint];
    if (breakpointValue) {
      const suffix = colorToClassSuffix(breakpointValue);
      if (suffix) {
        classNames.push(`bpk-${propName}-${suffix}-${breakpoint}`);
      }
    }
  }

  return classNames;
};

/**
 * Converts a simple responsive value to class name parts
 * @param {string} propName - Property name (e.g., 'flex-direction', 'align-items')
 * @param {ResponsiveValue<string | number> | undefined | null} value - Responsive value
 * @returns {string[]} Array of class name parts
 */
export const responsiveValueToClassNames = (
  propName: string,
  value: ResponsiveValue<string | number> | undefined | null,
): string[] => {
  if (!value) {
    return [];
  }

  if (typeof value === 'string' || typeof value === 'number') {
    // Convert value to class-friendly format
    // For flexbox values like 'flex-start', convert to 'flexStart' to match SCSS class names
    const valueStr = typeof value === 'string' 
      ? value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) // Convert kebab-case to camelCase
      : value.toString();
    return [`bpk-${propName}-${valueStr}`];
  }

  // Handle responsive object
  const classNames: string[] = [];
  const breakpoints = Object.keys(value) as BpkBreakpoint[];
  
  for (const breakpoint of breakpoints) {
    const breakpointValue = value[breakpoint];
    if (breakpointValue !== undefined && breakpointValue !== null) {
      const valueStr = typeof breakpointValue === 'string'
        ? breakpointValue.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) // Convert kebab-case to camelCase
        : breakpointValue.toString();
      classNames.push(`bpk-${propName}-${valueStr}-${breakpoint}`);
    }
  }

  return classNames;
};

/**
 * Generates CSS custom properties for dynamic values that can't be pre-compiled
 * @param {Record<string, any>} props - Props object with dynamic values
 * @returns {Record<string, string>} Object with CSS custom properties
 */
export const generateCSSVariables = (
  props: Record<string, any>,
): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  // List of props that might need CSS variables for dynamic values
  const dynamicProps = [
    'width',
    'height',
    'minWidth',
    'maxWidth',
    'minHeight',
    'maxHeight',
    'top',
    'right',
    'bottom',
    'left',
    'zIndex',
    'fontSize',
    'lineHeight',
    'letterSpacing',
  ];

  for (const prop of dynamicProps) {
    const value = props[prop];
    if (value !== undefined && value !== null) {
      // If it's a responsive object, we'll need to handle it differently
      // For now, handle simple values
      if (typeof value === 'string' || typeof value === 'number') {
        const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        cssVars[cssVarName] = typeof value === 'number' ? `${value}px` : value;
      }
    }
  }

  return cssVars;
};

/**
 * Combines multiple class name arrays into a single string
 * @param {Array<string[] | string | null | undefined>} classNames - Array of class name arrays
 * @returns {string} Combined class name string
 */
export const combineClassNames = (...classNames: Array<string[] | string | null | undefined>): string =>
  classNames
    .flat()
    .filter((name): name is string => Boolean(name))
    .join(' ');

