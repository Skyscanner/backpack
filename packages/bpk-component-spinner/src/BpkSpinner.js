import React, { PropTypes } from 'react';
import { colorGray700 } from 'bpk-tokens/tokens/base.es6';
import SmSpinner from 'bpk-svgs/dist/js/spinners/sm';

import './bpk-spinner.scss';

const BpkSpinner = (props) => {
  const classNames = ['bpk-spinner'];

  if (props.alignToButton) { classNames.push('bpk-spinner--align-to-button'); }

  return <SmSpinner className={classNames.join(' ')} fill={props.fill} />;
};

BpkSpinner.propTypes = {
  fill: PropTypes.string,
  alignToButton: PropTypes.bool,
};

BpkSpinner.defaultProps = {
  fill: colorGray700,
  alignToButton: false,
};

export default BpkSpinner;
