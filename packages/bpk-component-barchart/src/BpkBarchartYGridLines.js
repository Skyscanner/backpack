import React, { PropTypes } from 'react';
import ContextTypes from './ContextTypes';

const getX = ({ width, margin }) => {
  const { left, right } = margin;
  return width - left - right;
};

const getY = (tick, { yScaler }) => yScaler(tick) + 0.5;

const BpkBarchartXGridLines = (props, context) => {
  const { ticks, ...rest } = props;
  const points = context.yScaler.ticks(ticks);
  const x = getX(context);
  return (
    <g className="bpk-barchart__grid-lines bpk-barchart__grid-lines--x">
      {points.map((tick, i) => (
        <line
          className="bpk-barchart__grid-line bpk-barchart__grid-line--x"
          x2={x}
          y1={getY(tick, context)}
          y2={getY(tick, context)}
          key={`yline${i.toString()}`}
          {...rest}
        />
      ))}
    </g>
  );
};

BpkBarchartXGridLines.propTypes = {
  ticks: PropTypes.number,
};

BpkBarchartXGridLines.defaultProps = {
  ticks: null,
};

const { yScaler, width, margin } = ContextTypes;

BpkBarchartXGridLines.contextTypes = {
  yScaler,
  width,
  margin,
};

export default BpkBarchartXGridLines;
