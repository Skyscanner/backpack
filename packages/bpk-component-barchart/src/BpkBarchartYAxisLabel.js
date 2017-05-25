import React from 'react';
import PropTypes from 'prop-types';

import { isRTL } from './RTLtransforms';
import contextTypes from './contextTypes';
import BpkBarchartAxisLabel, { LABEL_TYPE_Y } from './BpkBarchartAxisLabel';

const BpkBarchartYAxisLabel = (props, context) => {
  const { children, rightOffset, leftOffset, ...rest } = props;
  const { height, margin } = context;

  const translateX = isRTL() ? margin.right - rightOffset : -margin.left + leftOffset;
  const translateY = (height - margin.top - margin.bottom) / 2;

  return (
    <BpkBarchartAxisLabel
      type={LABEL_TYPE_Y}
      textAnchor="middle"
      dominantBaseline="hanging"
      transform={`translate(${translateX}, ${translateY}) rotate(-90)`}
      {...rest}
    >
      {children}
    </BpkBarchartAxisLabel>
  );
};

BpkBarchartYAxisLabel.propTypes = {
  children: PropTypes.node.isRequired,
  rightOffset: PropTypes.number,
  leftOffset: PropTypes.number,
};

BpkBarchartYAxisLabel.defaultProps = {
  rightOffset: 20,
  leftOffset: 0,
};

BpkBarchartYAxisLabel.contextTypes = contextTypes;

export default BpkBarchartYAxisLabel;
