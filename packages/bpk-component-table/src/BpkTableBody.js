import React, { PropTypes } from 'react'

const BpkTableBody = (props) => <tbody children={props.children} />

BpkTableBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableBody
