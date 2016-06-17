import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './heading.scss'

const Heading = (props) => {
  const styleName = `heading__${props.headingLevel}`
  const underlineStyleName = `${styleName} ${styleName}--underline`

  return (
    <props.headingLevel styleName={props.underline ? underlineStyleName : styleName}>
      {props.children}
    </props.headingLevel>
  )
}

Heading.propTypes = {
  headingLevel: PropTypes.oneOf([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  underline: PropTypes.bool
}

Heading.defaultProps = {
  underline: false
}

export default CssModules(Heading, styles, { allowMultiple: true })
