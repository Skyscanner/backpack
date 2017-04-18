import React, { PropTypes } from 'react';
import ContextTypes from './ContextTypes';

const getX = (point, { xScaler, xScaleDataKey }) =>
  xScaler(point[xScaleDataKey]);

const getY = (point, { yScaler, yScaleDataKey }) =>
  yScaler(point[yScaleDataKey]);

const getHeight = (point, { height, margin, yScaler, yScaleDataKey }) => {
  const barHeight =
    height - margin.top - margin.bottom - yScaler(point[yScaleDataKey]);
  return Math.max(barHeight, 0);
};

const BpkBarchartBars = ({ padding, rounded, onClick, ...rest }, context) => {
  const { xScaleDataKey, yScaleDataKey, xScaler } = context;
  const barWidth = context.xScaler.bandwidth();
  const roundedAmount = rounded ? barWidth / 2 : 0;

  xScaler.padding(padding);

  return (
    <g className="bpk-barchart__bar-group">
      {context.data.map((point, i) => (
        <g key={`bar${i.toString()}`}>
          <title>{`${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}</title>
          <rect
            className="bpk-barchart__bar"
            width={barWidth}
            height={getHeight(point, context)}
            x={getX(point, context)}
            y={getY(point, context)}
            rx={roundedAmount}
            ry={roundedAmount}
            onClick={e => onClick(e, point)}
            {...rest}
          />
        </g>
      ))}
    </g>
  );
};

BpkBarchartBars.propTypes = {
  padding: PropTypes.number,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
};

BpkBarchartBars.defaultProps = {
  padding: 0.1,
  rounded: false,
  onClick: () => {},
};

BpkBarchartBars.contextTypes = ContextTypes;

export default BpkBarchartBars;
