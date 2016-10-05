import React, { PropTypes } from 'react'

import './bpk-heading.scss'

const BpkHeading = (props) => {
  const classNames = [ `bpk-heading-${props.level}` ]

  !props.bottomMargin ? classNames.push('bpk-heading--no-bottom-margin') : null

  return <props.level className={classNames.join(' ')} children={props.children} id={props.id} />
}

BpkHeading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  level: PropTypes.oneOf([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]).isRequired,
  id: PropTypes.string,
  bottomMargin: PropTypes.bool
}

BpkHeading.defaultProps = {
  id: null,
  bottomMargin: true
}

export default BpkHeading
