import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkLink = ({children}) => <a className='bpk-link' children={children} />

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func
}

BpkLink.defaultProps = {
  href: null,
  onClick: null
}

export default BpkLink
