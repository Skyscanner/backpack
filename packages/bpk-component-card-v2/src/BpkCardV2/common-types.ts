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

/** Surface colour token options for BpkCardV2 background */
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
export type BpkCardV2Variant = 'default' | 'outlined';

/**
 * BpkCardV2 root component props.
 *
 * Composable card component with explicit Header/Body/Footer subcomponents.
 * Supports multiple surface colours, visual variants, and responsive split layouts.
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

  /** Background surface colour token (default: surfaceDefault) */
  bgColor?: BpkCardV2SurfaceColor;

  /** Card content - use Header, Body, Footer subcomponents */
  children: ReactNode;

  /** Additional CSS class names */
  className?: string;

  /** Accessible label describing the card's purpose */
  ariaLabel?: string;

  /** ID of element that labels the card */
  ariaLabelledBy?: string;
};

/**
 * BpkCardV2.Header component props.
 *
 * Renders semantic <header> element. Positioned at top of card.
 */
export type BpkCardV2HeaderProps = {
  /** Header content */
  children: ReactNode;

  /** Additional CSS class names */
  className?: string;
};

/**
 * BpkCardV2.Body component props.
 *
 * Renders card main content area. Supports optional split layout
 * with Primary and Secondary subcomponents for multi-area designs.
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
export type BpkCardV2BodyProps = {
  /** Body content or Primary/Secondary subcomponents */
  children: ReactNode;

  /** Enable two-column split layout (default: false) */
  split?: boolean;

  /** Primary section width percentage on desktop (0-100, default: 70) */
  splitRatio?: number;

  /** Additional CSS class names */
  className?: string;
};

/**
 * BpkCardV2.Primary component props.
 *
 * Primary content area in split layout. Takes splitRatio width on desktop,
 * full width on mobile. Positioned first in vertical stack on mobile.
 */
export type BpkCardV2PrimaryProps = {
  /** Primary content */
  children: ReactNode;

  /** Additional CSS class names */
  className?: string;
};

/**
 * BpkCardV2.Secondary component props.
 *
 * Secondary content area in split layout. Takes (100 - splitRatio) width on desktop,
 * full width on mobile. Positioned second in vertical stack on mobile.
 */
export type BpkCardV2SecondaryProps = {
  /** Secondary content */
  children: ReactNode;

  /** Additional CSS class names */
  className?: string;
};

/**
 * BpkCardV2.Footer component props.
 *
 * Renders semantic <footer> element. Positioned at bottom of card.
 */
export type BpkCardV2FooterProps = {
  /** Footer content */
  children: ReactNode;

  /** Additional CSS class names */
  className?: string;
};
