import React from 'react';
import PropTypes from 'prop-types';

import contextTypes from './contextTypes';
import BpkBarchartGridLines, { GRIDLINE_TYPE_Y } from './BpkBarchartGridLines';

const BpkBarchartYGridLines = (props, context) => {
  const { ticks, ...rest } = props;
  const { yScaler, width, margin } = context;

  const getLineProps = (tick) => {
    const y = yScaler(tick) + 0.5;

    return {
      x2: width - margin.left - margin.right,
      y1: y,
      y2: y,
    };
  };

  return (
    <BpkBarchartGridLines
      type={GRIDLINE_TYPE_Y}
      ticks={yScaler.ticks(ticks)}
      lineProps={getLineProps}
      {...rest}
    />
  );
};

BpkBarchartYGridLines.propTypes = {
  ticks: PropTypes.number,
};

BpkBarchartYGridLines.defaultProps = {
  ticks: null,
};

BpkBarchartYGridLines.contextTypes = contextTypes;

export default BpkBarchartYGridLines;
