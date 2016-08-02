import React, { PropTypes } from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'

import './bpk-logo.scss'

const BpkLogo = ({ logo, color }) => {
  const __html = require(`raw!bpk-svgs/src/logos/${logo}.svg`)
    .replace(/^<svg/, `<svg fill="${color}"`)

  return <span className={`bpk-logo-${logo}`} dangerouslySetInnerHTML={{ __html }} />
}

BpkLogo.propTypes = {
  logo: PropTypes.string.isRequired,
  color: PropTypes.string
}

BpkLogo.defaultProps = {
  color: TOKENS.colorGray500
}

export default BpkLogo
