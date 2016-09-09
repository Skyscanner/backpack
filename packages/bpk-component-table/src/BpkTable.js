import React, { PropTypes } from 'react'

import './bpk-table.scss'

const BpkTable = (props) => <table className='bpk-table' children={props.children} />

BpkTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTable
