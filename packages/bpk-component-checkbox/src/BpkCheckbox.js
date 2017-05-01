import React, { PropTypes } from 'react';

import './bpk-checkbox.scss';

const BpkCheckbox = (props) => {
  const classNames = ['bpk-checkbox'];
  const { name, label, disabled, white, className, ...rest } = props;

  if (white) { classNames.push('bpk-checkbox--white'); }
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
        disabled={disabled}
        {...rest}
      />
      &nbsp;
      {label}
    </label>
  );
  /* eslint-enable */
};

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
};

BpkCheckbox.defaultProps = {
  disabled: false,
  white: false,
  className: null,
};

export default BpkCheckbox;
