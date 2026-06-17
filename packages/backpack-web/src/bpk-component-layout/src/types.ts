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

import type { HTMLAttributes, ReactNode } from 'react';

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
 * Component-specific props for BpkBox.
 * Explicit allowlist — does NOT inherit from Chakra BoxProps.
 */
export interface BpkBoxSpecificProps
  extends BpkBoxResponsiveLayoutProps,
    Omit<BpkFlexGridProps, BpkBoxResponsiveLayoutPropKeys> {}

/**
 * Props for BpkBox component
 * Combines Box-specific props with Backpack common layout props.
 * onClick is inherited from BpkCommonLayoutProps.
 * onFocus and onBlur are reintroduced here as BpkBox-only interaction props.
 * textStyle maps to Chakra's `textStyle` theme prop for Backpack typography and supports responsive values.
 */
type BoxEventProps = Pick<BoxProps, 'onFocus' | 'onBlur'>;

export interface BpkBoxProps extends BpkCommonLayoutProps, BpkBoxSpecificProps {
  children?: ReactNode;
  onFocus?: BoxEventProps['onFocus'];
  onBlur?: BoxEventProps['onBlur'];
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
 *
 * Accepts all React.HTMLAttributes including:
 * - Styling: className, style
 * - Testing: data-testid, data-cy, data-*
 * - Accessibility: aria-*, role, tabIndex
 * - Basic HTML: id, title, dir, lang, hidden, etc.
 * - All standard DOM events: onClick, onChange, onFocus, etc.
 *
 * @example
 * ```tsx
 * <BpkVessel
 *   className="legacy-wrapper"
 *   style={{ padding: '16px', transition: 'opacity 0.3s' }}
 *   data-testid="migration-wrapper"
 *   onClick={handleClick}
 * >
 *   Content
 * </BpkVessel>
 *
 * <BpkVessel
 *   as="section"
 *   className="legacy-section"
 *   aria-label="Main content"
 *   role="region"
 *   dir="rtl"
 * >
 *   Section Content
 * </BpkVessel>
 * ```
 */
export type BpkVesselProps = {
  as?: VesselElement;
} & HTMLAttributes<HTMLElement>;

/**
 * Component-specific props for BpkFlex.
 * Explicit allowlist — does NOT inherit from Chakra FlexProps.
 */
export interface BpkFlexSpecificProps {
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
 * Component-specific props for BpkGrid.
 * Explicit allowlist — does NOT inherit from Chakra GridProps.
 */
export interface BpkGridSpecificProps {
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
 * Component-specific props for BpkGridItem.
 * Explicit allowlist — does NOT inherit from Chakra GridItemProps.
 */
export interface BpkGridItemSpecificProps {
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
 * Component-specific props for BpkStack.
 * Explicit allowlist — does NOT inherit from Chakra StackProps.
 * Overrides StackOptions to support BpkResponsiveValue.
 * `alignItems` and `justifyContent` are accepted as semantic aliases for `align` and `justify`.
 * If both are provided, `align`/`justify` take precedence.
 *
 * `alignItems` and `justifyContent` are explicitly omitted from `BpkFlexGridProps` here so
 * that the responsive alias declarations below (which match BpkStackOptions) unambiguously
 * replace the non-responsive `BoxProps` variants from `BpkFlexGridProps`.
 */
export interface BpkStackSpecificProps
  extends BpkStackOptions,
    Omit<BpkFlexGridProps, 'alignItems' | 'justifyContent'> {
  /** Alias for `align`. Maps to CSS `align-items`. Responsive — replaces the non-responsive BpkFlexGridProps.alignItems. */
  alignItems?: BpkStackOptions['align'];
  /** Alias for `justify`. Maps to CSS `justify-content`. Responsive — replaces the non-responsive BpkFlexGridProps.justifyContent. */
  justifyContent?: BpkStackOptions['justify'];
}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps extends BpkCommonLayoutProps, BpkStackSpecificProps {
  children?: ReactNode;
}

export type { BpkCommonLayoutProps };
