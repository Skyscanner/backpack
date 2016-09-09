import React, { PropTypes } from 'react'

import './bpk-label.scss'

const BpkLabel = (props) => <label className='bpk-label' htmlFor={props.htmlFor}>{props.label}</label>

BpkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string
}

BpkLabel.defaultProps = {
  htmlFor: null
}

export default BpkLabel
