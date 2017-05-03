import React, { PropTypes } from 'react';
import LgSpinner from 'bpk-svgs/dist/js/spinners/lg';

import './bpk-spinner.scss';

const BpkLargeSpinner = (props) => {
  const classNames = ['bpk-spinner', 'bpk-spinner--large'];
  const { className, alignToButton, ...rest } = props;

  if (alignToButton) { classNames.push('bpk-spinner--align-to-large-button'); }
  if (className) { classNames.push(className); }

  return <LgSpinner className={classNames.join(' ')} {...rest} />;
};

BpkLargeSpinner.propTypes = {
  className: PropTypes.string,
  alignToButton: PropTypes.bool,
};

BpkLargeSpinner.defaultProps = {
  className: null,
  alignToButton: false,
};

export default BpkLargeSpinner;
