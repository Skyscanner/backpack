import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-heading.scss'

const BpkHeading = (props) => (
  <props.level {...props} styleName={`bpk-heading__${props.level}`}>
    {props.children}
  </props.level>
)

BpkHeading.propTypes = {
  level: PropTypes.oneOf([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  underline: PropTypes.bool
}

BpkHeading.defaultProps = {
  underline: false
}

export default CssModules(BpkHeading, styles, { allowMultiple: true })
