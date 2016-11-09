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
  const { valid, large, docked, className, ...rest } = props
  const classNames = [ 'bpk-input' ]

  valid
    ? classNames.push('bpk-input--valid')
    : valid === false ? classNames.push('bpk-input--invalid') : null

  large ? classNames.push('bpk-input--large') : null
  docked ? classNames.push('bpk-input--docked') : null
  className ? classNames.push(className) : null

  return <input className={classNames.join(' ')} {...rest} />
}

BpkInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    INPUT_TYPES.TEXT,
    INPUT_TYPES.EMAIL,
    INPUT_TYPES.NUMBER,
    INPUT_TYPES.PASSWORD,
    INPUT_TYPES.TEL
  ]),
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
  docked: PropTypes.bool
}

BpkInput.defaultProps = {
  type: INPUT_TYPES.TEXT,
  className: null,
  valid: null,
  large: false,
  docked: false
}

export default BpkInput
