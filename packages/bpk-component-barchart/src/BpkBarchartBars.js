import React from 'react';
import PropTypes from 'prop-types';

import contextTypes from './contextTypes';

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

const isOutlier = (point, { yScaleDataKey, maxYValue }) =>
  point[yScaleDataKey] > maxYValue;

const BpkBarchartBars = (props, context) => {
  const { padding, rounded, onClick, ...rest } = props;
  const { data, xScaleDataKey, yScaleDataKey, xScaler, yScaler, maxYValue } = context;

  xScaler.padding(padding);

  const barWidth = xScaler.bandwidth();
  const heights = data.map(point => getBarHeight(point, context));

  return (
    <g className="bpk-barchart__bars-group">
      {data.map((point, i) => {
        const x = xScaler(point[xScaleDataKey]);
        const y = getYPos(point, { yScaler, yScaleDataKey, maxYValue });
        const outlier = isOutlier(point, context);

        return (
          <g className="bpk-barchart__bar-group" key={`bar${i.toString()}`}>
            <title>{`${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}</title>
            <rect
              className={`bpk-barchart__bar ${outlier ? 'bpk-barchart__bar--outlier' : ''}`}
              x={x}
              y={outlier ? y - barWidth : y}
              width={barWidth}
              height={outlier ? heights[i] + barWidth : heights[i]}
              rx={rounded ? barWidth / 8 : 0}
              ry={rounded ? barWidth / 8 : 0}
              strokeWidth={barWidth}
              onClick={e => onClick(e, point)}
              data-height={heights[i]}
              {...rest}
            />
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
};

BpkBarchartBars.defaultProps = {
  padding: 0.35,
  rounded: true,
  onClick: () => {},
};

BpkBarchartBars.contextTypes = contextTypes;

export default BpkBarchartBars;
