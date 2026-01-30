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

import type { ReactNode, ReactElement } from 'react';

import type { LABEL_STYLE } from './BpkIconLabel';
/**
 * Typography variant for the icon label text.
 * Note: The actual LABEL_STYLE constant is defined in BpkIconLabel.tsx
 * and BpkIconLabelType is derived from it to keep them in sync.
 */
export type BpkIconLabelType = (typeof LABEL_STYLE)[keyof typeof LABEL_STYLE];

/**
 * Color scheme for the icon label.
 * - 'default': Dark text on light background ($bpk-text-primary-day)
 * - 'on-dark': White text on dark background with day tokens ($bpk-text-on-dark-day)
 * - 'night': White text for night mode with night tokens ($bpk-text-on-dark-night)
 */
export type BpkIconLabelColorScheme = 'default' | 'on-dark' | 'night';

/**
 * Context value shared between Root and child components.
 */
export interface BpkIconLabelContext {
  type: BpkIconLabelType;
  colorScheme: BpkIconLabelColorScheme;
}

/**
 * Props for BpkIconLabel.Root component.
 */
export interface BpkIconLabelRootProps {
  /**
   * Typography variant - controls text size and weight via BpkText.
   * @default 'body'
   */
  type?: BpkIconLabelType;

  /**
   * Color scheme for the icon label.
   * Use 'default' for light backgrounds, 'on-dark' for dark backgrounds with day tokens,
   * or 'night' for night mode with night-specific tokens.
   * @default 'default'
   */
  colorScheme?: BpkIconLabelColorScheme;

  /**
   * Additional CSS class names for the container.
   */
  className?: string | null;

  /**
   * Child components (Icon and Text subcomponents).
   */
  children: ReactNode;

  /**
   * Inexact rest props for HTML attributes.
   * See decisions/inexact-rest.md
   */
  [rest: string]: any;
}

/**
 * Props for BpkIconLabel.Icon component.
 */
export interface BpkIconLabelIconProps {
  /**
   * When true, uses the child element as the icon directly (Ark UI asChild pattern).
   * This allows passing any icon component without additional wrapping.
   * @default true
   */
  asChild?: boolean;

  /**
   * Icon element to display (e.g., <InformationCircleIcon />).
   * When asChild is true, this is used as the icon directly.
   */
  children?: ReactElement;

  /**
   * Additional CSS class names for the icon wrapper.
   */
  className?: string | null;

  /**
   * Inexact rest props for HTML attributes.
   */
  [rest: string]: any;
}

/**
 * Props for BpkIconLabel.Text component.
 * This component wraps BpkText and accepts BpkLink as children.
 */
export interface BpkIconLabelTextProps {
  /**
   * Text content to display. Can include inline BpkLink elements as children.
   * @example
   * <BpkIconLabel.Text>
   *   Information text with <BpkLink href="/learn">inline link</BpkLink>
   * </BpkIconLabel.Text>
   */
  children: ReactNode;

  /**
   * Additional CSS class names for the text wrapper.
   */
  className?: string | null;

  /**
   * Inexact rest props for HTML attributes passed to underlying BpkText.
   */
  [rest: string]: any;
}
