import React from 'react';
import ContextTypes from './ContextTypes';

const getY = ({ height, margin }) => {
  const { top, bottom } = margin;
  return height - top - bottom;
};

const getX = (point, { xScaler }) => xScaler(point) + (xScaler.bandwidth() / 2);

const BpkBarchartYGridLines = (props, context) => {
  const points = context.xScaler.domain();
  return (
    <g className="bpk-barchart__grid-lines bpk-barchart__grid-lines--y">
      {points.map((point, i) => (
        <line
          className="bpk-barchart__grid-line bpk-barchart__grid-line--y"
          x1={getX(point, context)}
          x2={getX(point, context)}
          y2={getY(context)}
          key={`xline${i.toString()}`}
          {...props}
        />
      ))}
    </g>
  );
};

BpkBarchartYGridLines.contextTypes = ContextTypes;

export default BpkBarchartYGridLines;
