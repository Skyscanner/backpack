import React, { PropTypes } from 'react'

import './bpk-blockquote.scss'

const BpkBlockquote = ({ children }) => <blockquote className='bpk-blockquote'>{children}</blockquote>

BpkBlockquote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default BpkBlockquote
