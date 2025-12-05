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
  BpkColorValue,
  BpkBorderWidthValue,
  BpkShadowValue,
  BpkSizeValue,
  BpkBorderRadiusValue,
} from './tokens';
import type { ConditionalValue as ResponsiveValue } from '@chakra-ui/react';

/**
 * Common spacing-related props shared by all Backpack layout components
 * All spacing props must use Backpack spacing tokens or percentages
 */
export interface BpkSpacingProps {
  // Padding props
  padding?: ResponsiveValue<BpkSpacingValue>;
  paddingTop?: ResponsiveValue<BpkSpacingValue>;
  paddingRight?: ResponsiveValue<BpkSpacingValue>;
  paddingBottom?: ResponsiveValue<BpkSpacingValue>;
  paddingLeft?: ResponsiveValue<BpkSpacingValue>;

  // Margin props
  margin?: ResponsiveValue<BpkSpacingValue>;
  marginTop?: ResponsiveValue<BpkSpacingValue>;
  marginRight?: ResponsiveValue<BpkSpacingValue>;
  marginBottom?: ResponsiveValue<BpkSpacingValue>;
  marginLeft?: ResponsiveValue<BpkSpacingValue>;
  marginStart?: ResponsiveValue<BpkSpacingValue>;
  marginEnd?: ResponsiveValue<BpkSpacingValue>;
  paddingStart?: ResponsiveValue<BpkSpacingValue>;
  paddingEnd?: ResponsiveValue<BpkSpacingValue>;
  marginInline?: ResponsiveValue<BpkSpacingValue>;
  paddingInline?: ResponsiveValue<BpkSpacingValue>;

  // Gap
  gap?: ResponsiveValue<BpkSpacingValue>;

  // Size props
  // width, height etc allow rem values, percentages and a small set of
  // semantic strings. We intentionally do not use spacing tokens here to
  // avoid coupling layout sizes to the spacing scale.
  width?: ResponsiveValue<BpkSizeValue>;
  height?: ResponsiveValue<BpkSizeValue>;
  minWidth?: ResponsiveValue<BpkSizeValue>;
  minHeight?: ResponsiveValue<BpkSizeValue>;
  maxWidth?: ResponsiveValue<BpkSizeValue>;
  maxHeight?: ResponsiveValue<BpkSizeValue>;

  // Border width (uses dedicated border size tokens)
  borderWidth?: ResponsiveValue<BpkBorderWidthValue>;
  borderTopWidth?: ResponsiveValue<BpkBorderWidthValue>;
  borderRightWidth?: ResponsiveValue<BpkBorderWidthValue>;
  borderBottomWidth?: ResponsiveValue<BpkBorderWidthValue>;
  borderLeftWidth?: ResponsiveValue<BpkBorderWidthValue>;

  // Border radius (uses dedicated border radius tokens)
  borderRadius?: ResponsiveValue<BpkBorderRadiusValue>;
  borderTopLeftRadius?: ResponsiveValue<BpkBorderRadiusValue>;
  borderTopRightRadius?: ResponsiveValue<BpkBorderRadiusValue>;
  borderBottomLeftRadius?: ResponsiveValue<BpkBorderRadiusValue>;
  borderBottomRightRadius?: ResponsiveValue<BpkBorderRadiusValue>;

  // Position props (can use spacing tokens)
  top?: ResponsiveValue<BpkSpacingValue>;
  right?: ResponsiveValue<BpkSpacingValue>;
  bottom?: ResponsiveValue<BpkSpacingValue>;
  left?: ResponsiveValue<BpkSpacingValue>;
}

/**
 * Common color-related props shared by all Backpack layout components
 * All color props must use Backpack color tokens or special values
 */
export interface BpkColorProps {
  color?: ResponsiveValue<BpkColorValue>;
  backgroundColor?: ResponsiveValue<BpkColorValue>;
  borderColor?: ResponsiveValue<BpkColorValue>;
  borderTopColor?: ResponsiveValue<BpkColorValue>;
  borderRightColor?: ResponsiveValue<BpkColorValue>;
  borderBottomColor?: ResponsiveValue<BpkColorValue>;
  borderLeftColor?: ResponsiveValue<BpkColorValue>;

  // Shadow (uses dedicated shadow tokens)
  boxShadow?: ResponsiveValue<BpkShadowValue>;
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
export interface BpkCommonLayoutProps extends BpkSpacingProps, BpkColorProps {
  // Explicitly exclude className
  className?: never;

  // Testing & automation attributes
  'data-testid'?: string;
  'data-cy'?: string;

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
