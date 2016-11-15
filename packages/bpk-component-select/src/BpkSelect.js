import React, { PropTypes } from 'react';

import './bpk-select.scss';

const BpkSelect = (props) => {
  const { valid, large, docked, className, ...rest } = props;
  const classNames = ['bpk-select'];

  if (large) { classNames.push('bpk-select--large'); }
  if (docked) { classNames.push('bpk-select--docked'); }
  if (valid === false) { classNames.push('bpk-select--invalid'); }
  if (className) { classNames.push(className); }

  return (
    <select className={classNames.join(' ')} {...rest} />
  );
};

BpkSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
  docked: PropTypes.bool,
};

BpkSelect.defaultProps = {
  className: null,
  valid: null,
  large: false,
  docked: false,
};

export default BpkSelect;
