import React, { PropTypes } from 'react'

import './bpk-heading.scss'

const BpkHeading = ({ level, children, id }) => {
  const TagName = level
  return <TagName className={`bpk-heading-${level}`} children={children} id={id} />
}

BpkHeading.propTypes = {
  level: PropTypes.oneOf([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  id: PropTypes.string
}

BpkHeading.defaultProps = {
  id: null
}

export default BpkHeading
