import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkLink = ({ children, href, onClick }) => (
  <a className='bpk-link' children={children} href={href} onClick={onClick} />
)

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

BpkLink.defaultProps = {
  onClick: null
}

export default BpkLink
