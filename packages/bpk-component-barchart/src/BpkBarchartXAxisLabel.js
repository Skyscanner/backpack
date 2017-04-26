import React, { PropTypes } from 'react';
import BpkBarchartAxisLabel, { LABEL_TYPE_X } from './BpkBarchartAxisLabel';
import ContextTypes from './BpkBarchartContextTypes';

const BpkBarchartXAxisLabel = (
  { children, ...rest },
  { width, margin },
) => (
  <BpkBarchartAxisLabel
    type={LABEL_TYPE_X}
    textAnchor="middle"
    dominantBaseline="text-before-edge"
    y={margin.bottom}
    x={(width - margin.left - margin.right) / 2}
    {...rest}
  >
    {children}
  </BpkBarchartAxisLabel>
);

BpkBarchartXAxisLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

BpkBarchartXAxisLabel.contextTypes = ContextTypes;

export default BpkBarchartXAxisLabel;
