import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'
import { Link } from 'react-router'

import styles from './bpk-link.scss'

const BpkLink = (props) => {
  const { children, to } = props

  return to
    ? (<Link {...props} styleName='bpk-link' activeClassName='bpk-link--active'>{children}</Link>)
    : (<a {...props} styleName='bpk-link'>{children}</a>)
}

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  to: PropTypes.string
}

export default CssModules(BpkLink, styles)
