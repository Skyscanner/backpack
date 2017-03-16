import React, { PropTypes } from 'react';

import './bpk-checkbox.scss';

const BpkCheckbox = (props) => {
  const classNames = ['bpk-checkbox'];
  const { name, onChange, value, checked, label, disabled, className, ...rest } = props;

  if (disabled) { classNames.push('bpk-checkbox--disabled'); }
  if (className) { classNames.push(className); }

  // This is awkward because the label-has-for rule enforces an 'id' / 'for' pairing
  // when it's not really necessary for nested inputs.
  // See https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/51.
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <label className={classNames.join(' ')}>
      <input
        type="checkbox"
        className="bpk-checkbox__input"
        name={name}
        onChange={onChange}
        value={value || name}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
      {label ? ` ${label}` : null}
    </label>
  );
  /* eslint-enable */
};

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

BpkCheckbox.defaultProps = {
  label: null,
  value: null,
  checked: false,
  disabled: false,
  className: null,
};

export default BpkCheckbox;
