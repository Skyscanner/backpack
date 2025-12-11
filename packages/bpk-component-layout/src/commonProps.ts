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

import type {
  BpkSpacingValue,
  BpkSizeValue,
  BpkPositionValue,
  BpkResponsiveValue,
} from './tokens';

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
 * - Layout components other than BpkBox do not expose event handlers.
 * - BpkBox reintroduces a minimal set of events (onClick, onFocus, onBlur)
 *   on its own props type.
 */
export interface BpkCommonLayoutProps extends BpkSpacingProps {
  // Explicitly exclude className
  className?: never;

  // Explicitly exclude style to avoid ad-hoc inline styling on layout primitives.
  style?: never;
  sx?: never;
  css?: never;

  // Testing & automation attributes
  'data-testid'?: string;
  'data-cy'?: string;

  // Explicitly exclude color-related props to keep layout purely structural.
  // These props still exist on the underlying Chakra Box, so we mark them as
  // never here to prevent them from leaking into public layout APIs.
  color?: never;
  background?: never;
  backgroundColor?: never;
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

  // Explicitly exclude transition & transform related props for performance reasons
  transition?: never;
  transitionProperty?: never;
  transitionDuration?: never;
  transitionTimingFunction?: never;
  transitionDelay?: never;
  transform?: never;
  transformOrigin?: never;
}
