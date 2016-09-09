import React, { PropTypes } from 'react'

import './bpk-heading.scss'

const BpkHeading = (props) => {
  const TagName = props.level
  return <TagName className={`bpk-heading-${props.level}`} children={props.children} id={props.id} />
}

BpkHeading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  level: PropTypes.oneOf([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]).isRequired,
  id: PropTypes.string
}

BpkHeading.defaultProps = {
  id: null
}

export default BpkHeading
