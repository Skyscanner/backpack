import React, { PropTypes } from 'react'

import './bpk-list.scss'

const BpkList = ({ ordered, children }) => {
  return ordered
    ? <ol className='bpk-list' children={children} />
    : <ul className='bpk-list' children={children} />
}

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  ordered: PropTypes.bool
}

BpkList.defaultProps = {
  ordered: false
}

export default (BpkList)
