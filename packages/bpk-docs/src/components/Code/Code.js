import React, { PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'

import './code.scss'

const childrenToString = (children) => {
  return React.Children.map(children, (child) => React.isValidElement(child)
    ? ReactDOMServer.renderToStaticMarkup(child)
    : `${child}`
  ).join('')
}

const Code = ({ children, inline }) => {
  const codeString = childrenToString(children)

  if (inline) {
    return <code className='bpkdocs-code__code bpkdocs-code__code--inline'>{codeString}</code>
  }

  return (
    <pre className='bpkdocs-code__pre'>
      <code className='bpkdocs-code__code bpkdocs-code__code--block'>{codeString}</code>
    </pre>
  )
}

Code.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  inline: PropTypes.bool
}

Code.defaultProps = {
  inline: false
}

export default Code
