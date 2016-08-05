import React, { PropTypes } from 'react'

import './bpk-content-container.scss'

const BpkContentContainer = ({ children, tagName }) => {
  const TagName = tagName
  return <TagName className='bpk-content-container' children={children} />
}

BpkContentContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  tagName: PropTypes.oneOf([ 'article', 'aside', 'div', 'main', 'section' ])
}

BpkContentContainer.defaultProps = {
  tagName: 'div'
}

export default BpkContentContainer

