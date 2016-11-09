import React, { PropTypes } from 'react'

import './bpk-select.scss'

const BpkSelect = (props) => {
  const { valid, large, docked, className, ...rest } = props
  const classNames = [ 'bpk-select' ]

  large ? classNames.push('bpk-select--large') : null
  docked ? classNames.push('bpk-select--docked') : null
  valid === false ? classNames.push('bpk-select--invalid') : null
  className ? classNames.push(className) : null

  return (
    <select className={classNames.join(' ')} {...rest} />
  )
}

BpkSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
  docked: PropTypes.bool
}

BpkSelect.defaultProps = {
  className: null,
  valid: null,
  large: false,
  docked: false
}

export default BpkSelect
