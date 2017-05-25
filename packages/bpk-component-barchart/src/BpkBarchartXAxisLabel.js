import React from 'react';
import PropTypes from 'prop-types';

import contextTypes from './contextTypes';
import BpkBarchartAxisLabel, { LABEL_TYPE_X } from './BpkBarchartAxisLabel';

const BpkBarchartXAxisLabel = (props, context) => {
  const { children, ...rest } = props;
  const { width, margin } = context;

  return (
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
};

BpkBarchartXAxisLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

BpkBarchartXAxisLabel.contextTypes = contextTypes;

export default BpkBarchartXAxisLabel;
