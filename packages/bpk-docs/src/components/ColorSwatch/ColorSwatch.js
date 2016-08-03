import React, { PropTypes } from 'react'

import './color-swatch.scss'

const ColorSwatch = (props) => {
  const style = {
    backgroundColor: props.color,
    backgroundImage: props.gradient
  }

  const classNames = [ 'bpkdocs-color-swatch' ]

  props.whiteColor ? classNames.push('bpkdocs-color-swatch--light') : ''
  props.border ? classNames.push('bpkdocs-color-swatch--border') : ''

  return <div style={style} className={classNames.join(' ')}>{props.name}</div>
}

ColorSwatch.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  whiteColor: PropTypes.bool,
  border: PropTypes.bool,
  gradient: PropTypes.string
}

ColorSwatch.defaultProps = {
  color: null,
  whiteColor: false,
  border: false,
  gradient: null
}

export default ColorSwatch
