import React, { PropTypes } from 'react'

import './bpk-grid.scss'

const BpkGridRow = (props) => <div className='bpk-grid__row'>{props.children}</div>

BpkGridRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkGridRow
