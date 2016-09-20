import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import XlSpinner from 'bpk-svgs/dist/js/spinners/xl'

import './bpk-spinner.scss'

const BpkExtraLargeSpinner = (props) => <XlSpinner className='bpk-spinner' fill={props.fill} />

BpkExtraLargeSpinner.propTypes = {
  fill: PropTypes.string
}

BpkExtraLargeSpinner.defaultProps = {
  fill: TOKENS.colorGray700
}

export default BpkExtraLargeSpinner
