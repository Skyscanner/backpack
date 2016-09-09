import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'

import './bpk-logo.scss'

const DEFAULT_HEIGHTS = {
  'inline': TOKENS.logoInlineDefaultHeight,
  'stacked': TOKENS.logoStackedDefaultHeight,
  'cloud': TOKENS.logoCloudDefaultHeight,
  'tianxun': TOKENS.logoTianxunDefaultHeight,
  'tianxun-stacked': TOKENS.logoTianxunStackedDefaultHeight
}

const BpkLogo = (props) => {
  const __html = require(`raw!bpk-svgs/src/logos/${props.logo}.svg`)
    .replace(/^<svg/, `<svg fill="${props.color}"`)

  const style = {
    height: props.height || DEFAULT_HEIGHTS[ props.logo ]
  }

  return <span className={`bpk-logo-${props.logo}`} style={style} dangerouslySetInnerHTML={{ __html }} />
}

BpkLogo.propTypes = {
  logo: PropTypes.oneOf([
    'inline',
    'stacked',
    'cloud',
    'tianxun',
    'tianxun-stacked'
  ]).isRequired,
  color: PropTypes.string,
  height: PropTypes.string
}

BpkLogo.defaultProps = {
  color: TOKENS.colorGray700,
  height: null
}

export default BpkLogo
