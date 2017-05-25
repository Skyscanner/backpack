import React from 'react';
import PropTypes from 'prop-types';

import contextTypes from './contextTypes';
import { rtlConditionalValue } from './RTLtransforms';

const BpkBarchartXAxis = (props, context) => {
  const { children } = props;
  const { margin, xScaler, data, xScaleDataKey } = context;

  const dataPoint = data[rtlConditionalValue(0, data.length - 1)][xScaleDataKey];
  const x = xScaler(dataPoint) + rtlConditionalValue(0, (xScaler.bandwidth() / 2));

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

BpkBarchartXAxis.propTypes = {
  children: PropTypes.node.isRequired,
};

BpkBarchartXAxis.contextTypes = contextTypes;

export default BpkBarchartXAxis;
