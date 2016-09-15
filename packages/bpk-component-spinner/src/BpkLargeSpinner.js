import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import LgSpinner from 'bpk-svgs/dist/js/spinners/lg'

import './bpk-spinner.scss'

const BpkLargeSpinner = (props) => {
  const classNames = [ 'bpk-spinner' ]

  props.alignToButton ? classNames.push('bpk-spinner--align-to-large-button') : null

  return <LgSpinner className={classNames.join(' ')} fill={props.fill} />
}

BpkLargeSpinner.propTypes = {
  fill: PropTypes.string,
  alignToButton: PropTypes.bool
}

BpkLargeSpinner.defaultProps = {
  fill: TOKENS.colorGray700,
  alignToButton: false
}

export default BpkLargeSpinner
