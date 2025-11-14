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

import type { ResponsiveValue, SpacingValue, ColorValue } from './BpkBox/BpkBox.types';

/**
 * Base layout props shared by all layout components (BpkBox, BpkFlex, BpkGrid)
 * This provides a stable foundation with common layout, spacing, color, and interaction props
 */
export interface BpkBaseLayoutProps {
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
  paddingTop?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;

  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginRight?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginX?: SpacingValue;
  marginY?: SpacingValue;

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

