import React from 'react';
import PropTypes from 'prop-types';

import ContextTypes from './BpkBarchartContextTypes';

export const LABEL_TYPE_X = 'x';
export const LABEL_TYPE_Y = 'y';

const BpkBarchartAxisLabel = (
  { type, children, ...rest },
) => (
  <text
    className={`bpk-barchart__axis-label bpk-barchart__axis-label--${type}`}
    {...rest}
  >
    {children}
  </text>
);

BpkBarchartAxisLabel.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([LABEL_TYPE_X, LABEL_TYPE_Y]).isRequired,
};

BpkBarchartAxisLabel.contextTypes = ContextTypes;

export default BpkBarchartAxisLabel;
