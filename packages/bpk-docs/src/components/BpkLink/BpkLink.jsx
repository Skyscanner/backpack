import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './bpk-link.scss'

const BpkLink = (props) => {
  return props.to
    ? <Link to={props.to} className='bpk-link' activeClassName='bpk-link--active' {...props} />
    : <a className='bpk-link' {...props} />
}

BpkLink.propTypes = {
  to: PropTypes.string
}

export default BpkLink
