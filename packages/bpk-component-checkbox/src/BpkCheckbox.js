import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-checkbox.scss';

const getClassName = cssModules(STYLES);

const BpkCheckbox = (props) => {
  const classNames = [getClassName('bpk-checkbox')];
  const { name, label, required, disabled, white, className, ...rest } = props;

  if (white) { classNames.push(getClassName('bpk-checkbox--white')); }
  if (disabled) { classNames.push(getClassName('bpk-checkbox--disabled')); }
  if (className) { classNames.push(className); }

  // This is awkward because the label-has-for rule enforces an 'id' / 'for' pairing
  // when it's not really necessary for nested inputs.
  // See https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/51.
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <label className={classNames.join(' ')}>
      <input
        type="checkbox"
        className={getClassName('bpk-checkbox__input')}
        name={name}
        disabled={disabled}
        {...rest}
      />
      {label}
      {required && (
        <span className={getClassName('bpk-checkbox__asterix')}>*</span>
      )}
    </label>
  );
  /* eslint-enable */
};

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
};

BpkCheckbox.defaultProps = {
  required: false,
  disabled: false,
  white: false,
  className: null,
};

export default BpkCheckbox;
