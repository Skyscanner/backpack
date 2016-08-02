import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'

import './bpk-icon.scss'

const getSvgContents = (icon, large) => {
  return large
    ? require(`raw!bpk-svgs/src/icons/lg/${icon}.svg`)
    : require(`raw!bpk-svgs/src/icons/sm/${icon}.svg`)
}

const getSvg = (icon, large, color) => {
  const svgContents = getSvgContents(icon, large)

  return svgContents
    .replace(/^<svg/, `<svg fill="${color}"`)
}

const BpkIcon = ({ icon, large, color = TOKENS.colorGray500 }) => {
  const className = large ? 'bpk-icon-lg' : 'bpk-icon-sm'

  return <span className={className} dangerouslySetInnerHTML={{ __html: getSvg(icon, large, color) }}/>
}

BpkIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  large: PropTypes.bool
}

export default BpkIcon
