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

import type { CSSProperties, ReactNode } from 'react';

import type StackOptionKeys from './BpkStack.constant';
import type { BpkCommonLayoutProps } from './commonProps';
import type { BpkSpacingValue, BpkResponsiveValue, BpkBasisValue } from './tokens';
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

export type FlexGridPropKeys = keyof BpkFlexGridProps;

/**
 * Curated subset of Box layout props that support Backpack responsive values.
 *
 * NOTE:
 * - These are structural layout props (flex/grid/display) that we want to allow
 *   on `BpkBox`, but using Backpack breakpoint keys rather than Chakra's
 *   array syntax or Chakra breakpoint keys.
 * - Spacing/size/position props are handled separately via `BpkCommonLayoutProps`.
 */
type BpkBoxResponsiveLayoutProps = {
  // Display
  display?: BpkResponsiveValue<BoxProps['display']>;

  // Flex container props
  flexDirection?: BpkResponsiveValue<BoxProps['flexDirection']>;
  flexWrap?: BpkResponsiveValue<BoxProps['flexWrap']>;
  justifyContent?: BpkResponsiveValue<BoxProps['justifyContent']>;
  alignItems?: BpkResponsiveValue<BoxProps['alignItems']>;
  alignContent?: BpkResponsiveValue<BoxProps['alignContent']>;

  // Flex item props
  flex?: BpkResponsiveValue<BoxProps['flex']>;
  flexGrow?: BpkResponsiveValue<BoxProps['flexGrow']>;
  flexShrink?: BpkResponsiveValue<BoxProps['flexShrink']>;
  flexBasis?: BpkResponsiveValue<BoxProps['flexBasis']>;
  order?: BpkResponsiveValue<BoxProps['order']>;
  alignSelf?: BpkResponsiveValue<BoxProps['alignSelf']>;
  justifySelf?: BpkResponsiveValue<BoxProps['justifySelf']>;

  // Grid container props
  gridTemplateColumns?: BpkResponsiveValue<BoxProps['gridTemplateColumns']>;
  gridTemplateRows?: BpkResponsiveValue<BoxProps['gridTemplateRows']>;
  gridTemplateAreas?: BpkResponsiveValue<BoxProps['gridTemplateAreas']>;
  gridAutoFlow?: BpkResponsiveValue<BoxProps['gridAutoFlow']>;
  gridAutoRows?: BpkResponsiveValue<BoxProps['gridAutoRows']>;
  gridAutoColumns?: BpkResponsiveValue<BoxProps['gridAutoColumns']>;

  // Grid item placement props (useful on Box when composing grids)
  gridColumn?: BpkResponsiveValue<BoxProps['gridColumn']>;
  gridRow?: BpkResponsiveValue<BoxProps['gridRow']>;
};

type BpkBoxResponsiveLayoutPropKeys = keyof BpkBoxResponsiveLayoutProps;

/**
 * Base type that removes common layout props, reserved props (className,
 * children) and all layout-level event props from Chakra UI props.
 *
 * These will be replaced with Backpack-specific types.
 */
export type RemoveCommonProps<T> = Omit<
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
  extends Omit<RemoveCommonProps<BoxProps>, BpkBoxResponsiveLayoutPropKeys>,
    BpkBoxResponsiveLayoutProps,
    Omit<BpkFlexGridProps, BpkBoxResponsiveLayoutPropKeys> {}

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
 * Props for BpkVessel component.
 *
 * BpkVessel is a "migration hatch" that re-allows `className` and `style`
 * while keeping the same layout prop surface as `BpkBox`.
 *
 * This enables gradual migration from legacy styling approaches by allowing:
 * - All BpkBox layout props (spacing, sizing, flex, grid, etc.)
 * - Custom CSS classes via `className`
 * - Inline styles via `style`
 *
 * @example
 * ```tsx
 * <BpkVessel
 *   padding={BpkSpacing.MD}
 *   className="legacy-wrapper"
 *   style={{ transition: 'opacity 0.3s' }}
 * >
 *   Content
 * </BpkVessel>
 * ```
 */
export type BpkVesselProps = BpkBoxProps & {
  /** Custom CSS class name(s) to apply to the element */
  className?: string;
  /** Inline styles to apply to the element */
  style?: CSSProperties;
};

/**
 * Component-specific props for BpkFlex
 * Includes all Flex props except those in BpkCommonLayoutProps
 */
export interface BpkFlexSpecificProps extends RemoveCommonProps<FlexProps> {
  direction?: BpkResponsiveValue<FlexProps['flexDirection']>;
  justify?: BpkResponsiveValue<FlexProps['justifyContent']>;
  align?: BpkResponsiveValue<FlexProps['alignItems']>;
  wrap?: BpkResponsiveValue<FlexProps['flexWrap']>;
  grow?: BpkResponsiveValue<FlexProps['flexGrow']>;
  shrink?: BpkResponsiveValue<FlexProps['flexShrink']>;
  basis?: BpkResponsiveValue<BpkBasisValue>;
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
  justify?: BpkResponsiveValue<GridProps['justifyContent']>;
  align?: BpkResponsiveValue<GridProps['alignItems']>;
  templateColumns?: BpkResponsiveValue<GridProps['gridTemplateColumns']>;
  templateRows?: BpkResponsiveValue<GridProps['gridTemplateRows']>;
  templateAreas?: BpkResponsiveValue<GridProps['gridTemplateAreas']>;
  autoFlow?: BpkResponsiveValue<GridProps['gridAutoFlow']>;
  autoRows?: BpkResponsiveValue<GridProps['gridAutoRows']>;
  autoColumns?: BpkResponsiveValue<GridProps['gridAutoColumns']>;
  rowGap?: BpkResponsiveValue<BpkSpacingValue>;
  columnGap?: BpkResponsiveValue<BpkSpacingValue>;
  column?: BpkResponsiveValue<GridProps['gridColumn']>;
  row?: BpkResponsiveValue<GridProps['gridRow']>;
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

// ---- Stack (moved from BpkStack.types.ts) ----
type StackOptionKeysType = typeof StackOptionKeys[number];

/**
 * Overrides StackOptions to support BpkResponsiveValue
 */
type BpkStackOptions = {
  [K in StackOptionKeysType]?: K extends keyof StackProps
    ? BpkResponsiveValue<StackProps[K]> | StackProps[K]
    : never;
};

/**
 * Component-specific props for BpkStack
 * Includes all Stack props except those in BpkCommonLayoutProps
 * Overrides StackOptions to support BpkResponsiveValue
 */
export interface BpkStackSpecificProps
  extends Omit<RemoveCommonProps<StackProps>, StackOptionKeysType>,
    BpkStackOptions,
    BpkFlexGridProps {}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps extends BpkCommonLayoutProps, BpkStackSpecificProps {
  children?: ReactNode;
}

export type { BpkCommonLayoutProps };
