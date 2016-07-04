import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'
import { Link } from 'react-router'

import styles from './bpk-link.scss'

const BpkLink = (props) => {
  return props.to
    ? <Link to={props.to} styleName='bpk-link' activeClassName='bpk-link--active' {...props} />
    : <a styleName='bpk-link' {...props} />
}

BpkLink.propTypes = {
  to: PropTypes.string
}

export default CssModules(BpkLink, styles)
