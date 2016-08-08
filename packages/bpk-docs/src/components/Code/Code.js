import beautify from 'js-beautify'
import React, { PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'

import './code.scss'

const childrenToString = (children) => {
  return React.Children.map(children, (child) => React.isValidElement(child)
    ? ReactDOMServer.renderToStaticMarkup(child)
    : `${child}`
  ).join('')
}

const prettyPrint = (code, syntax) => beautify[ syntax ](code, { indent_size: 2 })

const Code = ({ children, syntax, inline }) => {
  const codeString = childrenToString(children)

  if (inline) {
    return <code className='bpkdocs-code__code bpkdocs-code__code--inline'>{codeString}</code>
  }

  const prettyCodeString = prettyPrint(codeString, syntax)

  return (
    <pre className='bpkdocs-code__pre'>
      <code className='bpkdocs-code__code bpkdocs-code__code--block'>{prettyCodeString}</code>
    </pre>
  )
}

Code.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  inline: PropTypes.bool,
  syntax: PropTypes.oneOf([ 'html', 'css', 'js' ])
}

Code.defaultProps = {
  inline: false,
  syntax: 'html'
}

export default Code
