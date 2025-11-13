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

import type { ElementType, ReactNode } from 'react';
// eslint-disable-next-line no-restricted-imports
import type React from 'react';

import type { BpkColorToken } from './colorTokenTransformers';
import type { BpkBaseLayoutProps } from './BpkBaseLayoutProps.types';

/**
 * Responsive value type - can be a single value or an object with breakpoint keys
 */
export type ResponsiveValue<T> = T | Record<string, T>;

/**
 * Spacing value type - accepts Backpack token strings or Chakra UI spacing values
 */
export type SpacingValue = ResponsiveValue<string | number>;

/**
 * Color value type - restricted to Backpack color tokens only
 */
export type ColorValue = ResponsiveValue<BpkColorToken>;

/**
 * Box-specific props for BpkBox
 * BpkBox supports both flexbox and grid props for flexibility
 */
export interface BpkBoxSpecificProps {
  // Flexbox props (for when BpkBox is used with display: flex)
  flex?: ResponsiveValue<string | number>;
  flexDirection?: ResponsiveValue<string>;
  flexWrap?: ResponsiveValue<string>;
  flexGrow?: ResponsiveValue<string | number>;
  flexShrink?: ResponsiveValue<string | number>;
  flexBasis?: ResponsiveValue<string | number>;
  alignItems?: ResponsiveValue<string>;
  alignContent?: ResponsiveValue<string>;
  alignSelf?: ResponsiveValue<string>;
  justifyContent?: ResponsiveValue<string>;
  justifyItems?: ResponsiveValue<string>;
  justifySelf?: ResponsiveValue<string>;
  order?: ResponsiveValue<string | number>;

  // Grid props (for when BpkBox is used with display: grid)
  gridTemplateColumns?: ResponsiveValue<string>;
  gridTemplateRows?: ResponsiveValue<string>;
  gridTemplateAreas?: ResponsiveValue<string>;
  gridColumn?: ResponsiveValue<string>;
  gridRow?: ResponsiveValue<string>;
  gridArea?: ResponsiveValue<string>;
  gridGap?: SpacingValue;
  gridColumnGap?: SpacingValue;
  gridRowGap?: SpacingValue;
}

/**
 * Controlled props for BpkBox
 * This interface explicitly defines which props are allowed, providing a stable API
 * BpkBox extends base layout props and adds flexbox/grid props for flexibility
 */
export interface BpkBoxProps extends BpkBaseLayoutProps, BpkBoxSpecificProps {}

/**
 * Type guard to check if a prop is a valid BpkBox prop.
 * This can be used for runtime validation if needed.
 *
 * @param {string} prop - The prop name to check.
 * @returns {boolean} True if the prop is allowed for BpkBox, false otherwise.
 */
export const isAllowedBpkBoxProp = (prop: string): boolean => {
  const allowedProps = new Set([
    'as',
    'children',
    // Layout
    'width',
    'height',
    'minWidth',
    'maxWidth',
    'minHeight',
    'maxHeight',
    // Spacing
    'padding',
    'p',
    'paddingTop',
    'pt',
    'paddingRight',
    'pr',
    'paddingBottom',
    'pb',
    'paddingLeft',
    'pl',
    'paddingX',
    'px',
    'paddingY',
    'py',
    'margin',
    'm',
    'marginTop',
    'mt',
    'marginRight',
    'mr',
    'marginBottom',
    'mb',
    'marginLeft',
    'ml',
    'marginX',
    'mx',
    'marginY',
    'my',
    'gap',
    'rowGap',
    'columnGap',
    // Display
    'display',
    'visibility',
    'overflow',
    'overflowX',
    'overflowY',
    // Position
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'zIndex',
    // Flexbox
    'flex',
    'flexDirection',
    'flexWrap',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'alignItems',
    'alignContent',
    'alignSelf',
    'justifyContent',
    'justifyItems',
    'justifySelf',
    'order',
    // Grid
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridTemplateAreas',
    'gridColumn',
    'gridRow',
    'gridArea',
    'gridGap',
    'gridColumnGap',
    'gridRowGap',
    // Color
    'bg',
    'backgroundColor',
    'color',
    'opacity',
    // Border
    'border',
    'borderWidth',
    'borderStyle',
    'borderColor',
    'borderRadius',
    'borderTop',
    'borderRight',
    'borderBottom',
    'borderLeft',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    // Shadow
    'boxShadow',
    'textShadow',
    // Typography
    'fontSize',
    'fontWeight',
    'lineHeight',
    'textAlign',
    'textTransform',
    'textDecoration',
    'letterSpacing',
    // Cursor
    'cursor',
    'pointerEvents',
    // Transform
    'transform',
    'transformOrigin',
    // Transition
    'transition',
    'transitionProperty',
    'transitionDuration',
    'transitionTimingFunction',
    'transitionDelay',
    // Events
    'onClick',
    'onMouseEnter',
    'onMouseLeave',
    'onFocus',
    'onBlur',
    // Accessibility
    'id',
    'role',
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'tabIndex',
    // Data attributes
    'data-testid',
    'data-cy',
  ]);

  return allowedProps.has(prop);
};

