import React from 'react';
import ContextTypes from './BpkBarchartContextTypes';

import BpkBarchartGridLines, { GRIDLINE_TYPE_X } from './BpkBarchartGridLines';

const BpkBarchartXGridLines = (props, { xScaler, height, margin }) => (
  <BpkBarchartGridLines
    type={GRIDLINE_TYPE_X}
    ticks={xScaler.domain()}
    lineProps={(tick) => {
      const x = xScaler(tick) + (xScaler.bandwidth() / 2);
      return {
        x1: x,
        x2: x,
        y2: height - margin.top - margin.bottom,
      };
    }}
    {...props}
  />
);

BpkBarchartXGridLines.contextTypes = ContextTypes;

export default BpkBarchartXGridLines;




