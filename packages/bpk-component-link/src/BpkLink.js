import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkLink = (props) => (
  <a
    className='bpk-link'
    children={props.children}
    href={props.href}
    onClick={props.onClick}
    target={props.blank ? '_blank' : null}
  />
)

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  blank: PropTypes.bool
}

BpkLink.defaultProps = {
  onClick: null,
  blank: false
}

export default BpkLink
