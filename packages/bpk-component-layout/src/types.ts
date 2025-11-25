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

import type { BoxProps, FlexProps, GridProps, StackProps } from '@chakra-ui/react';
import type { BpkSpacingValue, BpkColorValue, BpkBreakpointValue } from './tokens';

/**
 * Type that excludes numeric spacing values (px, rem, em) but allows tokens and percentages
 * Note: We allow string to accept token names, but validation happens at runtime
 */
type BpkSpacing = BpkSpacingValue | string;

/**
 * Type that only allows Backpack color tokens or special values
 */
type BpkColor = BpkColorValue;

/**
 * Type that only allows Backpack breakpoint tokens
 */
type BpkBreakpoint = BpkBreakpointValue;

/**
 * Utility type to replace spacing-related props with Backpack token types
 */
type ReplaceSpacingProps<T> = Omit<
  T,
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'gap'
  | 'spacing'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'minHeight'
  | 'maxWidth'
  | 'maxHeight'
> & {
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
  gap?: BpkSpacingValue;
  spacing?: BpkSpacingValue;
  width?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  height?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  minWidth?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  minHeight?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  maxWidth?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
  maxHeight?: BpkSpacingValue | 'auto' | 'full' | 'fit-content';
};

/**
 * Utility type to replace color-related props with Backpack token types
 */
type ReplaceColorProps<T> = Omit<T, 'color' | 'bg' | 'backgroundColor' | 'borderColor'> & {
  color?: BpkColorValue;
  bg?: BpkColorValue;
  backgroundColor?: BpkColorValue;
  borderColor?: BpkColorValue;
};

/**
 * Base props type for Backpack layout components
 * Removes className and restricts spacing/color props to Backpack tokens
 */
export type BpkLayoutProps<T> = ReplaceSpacingProps<ReplaceColorProps<Omit<T, 'className'>>>;

/**
 * Props for BpkBox component
 */
export type BpkBoxProps = BpkLayoutProps<BoxProps>;

/**
 * Props for BpkFlex component
 */
export type BpkFlexProps = BpkLayoutProps<FlexProps>;

/**
 * Props for BpkGrid component
 */
export type BpkGridProps = BpkLayoutProps<GridProps>;

/**
 * Props for BpkStack component
 */
export type BpkStackProps = BpkLayoutProps<StackProps>;

