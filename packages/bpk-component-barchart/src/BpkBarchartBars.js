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

/* @flow strict */

import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import { borderRadiusXs } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBarchartBar from './BpkBarchartBar';
import { remToPx } from './utils';

const borderRadius = remToPx(borderRadiusXs);

const getYPos = (point, { maxYValue, yScale, yScaleDataKey }) =>
  yScale(Math.min(point[yScaleDataKey], maxYValue));

const getBarHeight = (
  point,
  { height, margin, maxYValue, yScale, yScaleDataKey },
) => {
  const barHeight =
    height -
    margin.top -
    margin.bottom -
    getYPos(point, { yScale, yScaleDataKey, maxYValue });
  return Math.max(barHeight, 0);
};

const isOutlier = (point, { maxYValue, yScaleDataKey }) =>
  point[yScaleDataKey] > maxYValue;

type Props = {
  data: Array<any>, // We pass any here as the array can contain free form data depending on the user
  xScaleDataKey: string,
  yScaleDataKey: string,
  height: number,
  xScale: typeof scaleBand,
  yScale: typeof scaleLinear,
  maxYValue: number,
  margin: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
  getBarLabel: (any, string, string) => mixed,
  BarComponent: typeof BpkBarchartBar,
  getBarSelection: (any: any) => mixed,
  outerPadding: number,
  innerPadding: number,
  onBarClick: ?(e: SyntheticEvent<any>, Object) => mixed,
  onBarHover: ?(e: SyntheticEvent<any>, Object) => mixed,
  onBarFocus: ?(e: SyntheticEvent<any>, Object) => mixed,
};

const BpkBarchartBars = (props: Props) => {
  const {
    BarComponent,
    data,
    getBarLabel,
    getBarSelection,
    height,
    innerPadding,
    margin,
    maxYValue,
    onBarClick,
    onBarFocus,
    onBarHover,
    outerPadding,
    xScale,
    xScaleDataKey,
    yScale,
    yScaleDataKey,
    ...rest
  } = props;

  xScale.paddingOuter(outerPadding);
  // `innerPadding` is not set on the scale, but instead passed to the BarComponent
  // This allows us to have full-width tappable areas, but with visibly padded bars.
  xScale.paddingInner(0);

  const barWidth = xScale.bandwidth();

  return (
    <g>
      {data.map((point, i) => {
        const x = xScale(point[xScaleDataKey]);
        const y = getYPos(point, { yScale, yScaleDataKey, maxYValue });
        const outlier = isOutlier(point, props);
        const barHeight = getBarHeight(point, props);
        return (
          // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
          <BarComponent
            key={`bar${i.toString()}`}
            x={x}
            y={outlier ? y - borderRadius : y}
            width={barWidth}
            height={outlier ? barHeight + borderRadius : barHeight}
            label={getBarLabel(point, xScaleDataKey, yScaleDataKey)}
            outlier={isOutlier(point, props)}
            onClick={onBarClick ? (e) => onBarClick(e, { point }) : null}
            onHover={onBarHover ? (e) => onBarHover(e, { point }) : null}
            onFocus={onBarFocus ? (e) => onBarFocus(e, { point }) : null}
            selected={getBarSelection(point)}
            padding={innerPadding}
            {...rest}
          />
        );
      })}
    </g>
  );
};

BpkBarchartBars.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  xScaleDataKey: PropTypes.string.isRequired,
  yScaleDataKey: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  maxYValue: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
  getBarLabel: PropTypes.func.isRequired,
  BarComponent: PropTypes.elementType.isRequired,

  getBarSelection: PropTypes.func,
  outerPadding: PropTypes.number,
  innerPadding: PropTypes.number,
  onBarClick: PropTypes.func,
  onBarHover: PropTypes.func,
  onBarFocus: PropTypes.func,
};

BpkBarchartBars.defaultProps = {
  outerPadding: 0.35,
  innerPadding: 0.35,
  onBarClick: null,
  onBarHover: null,
  onBarFocus: null,
  getBarSelection: () => false,
};

export default BpkBarchartBars;
