import React, { PropTypes } from 'react'
import { Link, PropTypes as RouterPropTypes } from 'react-router'

import './bpk-router-link.scss'

const BpkRouterLink = ({ children, to, onClick }) => (
  <Link
    className='bpk-router-link'
    activeClassName='bpk-router-link--active'
    children={children}
    to={to}
    onClick={onClick}
  />
)

BpkRouterLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  to: PropTypes.oneOfType([
    PropTypes.shape(RouterPropTypes.locationShape),
    PropTypes.string
  ]).isRequired,
  onClick: PropTypes.func
}

BpkRouterLink.defaultProps = {
  onClick: null
}

export default BpkRouterLink
