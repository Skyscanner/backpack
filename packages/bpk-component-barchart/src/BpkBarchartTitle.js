import React from 'react';
import PropTypes from 'prop-types';

import { rtlConditionalValue } from './RTLtransforms';
import ContextTypes from './BpkBarchartContextTypes';

const BpkBarchartXAxis = (
  { children },
  { margin, xScaler, data, xScaleDataKey },
) => {
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

BpkBarchartXAxis.contextTypes = ContextTypes;

export default BpkBarchartXAxis;
