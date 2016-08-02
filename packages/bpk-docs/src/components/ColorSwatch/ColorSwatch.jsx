import React, { PropTypes } from 'react'

import './color-swatch.scss'

const ColorSwatch = (props) => {
  const classNames = [
    'bpkdocs-color-swatch',
    props.whiteColor ? 'bpkdocs-color-swatch--light' : '',
    props.border ? 'bpkdocs-color-swatch--border' : ''
  ]

  return <div style={{ backgroundColor: props.color }} className={classNames.join(' ')}>{props.name}</div>
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

export default ColorSwatch
