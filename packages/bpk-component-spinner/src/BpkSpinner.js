import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import SmSpinner from 'bpk-svgs/dist/js/spinners/sm';

import STYLES from './bpk-spinner.scss';

const getClassName = cssModules(STYLES);

const BpkSpinner = (props) => {
  const classNames = [getClassName('bpk-spinner')];
  const { className, alignToButton, ...rest } = props;

  if (alignToButton) { classNames.push(getClassName('bpk-spinner--align-to-button')); }
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
