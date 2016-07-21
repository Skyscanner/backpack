import React, { PropTypes } from 'react'

import './bpk-list.scss'

const BpkList = ({ children }) => <li className='bpk-list__item'>{children}</li>

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default BpkList
