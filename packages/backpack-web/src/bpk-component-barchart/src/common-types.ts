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

import type { ComponentType, MouseEvent, ReactNode, SVGProps } from 'react';

export type Orientation = 'x' | 'y';

export type Margin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type Scale = {
  bandwidth?: () => number;
  round: () => boolean;
  ticks?: (count?: number) => number[];
  domain: <T extends unknown[]>(domain?: T) => T | unknown[];
  range: (range: [number, number]) => Scale;
  rangeRound: (range: [number, number]) => Scale;
  copy: () => Scale;
  paddingInner: (value: number) => Scale;
  paddingOuter: (value: number | undefined) => Scale;
  (value: unknown): number;
};

export type BarPoint = Record<string, unknown>;

export type BarComponentProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string | null;
  outlier: boolean;
  onClick?: ((event: MouseEvent<SVGRectElement>) => void) | undefined;
  onHover?: ((event: MouseEvent<SVGRectElement>) => void) | undefined;
  onFocus?: ((event: MouseEvent<SVGRectElement>) => void) | undefined;
  selected: boolean;
  padding: number;
};

export type BarComponent = ComponentType<BarComponentProps & Record<string, unknown>>;

export type BarInteractionEvent = MouseEvent<SVGElement>;

export type BpkBarchartProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  data: BarPoint[];
  xScaleDataKey: string;
  yScaleDataKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  initialWidth: number;
  initialHeight: number;
  leadingScrollIndicatorClassName?: string | undefined;
  trailingScrollIndicatorClassName?: string | undefined;
  outlierPercentage?: number | undefined;
  showGridlines?: boolean;
  xAxisMargin?: number;
  xAxisTickValue?: (tick: any, index: number) => ReactNode;
  xAxisTickOffset?: number;
  xAxisTickEvery?: number;
  yAxisMargin?: number;
  yAxisTickValue?: (tick: any, index: number) => ReactNode;
  yAxisNumTicks?: number | undefined;
  yAxisDomain?: Array<number | undefined>;
  onBarClick?: ((event: BarInteractionEvent, payload: { point: BarPoint }) => void) | undefined;
  onBarHover?: ((event: BarInteractionEvent, payload: { point: BarPoint }) => void) | undefined;
  onBarFocus?: ((event: BarInteractionEvent, payload: { point: BarPoint }) => void) | undefined;
  getBarLabel?: (point: BarPoint, xScaleDataKey: string, yScaleDataKey: string) => string | null;
  getBarSelection?: (point: BarPoint) => boolean;
  BarComponent?: BarComponent;
  disableDataTable?: boolean;
};
