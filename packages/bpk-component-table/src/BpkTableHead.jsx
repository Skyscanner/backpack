import React, { PropTypes } from 'react'

const BpkTableHead = ({ children }) => <thead children={children} />

BpkTableHead.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableHead
