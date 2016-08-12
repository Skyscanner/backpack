import React, { PropTypes } from 'react'

import './bpk-list.scss'

const BpkListItem = ({ children }) => <li className='bpk-list__item'>{children}</li>

BpkListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default BpkListItem
