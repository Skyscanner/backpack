import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import TianxunStackedLogo from 'bpk-svgs/dist/js/logos/tianxun-stacked'

const BpkTianxunStackedLogo = (props) => <TianxunStackedLogo fill={props.fill} height={props.height} />

BpkTianxunStackedLogo.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string
}

BpkTianxunStackedLogo.defaultProps = {
  fill: TOKENS.colorGray700,
  height: '78'
}

export default BpkTianxunStackedLogo
