import PropTypes from 'prop-types';
import React from 'react';

import './bpk-label.scss';

const BpkLabel = (props) => {
  const { children, required, white, className, ...rest } = props;
  const classNames = ['bpk-label'];

  if (white) { classNames.push('bpk-label--white'); }
  if (className) { classNames.push(className); }

  return (
    // TODO: Perhaps ship labels coupled inputs/select components to fix this.
    // It would perhaps enforce better practices.
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={classNames.join(' ')} {...rest}>
      {children}
      {required && (
        <span className="bpk-label__asterix">*</span>
      )}
    </label>
  );
};

BpkLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  white: PropTypes.bool,
};

BpkLabel.defaultProps = {
  className: null,
  required: false,
  white: false,
};

export default BpkLabel;
