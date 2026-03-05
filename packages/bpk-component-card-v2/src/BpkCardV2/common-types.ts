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

import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import type { BpkBoxProps , BpkFlexProps } from '../../../bpk-component-layout';

/** Surface color token options for BpkCardV2 background */
export type BpkCardV2SurfaceColor =
  | 'surfaceDefault'
  | 'surfaceElevated'
  | 'surfaceTint'
  | 'surfaceSubtle'
  | 'surfaceHero'
  | 'surfaceContrast'
  | 'surfaceLowContrast'
  | 'surfaceHighlight';

/** Visual variant options for BpkCardV2 */
export type BpkCardV2Variant = 'default' | 'outlined' | 'noElevation';

/**
 * BpkCardV2 root component props.
 *
 * Composable card component with explicit Header/Body/Footer subcomponents.
 * Supports multiple surface colors, visual variants, and responsive split layouts.
 *
 * @example
 * <BpkCardV2 variant="default" bgColor="surfaceDefault">
 *   <BpkCardV2.Header>Title</BpkCardV2.Header>
 *   <BpkCardV2.Body>Content</BpkCardV2.Body>
 *   <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
 * </BpkCardV2>
 */
export type BpkCardV2Props = {
  /** Visual variant controlling styling treatment (shadow/border) */
  variant?: BpkCardV2Variant;

  /** Background surface color token (default: surfaceDefault) */
  bgColor?: BpkCardV2SurfaceColor;

  /** Card content - use Header, Body, Footer subcomponents */
  children: ReactNode;

  /** Accessible label describing the card's purpose */
  ariaLabel?: string;

  /** ID of element that labels the card */
  ariaLabelledBy?: string;
};

/**
 * BpkCardV2.Header component props.
 *
 * Renders a BpkFlex container positioned at top of card.
 * Defaults to horizontal (row) direction with base padding.
 * All BpkFlex props are supported for layout customisation.
 */
export type BpkCardV2HeaderProps = BpkFlexProps;

/**
 * BpkCardV2.Body component props.
 *
 * Renders card main content area as a BpkFlex container.
 * Defaults to vertical (column) direction with base padding.
 * Supports optional split layout with Primary and Secondary subcomponents.
 * All BpkFlex props are supported for layout customisation.
 *
 * @example
 * // Simple body
 * <BpkCardV2.Body>Content</BpkCardV2.Body>
 *
 * // Split layout (70/30 on desktop, stacked on mobile)
 * <BpkCardV2.Body split splitRatio={70}>
 *   <BpkCardV2.Primary>Main (70%)</BpkCardV2.Primary>
 *   <BpkCardV2.Secondary>Sidebar (30%)</BpkCardV2.Secondary>
 * </BpkCardV2.Body>
 */
export type BpkCardV2BodyProps = BpkFlexProps & {
  /** Enable two-column split layout (default: false) */
  split?: boolean;

  /** Primary section width percentage on desktop (0-100, default: 70) */
  splitRatio?: number;
};

/**
 * BpkCardV2.Primary component props.
 *
 * Primary content area in split layout. Renders a BpkBox.
 * Takes splitRatio width on desktop, full width on mobile.
 * All BpkBox props are supported for layout customisation.
 */
export type BpkCardV2PrimaryProps = BpkBoxProps;

/**
 * BpkCardV2.Secondary component props.
 *
 * Secondary content area in split layout. Renders a BpkBox.
 * Takes (100 - splitRatio) width on desktop, full width on mobile.
 * All BpkBox props are supported for layout customisation.
 */
export type BpkCardV2SecondaryProps = BpkBoxProps;

/**
 * BpkCardV2.Footer component props.
 *
 * Renders a BpkFlex container positioned at bottom of card.
 * Defaults to horizontal (row) direction with base padding.
 * All BpkFlex props are supported for layout customisation.
 */
export type BpkCardV2FooterProps = BpkFlexProps;

/**
 * BpkCardV2 namespace type.
 *
 * Contains all card subcomponents as properties.
 */
export type BpkCardV2Namespace = {
  Root: ForwardRefExoticComponent<BpkCardV2Props & RefAttributes<HTMLDivElement>>;
  Header: { (props: BpkCardV2HeaderProps): ReactNode; displayName?: string };
  Body: { (props: BpkCardV2BodyProps): ReactNode; displayName?: string };
  Primary: { (props: BpkCardV2PrimaryProps): ReactNode; displayName?: string };
  Secondary: { (props: BpkCardV2SecondaryProps): ReactNode; displayName?: string };
  Footer: { (props: BpkCardV2FooterProps): ReactNode; displayName?: string };
};
