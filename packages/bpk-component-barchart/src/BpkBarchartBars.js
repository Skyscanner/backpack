import React from 'react';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';
import { durationBase } from 'bpk-tokens/tokens/base.es6';

import ContextTypes from './BpkBarchartContextTypes';

export const ANIMATE_PROPS = {
  calcMode: 'spline',
  keyTimes: '0; 1',
  keySplines: '.1,.8,.2,1',
  fill: 'freeze',
};

/* eslint-disable max-len */
// Taken from https://github.com/Modernizr/Modernizr/blob/7db55bbfa9de67289892b94b60bf2f088c11d669/feature-detects/svg/smil.js
/* eslint-enable */
const canAnimate =
  document &&
  !!document.createElementNS &&
  /SVGAnimate/.test(
    {}.toString.call(
      document.createElementNS('http://www.w3.org/2000/svg', 'animate'),
    ),
  );

const getYPos = (point, { yScaler, yScaleDataKey, maxYValue }) =>
  yScaler(Math.min(point[yScaleDataKey], maxYValue));

const getBarHeight = (
  point,
  { height, margin, yScaler, yScaleDataKey, maxYValue },
) => {
  const barHeight =
    height -
    margin.top -
    margin.bottom -
    getYPos(point, { yScaler, yScaleDataKey, maxYValue });
  return Math.max(barHeight, 0);
};

const getPathDescription = (width, height, x, y, radius, isOutlier = false) => {
  const path = d3Path();
  path.moveTo(x, y);

  if (isOutlier) {
    path.lineTo(x + width, y);
  } else {
    path.arcTo(x + width, y, x + width, y + height, radius);
  }

  path.arcTo(x + width, y + height, x, y + height, radius);
  path.arcTo(x, y + height, x, y, radius);

  if (isOutlier) {
    path.lineTo(x, y);
  } else {
    path.arcTo(x, y, x + width, y, radius);
  }
  return path.toString();
};

const isOutlier = (point, { yScaleDataKey, maxYValue }) =>
  point[yScaleDataKey] > maxYValue;

const BpkBarchartBars = (
  { animate, padding, rounded, onClick, animateDuration, ...rest },
  context,
) => {
  const { data, height, margin, xScaleDataKey, yScaleDataKey, xScaler } = context;
  xScaler.padding(padding);

  const shouldAnimate = animate && canAnimate;
  const barWidth = xScaler.bandwidth();
  const roundedAmount = rounded ? barWidth / 2 : 0;
  const heights = data.map(point => getBarHeight(point, context));
  const minHeight = Math.min(...heights);

  return (
    <g className="bpk-barchart__bars-group">
      {data.map((point, i) => {
        const x = xScaler(point[xScaleDataKey]);
        const initialD = shouldAnimate
          ? getPathDescription(
              barWidth,
              minHeight,
              x,
              height - margin.bottom - margin.top - minHeight,
              roundedAmount,
              isOutlier(point, context),
            )
          : null;
        const finalD = getPathDescription(
          barWidth,
          heights[i],
          x,
          getYPos(point, context),
          roundedAmount,
          isOutlier(point, context),
        );
        return (
          <g className="bpk-barchart__bar-group" key={`bar${i.toString()}`}>
            <title>{`${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}</title>
            <path
              className={`bpk-barchart__bar ${isOutlier(point, context) ? 'bpk-barchart__bar--outlier' : ''}`}
              d={shouldAnimate ? initialD : finalD}
              onClick={e => onClick(e, point)}
              {...rest}
            >
              {shouldAnimate
                ? <animate
                  attributeName="d"
                  from={initialD}
                  to={finalD}
                  dur={animateDuration}
                  {...ANIMATE_PROPS}
                />
                : null}
            </path>
          </g>
        );
      })}
    </g>
  );
};

BpkBarchartBars.propTypes = {
  padding: PropTypes.number,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  animate: PropTypes.bool,
  animateDuration: PropTypes.string,
};

BpkBarchartBars.defaultProps = {
  padding: 0.35,
  rounded: true,
  onClick: () => {},
  animate: false,
  animateDuration: durationBase,
};

BpkBarchartBars.contextTypes = ContextTypes;

export default BpkBarchartBars;
