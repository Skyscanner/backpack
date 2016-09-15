import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import TianxunLogo from 'bpk-svgs/dist/js/logos/tianxun'

const BpkTianxunLogo = (props) => <TianxunLogo fill={props.fill} height={props.height} />

BpkTianxunLogo.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string
}

BpkTianxunLogo.defaultProps = {
  fill: TOKENS.colorGray700,
  height: TOKENS.spacingXxl
}

export default BpkTianxunLogo
