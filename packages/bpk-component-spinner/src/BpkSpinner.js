import React, { PropTypes } from 'react'

import './bpk-spinner.scss'

const BpkSpinner = ({ large, extraLarge }) => {
  const classNames = [ 'bpk-spinner' ]
  const __html = require('raw!bpk-svgs/src/spinners/spinner.svg')

  large ? classNames.push('bpk-spinner--large') : null
  extraLarge ? classNames.push('bpk-spinner--extra-large') : null

  return <span className={classNames.join(' ')} dangerouslySetInnerHTML={{ __html }} />
}

BpkSpinner.propTypes = {
  large: PropTypes.bool,
  extraLarge: PropTypes.bool
}

BpkSpinner.defaultProps = {
  large: false,
  extraLarge: false
}

export default BpkSpinner
