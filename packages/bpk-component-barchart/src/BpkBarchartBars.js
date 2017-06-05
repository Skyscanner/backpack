import React from 'react';
import PropTypes from 'prop-types';
import { borderRadiusXs } from 'bpk-tokens/tokens/base.es6';
import { remToPx } from './utils';

const borderRadius = remToPx(borderRadiusXs);

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
  const {
    outerPadding,
    innerPadding,
    onClick,
    data,
    xScaleDataKey,
    yScaleDataKey,
    xScale,
    yScale,
    maxYValue,
    margin,
    height,
    ...rest
  } = props;

  xScale.paddingOuter(outerPadding);
  xScale.paddingInner(innerPadding);

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
              rx={borderRadius}
              ry={borderRadius}
              strokeWidth={barWidth}
              onClick={onClick ? e => onClick(e, point) : null}
              {...rest}
            />
          </g>
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

  outerPadding: PropTypes.number,
  innerPadding: PropTypes.number,
  onClick: PropTypes.func,
};

BpkBarchartBars.defaultProps = {
  outerPadding: 0.35,
  innerPadding: 0.35,
  onClick: null,
};

export default BpkBarchartBars;
