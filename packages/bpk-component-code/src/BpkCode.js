import React, { PropTypes } from 'react'

import './bpk-code.scss'

const BpkCode = ({ children }) => <code className='bpk-code'>{children}</code>

BpkCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default BpkCode
