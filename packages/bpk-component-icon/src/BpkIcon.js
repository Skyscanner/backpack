import React, { PropTypes } from 'react'

import './bpk-icon.scss'

const resolveSvg = ({ icon, large }) => {
  return large
    ? require(`raw!bpk-svgs/src/icons/lg/${icon}.svg`)
    : require(`raw!bpk-svgs/src/icons/sm/${icon}.svg`)
}

const BpkIcon = ({ icon, large }) => {
  const className = large ? 'bpk-icon-lg' : 'bpk-icon-sm'

  return <span className={className} dangerouslySetInnerHTML={{ __html: resolveSvg({ icon, large }) }} />
}

BpkIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  large: PropTypes.bool
}

export default BpkIcon
