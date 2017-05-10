import React from 'react';
import PropTypes from 'prop-types';

import ContextTypes from './BpkBarchartContextTypes';

const BpkBarchartMargin = (
  { children, ...rest },
  { margin },
) => (
  <g
    className="bpk-barchart__margin"
    transform={`translate(${margin.left}, ${margin.top})`}
    {...rest}
  >
    {children}
  </g>
);

BpkBarchartMargin.propTypes = {
  children: PropTypes.node.isRequired,
};

BpkBarchartMargin.contextTypes = ContextTypes;

export default BpkBarchartMargin;
