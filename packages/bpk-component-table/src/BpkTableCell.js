import React, { PropTypes } from 'react'

import './bpk-table.scss'

const BpkTableCell = (props) => <td className='bpk-table__cell' children={props.children} />

BpkTableCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableCell
