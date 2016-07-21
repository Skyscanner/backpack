import React, { PropTypes } from 'react'

const BpkTableRow = ({ children }) => <tr children={children} />

BpkTableRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableRow
