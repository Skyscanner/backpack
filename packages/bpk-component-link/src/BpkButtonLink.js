import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkButtonLink = (props) => <button
  type='button'
  className='bpk-link'
  onClick={props.onClick}
  children={props.children}
/>

BpkButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
export default BpkButtonLink
