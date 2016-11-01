import React, { PropTypes } from 'react'

import './bpk-label.scss'

const BpkLabel = (props) => {
  const classNames = [ 'bpk-label' ]

  props.white ? classNames.push('bpk-label--white') : null

  return <label className={classNames.join(' ')} htmlFor={props.htmlFor}>{props.label}</label>
}

BpkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
  white: PropTypes.bool
}

BpkLabel.defaultProps = {
  htmlFor: null,
  white: false
}

export default BpkLabel
