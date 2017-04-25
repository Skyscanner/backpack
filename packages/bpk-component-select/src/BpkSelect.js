import React, { PropTypes } from 'react';

import './bpk-select.scss';

const BpkSelect = (props) => {
  const classNames = ['bpk-select'];
  const { valid, large, docked, dockedFirst, dockedMiddle, dockedLast, className, ...rest } = props;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  if (large) { classNames.push('bpk-select--large'); }
  if (docked) { classNames.push('bpk-select--docked'); }
  if (dockedFirst) { classNames.push('bpk-select--docked-first'); }
  if (dockedMiddle) { classNames.push('bpk-select--docked-middle'); }
  if (dockedLast) { classNames.push('bpk-select--docked-last'); }
  if (isInvalid) { classNames.push('bpk-select--invalid'); }
  if (className) { classNames.push(className); }

  return (
    <select className={classNames.join(' ')} aria-invalid={isInvalid} {...rest} />
  );
};

BpkSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
  docked: PropTypes.bool,
  dockedFirst: PropTypes.bool,
  dockedMiddle: PropTypes.bool,
  dockedLast: PropTypes.bool,
};

BpkSelect.defaultProps = {
  className: null,
  valid: null,
  large: false,
  docked: false,
  dockedFirst: false,
  dockedMiddle: false,
  dockedLast: false,
};

export default BpkSelect;
