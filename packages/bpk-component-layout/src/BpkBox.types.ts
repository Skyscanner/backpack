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
 * Controlled props for BpkBox
 * This interface explicitly defines which props are allowed, providing a stable API
 */
export interface BpkBoxProps {
  // Core props
  as?: ElementType;
  children?: ReactNode;

  // Layout props
  width?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  minWidth?: ResponsiveValue<string | number>;
  maxWidth?: ResponsiveValue<string | number>;
  minHeight?: ResponsiveValue<string | number>;
  maxHeight?: ResponsiveValue<string | number>;

  // Spacing props (accept Backpack tokens as strings)
  padding?: SpacingValue;
  p?: SpacingValue;
  paddingTop?: SpacingValue;
  pt?: SpacingValue;
  paddingRight?: SpacingValue;
  pr?: SpacingValue;
  paddingBottom?: SpacingValue;
  pb?: SpacingValue;
  paddingLeft?: SpacingValue;
  pl?: SpacingValue;
  paddingX?: SpacingValue;
  px?: SpacingValue;
  paddingY?: SpacingValue;
  py?: SpacingValue;

  margin?: SpacingValue;
  m?: SpacingValue;
  marginTop?: SpacingValue;
  mt?: SpacingValue;
  marginRight?: SpacingValue;
  mr?: SpacingValue;
  marginBottom?: SpacingValue;
  mb?: SpacingValue;
  marginLeft?: SpacingValue;
  ml?: SpacingValue;
  marginX?: SpacingValue;
  mx?: SpacingValue;
  marginY?: SpacingValue;
  my?: SpacingValue;

  // Gap props
  gap?: SpacingValue;
  rowGap?: SpacingValue;
  columnGap?: SpacingValue;

  // Display props
  display?: ResponsiveValue<string>;
  visibility?: ResponsiveValue<string>;
  overflow?: ResponsiveValue<string>;
  overflowX?: ResponsiveValue<string>;
  overflowY?: ResponsiveValue<string>;

  // Position props
  position?: ResponsiveValue<string>;
  top?: ResponsiveValue<string | number>;
  right?: ResponsiveValue<string | number>;
  bottom?: ResponsiveValue<string | number>;
  left?: ResponsiveValue<string | number>;
  zIndex?: ResponsiveValue<string | number>;

  // Flexbox props
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

  // Grid props
  gridTemplateColumns?: ResponsiveValue<string>;
  gridTemplateRows?: ResponsiveValue<string>;
  gridTemplateAreas?: ResponsiveValue<string>;
  gridColumn?: ResponsiveValue<string>;
  gridRow?: ResponsiveValue<string>;
  gridArea?: ResponsiveValue<string>;
  gridGap?: SpacingValue;
  gridColumnGap?: SpacingValue;
  gridRowGap?: SpacingValue;

  // Color props (restricted to Backpack color tokens only)
  bg?: ColorValue;
  backgroundColor?: ColorValue;
  color?: ColorValue;
  opacity?: ResponsiveValue<string | number>;

  // Border props
  border?: ResponsiveValue<string>;
  borderWidth?: ResponsiveValue<string | number>;
  borderStyle?: ResponsiveValue<string>;
  borderColor?: ColorValue;
  borderRadius?: ResponsiveValue<string | number>;
  borderTop?: ResponsiveValue<string>;
  borderRight?: ResponsiveValue<string>;
  borderBottom?: ResponsiveValue<string>;
  borderLeft?: ResponsiveValue<string>;
  borderTopWidth?: ResponsiveValue<string | number>;
  borderRightWidth?: ResponsiveValue<string | number>;
  borderBottomWidth?: ResponsiveValue<string | number>;
  borderLeftWidth?: ResponsiveValue<string | number>;
  borderTopColor?: ColorValue;
  borderRightColor?: ColorValue;
  borderBottomColor?: ColorValue;
  borderLeftColor?: ColorValue;
  borderTopLeftRadius?: ResponsiveValue<string | number>;
  borderTopRightRadius?: ResponsiveValue<string | number>;
  borderBottomLeftRadius?: ResponsiveValue<string | number>;
  borderBottomRightRadius?: ResponsiveValue<string | number>;

  // Shadow props
  boxShadow?: ResponsiveValue<string>;
  textShadow?: ResponsiveValue<string>;

  // Typography props (limited set)
  fontSize?: ResponsiveValue<string | number>;
  fontWeight?: ResponsiveValue<string | number>;
  lineHeight?: ResponsiveValue<string | number>;
  textAlign?: ResponsiveValue<string>;
  textTransform?: ResponsiveValue<string>;
  textDecoration?: ResponsiveValue<string>;
  letterSpacing?: ResponsiveValue<string | number>;

  // Cursor and pointer events
  cursor?: ResponsiveValue<string>;
  pointerEvents?: ResponsiveValue<string>;

  // Transform props
  transform?: ResponsiveValue<string>;
  transformOrigin?: ResponsiveValue<string>;

  // Transition props
  transition?: ResponsiveValue<string>;
  transitionProperty?: ResponsiveValue<string>;
  transitionDuration?: ResponsiveValue<string>;
  transitionTimingFunction?: ResponsiveValue<string>;
  transitionDelay?: ResponsiveValue<string>;

  // Event handlers (standard React events)
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;

  // Accessibility props
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  tabIndex?: number;

  // Data attributes (for testing, etc.)
  'data-testid'?: string;
  'data-cy'?: string;
}

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

