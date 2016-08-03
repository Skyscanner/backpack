import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkLink = ({ children, href, onClick, blank }) => {
  const props = {
    className: 'bpk-link',
    children,
    href,
    onClick
  }

  if (blank) {
    props.target = '_blank'
  }

  return <a {...props} />
}

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
