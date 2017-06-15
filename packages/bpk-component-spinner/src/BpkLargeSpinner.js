import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import LgSpinner from 'bpk-svgs/dist/js/spinners/lg';

import STYLES from './bpk-spinner.scss';

const getClassName = cssModules(STYLES);

const BpkLargeSpinner = (props) => {
  const classNames = ['bpk-spinner', 'bpk-spinner--large'].map(getClassName);
  const { className, alignToButton, ...rest } = props;

  if (alignToButton) { classNames.push(getClassName('bpk-spinner--align-to-large-button')); }
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
