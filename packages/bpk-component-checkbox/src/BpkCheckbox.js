import React, { PropTypes } from 'react'

import './bpk-checkbox.scss'

const BpkCheckbox = ({ name, label, value, id, checked, onChange, disabled }) => {
  const classNames = [ 'bpk-checkbox' ]

  disabled ? classNames.push('bpk-checkbox--disabled') : null

  return (
    <label className={classNames.join(' ')}>
      <input
        type='checkbox'
        className='bpk-checkbox__input'
        name={name}
        value={value || name}
        id={id}
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
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}

BpkCheckbox.defaultProps = {
  id: null,
  label: null,
  value: null,
  checked: false,
  disabled: false
}

export default BpkCheckbox
