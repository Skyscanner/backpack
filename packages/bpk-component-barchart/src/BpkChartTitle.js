import React from 'react';
import PropTypes from 'prop-types';

import { lineHeightLg } from 'bpk-tokens/tokens/base.es6';
import propTypes from './propTypes';
import { rtlConditionalValue } from './RTLtransforms';
import { remToPx } from './utils';

const BpkChartTitle = (props) => {
  const { children, width } = props;
  const x = rtlConditionalValue(0, width);
  // TODO: explain the y="-6"
  return (
    <text
      className="bpk-barchart__title"
      textAnchor="start"
      y="-6"
      x={x}
    >
      {children}
    </text>
  );
};

BpkChartTitle.propTypes = {
  width: propTypes.width.isRequired,

  children: PropTypes.node.isRequired,
};

export default BpkChartTitle;

export const chartTitleLineHeight = remToPx(lineHeightLg);
