import React, { PropTypes } from 'react';
import { colorGray700 } from 'bpk-tokens/tokens/base.es6';
import LgSpinner from 'bpk-svgs/dist/js/spinners/lg';

import './bpk-spinner.scss';

const BpkLargeSpinner = (props) => {
  const classNames = ['bpk-spinner', 'bpk-spinner--large'];

  if (props.alignToButton) { classNames.push('bpk-spinner--align-to-large-button'); }

  return <LgSpinner className={classNames.join(' ')} fill={props.fill} />;
};

BpkLargeSpinner.propTypes = {
  fill: PropTypes.string,
  alignToButton: PropTypes.bool,
};

BpkLargeSpinner.defaultProps = {
  fill: colorGray700,
  alignToButton: false,
};

export default BpkLargeSpinner;
