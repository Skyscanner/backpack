import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'

import './bpk-spinner.scss'

const BpkSpinner = ({ large, extraLarge, color }) => {
  const classNames = [ 'bpk-spinner' ]
  const __html = require('raw!bpk-svgs/src/spinners/spinner.svg')
    .replace(/^<svg/, `<svg fill="${color}"`)

  large ? classNames.push('bpk-spinner--large') : null
  extraLarge ? classNames.push('bpk-spinner--extra-large') : null

  return <span className={classNames.join(' ')} dangerouslySetInnerHTML={{ __html }} />
}

BpkSpinner.propTypes = {
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
  color: PropTypes.string
}

BpkSpinner.defaultProps = {
  large: false,
  extraLarge: false,
  color: TOKENS.colorGray500
}

export default BpkSpinner
