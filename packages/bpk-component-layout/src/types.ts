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

import type { ReactNode } from 'react';

import type { BpkCommonLayoutProps } from './commonProps';
import type { BpkSpacingValue } from './tokens';
import type {
  BoxProps,
  FlexProps,
  GridProps,
  StackProps,
  ConditionalValue as ResponsiveValue,
} from '@chakra-ui/react';

/**
 * Layout-level event props that should not be exposed on layout components
 * by default. BpkBox will reintroduce a minimal subset (onClick, onFocus,
 * onBlur) explicitly on its own props type.
 */
type LayoutEventProps =
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseOver'
  | 'onMouseOut'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onKeyPress';

/**
 * Flexbox & grid layout props that we explicitly support on Backpack layout
 * components. These are a curated subset of the underlying Box flex/grid API
 * that are useful for structural layout.
 */
export interface BpkFlexGridProps {
  // Flex layout props
  display?: BoxProps['display'];
  flexDirection?: BoxProps['flexDirection'];
  flexWrap?: BoxProps['flexWrap'];
  justifyContent?: BoxProps['justifyContent'];
  alignItems?: BoxProps['alignItems'];
  alignContent?: BoxProps['alignContent'];

  flex?: BoxProps['flex'];
  flexGrow?: BoxProps['flexGrow'];
  flexShrink?: BoxProps['flexShrink'];
  flexBasis?: BoxProps['flexBasis'];
  order?: BoxProps['order'];
  alignSelf?: BoxProps['alignSelf'];
  justifySelf?: BoxProps['justifySelf'];

  // Grid layout props
  gridTemplateColumns?: BoxProps['gridTemplateColumns'];
  gridTemplateRows?: BoxProps['gridTemplateRows'];
  gridTemplateAreas?: BoxProps['gridTemplateAreas'];
  gridAutoFlow?: BoxProps['gridAutoFlow'];
  gridAutoRows?: BoxProps['gridAutoRows'];
  gridAutoColumns?: BoxProps['gridAutoColumns'];
  rowGap?: BoxProps['rowGap'];
  columnGap?: BoxProps['columnGap'];
}

type FlexGridPropKeys = keyof BpkFlexGridProps;

/**
 * Base type that removes common layout props, reserved props (className,
 * children) and all layout-level event props from Chakra UI props.
 *
 * These will be replaced with Backpack-specific types.
 */
type RemoveCommonProps<T> = Omit<
  T,
  | keyof BpkCommonLayoutProps
  | 'className'
  | 'children'
  | LayoutEventProps
  | FlexGridPropKeys
>;

/**
 * Component-specific props for BpkBox
 * Includes all Box props except those in BpkCommonLayoutProps
 */
export interface BpkBoxSpecificProps
  extends RemoveCommonProps<BoxProps>,
    BpkFlexGridProps {}

/**
 * Props for BpkBox component
 * Combines Box-specific props with Backpack common layout props
 * and reintroduces a minimal set of interaction props.
 */
type BoxEventProps = Pick<BoxProps,
  'onClick' | 'onFocus' | 'onBlur'
>;

export interface BpkBoxProps extends BpkCommonLayoutProps, BpkBoxSpecificProps {
  children?: ReactNode;
  onClick?: BoxEventProps['onClick'];
  onFocus?: BoxEventProps['onFocus'];
  onBlur?: BoxEventProps['onBlur'];
}

/**
 * Component-specific props for BpkFlex
 * Includes all Flex props except those in BpkCommonLayoutProps
 */
export interface BpkFlexSpecificProps extends RemoveCommonProps<FlexProps> {}

/**
 * Props for BpkFlex component
 * Combines Flex-specific props with Backpack common layout props
 */
export interface BpkFlexProps extends BpkCommonLayoutProps, BpkFlexSpecificProps {
  children?: ReactNode;
}

/**
 * Component-specific props for BpkGrid
 * Includes all Grid props except those in BpkCommonLayoutProps
 */
export interface BpkGridSpecificProps extends RemoveCommonProps<GridProps> {}

/**
 * Props for BpkGrid component
 * Combines Grid-specific props with Backpack common layout props
 */
export interface BpkGridProps extends BpkCommonLayoutProps, BpkGridSpecificProps {
  children?: ReactNode;
}

/**
 * Component-specific props for BpkStack
 * Includes all Stack props except those in BpkCommonLayoutProps
 * Explicitly overrides spacing to enforce Backpack tokens
 */
export interface BpkStackSpecificProps extends Omit<RemoveCommonProps<StackProps>, 'spacing'> {
  spacing?: ResponsiveValue<BpkSpacingValue>;
}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps extends BpkCommonLayoutProps, BpkStackSpecificProps {
  children?: ReactNode;
}

export type { BpkCommonLayoutProps };
