import React, { PropTypes } from 'react'

import './bpk-grid.scss'

const BpkGridRow = (props) => {
  const classNames = [ 'bpk-grid__row' ]

  props.debug ? classNames.push('bpk-grid__row--debug') : null

  return <div className={classNames.join(' ')}>{props.children}</div>
}

BpkGridRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  debug: PropTypes.bool
}

BpkGridRow.defaultProps = {
  debug: false
}

export default BpkGridRow
