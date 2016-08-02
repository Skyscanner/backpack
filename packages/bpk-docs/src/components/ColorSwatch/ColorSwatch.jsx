import React, { PropTypes } from 'react'

import './color-swatch.scss'

const ColorSwatch = (props) => {
  const classNames = [
    'bpkdocs-color-swatch',
    props.whiteColor ? 'bpkdocs-color-swatch--light' : '',
    props.border ? 'bpkdocs-color-swatch--border' : ''
  ]

  return <div style={{backgroundColor: props.color, backgroundImage: props.gradient}} className={classNames.join(' ')}>{props.name}</div>
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
