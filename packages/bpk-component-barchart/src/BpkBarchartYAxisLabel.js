import React, { PropTypes } from 'react';

import BpkBarchartAxisLabel, { LABEL_TYPE_Y } from './BpkBarchartAxisLabel';
import { isRTL } from './RTLtransforms';
import ContextTypes from './BpkBarchartContextTypes';

const BpkBarchartYAxisLabel = (
  { children, rightOffset, leftOffset, ...rest },
  { height, margin },
) => (
  <BpkBarchartAxisLabel
    type={LABEL_TYPE_Y}
    textAnchor="middle"
    dominantBaseline="hanging"
    transform={`
      translate(
        ${isRTL() ? margin.right - rightOffset : -margin.left + leftOffset},
        ${(height - margin.top - margin.bottom) / 2}
      )
      rotate(-90)
    `}
    {...rest}
  >
    {children}
  </BpkBarchartAxisLabel>
);

BpkBarchartYAxisLabel.propTypes = {
  children: PropTypes.node.isRequired,
  rightOffset: PropTypes.number,
  leftOffset: PropTypes.number,
};

BpkBarchartYAxisLabel.defaultProps = {
  rightOffset: 20,
  leftOffset: 0,
};

BpkBarchartYAxisLabel.contextTypes = ContextTypes;

export default BpkBarchartYAxisLabel;
