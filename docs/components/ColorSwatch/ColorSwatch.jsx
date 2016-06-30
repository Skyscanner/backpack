import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './color-swatch.scss'

const ColorSwatch = (props) => {
  const styleNames = [
    'bkpdocs-color-swatch',
    props.whiteColor ? 'bkpdocs-color-swatch--light' : '',
    props.border ? 'bkpdocs-color-swatch--border' : ''
  ]

  return <div style={{backgroundColor: props.color}} styleName={styleNames.join(' ')}>{props.name}</div>
}

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  whiteColor: PropTypes.bool,
  border: PropTypes.bool
}

ColorSwatch.defaultProps = {
  whiteColor: false,
  border: false
}

export default CssModules(ColorSwatch, styles, { allowMultiple: true })
