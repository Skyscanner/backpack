import React, { PropTypes } from 'react';

import './bpk-checkbox.scss';

const BpkCheckbox = (props) => {
  const classNames = ['bpk-checkbox'];

  if (props.disabled) { classNames.push('bpk-checkbox--disabled'); }

  // This is awkward because the label-has-for rule enforces an 'id' / 'for' pairing
  // when it's not really necessary for nested inputs.
  // See https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/51.
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <label className={classNames.join(' ')}>
      <input
        type="checkbox"
        className="bpk-checkbox__input"
        name={props.name}
        onChange={props.onChange}
        id={props.id}
        value={props.value || props.name}
        checked={props.checked}
        disabled={props.disabled}
      />
      {props.label ? ` ${props.label}` : null}
    </label>
  );
  /* eslint-enable */
};

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

BpkCheckbox.defaultProps = {
  id: null,
  label: null,
  value: null,
  checked: false,
  disabled: false,
};

export default BpkCheckbox;
