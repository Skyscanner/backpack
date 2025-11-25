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

import type { BpkSpacingValue, BpkColorValue } from './tokens';

/**
 * Common spacing-related props shared by all Backpack layout components
 * All spacing props must use Backpack spacing tokens or percentages
 */
export interface BpkSpacingProps {
  // Padding props
  padding?: BpkSpacingValue;
  paddingTop?: BpkSpacingValue;
  paddingRight?: BpkSpacingValue;
  paddingBottom?: BpkSpacingValue;
  paddingLeft?: BpkSpacingValue;
  p?: BpkSpacingValue;
  pt?: BpkSpacingValue;
  pr?: BpkSpacingValue;
  pb?: BpkSpacingValue;
  pl?: BpkSpacingValue;
  px?: BpkSpacingValue;
  py?: BpkSpacingValue;

  // Margin props
  margin?: BpkSpacingValue;
  marginTop?: BpkSpacingValue;
  marginRight?: BpkSpacingValue;
  marginBottom?: BpkSpacingValue;
  marginLeft?: BpkSpacingValue;
  m?: BpkSpacingValue;
  mt?: BpkSpacingValue;
  mr?: BpkSpacingValue;
  mb?: BpkSpacingValue;
  ml?: BpkSpacingValue;
  mx?: BpkSpacingValue;
  my?: BpkSpacingValue;

  // Gap and spacing
  gap?: BpkSpacingValue;
  spacing?: BpkSpacingValue;

  // Size props
  width?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  height?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  minWidth?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  minHeight?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  maxWidth?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  maxHeight?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';

  // Border radius (can use spacing tokens)
  borderRadius?: BpkSpacingValue;
  borderTopLeftRadius?: BpkSpacingValue;
  borderTopRightRadius?: BpkSpacingValue;
  borderBottomLeftRadius?: BpkSpacingValue;
  borderBottomRightRadius?: BpkSpacingValue;

  // Position props (can use spacing tokens)
  top?: BpkSpacingValue;
  right?: BpkSpacingValue;
  bottom?: BpkSpacingValue;
  left?: BpkSpacingValue;

  // Font size and line height (can use spacing tokens)
  fontSize?: BpkSpacingValue;
  lineHeight?: BpkSpacingValue;
}

/**
 * Common color-related props shared by all Backpack layout components
 * All color props must use Backpack color tokens or special values
 */
export interface BpkColorProps {
  color?: BpkColorValue;
  bg?: BpkColorValue;
  backgroundColor?: BpkColorValue;
  borderColor?: BpkColorValue;
  borderTopColor?: BpkColorValue;
  borderRightColor?: BpkColorValue;
  borderBottomColor?: BpkColorValue;
  borderLeftColor?: BpkColorValue;
}

/**
 * Common props for all Backpack layout components
 * Combines spacing and color props, and explicitly excludes className
 */
export interface BpkCommonLayoutProps extends BpkSpacingProps, BpkColorProps {
  // Explicitly exclude className
  className?: never;
}

