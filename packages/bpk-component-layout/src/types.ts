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

import type { CSSProperties, FocusEventHandler, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import type { BpkCommonLayoutProps } from './commonProps';
import type { BpkSpacingValue, BpkResponsiveValue, BpkBasisValue } from './tokens';

/**
 * Flexbox & grid layout props that we explicitly support on Backpack layout
 * components. These are a curated subset useful for structural layout.
 */
export interface BpkFlexGridProps {
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

  gridTemplateColumns?: BpkResponsiveValue<string>;
  gridTemplateRows?: BpkResponsiveValue<string>;
  gridTemplateAreas?: BpkResponsiveValue<string>;
  gridAutoFlow?: BpkResponsiveValue<CSSProperties['gridAutoFlow']>;
  gridAutoRows?: BpkResponsiveValue<string>;
  gridAutoColumns?: BpkResponsiveValue<string>;
  gridColumn?: BpkResponsiveValue<string>;
  gridRow?: BpkResponsiveValue<string>;
  rowGap?: BpkResponsiveValue<BpkSpacingValue>;
  columnGap?: BpkResponsiveValue<BpkSpacingValue>;
}

export type FlexGridPropKeys = keyof BpkFlexGridProps;

/**
 * Props for BpkBox component
 */
export interface BpkBoxProps extends BpkCommonLayoutProps, BpkFlexGridProps {
  children?: ReactNode;
  position?: BpkResponsiveValue<CSSProperties['position']>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-live'?: 'off' | 'polite' | 'assertive';
  id?: string;
  fontWeight?: string;
}

export type BpkBoxSpecificProps = BpkFlexGridProps;

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

export type BpkVesselProps = {
  as?: VesselElement;
} & HTMLAttributes<HTMLElement>;

/**
 * Props for BpkFlex component
 */
export interface BpkFlexProps extends BpkCommonLayoutProps {
  children?: ReactNode;
  direction?: BpkResponsiveValue<CSSProperties['flexDirection']>;
  justify?: BpkResponsiveValue<CSSProperties['justifyContent']>;
  align?: BpkResponsiveValue<CSSProperties['alignItems']>;
  wrap?: BpkResponsiveValue<CSSProperties['flexWrap']>;
  grow?: BpkResponsiveValue<CSSProperties['flexGrow']>;
  shrink?: BpkResponsiveValue<CSSProperties['flexShrink']>;
  basis?: BpkResponsiveValue<BpkBasisValue>;
  inline?: boolean;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  id?: string;
}

export type BpkFlexSpecificProps = Pick<
  BpkFlexProps,
  'direction' | 'justify' | 'align' | 'wrap' | 'grow' | 'shrink' | 'basis' | 'inline'
>;

/**
 * Props for BpkGrid component
 */
export interface BpkGridProps extends BpkCommonLayoutProps {
  children?: ReactNode;
  justify?: BpkResponsiveValue<CSSProperties['justifyContent']>;
  align?: BpkResponsiveValue<CSSProperties['alignItems']>;
  templateColumns?: BpkResponsiveValue<string>;
  templateRows?: BpkResponsiveValue<string>;
  templateAreas?: BpkResponsiveValue<string>;
  autoFlow?: BpkResponsiveValue<CSSProperties['gridAutoFlow']>;
  autoRows?: BpkResponsiveValue<string>;
  autoColumns?: BpkResponsiveValue<string>;
  rowGap?: BpkResponsiveValue<BpkSpacingValue>;
  columnGap?: BpkResponsiveValue<BpkSpacingValue>;
  column?: BpkResponsiveValue<string>;
  row?: BpkResponsiveValue<string>;
  inline?: boolean;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  id?: string;
}

export type BpkGridSpecificProps = Pick<
  BpkGridProps,
  | 'justify' | 'align' | 'templateColumns' | 'templateRows' | 'templateAreas'
  | 'autoFlow' | 'autoRows' | 'autoColumns' | 'rowGap' | 'columnGap'
  | 'column' | 'row' | 'inline'
>;

/**
 * Props for BpkGridItem component
 */
export interface BpkGridItemProps extends BpkCommonLayoutProps {
  children?: ReactNode;
  area?: string;
  colEnd?: number | string;
  colStart?: number | string;
  colSpan?: number;
  rowEnd?: number | string;
  rowStart?: number | string;
  rowSpan?: number;
}

export type BpkGridItemSpecificProps = Pick<
  BpkGridItemProps,
  'area' | 'colEnd' | 'colStart' | 'colSpan' | 'rowEnd' | 'rowStart' | 'rowSpan'
>;

/**
 * Props for BpkStack component
 */
export interface BpkStackProps extends BpkCommonLayoutProps {
  children?: ReactNode;
  direction?: BpkResponsiveValue<CSSProperties['flexDirection']>;
  align?: BpkResponsiveValue<CSSProperties['alignItems']>;
  justify?: BpkResponsiveValue<CSSProperties['justifyContent']>;
  wrap?: BpkResponsiveValue<CSSProperties['flexWrap']>;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  id?: string;
}

export type BpkStackSpecificProps = Pick<
  BpkStackProps,
  'direction' | 'align' | 'justify' | 'wrap'
>;

export type { BpkCommonLayoutProps };
