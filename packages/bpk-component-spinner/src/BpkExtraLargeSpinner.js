import PropTypes from 'prop-types';
import React from 'react';
import XlSpinner from 'bpk-svgs/dist/js/spinners/xl';

import './bpk-spinner.scss';

const BpkExtraLargeSpinner = (props) => {
  const { className, ...rest } = props;
  const classNames = ['bpk-spinner', 'bpk-spinner--extra-large'];

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
