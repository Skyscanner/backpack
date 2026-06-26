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

import type { SVGProps } from 'react';

import { borderRadiusXs } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBarchartBar from './BpkBarchartBar';
import { remToPx } from './utils';

import type {
  BarComponent as BarComponentType,
  BarInteractionEvent,
  BarPoint,
  Margin,
  Scale,
} from './common-types';

const borderRadius = remToPx(borderRadiusXs);

type BarsContext = {
  maxYValue: number;
  yScale: Scale;
  yScaleDataKey: string;
  height?: number;
  margin?: Margin;
};

const getYPos = (
  point: BarPoint,
  { maxYValue, yScale, yScaleDataKey }: BarsContext,
): number =>
  yScale(Math.min((point[yScaleDataKey] as number) ?? 0, maxYValue));

const getBarHeight = (
  point: BarPoint,
  { height = 0, margin, maxYValue, yScale, yScaleDataKey }: BarsContext & {
    height: number;
    margin: Margin;
  },
): number => {
  const barHeight =
    height -
    margin.top -
    margin.bottom -
    getYPos(point, { yScale, yScaleDataKey, maxYValue });
  return Math.max(barHeight, 0);
};

const isOutlier = (
  point: BarPoint,
  { maxYValue, yScaleDataKey }: BarsContext,
): boolean => (point[yScaleDataKey] as number) > maxYValue;

type Props = Omit<SVGProps<SVGGElement>, 'scale' | 'x' | 'y' | 'width' | 'onClick' | 'onFocus' | 'onMouseOver'> & {
  data: BarPoint[];
  xScaleDataKey: string;
  yScaleDataKey: string;
  height: number;
  xScale: Scale;
  yScale: Scale;
  maxYValue: number;
  margin: Margin;
  getBarLabel: (point: BarPoint, xScaleDataKey: string, yScaleDataKey: string) => string;
  BarComponent: BarComponentType;
  getBarSelection?: (point: BarPoint) => boolean;
  outerPadding?: number;
  innerPadding?: number;
  onBarClick?: ((event: BarInteractionEvent, payload: { point: BarPoint }) => void) | undefined;
  onBarHover?: ((event: BarInteractionEvent, payload: { point: BarPoint }) => void) | undefined;
  onBarFocus?: ((event: BarInteractionEvent, payload: { point: BarPoint }) => void) | undefined;
};

const BpkBarchartBars = ({
  BarComponent = BpkBarchartBar,
  data,
  getBarLabel,
  getBarSelection = () => false,
  height,
  innerPadding = 0.35,
  margin,
  maxYValue,
  onBarClick = undefined,
  onBarFocus = undefined,
  onBarHover = undefined,
  outerPadding = 0.35,
  xScale,
  xScaleDataKey,
  yScale,
  yScaleDataKey,
  ...rest
}: Props) => {
  xScale.paddingOuter(outerPadding);
  xScale.paddingInner(0);

  const barWidth = xScale.bandwidth ? xScale.bandwidth() : 0;

  return (
    <g>
      {data.map((point, i) => {
        const x = xScale(point[xScaleDataKey]);
        const y = getYPos(point, { yScale, yScaleDataKey, maxYValue });
        const outlier = isOutlier(point, { maxYValue, yScale, yScaleDataKey });
        const barHeight = getBarHeight(point, {
          height,
          margin,
          maxYValue,
          yScale,
          yScaleDataKey,
        });
        return (
          <BarComponent
            key={`bar${i.toString()}`}
            x={x}
            y={outlier ? y - borderRadius : y}
            width={barWidth}
            height={outlier ? barHeight + borderRadius : barHeight}
            label={getBarLabel(point, xScaleDataKey, yScaleDataKey)}
            outlier={outlier}
            onClick={onBarClick ? (e) => onBarClick(e, { point }) : undefined}
            onHover={onBarHover ? (e) => onBarHover(e, { point }) : undefined}
            onFocus={onBarFocus ? (e) => onBarFocus(e, { point }) : undefined}
            selected={getBarSelection(point)}
            padding={innerPadding}
            {...rest}
          />
        );
      })}
    </g>
  );
};

export default BpkBarchartBars;
