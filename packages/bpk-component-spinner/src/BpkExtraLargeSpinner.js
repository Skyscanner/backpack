import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import XlSpinner from 'bpk-svgs/dist/js/spinners/xl';

import STYLES from './bpk-spinner.scss';

const getClassName = cssModules(STYLES);

const BpkExtraLargeSpinner = (props) => {
  const { className, ...rest } = props;
  const classNames = ['bpk-spinner', 'bpk-spinner--extra-large'].map(getClassName);

  if (className) { classNames.push(className); }

  return <XlSpinner className={classNames.join(' ')} {...rest} />;
};

BpkExtraLargeSpinner.propTypes = {
  className: PropTypes.string,
};

BpkExtraLargeSpinner.defaultProps = {
  className: null,
};

export default BpkExtraLargeSpinner;
