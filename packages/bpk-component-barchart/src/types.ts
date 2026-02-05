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

import type { KeyboardEvent, MouseEvent, FocusEvent, ReactNode } from 'react';

import type { ScaleBand, ScaleLinear } from 'd3-scale';

/**
 * Data point type for barchart data.
 * Allows any key-value pairs where values must match the expected types
 * for the configured xScaleDataKey (string) and yScaleDataKey (number).
 */
export type DataPoint = Record<string, unknown>;

/**
 * Margin configuration for chart elements.
 * Values can be numbers (in pixels) or strings (with CSS units like rem).
 */
export type Margin = {
  top: number | string;
  bottom: number | string;
  left: number | string;
  right: number | string;
};

/**
 * Numeric margin type for internal calculations
 */
export type NumericMargin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

/**
 * Union type for d3 scales used in charts
 */
export type Scale = ScaleBand<string> | ScaleLinear<number, number>;

/**
 * Type guard for band scale.
 * @param {Scale} scale - The scale to check
 * @returns {boolean} True if the scale is a band scale
 */
export const isBandScale = (scale: Scale): scale is ScaleBand<string> =>
  'bandwidth' in scale;

/**
 * Props interface for bar components used in the barchart.
 * This interface defines the contract that custom BarComponent implementations must follow.
 */
export interface BarComponentProps {
  /** X position of the bar */
  x: number | undefined;
  /** Y position of the bar */
  y: number;
  /** Width of the bar */
  width: number;
  /** Height of the bar */
  height: number;
  /** Accessible label for the bar */
  label: string;
  /** Whether this bar represents an outlier value */
  outlier?: boolean;
  /** Click handler */
  onClick?: ((event: MouseEvent | KeyboardEvent) => void) | null;
  /** Hover handler */
  onHover?: ((event: MouseEvent) => void) | null;
  /** Focus handler */
  onFocus?: ((event: FocusEvent) => void) | null;
  /** Whether this bar is selected */
  selected?: boolean;
  /** Padding between bars (0-1) */
  padding?: number;
  /** Allow additional props for custom implementations */
  [key: string]: unknown;
}

/**
 * Tick value function type for axis components
 */
export type TickValueFn = (tick: unknown, index: number) => ReactNode;
