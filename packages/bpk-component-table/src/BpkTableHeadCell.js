import React, { PropTypes } from 'react'

import './bpk-table.scss'

const BpkTableHeadCell = ({ children }) => <th className='bpk-table__cell bpk-table__cell--head' children={children} />

BpkTableHeadCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableHeadCell
