import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkLink = (props) => {
  const classNames = [ 'bpk-link' ]

  props.white ? classNames.push('bpk-link--white') : null

  return (
    <a
      className={classNames.join(' ')}
      children={props.children}
      href={props.href}
      onClick={props.onClick}
      target={props.blank ? '_blank' : null}
    />
  )
}

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  blank: PropTypes.bool,
  white: PropTypes.bool
}

BpkLink.defaultProps = {
  onClick: null,
  blank: false,
  white: false
}

export default BpkLink
