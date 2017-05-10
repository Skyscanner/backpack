import React from 'react';
import PropTypes from 'prop-types';

import ContextTypes from './BpkBarchartContextTypes';
import BpkBarchartGridLines, { GRIDLINE_TYPE_Y } from './BpkBarchartGridLines';

const BpkBarchartYGridLines = (
  { ticks, ...rest },
  { yScaler, width, margin },
) => (
  <BpkBarchartGridLines
    type={GRIDLINE_TYPE_Y}
    ticks={yScaler.ticks(ticks)}
    lineProps={(tick) => {
      const y = yScaler(tick) + 0.5;
      return {
        x2: width - margin.left - margin.right,
        y1: y,
        y2: y,
      };
    }}
    {...rest}
  />
);

BpkBarchartYGridLines.propTypes = {
  ticks: PropTypes.number,
};

BpkBarchartYGridLines.defaultProps = {
  ticks: null,
};

BpkBarchartYGridLines.contextTypes = ContextTypes;

export default BpkBarchartYGridLines;
