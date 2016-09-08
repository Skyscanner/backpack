import React, { PropTypes } from 'react'

import './bpk-content-container.scss'

const BpkContentContainer = (props) => {
  const TagName = props.tagName
  const classNames = [ 'bpk-content-container' ]

  props.bareHtml ? classNames.push('bpk-content-container--bare-html') : null

  return (
    <TagName
      className={classNames.join(' ')}
      children={props.children}
      dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
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
  tagName: PropTypes.oneOf([ 'article', 'aside', 'div', 'main', 'section' ]),
  bareHtml: PropTypes.bool
}

BpkContentContainer.defaultProps = {
  children: null,
  dangerouslySetInnerHTML: null,
  tagName: 'div',
  bareHtml: false
}

export default BpkContentContainer

