/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import type { ReactNode } from "react";

import type { VARIANT } from '../../bpk-component-page-indicator';

export type OnImageChangedHandler = ((shownImageIndex: number) => void) | null | undefined;

export type AccessibilityLabels = {
  indicatorLabel?: string;
  prevNavLabel?: string;
  nextNavLabel?: string;
};

export type PageIndicatorVariant = typeof VARIANT.overImageSpaced | typeof VARIANT.carousel;

export type Props = {
  images: ReactNode[]
  initialImageIndex?: number;
  onImageChanged?: OnImageChangedHandler;
  /**
   * This prop is used to let the consumer adjust the spacing between the page indicator and the bottom of the image when variant is VARIANT.overImage
  */
  bottom?: number;
  accessibilityLabels?: AccessibilityLabels;
  pageIndicatorVariant?: PageIndicatorVariant;
  /**
   * Force the page indicator's nav buttons on or off.
   * When omitted, the nav buttons are shown on desktop breakpoints only.
   */
  showPageIndicatorNav?: boolean;
};
