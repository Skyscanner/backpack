import React, { PropTypes } from 'react'

const BpkTableBody = ({ children }) => <tbody children={children} />

BpkTableBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableBody
