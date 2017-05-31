import React from 'react';
import PropTypes from 'prop-types';

import propTypes from './propTypes';
import { rtlConditionalValue } from './RTLtransforms';

const BpkChartTitle = (props) => {
  const { children, margin, width } = props;
  const x = rtlConditionalValue(0, width);

  return (
    <text
      className="bpk-barchart__title"
      transform={`translate(0, -${margin.top})`}
      dominantBaseline="hanging"
      textAnchor="start"
      y="0"
      x={x}
    >
      {children}
    </text>
  );
};

BpkChartTitle.propTypes = {
  width: propTypes.width.isRequired,
  margin: propTypes.margin.isRequired,

  children: PropTypes.node.isRequired,
};

export default BpkChartTitle;
