import React, { PropTypes } from 'react';

import './bpk-input.scss';

export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  PASSWORD: 'password',
  TEL: 'tel',
};

const BpkInput = (props) => {
  const {
    valid,
    large,
    docked,
    dockedFirst,
    dockedMiddle,
    dockedLast,
    className,
    ...rest
  } = props;
  const classNames = ['bpk-input'];

  if (valid) {
    classNames.push('bpk-input--valid');
  } else if (valid === false) {
    classNames.push('bpk-input--invalid');
  }

  if (large) { classNames.push('bpk-input--large'); }
  if (docked) { classNames.push('bpk-input--docked'); }
  if (dockedFirst) { classNames.push('bpk-input--docked-first'); }
  if (dockedMiddle) { classNames.push('bpk-input--docked-middle'); }
  if (dockedLast) { classNames.push('bpk-input--docked-last'); }
  if (docked) { classNames.push('bpk-input--docked'); }
  if (className) { classNames.push(className); }

  return <input className={classNames.join(' ')} {...rest} />;
};

BpkInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    INPUT_TYPES.TEXT,
    INPUT_TYPES.EMAIL,
    INPUT_TYPES.NUMBER,
    INPUT_TYPES.PASSWORD,
    INPUT_TYPES.TEL,
  ]),
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
  docked: PropTypes.bool,
  dockedFirst: PropTypes.bool,
  dockedMiddle: PropTypes.bool,
  dockedLast: PropTypes.bool,
};

BpkInput.defaultProps = {
  type: INPUT_TYPES.TEXT,
  className: null,
  valid: null,
  large: false,
  docked: false,
  dockedFirst: false,
  dockedMiddle: false,
  dockedLast: false,
};

export default BpkInput;
