import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import SmSpinner from 'bpk-svgs/dist/js/spinners/sm'

import './bpk-spinner.scss'

const BpkSpinner = (props) => {
  const classNames = [ 'bpk-spinner' ]

  props.alignToButton ? classNames.push('bpk-spinner--align-to-button') : null

  return <SmSpinner className={classNames.join(' ')} fill={props.fill} />
}

BpkSpinner.propTypes = {
  fill: PropTypes.string,
  alignToButton: PropTypes.bool
}

BpkSpinner.defaultProps = {
  fill: TOKENS.colorGray700,
  alignToButton: false
}

export default BpkSpinner
