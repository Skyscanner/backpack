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

import type { AriaAttributes, AriaRole, CSSProperties, KeyboardEventHandler, MouseEventHandler } from 'react';

import type { BpkLayoutBackgroundColor } from './backgroundColors';
import type {
  BpkSpacingValue,
  BpkSizeValue,
  BpkPositionValue,
  BpkPositionKeyword,
  BpkOverflowValue,
  BpkZIndexValue,
  BpkResponsiveValue,
} from './tokens';
import type { TextColor, TextStyle } from '../../bpk-component-text';

/**
 * Common spacing-related props shared by all Backpack layout components
 * All spacing props must use Backpack spacing tokens or percentages
 */
export interface BpkSpacingProps {
  // Padding props
  padding?: BpkResponsiveValue<BpkSpacingValue>;
  paddingTop?: BpkResponsiveValue<BpkSpacingValue>;
  paddingRight?: BpkResponsiveValue<BpkSpacingValue>;
  paddingBottom?: BpkResponsiveValue<BpkSpacingValue>;
  paddingLeft?: BpkResponsiveValue<BpkSpacingValue>;

  // Margin props
  margin?: BpkResponsiveValue<BpkSpacingValue>;
  marginTop?: BpkResponsiveValue<BpkSpacingValue>;
  marginRight?: BpkResponsiveValue<BpkSpacingValue>;
  marginBottom?: BpkResponsiveValue<BpkSpacingValue>;
  marginLeft?: BpkResponsiveValue<BpkSpacingValue>;
  marginStart?: BpkResponsiveValue<BpkSpacingValue>;
  marginEnd?: BpkResponsiveValue<BpkSpacingValue>;
  paddingStart?: BpkResponsiveValue<BpkSpacingValue>;
  paddingEnd?: BpkResponsiveValue<BpkSpacingValue>;
  marginInline?: BpkResponsiveValue<BpkSpacingValue>;
  paddingInline?: BpkResponsiveValue<BpkSpacingValue>;

  // Gap
  gap?: BpkResponsiveValue<BpkSpacingValue>;

  // Size props
  // width, height etc allow rem values, percentages and a small set of
  // semantic strings. We intentionally do not use spacing tokens here to
  // avoid coupling layout sizes to the spacing scale.
  width?: BpkResponsiveValue<BpkSizeValue>;
  height?: BpkResponsiveValue<BpkSizeValue>;
  minWidth?: BpkResponsiveValue<BpkSizeValue>;
  minHeight?: BpkResponsiveValue<BpkSizeValue>;
  maxWidth?: BpkResponsiveValue<BpkSizeValue>;
  maxHeight?: BpkResponsiveValue<BpkSizeValue>;

  // Position props (use rem values or percentages)
  top?: BpkResponsiveValue<BpkPositionValue>;
  right?: BpkResponsiveValue<BpkPositionValue>;
  bottom?: BpkResponsiveValue<BpkPositionValue>;
  left?: BpkResponsiveValue<BpkPositionValue>;
}

/**
 * Common props for all Backpack layout components
 * Combines spacing and color props, and explicitly excludes className and
 * certain props (e.g. typography, composite borders, transitions) to keep
 * layout components purely structural.
 *
 * NOTE:
 * - Layout components expose onClick, tabIndex and role to support interactive
 *   container patterns (e.g. clickable cards, landmark regions).
 * - BpkBox additionally exposes onFocus and onBlur on its own props type.
 */
export interface BpkCommonLayoutProps extends BpkSpacingProps, AriaAttributes {
  // Explicitly exclude className
  className?: never;

  // Explicitly exclude style to avoid ad-hoc inline styling on layout primitives.
  style?: never;

  // Interaction & accessibility props
  id?: string;
  tabIndex?: number;
  role?: AriaRole;
  onClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;

  // Typography
  textStyle?: BpkResponsiveValue<TextStyle>;

  // CSS `position` keyword (static | relative | absolute | fixed | sticky)
  position?: BpkResponsiveValue<BpkPositionKeyword>;

  // Overflow & stacking context
  overflow?: BpkResponsiveValue<BpkOverflowValue>;
  overflowX?: BpkResponsiveValue<BpkOverflowValue>;
  overflowY?: BpkResponsiveValue<BpkOverflowValue>;
  zIndex?: BpkZIndexValue;

  // Testing & automation attributes
  'data-testid'?: string;
  'data-cy'?: string;

  // Text color — same tokens as BpkText
  color?: TextColor;

  // Background color — surface, canvas, and status fill tokens
  backgroundColor?: BpkLayoutBackgroundColor;

  // Explicitly exclude raw Chakra color-related props that are not part of
  // the Backpack token API.
  background?: never;
  borderColor?: never;
  borderTopColor?: never;
  borderRightColor?: never;
  borderBottomColor?: never;
  borderLeftColor?: never;

  // Explicitly exclude border width props from the public layout API for now.
  borderWidth?: never;
  borderTopWidth?: never;
  borderRightWidth?: never;
  borderBottomWidth?: never;
  borderLeftWidth?: never;

  // Explicitly exclude border radius props from the public layout API for now.
  borderRadius?: never;
  borderTopLeftRadius?: never;
  borderTopRightRadius?: never;
  borderBottomLeftRadius?: never;
  borderBottomRightRadius?: never;

  // Explicitly exclude shadow props from the public layout API for now.
  boxShadow?: never;

  // Explicitly exclude composite border shorthand props to enforce tokenised API
  border?: never;
  borderTop?: never;
  borderRight?: never;
  borderBottom?: never;
  borderLeft?: never;
  borderInline?: never;
  borderBlock?: never;
  borderX?: never;
  borderY?: never;

  // Text layout
  textAlign?: BpkResponsiveValue<CSSProperties['textAlign']>;
  whiteSpace?: CSSProperties['whiteSpace'];

  // Visual / interaction
  cursor?: CSSProperties['cursor'];
  opacity?: CSSProperties['opacity'];
  visibility?: CSSProperties['visibility'];
  pointerEvents?: CSSProperties['pointerEvents'];
  userSelect?: CSSProperties['userSelect'];

  // Explicitly exclude transition & transform related props for performance reasons
  transition?: never;
  transitionProperty?: never;
  transitionDuration?: never;
  transitionTimingFunction?: never;
  transitionDelay?: never;
  transform?: never;
  transformOrigin?: never;
}
