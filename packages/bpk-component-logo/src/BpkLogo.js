import React, { PropTypes } from 'react'

import './bpk-logo.scss'

const resolveSvg = ({ logo }) => require(`raw!bpk-svgs/src/logos/${logo}.svg`)

const BpkLogo = ({ logo }) => (
  <span className={`bpk-logo-${logo}`} dangerouslySetInnerHTML={{ __html: resolveSvg({ logo }) }} />
)

BpkLogo.propTypes = {
  logo: PropTypes.string.isRequired
}

export default BpkLogo
