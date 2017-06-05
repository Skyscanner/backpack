import React from 'react';
import PropTypes from 'prop-types';

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
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
};

export default BpkChartMargin;
