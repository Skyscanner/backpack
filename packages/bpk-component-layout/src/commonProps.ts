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

import type { ConditionalValue } from './styled-system/types';
import type { BpkSpacingValue, BpkColorValue } from './tokens';

type ResponsiveValue<T> = ConditionalValue<T>;

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
  p?: ResponsiveValue<BpkSpacingValue>;
  pt?: ResponsiveValue<BpkSpacingValue>;
  pr?: ResponsiveValue<BpkSpacingValue>;
  pb?: ResponsiveValue<BpkSpacingValue>;
  pl?: ResponsiveValue<BpkSpacingValue>;
  px?: ResponsiveValue<BpkSpacingValue>;
  py?: ResponsiveValue<BpkSpacingValue>;

  // Margin props
  margin?: ResponsiveValue<BpkSpacingValue>;
  marginTop?: ResponsiveValue<BpkSpacingValue>;
  marginRight?: ResponsiveValue<BpkSpacingValue>;
  marginBottom?: ResponsiveValue<BpkSpacingValue>;
  marginLeft?: ResponsiveValue<BpkSpacingValue>;
  m?: ResponsiveValue<BpkSpacingValue>;
  mt?: ResponsiveValue<BpkSpacingValue>;
  mr?: ResponsiveValue<BpkSpacingValue>;
  mb?: ResponsiveValue<BpkSpacingValue>;
  ml?: ResponsiveValue<BpkSpacingValue>;
  mx?: ResponsiveValue<BpkSpacingValue>;
  my?: ResponsiveValue<BpkSpacingValue>;

  // Gap
  gap?: ResponsiveValue<BpkSpacingValue>;

  // Size props
  // width, height etc allow string values like "auto", "full", "fit-content"
  // BUT we strictly type spacing values to BpkSpacingValue which excludes number
  width?: ResponsiveValue<BpkSpacingValue | 'auto' | 'full' | 'fit-content'>;
  height?: ResponsiveValue<BpkSpacingValue | 'auto' | 'full' | 'fit-content'>;
  minWidth?: ResponsiveValue<BpkSpacingValue | 'auto' | 'full' | 'fit-content'>;
  minHeight?: ResponsiveValue<BpkSpacingValue | 'auto' | 'full' | 'fit-content'>;
  maxWidth?: ResponsiveValue<BpkSpacingValue | 'auto' | 'full' | 'fit-content'>;
  maxHeight?: ResponsiveValue<BpkSpacingValue | 'auto' | 'full' | 'fit-content'>;

  // Border radius (can use spacing tokens)
  borderRadius?: ResponsiveValue<BpkSpacingValue>;
  borderTopLeftRadius?: ResponsiveValue<BpkSpacingValue>;
  borderTopRightRadius?: ResponsiveValue<BpkSpacingValue>;
  borderBottomLeftRadius?: ResponsiveValue<BpkSpacingValue>;
  borderBottomRightRadius?: ResponsiveValue<BpkSpacingValue>;

  // Position props (can use spacing tokens)
  top?: ResponsiveValue<BpkSpacingValue>;
  right?: ResponsiveValue<BpkSpacingValue>;
  bottom?: ResponsiveValue<BpkSpacingValue>;
  left?: ResponsiveValue<BpkSpacingValue>;

  // Font size and line height (can use spacing tokens)
  fontSize?: ResponsiveValue<BpkSpacingValue>;
  lineHeight?: ResponsiveValue<BpkSpacingValue>;
}

/**
 * Common color-related props shared by all Backpack layout components
 * All color props must use Backpack color tokens or special values
 */
export interface BpkColorProps {
  color?: ResponsiveValue<BpkColorValue>;
  bg?: ResponsiveValue<BpkColorValue>;
  backgroundColor?: ResponsiveValue<BpkColorValue>;
  borderColor?: ResponsiveValue<BpkColorValue>;
  borderTopColor?: ResponsiveValue<BpkColorValue>;
  borderRightColor?: ResponsiveValue<BpkColorValue>;
  borderBottomColor?: ResponsiveValue<BpkColorValue>;
  borderLeftColor?: ResponsiveValue<BpkColorValue>;
}

/**
 * Common props for all Backpack layout components
 * Combines spacing and color props, and explicitly excludes className
 */
export interface BpkCommonLayoutProps extends BpkSpacingProps, BpkColorProps {
  // Explicitly exclude className
  className?: never;
}
