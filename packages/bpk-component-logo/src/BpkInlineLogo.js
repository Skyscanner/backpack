import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import InlineLogo from 'bpk-svgs/dist/js/logos/inline'

const BpkInlineLogo = (props) => <InlineLogo fill={props.fill} height={props.height} />

BpkInlineLogo.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string
}

BpkInlineLogo.defaultProps = {
  fill: TOKENS.colorGray700,
  height: TOKENS.spacingXxl
}

export default BpkInlineLogo
