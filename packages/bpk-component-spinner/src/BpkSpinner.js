import React, { PropTypes } from 'react';
import SmSpinner from 'bpk-svgs/dist/js/spinners/sm';

import './bpk-spinner.scss';

const BpkSpinner = (props) => {
  const classNames = ['bpk-spinner'];
  const { className, alignToButton, ...rest } = props;

  if (alignToButton) { classNames.push('bpk-spinner--align-to-button'); }
  if (className) { classNames.push(className); }

  return <SmSpinner className={classNames.join(' ')} {...rest} />;
};

BpkSpinner.propTypes = {
  className: PropTypes.string,
  alignToButton: PropTypes.bool,
};

BpkSpinner.defaultProps = {
  className: null,
  alignToButton: false,
};

export default BpkSpinner;
