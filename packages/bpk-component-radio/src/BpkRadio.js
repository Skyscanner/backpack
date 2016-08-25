import React, { PropTypes } from 'react'

import './bpk-radio.scss'

const BpkRadio = ({ name, label, value, id, checked, onChange, disabled }) => {
  const classNames = [ 'bpk-radio' ]

  disabled ? classNames.push('bpk-radio--disabled') : null

  return (
    <label className={classNames.join(' ')}>
      <input
        type='radio'
        className='bpk-radio--input'
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

BpkRadio.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
}

BpkRadio.defaultProps = {
  id: null,
  checked: false,
  value: null,
  label: null,
  disabled: false
}

export default BpkRadio
