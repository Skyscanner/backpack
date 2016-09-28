import React, { PropTypes } from 'react'

import './bpk-code.scss'

const BpkCode = (props) => <code className='bpk-code'>{props.children}</code>

BpkCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkCode
