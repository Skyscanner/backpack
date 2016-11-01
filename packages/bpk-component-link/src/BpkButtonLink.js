import React, { PropTypes } from 'react'

import './bpk-link.scss'

const BpkButtonLink = (props) => {
  const classNames = [ 'bpk-link' ]

  props.white ? classNames.push('bpk-link--white') : null

  return (
    <button
      type='button'
      className={classNames.join(' ')}
      onClick={props.onClick}
      children={props.children}
    />
  )
}

BpkButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  white: PropTypes.bool
}

BpkButtonLink.defaultProps = {
  white: false
}

export default BpkButtonLink
