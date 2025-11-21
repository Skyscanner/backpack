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

import { BPK_COLOR_TOKENS, transformColorToken } from './colorTokenTransformers';
import {
  isValidDisplayValue,
  isValidFlexDirectionValue,
  isValidFlexWrapValue,
  isValidAlignItemsValue,
  isValidJustifyContentValue,
  isValidOverflowValue,
  isValidPositionValue,
  isValidBorderStyleValue,
  isValidTextAlignValue,
  isValidTextTransformValue,
  isValidTextDecorationValue,
  isValidCursorValue,
  isValidPointerEventsValue,
  isValidVisibilityValue,
} from './layoutPropTypes';
import {
  convertBorderRadiusToCSSValue,
  convertPxToRem,
  convertSpacingToCSSValue,
  generateCSSVariables,
  generateSpacingCSSVariables,
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
  /**
   * Component name for base classname generation (e.g., 'box', 'float')
   * @default undefined
   */
  componentName?: string;
}

/**
 * Result of transforming layout props
 */
export interface TransformedLayoutProps {
  className: string | undefined;
  style: CSSProperties | undefined;
  restProps: Record<string, any>;
}

/**
 * Transforms Backpack layout component props to CSS classes and inline styles.
 * This replaces the Chakra UI transformation with CSS Modules approach.
 *
 * **Important:** This function automatically filters out `className` from user props.
 * The returned `className` is generated internally from style props, not from user input.
 * This ensures all styling is controlled via CSS Modules, not direct className manipulation.
 *
 * @param {Record<string, any>} props - The props object to transform
 * @param {TransformBpkLayoutPropsOptions} options - Options for transformation
 * @returns {TransformedLayoutProps} Object with className (generated internally), style, and rest props
 */
export const transformBpkLayoutProps = (
  props: Record<string, any>,
  options: TransformBpkLayoutPropsOptions = {},
): TransformedLayoutProps => {
  const {
    componentName,
    // className is disallowed by default - it's generated internally, not from user props
    disallowedProps = ['className'],
  } = options;

  // Filter out disallowed props (e.g., className)
  // This prevents users from passing className directly
  const allowedProps = { ...props };
  disallowedProps.forEach((prop) => {
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  // Use atomic utility classes (Approach 2)
  // This ensures only actual used styles are included in the CSS bundle
  if (componentName) {
    return transformWithAtomicClasses(allowedProps, componentName);
  }

  // Fallback: if no componentName provided, still process props but without base class
  const classNames: string[] = [];
  const style: CSSProperties = {};
  const restProps: Record<string, any> = {};

  // Predefined spacing tokens that have corresponding CSS classes
  const VALID_SPACING_TOKENS = ['none', 'sm', 'md', 'base', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'];

  /**
   * Check if a spacing value is a valid predefined token
   * If it's a number or not in the token list, we need to use inline styles
   */
  const isValidSpacingToken = (value: string | number | Record<string, string | number> | undefined | null): boolean => {
    if (value === undefined || value === null) {
      return false;
    }

    // For responsive objects, check all values
    if (typeof value === 'object' && !Array.isArray(value)) {
      return Object.values(value).every((val) => 
        typeof val === 'string' && VALID_SPACING_TOKENS.includes(val)
      );
    }

    // For simple values, check if it's a valid token string
    if (typeof value === 'string') {
      return VALID_SPACING_TOKENS.includes(value);
    }

    // Numbers are not in the predefined token list, need inline styles
    return false;
  };

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
      // Check if value is a valid predefined token
      if (isValidSpacingToken(value)) {
        // Use CSS class names for predefined tokens (better performance)
        const classes = responsiveSpacingToClassNames(prop, value as SpacingValue);
        classNames.push(...classes);
      } else {
        // Use CSS variables for dynamic values (numbers or custom strings)
        // This avoids runtime CSS generation (inline styles)
        const spacingCssVars = generateSpacingCSSVariables(prop, value as SpacingValue);
        Object.assign(style, spacingCssVars);
        
        // Add dynamic class name for CSS variable-based styling
        const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        classNames.push(`bpk-${kebabPropName}-dynamic`);
      }
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
      classNames.push(`bpk-border-radius-${value}`);
    } else {
      // Use CSS variable for dynamic values (following scheme 2)
      const cssVarName = '--bpk-border-radius';
      (style as any)[cssVarName] = typeof value === 'number' ? convertPxToRem(value) : value;
      classNames.push('bpk-border-radius-dynamic');
    }
    delete allowedProps.borderRadius;
  }

  // Handle border
  if (allowedProps.border !== undefined) {
    if (allowedProps.border === 'none') {
      classNames.push('bpk-border-none');
    } else if (allowedProps.border === '1' || allowedProps.border === 1) {
      classNames.push('bpk-border-1');
    } else if (allowedProps.border === '2' || allowedProps.border === 2) {
      classNames.push('bpk-border-2');
    } else {
      // Use CSS variable for dynamic values (following scheme 2)
      const cssVarName = '--bpk-border';
      (style as any)[cssVarName] = typeof allowedProps.border === 'string' ? allowedProps.border : `${allowedProps.border}px`;
      classNames.push('bpk-border-dynamic');
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
      // If it's a responsive object, generate CSS variables for each breakpoint
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        // Generate CSS variables for each breakpoint
        for (const [breakpoint, breakpointValue] of Object.entries(value)) {
          if (breakpointValue !== undefined && breakpointValue !== null) {
            const cssVarName = `--bpk-${kebabPropName}${breakpoint === 'smallMobile' ? '' : `-${breakpoint}`}`;
            (style as any)[cssVarName] = typeof breakpointValue === 'number' ? `${breakpointValue}px` : breakpointValue;
          }
        }
        // Add dynamic class name
        classNames.push(`bpk-${kebabPropName}-dynamic`);
      } else if (typeof value === 'string' || typeof value === 'number') {
        const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        (style as any)[cssVarName] = typeof value === 'number' ? `${value}px` : value;
        classNames.push(`bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}-dynamic`);
      }
      delete allowedProps[prop];
    }
  }

  // Copy remaining props (event handlers, accessibility props, etc.)
  Object.assign(restProps, allowedProps);

  return {
    className: classNames.filter(Boolean).join(' ') || undefined,
    style: Object.keys(style).length > 0 ? style : undefined,
    restProps,
  };
};


