import React, { PropTypes } from 'react';
import { colorGray700 } from 'bpk-tokens/tokens/base.es6';
import XlSpinner from 'bpk-svgs/dist/js/spinners/xl';

import './bpk-spinner.scss';

const BpkExtraLargeSpinner = props => <XlSpinner className="bpk-spinner bpk-spinner--extra-large" fill={props.fill} />;

BpkExtraLargeSpinner.propTypes = {
  fill: PropTypes.string,
};

BpkExtraLargeSpinner.defaultProps = {
  fill: colorGray700,
};

export default BpkExtraLargeSpinner;
