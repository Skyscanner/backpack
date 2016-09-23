import React, { PropTypes } from 'react'

import './bpk-card.scss'

const BpkCard = props => {
  const classNames = [ 'bpk-card' ]

  props.padded ? classNames.push('bpk-card--padded') : null

  return <a href={props.href} onClick={props.onClick} className={classNames.join(' ')}>{props.children}</a>
}

BpkCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  padded: PropTypes.bool
}

BpkCard.defaultProps = {
  onClick: null,
  padded: true
}

export default BpkCard
