import React, { PropTypes } from 'react'

const BpkTableRow = (props) => <tr children={props.children} />

BpkTableRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableRow
