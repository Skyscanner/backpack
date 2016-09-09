import React, { PropTypes } from 'react'

const BpkTableHead = (props) => <thead children={props.children} />

BpkTableHead.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTableHead
