import React, { PropTypes } from 'react';

import './bpk-radio.scss';

const BpkRadio = (props) => {
  const classNames = ['bpk-radio'];
  const { name, label, disabled, className, ...rest } = props;

  if (disabled) { classNames.push('bpk-radio--disabled'); }
  if (className) { classNames.push(className); }

  // This is awkward because the label-has-for rule enforces an 'id' / 'for' pairing
  // when it's not really necessary for nested inputs.
  // See https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/51.
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <label className={classNames.join(' ')}>
      <input
        type="radio"
        className="bpk-radio__input"
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

BpkRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

BpkRadio.defaultProps = {
  disabled: false,
  className: null,
};

export default BpkRadio;
