import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-heading.scss'

const BpkHeading = (props) => (
  <props.level styleName={`bpk-heading-${props.level}`} {...props} />
)

BpkHeading.propTypes = {
  level: PropTypes.oneOf([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]).isRequired
}

export default CssModules(BpkHeading, styles)
