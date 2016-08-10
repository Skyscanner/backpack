import React, { PropTypes } from 'react'

import './bpk-content-container.scss'

const BpkContentContainer = ({ children, tagName, dangerouslySetInnerHTML }) => {
  const TagName = tagName
  return (
    <TagName
      className='bpk-content-container'
      children={children}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  )
}

BpkContentContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.string.isRequired
  }),
  tagName: PropTypes.oneOf([ 'article', 'aside', 'div', 'main', 'section' ])
}

BpkContentContainer.defaultProps = {
  children: null,
  dangerouslySetInnerHTML: null,
  tagName: 'div'
}

export default BpkContentContainer

