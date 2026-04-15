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

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';


import type { BpkCommonLayoutProps } from './commonProps';
import type { BpkSpacingValue, BpkResponsiveValue, BpkBasisValue } from './tokens';

/**
 * Flexbox & grid layout props that we explicitly support on Backpack layout
 * components. These are a curated subset of CSS flex/grid properties
 * useful for structural layout.
 */
export interface BpkFlexGridProps {
  // Flex layout props
  display?: BpkResponsiveValue<CSSProperties['display']>;
  flexDirection?: BpkResponsiveValue<CSSProperties['flexDirection']>;
  flexWrap?: BpkResponsiveValue<CSSProperties['flexWrap']>;
  justifyContent?: BpkResponsiveValue<CSSProperties['justifyContent']>;
  alignItems?: BpkResponsiveValue<CSSProperties['alignItems']>;
  alignContent?: BpkResponsiveValue<CSSProperties['alignContent']>;

  flex?: BpkResponsiveValue<CSSProperties['flex']>;
  flexGrow?: BpkResponsiveValue<CSSProperties['flexGrow']>;
  flexShrink?: BpkResponsiveValue<CSSProperties['flexShrink']>;
  flexBasis?: BpkResponsiveValue<CSSProperties['flexBasis']>;
  order?: BpkResponsiveValue<CSSProperties['order']>;
  alignSelf?: BpkResponsiveValue<CSSProperties['alignSelf']>;
  justifySelf?: BpkResponsiveValue<CSSProperties['justifySelf']>;

  // Grid layout props
  gridTemplateColumns?: BpkResponsiveValue<CSSProperties['gridTemplateColumns']>;
  gridTemplateRows?: BpkResponsiveValue<CSSProperties['gridTemplateRows']>;
  gridTemplateAreas?: BpkResponsiveValue<CSSProperties['gridTemplateAreas']>;
  gridAutoFlow?: BpkResponsiveValue<CSSProperties['gridAutoFlow']>;
  gridAutoRows?: BpkResponsiveValue<CSSProperties['gridAutoRows']>;
  gridAutoColumns?: BpkResponsiveValue<CSSProperties['gridAutoColumns']>;
  rowGap?: BpkResponsiveValue<BpkSpacingValue>;
  columnGap?: BpkResponsiveValue<BpkSpacingValue>;
}

export type FlexGridPropKeys = keyof BpkFlexGridProps;

/**
 * Curated subset of layout props that support Backpack responsive values.
 * These are structural layout props (flex/grid/display) allowed on `BpkBox`.
 */
type BpkBoxResponsiveLayoutProps = {
  // Display
  display?: BpkResponsiveValue<CSSProperties['display']>;

  // Flex container props
  flexDirection?: BpkResponsiveValue<CSSProperties['flexDirection']>;
  flexWrap?: BpkResponsiveValue<CSSProperties['flexWrap']>;
  justifyContent?: BpkResponsiveValue<CSSProperties['justifyContent']>;
  alignItems?: BpkResponsiveValue<CSSProperties['alignItems']>;
  alignContent?: BpkResponsiveValue<CSSProperties['alignContent']>;

  // Flex item props
  flex?: BpkResponsiveValue<CSSProperties['flex']>;
  flexGrow?: BpkResponsiveValue<CSSProperties['flexGrow']>;
  flexShrink?: BpkResponsiveValue<CSSProperties['flexShrink']>;
  flexBasis?: BpkResponsiveValue<CSSProperties['flexBasis']>;
  order?: BpkResponsiveValue<CSSProperties['order']>;
  alignSelf?: BpkResponsiveValue<CSSProperties['alignSelf']>;
  justifySelf?: BpkResponsiveValue<CSSProperties['justifySelf']>;

  // Grid container props
  gridTemplateColumns?: BpkResponsiveValue<CSSProperties['gridTemplateColumns']>;
  gridTemplateRows?: BpkResponsiveValue<CSSProperties['gridTemplateRows']>;
  gridTemplateAreas?: BpkResponsiveValue<CSSProperties['gridTemplateAreas']>;
  gridAutoFlow?: BpkResponsiveValue<CSSProperties['gridAutoFlow']>;
  gridAutoRows?: BpkResponsiveValue<CSSProperties['gridAutoRows']>;
  gridAutoColumns?: BpkResponsiveValue<CSSProperties['gridAutoColumns']>;

  // Grid item placement props
  gridColumn?: BpkResponsiveValue<CSSProperties['gridColumn']>;
  gridRow?: BpkResponsiveValue<CSSProperties['gridRow']>;
};

