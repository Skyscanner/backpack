import React, { PropTypes } from 'react'

import './bpk-input.scss'

export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  PASSWORD: 'password',
  TEL: 'tel'
}

const BpkInput = (props) => {
  const classNames = [ 'bpk-input' ]

  props.valid
    ? classNames.push('bpk-input--valid')
    : props.valid === false ? classNames.push('bpk-input--invalid') : null

  return (
    <input
      className={classNames.join(' ')}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  )
}

BpkInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    INPUT_TYPES.TEXT,
    INPUT_TYPES.EMAIL,
    INPUT_TYPES.NUMBER,
    INPUT_TYPES.PASSWORD,
    INPUT_TYPES.TEL
  ]),
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  disabled: PropTypes.bool
}

BpkInput.defaultProps = {
  type: INPUT_TYPES.TEXT,
  placeholder: null,
  valid: null,
  disabled: false
}

export default BpkInput
