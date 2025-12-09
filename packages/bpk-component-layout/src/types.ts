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
import type { BpkSpacingValue, BpkResponsiveValue } from './tokens';
import type {
  BoxProps,
  FlexProps,
  GridProps,
  GridItemProps,
  StackProps,
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
 * Shorthand props from the underlying layout system that we do NOT expose on
 * Backpack layout components. These mostly mirror longer-form spacing,
 * sizing and visual props that we already model explicitly via
 * BpkCommonLayoutProps and BpkFlexGridProps.
 */
type DisallowedShorthandProps =
  // Spacing shorthands
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  // Size shorthands
  | 'w'
  | 'h'
  | 'minW'
  | 'maxW'
  | 'minH'
  | 'maxH'
  // Visual shorthands that map to props we have intentionally excluded
  | 'bg'
  | 'rounded'
  | 'shadow';

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
  | DisallowedShorthandProps
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
export interface BpkFlexSpecificProps extends RemoveCommonProps<FlexProps> {
  direction?: FlexProps['flexDirection'];
  justify?: FlexProps['justifyContent'];
  align?: FlexProps['alignItems'];
  wrap?: FlexProps['flexWrap'];
  grow?: FlexProps['flexGrow'];
  shrink?: FlexProps['flexShrink'];
  basis?: FlexProps['flexBasis'];
  inline?: boolean;
}

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
export interface BpkGridSpecificProps extends RemoveCommonProps<GridProps> {
  justify?: GridProps['justifyContent'];
  align?: GridProps['alignItems'];
  templateColumns?: GridProps['gridTemplateColumns'];
  templateRows?: GridProps['gridTemplateRows'];
  templateAreas?: GridProps['gridTemplateAreas'];
  autoFlow?: GridProps['gridAutoFlow'];
  autoRows?: GridProps['gridAutoRows'];
  autoColumns?: GridProps['gridAutoColumns'];
  rowGap?: GridProps['rowGap'];
  columnGap?: GridProps['columnGap'];
  column?: GridProps['gridColumn'];
  row?: GridProps['gridRow'];
  inline?: boolean;
}

/**
 * Props for BpkGrid component
 * Combines Grid-specific props with Backpack common layout props
 */
export interface BpkGridProps extends BpkCommonLayoutProps, BpkGridSpecificProps {
  children?: ReactNode;
}

/**
 * Component-specific props for BpkGridItem
 * Includes all GridItem props except those in BpkCommonLayoutProps
 */
export interface BpkGridItemSpecificProps extends RemoveCommonProps<GridItemProps> {
  area?: GridItemProps['area'];
  colEnd?: GridItemProps['colEnd'];
  colStart?: GridItemProps['colStart'];
  colSpan?: GridItemProps['colSpan'];
  rowEnd?: GridItemProps['rowEnd'];
  rowStart?: GridItemProps['rowStart'];
  rowSpan?: GridItemProps['rowSpan'];
}

/**
 * Props for BpkGridItem component
 * Combines GridItem-specific props with Backpack common layout props
 */
export interface BpkGridItemProps extends BpkCommonLayoutProps, BpkGridItemSpecificProps {
  children?: ReactNode;
}

/**
 * Component-specific props for BpkStack
 * Includes all Stack props except those in BpkCommonLayoutProps
 * Explicitly overrides spacing to enforce Backpack tokens
 */
export interface BpkStackSpecificProps extends Omit<RemoveCommonProps<StackProps>, 'spacing'> {
  spacing?: BpkResponsiveValue<BpkSpacingValue>;
}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps extends BpkCommonLayoutProps, BpkStackSpecificProps {
  children?: ReactNode;
}

export type { BpkCommonLayoutProps };
