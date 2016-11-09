import React, { PropTypes } from 'react'

import './bpk-label.scss'

const BpkLabel = (props) => {
  const { label, white, className, ...rest } = props
  const classNames = [ 'bpk-label' ]

  white ? classNames.push('bpk-label--white') : null
  className ? classNames.push(className) : null

  return <label className={classNames.join(' ')} {...rest}>{label}</label>
}

BpkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  white: PropTypes.bool
}

BpkLabel.defaultProps = {
  className: null,
  white: false
}

export default BpkLabel
