import React from 'react';
import PropTypes from 'prop-types';

import contextTypes from './contextTypes';

export const LABEL_TYPE_X = 'x';
export const LABEL_TYPE_Y = 'y';

const BpkBarchartAxisLabel = (props) => {
  const { children, type, className, ...rest } = props;
  const classNames = [`bpk-barchart__axis-label bpk-barchart__axis-label--${type}`];

  if (className) { classNames.push(className); }

  return <text className={classNames.join(' ')} {...rest}>{children}</text>;
};

BpkBarchartAxisLabel.contextTypes = contextTypes;

BpkBarchartAxisLabel.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([LABEL_TYPE_X, LABEL_TYPE_Y]).isRequired,
  className: PropTypes.string,
};

BpkBarchartAxisLabel.defaultProps = {
  className: null,
};

export default BpkBarchartAxisLabel;
