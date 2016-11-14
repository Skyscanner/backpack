import React, { PropTypes } from 'react'

import './bpk-badge.scss'

const BpkBadge = (props) => {
  const { docked, className, ...rest } = props
  const classNames = [ 'bpk-badge' ]

  docked === 'right' ? classNames.push('bpk-badge--docked-right') : null
  docked === 'left' ? classNames.push('bpk-badge--docked-left') : null
  className ? classNames.push(className) : null

  return <span className={classNames.join(' ')} {...rest} />
}

BpkBadge.propTypes = {
  docked: PropTypes.oneOf([ 'right', 'left', null ]),
  className: PropTypes.string
}

BpkBadge.defaultProps = {
  docked: null,
  className: null
}

export default BpkBadge
