import React, { PropTypes } from 'react'

import './bpk-label.scss'

const BpkLabel = ({ label, htmlFor }) => <label className='bpk-label' htmlFor={htmlFor}>{label}</label>

BpkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string
}

BpkLabel.defaultProps = {
  htmlFor: null
}

export default BpkLabel
