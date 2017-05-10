import React from 'react';
import PropTypes from 'prop-types';

import contextTypes from './contextTypes';

const BpkBarchartMargin = (props, context) => {
  const { children, ...rest } = props;
  const { margin } = context;

  return (
    <g
      className="bpk-barchart__margin"
      transform={`translate(${margin.left}, ${margin.top})`}
      {...rest}
    >
      {children}
    </g>
  );
};

BpkBarchartMargin.propTypes = {
  children: PropTypes.node.isRequired,
};

BpkBarchartMargin.contextTypes = contextTypes;

export default BpkBarchartMargin;
