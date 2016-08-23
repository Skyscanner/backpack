import React, { PropTypes } from 'react'

import './bpk-checkbox.scss'

const BpkCheckbox = ({ name, label, value, checked, onChange, disabled }) => {
  const classNames = [ 'bpk-checkbox' ]

  disabled ? classNames.push('bpk-checkbox--disabled') : null

  return (
    <label className={classNames.join(' ')}>
      <input
        type='checkbox'
        className='bpk-checkbox--input'
        name={name}
        value={value || name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label ? ` ${label}` : null}
    </label>
  )
}

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
}

BpkCheckbox.defaultProps = {
  checked: false,
  value: null,
  label: null,
  disabled: false
}

export default BpkCheckbox
