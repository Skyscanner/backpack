import React, { PropTypes } from 'react'

import './bpk-table.scss'

const BpkTable = ({ children }) => <table className='bpk-table' children={children} />

BpkTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkTable
