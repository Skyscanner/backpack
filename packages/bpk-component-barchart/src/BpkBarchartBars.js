import React from 'react';
import PropTypes from 'prop-types';
import propTypes from './propTypes';

const getYPos = (point, { yScale, yScaleDataKey, maxYValue }) =>
  yScale(Math.min(point[yScaleDataKey], maxYValue));

const getBarHeight = (
  point,
  { height, margin, yScale, yScaleDataKey, maxYValue },
) => {
  const barHeight =
    height -
    margin.top -
    margin.bottom -
    getYPos(point, { yScale, yScaleDataKey, maxYValue });
  return Math.max(barHeight, 0);
};

const isOutlier = (point, { yScaleDataKey, maxYValue }) =>
  point[yScaleDataKey] > maxYValue;

const BpkBarchartBars = (props) => {
  const { padding, rounded, onClick,
    data, xScaleDataKey, yScaleDataKey, xScale, yScale, maxYValue, margin,  width, height, ...rest } = props;

  xScale.padding(padding);

  const barWidth = xScale.bandwidth();
  const heights = data.map(point => getBarHeight(point, props));

  return (
    <g className="bpk-barchart__bars-group">
      {data.map((point, i) => {
        const x = xScale(point[xScaleDataKey]);
        const y = getYPos(point, { yScale, yScaleDataKey, maxYValue });
        const outlier = isOutlier(point, props);
        const barClassNames = ['bpk-barchart__bar'];
        if (outlier) { barClassNames.push('bpk-barchart__bar--outlier'); }
        if (onClick) { barClassNames.push('bpk-barchart__bar--interative'); }

        return (
          <g className="bpk-barchart__bar-group" key={`bar${i.toString()}`}>
            <title>{`${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}</title>
            <rect
              className={barClassNames.join(' ')}
              x={x}
              y={outlier ? y - barWidth : y}
              width={barWidth}
              height={outlier ? heights[i] + barWidth : heights[i]}
              rx={rounded ? 3 : 0}
              ry={rounded ? 3 : 0}
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
  onClick: undefined,
};

export default BpkBarchartBars;
