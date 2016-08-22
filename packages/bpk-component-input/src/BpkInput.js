import React, { PropTypes } from 'react'

import './bpk-input.scss'

export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  PASSWORD: 'password',
  TEL: 'tel'
}

const BpkInput = ({ name, value, onChange, placeholder, valid, type }) => {
  const classNames = [ 'bpk-input' ]

  valid
    ? classNames.push('bpk-input--valid')
    : valid === false ? classNames.push('bpk-input--invalid') : null

  return (
    <input
      className={classNames.join(' ')}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  )
}

BpkInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
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
  valid: null
}

export default BpkInput
