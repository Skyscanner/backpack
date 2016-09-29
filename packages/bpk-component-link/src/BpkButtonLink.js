import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkButtonLink = (props) => <button className='bpk-link' children={props.children} onClick={props.onClick} />

BpkButtonLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}
export default BpkButtonLink
