import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'
import omit from 'lodash/omit'

import styles from './bpk-button.scss'

const BpkButton = (props) => {
  const styleNames = [
    'bpk-button',
    `${props.secondary ? 'bpk-button--secondary' : ''}`,
    `${props.selected ? 'bpk-button--selected' : ''}`,
    `${props.large ? 'bpk-button--large' : ''}`
  ]

  return (
    <button type='button' styleName={styleNames.join(' ')}{...omit(props, ['selected'])}>
      {props.children}
    </button>
  )
}

BpkButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  large: PropTypes.bool
}

BpkButton.defaultProps = {
  secondary: false,
  selected: false,
  large: false
}

export default CssModules(BpkButton, styles, { allowMultiple: true })
