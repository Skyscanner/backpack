import React, { PropTypes } from 'react';

import './bpk-label.scss';

const BpkLabel = (props) => {
  const { label, white, className, ...rest } = props;
  const classNames = ['bpk-label'];

  if (white) { classNames.push('bpk-label--white'); }
  if (className) { classNames.push(className); }

  // TODO: Perhaps ship labels coupled inputs/select components to fix this.
  // It would perhaps enforce better practices.
  // eslint-disable-next-line jsx-a11y/label-has-for
  return <label className={classNames.join(' ')} {...rest}>{label}</label>;
};

BpkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  white: PropTypes.bool,
};

BpkLabel.defaultProps = {
  className: null,
  white: false,
};

export default BpkLabel;
