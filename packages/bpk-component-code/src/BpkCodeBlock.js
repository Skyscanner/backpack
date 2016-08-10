import React, { PropTypes } from 'react'

import './bpk-code.scss'

const BpkCodeBlock = ({ children }) => (
  <pre className='bpk-code__pre'>
    <code className='bpk-code bpk-code--block'>{children}</code>
  </pre>
)

BpkCodeBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default BpkCodeBlock
