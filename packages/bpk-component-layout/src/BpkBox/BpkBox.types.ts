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

import type { BpkBaseLayoutProps } from '../BpkBaseLayoutProps.types';
import type { BpkColorTokenEnum } from '../colorTokenTransformers';
import type {
  DisplayValue,
  FlexDirectionValue,
  FlexWrapValue,
  AlignItemsValue,
  AlignContentValue,
  AlignSelfValue,
  JustifyContentValue,
  JustifyItemsValue,
  JustifySelfValue,
  OverflowValue,
  PositionValue,
  BorderStyleValue,
  TextAlignValue,
  TextTransformValue,
  TextDecorationValue,
  CursorValue,
  PointerEventsValue,
  VisibilityValue,
} from '../layoutPropTypes';

/**
 * Responsive value type - can be a single value or an object with breakpoint keys
 */
export type ResponsiveValue<T> = T | Record<string, T>;

/**
 * Spacing value type - accepts Backpack token strings or Chakra UI spacing values
 */
export type SpacingValue = ResponsiveValue<string | number>;

/**
 * Color value type - restricted to Backpack color token enum values only
 * Similar to TextColor in BpkText, this provides type-safe color token access
 */
export type ColorValue = ResponsiveValue<BpkColorTokenEnum>;

/**
 * Box-specific props for BpkBox
 * BpkBox supports both flexbox and grid props for flexibility
 */
export interface BpkBoxSpecificProps {
  // Flexbox props (for when BpkBox is used with display: flex)
  flex?: ResponsiveValue<string | number>;
  flexDirection?: ResponsiveValue<FlexDirectionValue>;
  flexWrap?: ResponsiveValue<FlexWrapValue>;
  flexGrow?: ResponsiveValue<string | number>;
  flexShrink?: ResponsiveValue<string | number>;
  flexBasis?: ResponsiveValue<string | number>;
  alignItems?: ResponsiveValue<AlignItemsValue>;
  alignContent?: ResponsiveValue<AlignContentValue>;
  alignSelf?: ResponsiveValue<AlignSelfValue>;
  justifyContent?: ResponsiveValue<JustifyContentValue>;
  justifyItems?: ResponsiveValue<JustifyItemsValue>;
  justifySelf?: ResponsiveValue<JustifySelfValue>;
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
    // Logical spacing props (automatically adapt to RTL/LTR)
    'marginStart',
    'marginEnd',
    'paddingStart',
    'paddingEnd',
    'marginInline',
    'paddingInline',
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

