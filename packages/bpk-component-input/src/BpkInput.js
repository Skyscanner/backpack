import React, { PropTypes } from 'react'

import './bpk-input.scss'

export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  PASSWORD: 'password',
  TEL: 'tel'
}

const BpkInput = ({ id, name, value, onChange, placeholder, valid, disabled, type }) => {
  const classNames = [ 'bpk-input' ]

  valid
    ? classNames.push('bpk-input--valid')
    : valid === false ? classNames.push('bpk-input--invalid') : null

  return (
    <input
      className={classNames.join(' ')}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
  )
}

BpkInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf([
    INPUT_TYPES.TEXT,
    INPUT_TYPES.EMAIL,
    INPUT_TYPES.NUMBER,
    INPUT_TYPES.PASSWORD,
    INPUT_TYPES.TEL
  ])
}

BpkInput.defaultProps = {
  type: INPUT_TYPES.TEXT,
  placeholder: null,
  valid: null,
  disabled: false
}

export default BpkInput
