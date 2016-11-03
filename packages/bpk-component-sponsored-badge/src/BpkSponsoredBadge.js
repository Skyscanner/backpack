import React, { PropTypes } from 'react'
import './bpk-sponsored-badge.scss'

const BpkSponsoredBadge = (props) => {
  const classNames = [ 'bpk-sponsored-badge' ]

  props.docked === 'left' ? classNames.push('bpk-sponsored-badge--docked-left') : null
  props.docked === 'right' ? classNames.push('bpk-sponsored-badge--docked-right') : null

  const className = classNames.join(' ')

  return <div className={className}>
    <small>{props.sponsoredText}</small>
    <div>{props.children}</div>
  </div>
}

BpkSponsoredBadge.propTypes = {
  sponsoredText: PropTypes.string,
  docked: PropTypes.oneOf('left', 'right', 'none'),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

BpkSponsoredBadge.defaultProps = {
  sponsoredText: 'Sponsored',
  docked: 'none'
}

export default BpkSponsoredBadge
