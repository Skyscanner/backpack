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

const BpkIcon = (props) => {
  const __html = getSvg(props.icon, props.large, props.color)
  const classNames = [ props.large ? 'bpk-icon-lg' : 'bpk-icon-sm' ]

  props.alignToButton ? classNames.push(props.large ? 'bpk-icon-lg--align-to-button' : 'bpk-icon-sm--align-to-button') : null

  return <span className={classNames.join(' ')} dangerouslySetInnerHTML={{ __html }} />
}

BpkIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  large: PropTypes.bool,
  color: PropTypes.string,
  alignToButton: PropTypes.bool
}

BpkIcon.defaultProps = {
  color: TOKENS.colorGray700,
  alignToButton: false
}

export default BpkIcon