/**
 * Transforms props using atomic utility classes (Approach 2)
 * Generates utility classes for each prop (e.g., .bpk-padding-base, .bpk-bg-surfaceHighlight)
 * Only generates classes for props that are actually used
 * 
 * Key principles:
 * - Predefined tokens (e.g., "base", "lg") → atomic utility classes
 * - Dynamic values (numbers, custom strings) → CSS variables
 * - Only actual used properties generate CSS classes
 * - No unused CSS properties are defined
 * @param {Record<string, any>} props - The props object to transform
 * @param {string} componentName - The component name for base class generation
 * @returns {TransformedLayoutProps} Object with className, style, and rest props
 */
function transformWithAtomicClasses(
  props: Record<string, any>,
  componentName: string,
): TransformedLayoutProps {
  const classNames: string[] = [];
  const style: CSSProperties = {};
  const restProps: Record<string, any> = { ...props };

  // Base classname
  const baseClassName = `bpk-${componentName}`;
  classNames.push(baseClassName);

  // Predefined spacing tokens that have corresponding CSS classes
  const VALID_SPACING_TOKENS = ['none', 'sm', 'md', 'base', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'];

  // ============================================================================
  // Category 1: Spacing Props (padding, margin, gap)
  // ============================================================================
  const spacingProps = [
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingX', 'paddingY',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginX', 'marginY',
    'gap', 'rowGap', 'columnGap',
    // Logical spacing props (automatically adapt to RTL/LTR)
    'marginStart', 'marginEnd', 'paddingStart', 'paddingEnd',
    'marginInline', 'paddingInline',
  ];

  for (const prop of spacingProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      // Check if value is a valid predefined token
      const isValidToken = typeof value === 'string' && VALID_SPACING_TOKENS.includes(value);
      const isResponsiveWithTokens = typeof value === 'object' && value !== null && 
        Object.values(value).every((v) => typeof v === 'string' && VALID_SPACING_TOKENS.includes(v));
      
      if (isValidToken || isResponsiveWithTokens) {
        // Use utility classes for predefined tokens
        const classes = responsiveSpacingToClassNames(prop, value as SpacingValue);
        classNames.push(...classes);
      } else {
        // For dynamic values (numbers or custom strings), use CSS variables
        const spacingCssVars = generateSpacingCSSVariables(prop, value as SpacingValue);
        Object.assign(style, spacingCssVars);
        const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        classNames.push(`bpk-${kebabPropName}-dynamic`);
      }
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 2: Color Props (bg, backgroundColor, color, borderColor)
  // ============================================================================
  const colorProps = ['bg', 'backgroundColor', 'color', 'borderColor'];
  for (const prop of colorProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      const classes = responsiveColorToClassNames(prop, value as ColorValue);
      classNames.push(...classes);
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 3: Display Props
  // ============================================================================
  if (restProps.display !== undefined) {
    const value = restProps.display;
    if (typeof value === 'string') {
      // Runtime validation (development mode only)
      if (process.env.NODE_ENV !== 'production' && !isValidDisplayValue(value)) {
        console.warn(
          `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid display value "${value}". Use valid CSS display values: block, inline, inline-block, flex, grid, none, table, table-cell, table-row.`,
        );
      }
      classNames.push(`bpk-display-${value}`);
    } else if (typeof value === 'object' && value !== null) {
      const breakpoints = Object.keys(value);
      for (const breakpoint of breakpoints) {
        const breakpointValue = value[breakpoint];
        if (typeof breakpointValue === 'string') {
          // Runtime validation (development mode only)
          if (process.env.NODE_ENV !== 'production' && !isValidDisplayValue(breakpointValue)) {
            console.warn(
              `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid display value "${breakpointValue}" for breakpoint "${breakpoint}". Use valid CSS display values.`,
            );
          }
          classNames.push(`bpk-display-${breakpointValue}-${breakpoint}`);
        }
      }
    }
    delete restProps.display;
  }

  // Handle flexbox props
  const flexProps = ['flexDirection', 'flexWrap', 'alignItems', 'justifyContent'];
  for (const prop of flexProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      const propName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (typeof value === 'string') {
        classNames.push(`bpk-${propName}-${value}`);
      } else if (typeof value === 'object' && value !== null) {
        const breakpoints = Object.keys(value);
        for (const breakpoint of breakpoints) {
          const breakpointValue = value[breakpoint];
          if (typeof breakpointValue === 'string') {
            classNames.push(`bpk-${propName}-${breakpointValue}-${breakpoint}`);
          }
        }
      }
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 5: Overflow Props
  // ============================================================================
  if (restProps.overflow !== undefined) {
    const value = restProps.overflow;
    if (typeof value === 'string') {
      // Runtime validation (development mode only)
      if (process.env.NODE_ENV !== 'production' && !isValidOverflowValue(value)) {
        console.warn(
          `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid overflow value "${value}". Use valid CSS overflow values: visible, hidden, scroll, auto, clip.`,
        );
      }
      classNames.push(`bpk-overflow-${value}`);
    }
    delete restProps.overflow;
  }

  // ============================================================================
  // Category 6: Border Props
  // ============================================================================
  if (restProps.borderRadius !== undefined) {
    const value = restProps.borderRadius;
    if (typeof value === 'string' && ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)) {
      classNames.push(`bpk-border-radius-${value}`);
    } else {
      // Dynamic value - use CSS variable
      const cssValue = convertBorderRadiusToCSSValue(value);
      (style as any)['--bpk-border-radius'] = cssValue;
      classNames.push('bpk-border-radius-dynamic');
    }
    delete restProps.borderRadius;
  }

  // Handle border
  if (restProps.border !== undefined) {
    if (restProps.border === 'none') {
      classNames.push('bpk-border-none');
    } else if (restProps.border === '1' || restProps.border === 1) {
      classNames.push('bpk-border-1');
    } else if (restProps.border === '2' || restProps.border === 2) {
      classNames.push('bpk-border-2');
    } else {
      // Dynamic value - use CSS variable
      const cssVarName = '--bpk-border';
      (style as any)[cssVarName] = typeof restProps.border === 'string' ? restProps.border : `${restProps.border}px solid`;
      classNames.push('bpk-border-dynamic');
    }
    delete restProps.border;
  }

  // ============================================================================
  // Category 7: Layout/Size Props (width, height, minWidth, maxWidth, etc.)
  // ============================================================================
  const sizeProps = ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'];
  for (const prop of sizeProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      // If it's a responsive object, generate CSS variables for each breakpoint
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Generate CSS variables for each breakpoint
        for (const [breakpoint, breakpointValue] of Object.entries(value)) {
          if (breakpointValue !== undefined && breakpointValue !== null) {
            const cssVarName = `--bpk-${kebabPropName}${breakpoint === 'smallMobile' ? '' : `-${breakpoint}`}`;
            (style as any)[cssVarName] = typeof breakpointValue === 'number' ? `${breakpointValue}px` : breakpointValue;
          }
        }
        // Add dynamic class name
        classNames.push(`bpk-${kebabPropName}-dynamic`);
      } else {
        const cssVarName = `--bpk-${kebabPropName}`;
        if (typeof value === 'number') {
          (style as any)[cssVarName] = `${value}px`;
        } else if (typeof value === 'string') {
          (style as any)[cssVarName] = value;
        }
        classNames.push(`bpk-${kebabPropName}-dynamic`);
      }
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 8: Additional Overflow Props (overflowX, overflowY)
  // ============================================================================
  if (restProps.overflowX !== undefined) {
    const value = restProps.overflowX;
    if (typeof value === 'string') {
      // Runtime validation (development mode only)
      if (process.env.NODE_ENV !== 'production' && !isValidOverflowValue(value)) {
        console.warn(
          `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid overflowX value "${value}". Use valid CSS overflow values.`,
        );
      }
      classNames.push(`bpk-overflow-x-${value}`);
    }
    delete restProps.overflowX;
  }
  if (restProps.overflowY !== undefined) {
    const value = restProps.overflowY;
    if (typeof value === 'string') {
      // Runtime validation (development mode only)
      if (process.env.NODE_ENV !== 'production' && !isValidOverflowValue(value)) {
        console.warn(
          `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid overflowY value "${value}". Use valid CSS overflow values.`,
        );
      }
      classNames.push(`bpk-overflow-y-${value}`);
    }
    delete restProps.overflowY;
  }

  // ============================================================================
  // Category 9: Additional Border Props
  // ============================================================================
  const borderProps = [
    { name: 'borderTop', validator: null },
    { name: 'borderRight', validator: null },
    { name: 'borderBottom', validator: null },
    { name: 'borderLeft', validator: null },
    { name: 'borderWidth', validator: null },
    { name: 'borderStyle', validator: isValidBorderStyleValue },
    { name: 'borderTopWidth', validator: null },
    { name: 'borderRightWidth', validator: null },
    { name: 'borderBottomWidth', validator: null },
    { name: 'borderLeftWidth', validator: null },
    { name: 'borderTopLeftRadius', validator: null },
    { name: 'borderTopRightRadius', validator: null },
    { name: 'borderBottomLeftRadius', validator: null },
    { name: 'borderBottomRightRadius', validator: null },
  ];
  for (const { name: prop, validator } of borderProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      // Runtime validation for constrained props (development mode only)
      if (process.env.NODE_ENV !== 'production' && validator && typeof value === 'string' && !validator(value)) {
        console.warn(
          `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid ${prop} value "${value}". Use valid CSS ${prop} values.`,
        );
      }
      // For now, use CSS variables for these as they're less common
      const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      (style as any)[cssVarName] = typeof value === 'number' ? `${value}px` : String(value);
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      classNames.push(`bpk-${kebabPropName}-dynamic`);
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 10: Additional Color Props (borderTopColor, borderRightColor, etc.)
  // ============================================================================
  const additionalColorProps = ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
  for (const prop of additionalColorProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      const classes = responsiveColorToClassNames(prop, value as ColorValue);
      classNames.push(...classes);
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 11: Grid Props
  // ============================================================================
  const gridProps = [
    'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas',
    'gridColumn', 'gridRow', 'gridArea',
    'gridColumnStart', 'gridColumnEnd', 'gridRowStart', 'gridRowEnd',
    'gridAutoFlow', 'gridAutoRows', 'gridAutoColumns',
  ];
  for (const prop of gridProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      // If it's a responsive object, generate CSS variables for each breakpoint
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Generate CSS variables for each breakpoint
        for (const [breakpoint, breakpointValue] of Object.entries(value)) {
          if (breakpointValue !== undefined && breakpointValue !== null) {
            const cssVarName = `--bpk-${kebabPropName}${breakpoint === 'smallMobile' ? '' : `-${breakpoint}`}`;
            (style as any)[cssVarName] = String(breakpointValue);
          }
        }
        // Add dynamic class name
        classNames.push(`bpk-${kebabPropName}-dynamic`);
      } else {
        const cssVarName = `--bpk-${kebabPropName}`;
        (style as any)[cssVarName] = String(value);
        classNames.push(`bpk-${kebabPropName}-dynamic`);
      }
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 12: Typography Props
  // ============================================================================
  const typographyProps = [
    { name: 'fontSize', validator: null },
    { name: 'fontWeight', validator: null },
    { name: 'lineHeight', validator: null },
    { name: 'textAlign', validator: isValidTextAlignValue },
    { name: 'textTransform', validator: isValidTextTransformValue },
    { name: 'textDecoration', validator: isValidTextDecorationValue },
    { name: 'letterSpacing', validator: null },
  ];
  for (const { name: prop, validator } of typographyProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      if (typeof value === 'number') {
        // For fontSize, lineHeight, letterSpacing, convert px to rem
        if (prop === 'fontSize' || prop === 'lineHeight' || prop === 'letterSpacing') {
          (style as any)[cssVarName] = convertPxToRem(value);
        } else {
          (style as any)[cssVarName] = String(value);
        }
      } else {
        // Runtime validation for constrained props (development mode only)
        if (process.env.NODE_ENV !== 'production' && validator && typeof value === 'string' && !validator(value)) {
          console.warn(
            `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid ${prop} value "${value}". Use valid CSS ${prop} values.`,
          );
        }
        (style as any)[cssVarName] = String(value);
      }
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      classNames.push(`bpk-${kebabPropName}-dynamic`);
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 13: Shadow Props
  // ============================================================================
  if (restProps.boxShadow !== undefined) {
    const cssVarName = '--bpk-box-shadow';
    (style as any)[cssVarName] = String(restProps.boxShadow);
    classNames.push('bpk-box-shadow-dynamic');
    delete restProps.boxShadow;
  }
  if (restProps.textShadow !== undefined) {
    const cssVarName = '--bpk-text-shadow';
    (style as any)[cssVarName] = String(restProps.textShadow);
    classNames.push('bpk-text-shadow-dynamic');
    delete restProps.textShadow;
  }

  // ============================================================================
  // Category 14: Cursor and Pointer Events
  // ============================================================================
  if (restProps.cursor !== undefined) {
    const value = restProps.cursor;
    // Runtime validation (development mode only)
    if (process.env.NODE_ENV !== 'production' && typeof value === 'string' && !isValidCursorValue(value)) {
      console.warn(
        `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid cursor value "${value}". Use valid CSS cursor values.`,
      );
    }
    const cssVarName = '--bpk-cursor';
    (style as any)[cssVarName] = String(value);
    classNames.push('bpk-cursor-dynamic');
    delete restProps.cursor;
  }
  if (restProps.pointerEvents !== undefined) {
    const value = restProps.pointerEvents;
    // Runtime validation (development mode only)
    if (process.env.NODE_ENV !== 'production' && typeof value === 'string' && !isValidPointerEventsValue(value)) {
      console.warn(
        `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid pointerEvents value "${value}". Use valid CSS pointer-events values.`,
      );
    }
    const cssVarName = '--bpk-pointer-events';
    (style as any)[cssVarName] = String(value);
    classNames.push('bpk-pointer-events-dynamic');
    delete restProps.pointerEvents;
  }

  // ============================================================================
  // Category 15: Transform Props
  // ============================================================================
  if (restProps.transform !== undefined) {
    const cssVarName = '--bpk-transform';
    (style as any)[cssVarName] = String(restProps.transform);
    classNames.push('bpk-transform-dynamic');
    delete restProps.transform;
  }
  if (restProps.transformOrigin !== undefined) {
    const cssVarName = '--bpk-transform-origin';
    (style as any)[cssVarName] = String(restProps.transformOrigin);
    classNames.push('bpk-transform-origin-dynamic');
    delete restProps.transformOrigin;
  }

  // ============================================================================
  // Category 16: Transition Props
  // ============================================================================
  const transitionProps = [
    'transition', 'transitionProperty', 'transitionDuration',
    'transitionTimingFunction', 'transitionDelay',
  ];
  for (const prop of transitionProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      (style as any)[cssVarName] = String(value);
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      classNames.push(`bpk-${kebabPropName}-dynamic`);
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 17: Other Props (visibility, opacity, position, etc.)
  // ============================================================================
  const otherProps = [
    { name: 'visibility', validator: isValidVisibilityValue },
    { name: 'opacity', validator: null },
    { name: 'position', validator: isValidPositionValue },
    { name: 'top', validator: null },
    { name: 'right', validator: null },
    { name: 'bottom', validator: null },
    { name: 'left', validator: null },
    { name: 'zIndex', validator: null },
  ];
  for (const { name: prop, validator } of otherProps) {
    const value = restProps[prop];
    if (value !== undefined) {
      // Runtime validation for constrained props (development mode only)
      if (process.env.NODE_ENV !== 'production' && validator && typeof value === 'string' && !validator(value)) {
        console.warn(
          `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}: Invalid ${prop} value "${value}". Use valid CSS ${prop} values.`,
        );
      }
      const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      (style as any)[cssVarName] = typeof value === 'number' && prop !== 'zIndex' ? `${value}px` : String(value);
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      classNames.push(`bpk-${kebabPropName}-dynamic`);
      delete restProps[prop];
    }
  }

  // ============================================================================
  // Category 18: Component-Specific Props
  // ============================================================================
  
  // Handle float (BpkFloat specific)
  if (restProps.float !== undefined) {
    const value = restProps.float;
    if (typeof value === 'string') {
      // Generate class name: bpk-float-float-left, bpk-float-float-right, etc.
      classNames.push(`bpk-${componentName}-float-${value}`);
    } else if (typeof value === 'object' && value !== null) {
      // Responsive float values
      const breakpoints = Object.keys(value);
      for (const breakpoint of breakpoints) {
        const breakpointValue = value[breakpoint];
        if (typeof breakpointValue === 'string') {
          classNames.push(`bpk-${componentName}-float-${breakpointValue}-${breakpoint}`);
        }
      }
    }
    delete restProps.float;
  }

  // Handle clear (BpkFloat specific)
  if (restProps.clear !== undefined) {
    const value = restProps.clear;
    if (typeof value === 'string') {
      // Generate class name: bpk-float-clear-left, bpk-float-clear-right, etc.
      classNames.push(`bpk-${componentName}-clear-${value}`);
    } else if (typeof value === 'object' && value !== null) {
      // Responsive clear values
      const breakpoints = Object.keys(value);
      for (const breakpoint of breakpoints) {
        const breakpointValue = value[breakpoint];
        if (typeof breakpointValue === 'string') {
          classNames.push(`bpk-${componentName}-clear-${breakpointValue}-${breakpoint}`);
        }
      }
    }
    delete restProps.clear;
  }

  // Handle orientation (BpkSeparator specific)
  if (restProps.orientation !== undefined) {
    const value = restProps.orientation;
    if (typeof value === 'string') {
      // Generate class name: bpk-separator-orientation-horizontal, bpk-separator-orientation-vertical
      classNames.push(`bpk-${componentName}-orientation-${value}`);
    } else if (typeof value === 'object' && value !== null) {
      // Responsive orientation values
      const breakpoints = Object.keys(value);
      for (const breakpoint of breakpoints) {
        const breakpointValue = value[breakpoint];
        if (typeof breakpointValue === 'string') {
          classNames.push(`bpk-${componentName}-orientation-${breakpointValue}-${breakpoint}`);
        }
      }
    }
    delete restProps.orientation;
  }

  // Handle ratio (BpkAspectRatio specific)
  // ratio = width / height, so padding-bottom = (1 / ratio) * 100%
  // BpkAspectRatio uses --bpk-aspect-ratio CSS variable
  if (restProps.ratio !== undefined) {
    const value = restProps.ratio;
    if (typeof value === 'number') {
      const paddingBottom = `${(1 / value) * 100}%`;
      (style as any)['--bpk-aspect-ratio'] = paddingBottom;
    } else if (typeof value === 'object' && value !== null) {
      // Responsive ratio - use first breakpoint value as default, others via CSS variables
      const breakpoints = Object.keys(value);
      const firstBreakpoint = breakpoints[0];
      const firstValue = value[firstBreakpoint];
      if (typeof firstValue === 'number') {
        const paddingBottom = `${(1 / firstValue) * 100}%`;
        (style as any)['--bpk-aspect-ratio'] = paddingBottom;
      }
      // Additional breakpoints via CSS variables
      for (const breakpoint of breakpoints.slice(1)) {
        const breakpointValue = value[breakpoint];
        if (typeof breakpointValue === 'number') {
          const paddingBottom = `${(1 / breakpointValue) * 100}%`;
          (style as any)[`--bpk-aspect-ratio-${breakpoint}`] = paddingBottom;
        }
      }
    }
    delete restProps.ratio;
  }

  // Handle maxW (BpkContainer specific) - maps to maxWidth
  if (restProps.maxW !== undefined) {
    const value = restProps.maxW;
    const cssVarName = '--bpk-max-width';
    if (typeof value === 'number') {
      (style as any)[cssVarName] = `${value}px`;
    } else if (typeof value === 'string') {
      (style as any)[cssVarName] = value;
    } else if (typeof value === 'object' && value !== null) {
      // Responsive maxW
      const breakpoints = Object.keys(value);
      const firstBreakpoint = breakpoints[0];
      const firstValue = value[firstBreakpoint];
      if (typeof firstValue === 'number') {
        (style as any)[cssVarName] = `${firstValue}px`;
      } else if (typeof firstValue === 'string') {
        (style as any)[cssVarName] = firstValue;
      }
      // Additional breakpoints via CSS variables
      for (const breakpoint of breakpoints.slice(1)) {
        const breakpointValue = value[breakpoint];
        if (typeof breakpointValue === 'number') {
          (style as any)[`--bpk-max-width-${breakpoint}`] = `${breakpointValue}px`;
        } else if (typeof breakpointValue === 'string') {
          (style as any)[`--bpk-max-width-${breakpoint}`] = breakpointValue;
        }
      }
    }
    classNames.push('bpk-max-width-dynamic');
    delete restProps.maxW;
  }

  // Handle centerContent (BpkContainer specific) - affects text-align
  if (restProps.centerContent !== undefined) {
    const value = restProps.centerContent;
    if (value === true || value === 'true') {
      classNames.push('bpk-text-align-center');
    } else if (value === false || value === 'false') {
      classNames.push('bpk-text-align-initial');
    } else if (typeof value === 'object' && value !== null) {
      // Responsive centerContent
      const breakpoints = Object.keys(value);
      for (const breakpoint of breakpoints) {
        const breakpointValue = value[breakpoint];
        if (breakpointValue === true || breakpointValue === 'true') {
          classNames.push(`bpk-text-align-center-${breakpoint}`);
        } else if (breakpointValue === false || breakpointValue === 'false') {
          classNames.push(`bpk-text-align-initial-${breakpoint}`);
        }
      }
    }
    delete restProps.centerContent;
  }

  // Handle size (BpkContainer specific) - shorthand for max-width (container size variants)
  if (restProps.size !== undefined) {
    const value = restProps.size;
    const sizeMap: Record<string, string> = {
      'sm': '30rem', // 480px
      'md': '48rem', // 768px
      'lg': '62rem', // 992px
      'xl': '75rem', // 1200px
      '2xl': '90rem', // 1440px
      'full': '100%',
    };
    const cssVarName = '--bpk-max-width';
    if (typeof value === 'string') {
      const maxWidth = sizeMap[value] || value;
      (style as any)[cssVarName] = maxWidth;
      classNames.push('bpk-max-width-dynamic');
    } else if (typeof value === 'object' && value !== null) {
      // Responsive size
      const breakpoints = Object.keys(value);
      const firstBreakpoint = breakpoints[0];
      const firstValue = value[firstBreakpoint];
      if (typeof firstValue === 'string') {
        const maxWidth = sizeMap[firstValue] || firstValue;
        (style as any)[cssVarName] = maxWidth;
        classNames.push('bpk-max-width-dynamic');
      }
      // Additional breakpoints via CSS variables
      for (const breakpoint of breakpoints.slice(1)) {
        const breakpointValue = value[breakpoint];
        if (typeof breakpointValue === 'string') {
          const maxWidth = sizeMap[breakpointValue] || breakpointValue;
          (style as any)[`--bpk-max-width-${breakpoint}`] = maxWidth;
        }
      }
    }
    delete restProps.size;
  }

  return {
    className: classNames.filter(Boolean).join(' ') || undefined,
    style: Object.keys(style).length > 0 ? style : undefined,
    restProps,
  };
}

/**
 * Generates CSS variables for all style props
 * This converts all style-related props to CSS custom properties
 * @param {Record<string, any>} props - The props object to convert
 * @returns {Record<string, string>} Object with CSS custom properties
 */
function generateAllCSSVariables(props: Record<string, any>): Record<string, string> {
  const cssVars: Record<string, any> = {};

  // Handle spacing props
  const spacingProps = [
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingX', 'paddingY',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginX', 'marginY',
    'gap', 'rowGap', 'columnGap',
  ];

  for (const prop of spacingProps) {
    const value = props[prop];
    if (value !== undefined) {
      const spacingVars = generateSpacingCSSVariables(prop, value);
      Object.assign(cssVars, spacingVars);
    }
  }

  // Handle color props - convert to CSS variables
  const colorProps = ['bg', 'backgroundColor', 'color', 'borderColor'];
  for (const prop of colorProps) {
    const value = props[prop];
    if (value !== undefined) {
      const cssVarName = `--bpk-${prop === 'bg' ? 'background-color' : prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      
      // Resolve color token to actual CSS variable value
      if (typeof value === 'string') {
        // Use transformColorToken to convert token to CSS variable
        const transformedColor = transformColorToken(value as any);
        if (transformedColor !== undefined && transformedColor !== null) {
          // transformColorToken returns CSS variable string like "var(--bpk-surface-highlight-day, ...)"
          cssVars[cssVarName] = transformedColor;
        } else if (/^(var\(|rgb\(|rgba\(|hsl\(|hsla\(|#[0-9a-fA-F]{3,8}|transparent|currentColor)$/.test(value)) {
          // Not a recognized token, but it's already a CSS value
          cssVars[cssVarName] = value;
        } else {
          // Unknown value, use as-is (might be a custom color)
          cssVars[cssVarName] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        // Responsive color - for now, use the base value or first breakpoint value
        const firstValue = Object.values(value)[0];
        if (typeof firstValue === 'string') {
          const transformedColor = transformColorToken(firstValue as any);
          if (transformedColor !== undefined && transformedColor !== null) {
            cssVars[cssVarName] = transformedColor;
          } else {
            cssVars[cssVarName] = String(firstValue);
          }
        } else {
          cssVars[cssVarName] = String(firstValue);
        }
      } else {
        // Other types - convert to string
        cssVars[cssVarName] = String(value);
      }
    }
  }

  // Handle border props
  if (props.borderRadius !== undefined) {
    const value = props.borderRadius;
    cssVars['--bpk-border-radius'] = convertBorderRadiusToCSSValue(value);
  }

  if (props.border !== undefined) {
    const value = props.border;
    if (value === 'none') {
      cssVars['--bpk-border'] = 'none';
    } else if (value === '1' || value === 1) {
      cssVars['--bpk-border'] = '1px solid';
    } else if (value === '2' || value === 2) {
      cssVars['--bpk-border'] = '2px solid';
    } else {
      cssVars['--bpk-border'] = typeof value === 'string' ? value : `${value}px solid`;
    }
  }

  // Handle display props
  if (props.display !== undefined) {
    cssVars['--bpk-display'] = String(props.display);
  }

  // Handle flexbox props
  const flexProps = ['flexDirection', 'flexWrap', 'alignItems', 'justifyContent'];
  for (const prop of flexProps) {
    if (props[prop] !== undefined) {
      const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      cssVars[cssVarName] = String(props[prop]);
    }
  }

  // Handle overflow props
  if (props.overflow !== undefined) {
    cssVars['--bpk-overflow'] = String(props.overflow);
  }
  if (props.overflowX !== undefined) {
    cssVars['--bpk-overflow-x'] = String(props.overflowX);
  }
  if (props.overflowY !== undefined) {
    cssVars['--bpk-overflow-y'] = String(props.overflowY);
  }

  // Handle size props - use CSS variables
  const sizeProps = ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'];
  for (const prop of sizeProps) {
    if (props[prop] !== undefined) {
      const value = props[prop];
      const cssVarName = `--bpk-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      cssVars[cssVarName] = typeof value === 'number' ? `${value}px` : String(value);
    }
  }

  // Handle position props
  if (props.position !== undefined) {
    cssVars['--bpk-position'] = String(props.position);
  }
  if (props.top !== undefined) {
    cssVars['--bpk-top'] = typeof props.top === 'number' ? `${props.top}px` : String(props.top);
  }
  if (props.right !== undefined) {
    cssVars['--bpk-right'] = typeof props.right === 'number' ? `${props.right}px` : String(props.right);
  }
  if (props.bottom !== undefined) {
    cssVars['--bpk-bottom'] = typeof props.bottom === 'number' ? `${props.bottom}px` : String(props.bottom);
  }
  if (props.left !== undefined) {
    cssVars['--bpk-left'] = typeof props.left === 'number' ? `${props.left}px` : String(props.left);
  }
  if (props.zIndex !== undefined) {
    cssVars['--bpk-z-index'] = String(props.zIndex);
  }

  // Handle visibility
  if (props.visibility !== undefined) {
    cssVars['--bpk-visibility'] = String(props.visibility);
  }

  // Handle opacity
  if (props.opacity !== undefined) {
    cssVars['--bpk-opacity'] = typeof props.opacity === 'number' ? String(props.opacity) : String(props.opacity);
  }

  // Handle additional border props
  const borderProps = [
    'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
    'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
    'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  ];
  for (const prop of borderProps) {
    const value = props[prop];
    if (value !== undefined) {
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      const cssVarName = `--bpk-${kebabPropName}`;
      
      if (prop.includes('Color')) {
        // Handle color tokens
        if (typeof value === 'string') {
          const transformedColor = transformColorToken(value as any);
          if (transformedColor !== undefined && transformedColor !== null) {
            cssVars[cssVarName] = transformedColor;
          } else {
            cssVars[cssVarName] = value;
          }
        }
      } else if (prop.includes('Radius') || prop.includes('Width')) {
        // Handle radius and width
        if (typeof value === 'number') {
          cssVars[cssVarName] = `${value}px`;
        } else if (typeof value === 'string') {
          if (prop.includes('Radius')) {
            cssVars[cssVarName] = convertBorderRadiusToCSSValue(value);
          } else {
            cssVars[cssVarName] = value;
          }
        }
      } else if (typeof value === 'string') {
        // Handle border shorthand
        cssVars[cssVarName] = value;
      }
    }
  }

  // Handle shadow props
  if (props.boxShadow !== undefined && typeof props.boxShadow === 'string') {
    cssVars['--bpk-box-shadow'] = props.boxShadow;
  }
  if (props.textShadow !== undefined && typeof props.textShadow === 'string') {
    cssVars['--bpk-text-shadow'] = props.textShadow;
  }

  // Handle typography props
  const typographyProps = [
    'fontSize', 'fontWeight', 'lineHeight', 'textAlign',
    'textTransform', 'textDecoration', 'letterSpacing',
  ];
  for (const prop of typographyProps) {
    const value = props[prop];
    if (value !== undefined) {
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      const cssVarName = `--bpk-${kebabPropName}`;
      
      if (typeof value === 'number') {
        if (prop === 'fontSize' || prop === 'lineHeight' || prop === 'letterSpacing') {
          cssVars[cssVarName] = `${value}px`;
        } else {
          cssVars[cssVarName] = String(value);
        }
      } else if (typeof value === 'string') {
        cssVars[cssVarName] = value;
      }
    }
  }

  // Handle cursor and pointer events
  if (props.cursor !== undefined && typeof props.cursor === 'string') {
    cssVars['--bpk-cursor'] = props.cursor;
  }
  if (props.pointerEvents !== undefined && typeof props.pointerEvents === 'string') {
    cssVars['--bpk-pointer-events'] = props.pointerEvents;
  }

  // Handle transform props
  if (props.transform !== undefined && typeof props.transform === 'string') {
    cssVars['--bpk-transform'] = props.transform;
  }
  if (props.transformOrigin !== undefined && typeof props.transformOrigin === 'string') {
    cssVars['--bpk-transform-origin'] = props.transformOrigin;
  }

  // Handle transition props
  const transitionProps = [
    'transition', 'transitionProperty', 'transitionDuration',
    'transitionTimingFunction', 'transitionDelay',
  ];
  for (const prop of transitionProps) {
    const value = props[prop];
    if (value !== undefined && typeof value === 'string') {
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      const cssVarName = `--bpk-${kebabPropName}`;
      cssVars[cssVarName] = value;
    }
  }

  // Handle float (specific to BpkFloat)
  if (props.float !== undefined && typeof props.float === 'string') {
    cssVars['--bpk-float'] = props.float;
  }

  // Handle orientation (specific to BpkSeparator)
  if (props.orientation !== undefined && typeof props.orientation === 'string') {
    // Orientation is handled via CSS properties, not CSS variables
    // This is set in propsToCSSProperties
  }

  // Handle ratio (specific to BpkAspectRatio)
  if (props.ratio !== undefined) {
    if (typeof props.ratio === 'number') {
      const paddingBottom = `${(1 / props.ratio) * 100}%`;
      cssVars['--bpk-padding-bottom'] = paddingBottom;
    } else if (typeof props.ratio === 'object' && props.ratio !== null) {
      const firstValue = Object.values(props.ratio)[0];
      if (typeof firstValue === 'number') {
        const paddingBottom = `${(1 / firstValue) * 100}%`;
        cssVars['--bpk-padding-bottom'] = paddingBottom;
      }
    }
  }

  // Handle Container-specific props
  if (props.maxW !== undefined) {
    if (typeof props.maxW === 'number') {
      cssVars['--bpk-max-width'] = `${props.maxW}px`;
    } else if (typeof props.maxW === 'string') {
      cssVars['--bpk-max-width'] = props.maxW;
    }
  }

  if (props.centerContent !== undefined) {
    // centerContent affects text-align, handled via CSS property
  }

  if (props.size !== undefined && typeof props.size === 'string') {
    const sizeMap: Record<string, string> = {
      'sm': '30rem',
      'md': '48rem',
      'lg': '62rem',
      'xl': '80rem',
      '2xl': '96rem',
      'full': '100%',
    };
    cssVars['--bpk-max-width'] = sizeMap[props.size] || props.size;
  }

  // Handle Grid-specific props
  const gridProps = [
    'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas',
    'gridColumn', 'gridRow', 'gridArea',
    'gridColumnStart', 'gridColumnEnd', 'gridRowStart', 'gridRowEnd',
    'gridAutoFlow', 'gridAutoRows', 'gridAutoColumns',
  ];
  for (const prop of gridProps) {
    const value = props[prop];
    if (value !== undefined) {
      const kebabPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      const cssVarName = `--bpk-${kebabPropName}`;
      if (typeof value === 'string') {
        cssVars[cssVarName] = value;
      } else if (typeof value === 'number') {
        cssVars[cssVarName] = String(value);
      }
    }
  }

  // Handle Wrap-specific props
  if (props.spacingX !== undefined) {
    const cssValue = convertSpacingToCSSValue(props.spacingX as string | number);
    cssVars['--bpk-column-gap'] = cssValue;
  }
  if (props.spacingY !== undefined) {
    const cssValue = convertSpacingToCSSValue(props.spacingY as string | number);
    cssVars['--bpk-row-gap'] = cssValue;
  }

  return cssVars;
}
