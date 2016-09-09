import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'

import './bpk-spinner.scss'

const BpkSpinner = (props) => {
  const classNames = [ 'bpk-spinner' ]
  const __html = require('raw!bpk-svgs/src/spinners/spinner.svg')
    .replace(/^<svg/, `<svg fill="${props.color}"`)

  props.large ? classNames.push('bpk-spinner--large') : null
  props.extraLarge ? classNames.push('bpk-spinner--extra-large') : null
  props.alignToButton
    ? classNames.push(props.large ? classNames.push('bpk-spinner--align-to-large-button') : 'bpk-spinner--align-to-button')
    : null

  return <span className={classNames.join(' ')} dangerouslySetInnerHTML={{ __html }} />
}

BpkSpinner.propTypes = {
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
  color: PropTypes.string,
  alignToButton: PropTypes.bool
}

BpkSpinner.defaultProps = {
  large: false,
  extraLarge: false,
  color: TOKENS.colorGray700,
  alignToButton: false
}

export default BpkSpinner
