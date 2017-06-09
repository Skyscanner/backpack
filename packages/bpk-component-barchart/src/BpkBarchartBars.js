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
    onBarClick,
    data,
    xScaleDataKey,
    yScaleDataKey,
    xScale,
    yScale,
    maxYValue,
    margin,
    height,
    BarComponent,
    getBarLabel,
    ...rest
  } = props;

  xScale.paddingOuter(outerPadding);
  xScale.paddingInner(innerPadding);

  const barWidth = xScale.bandwidth();

  return (
    <g className="bpk-barchart__bars">
      {data.map((point, i) => {
        const x = xScale(point[xScaleDataKey]);
        const y = getYPos(point, { yScale, yScaleDataKey, maxYValue });
        const outlier = isOutlier(point, props);
        const barHeight = getBarHeight(point, props);
        return (
          <BarComponent
            key={`bar${i.toString()}`}
            x={x}
            y={outlier ? y - borderRadius : y}
            width={barWidth}
            height={outlier ? barHeight + borderRadius : barHeight}
            label={getBarLabel(point, xScaleDataKey, yScaleDataKey)}
            outlier={isOutlier(point, props)}
            onClick={onBarClick ? e => onBarClick(e, point) : null}
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
  BarComponent: PropTypes.func.isRequired,

  outerPadding: PropTypes.number,
  innerPadding: PropTypes.number,
  onBarClick: PropTypes.func,
};

BpkBarchartBars.defaultProps = {
  outerPadding: 0.35,
  innerPadding: 0.35,
  onBarClick: null,
};

export default BpkBarchartBars;
