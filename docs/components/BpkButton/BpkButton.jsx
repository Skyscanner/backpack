import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-button.scss'

const BpkButton = (props) => {
  const styleNames = [
    'bpk-button',
    `${props.secondary ? 'bpk-button--secondary' : ''}`,
    `${props.selected ? 'bpk-button--selected' : ''}`,
    `${props.large ? 'bpk-button--large' : ''}`,
    `${props.link ? 'bpk-button--link' : ''}`
  ]

  return <button type='button' styleName={styleNames.join(' ')} {...props} />
}

BpkButton.propTypes = {
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.bool
}

BpkButton.defaultProps = {
  secondary: false,
  selected: false,
  large: false,
  link: false
}

export default CssModules(BpkButton, styles, { allowMultiple: true })
