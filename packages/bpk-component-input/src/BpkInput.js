import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-input.scss';

const getClassName = cssModules(STYLES);

export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  PASSWORD: 'password',
  TEL: 'tel',
};

const BpkInput = (props) => {
  const classNames = [getClassName('bpk-input')];
  const { valid, large, docked, dockedFirst, dockedMiddle, dockedLast, className, ...rest } = props;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  if (valid) {
    classNames.push(getClassName('bpk-input--valid'));
  } else if (isInvalid) {
    classNames.push(getClassName('bpk-input--invalid'));
  }

  if (large) { classNames.push(getClassName('bpk-input--large')); }
  if (docked) { classNames.push(getClassName('bpk-input--docked')); }
  if (dockedFirst) { classNames.push(getClassName('bpk-input--docked-first')); }
  if (dockedMiddle) { classNames.push(getClassName('bpk-input--docked-middle')); }
  if (dockedLast) { classNames.push(getClassName('bpk-input--docked-last')); }
  if (className) { classNames.push(className); }

  return <input className={classNames.join(' ')} aria-invalid={isInvalid} {...rest} />;
};

BpkInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
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
