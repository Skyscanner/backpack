import React from 'react';
import PropTypes from 'prop-types';
import propTypes from './propTypes';

const BpkChartMargin = (props) => {
  const { children, margin, ...rest } = props;

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

BpkChartMargin.propTypes = {
  children: PropTypes.node.isRequired,
  margin: propTypes.margin.isRequired,
};

export default BpkChartMargin;
