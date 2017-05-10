import React from 'react';

import contextTypes from './contextTypes';
import BpkBarchartGridLines, { GRIDLINE_TYPE_X } from './BpkBarchartGridLines';

const BpkBarchartXGridLines = (props, context) => {
  const { xScaler, height, margin } = context;

  const getLineProps = (tick) => {
    const x = xScaler(tick) + (xScaler.bandwidth() / 2);

    return {
      x1: x,
      x2: x,
      y2: height - margin.top - margin.bottom,
    };
  };

  return (
    <BpkBarchartGridLines
      type={GRIDLINE_TYPE_X}
      ticks={xScaler.domain()}
      lineProps={getLineProps}
      {...props}
    />
  );
};

BpkBarchartXGridLines.contextTypes = contextTypes;

export default BpkBarchartXGridLines;