/**
 * Component-specific props for BpkBox
 */
export interface BpkBoxSpecificProps extends BpkBoxResponsiveLayoutProps, BpkFlexGridProps {}

/**
 * Props for BpkBox component
 * Combines Box-specific props with Backpack common layout props.
 */
export interface BpkBoxProps extends BpkCommonLayoutProps, BpkBoxSpecificProps {
  children?: ReactNode;
  onFocus?: HTMLAttributes<HTMLDivElement>['onFocus'];
  onBlur?: HTMLAttributes<HTMLDivElement>['onBlur'];
}

/**
 * Valid HTML elements that can be used with BpkVessel
 */
export type VesselElement =
  | 'div'
  | 'span'
  | 'section'
  | 'article'
  | 'nav'
  | 'main'
  | 'aside'
  | 'header'
  | 'footer';

/**
 * Props for BpkVessel component.
 *
 * BpkVessel is a "migration hatch" that renders an HTML element
 * and accepts all standard HTML attributes for maximum migration flexibility.
 */
export type BpkVesselProps = {
  as?: VesselElement;
} & HTMLAttributes<HTMLElement>;

/**
 * Component-specific props for BpkFlex
 */
export interface BpkFlexSpecificProps {
  direction?: BpkResponsiveValue<CSSProperties['flexDirection']>;
  justify?: BpkResponsiveValue<CSSProperties['justifyContent']>;
  align?: BpkResponsiveValue<CSSProperties['alignItems']>;
  wrap?: BpkResponsiveValue<CSSProperties['flexWrap']>;
  grow?: BpkResponsiveValue<CSSProperties['flexGrow']>;
  shrink?: BpkResponsiveValue<CSSProperties['flexShrink']>;
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
 */
export interface BpkGridSpecificProps {
  justify?: BpkResponsiveValue<CSSProperties['justifyContent']>;
  align?: BpkResponsiveValue<CSSProperties['alignItems']>;
  templateColumns?: BpkResponsiveValue<CSSProperties['gridTemplateColumns']>;
  templateRows?: BpkResponsiveValue<CSSProperties['gridTemplateRows']>;
  templateAreas?: BpkResponsiveValue<CSSProperties['gridTemplateAreas']>;
  autoFlow?: BpkResponsiveValue<CSSProperties['gridAutoFlow']>;
  autoRows?: BpkResponsiveValue<CSSProperties['gridAutoRows']>;
  autoColumns?: BpkResponsiveValue<CSSProperties['gridAutoColumns']>;
  rowGap?: BpkResponsiveValue<BpkSpacingValue>;
  columnGap?: BpkResponsiveValue<BpkSpacingValue>;
  column?: BpkResponsiveValue<CSSProperties['gridColumn']>;
  row?: BpkResponsiveValue<CSSProperties['gridRow']>;
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
 */
export interface BpkGridItemSpecificProps {
  area?: CSSProperties['gridArea'];
  colEnd?: number;
  colStart?: number;
  colSpan?: number;
  rowEnd?: number;
  rowStart?: number;
  rowSpan?: number;
}

/**
 * Props for BpkGridItem component
 * Combines GridItem-specific props with Backpack common layout props
 */
export interface BpkGridItemProps extends BpkCommonLayoutProps, BpkGridItemSpecificProps {
  children?: ReactNode;
}

// ---- Stack ----
/**
 * Stack-specific option props using the public API names.
 * These map to CSS-standard names internally:
 *   align → alignItems, justify → justifyContent, wrap → flexWrap, direction → flexDirection
 */
type BpkStackOptions = {
  align?: BpkResponsiveValue<CSSProperties['alignItems']> | CSSProperties['alignItems'];
  justify?: BpkResponsiveValue<CSSProperties['justifyContent']> | CSSProperties['justifyContent'];
  wrap?: BpkResponsiveValue<CSSProperties['flexWrap']> | CSSProperties['flexWrap'];
  direction?: BpkResponsiveValue<CSSProperties['flexDirection']> | CSSProperties['flexDirection'];
};

/**
 * Component-specific props for BpkStack
 */
export interface BpkStackSpecificProps extends BpkStackOptions, BpkFlexGridProps {}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps extends BpkCommonLayoutProps, BpkStackSpecificProps {
  children?: ReactNode;
}

export type { BpkCommonLayoutProps };
