import beautify from 'js-beautify'
import React, { PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'

import './bpk-code.scss'

const childrenToString = (children) => {
  return React.Children.map(children, (child) => React.isValidElement(child)
    ? ReactDOMServer.renderToStaticMarkup(child)
    : `${child}`
  ).join('')
}

const prettyPrint = (code, syntax) => beautify[ syntax ](code, { indent_size: 2 })

const BpkCode = ({ children, syntax, inline }) => {
  const codeString = childrenToString(children)

  if (inline) {
    return <code className='bpk-code__code bpk-code__code--inline'>{codeString}</code>
  }

  const prettyCodeString = prettyPrint(codeString, syntax)

  return (
    <pre className='bpk-code__pre'>
      <code className='bpk-code__code bpk-code__code--block'>{prettyCodeString}</code>
    </pre>
  )
}

BpkCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  inline: PropTypes.bool,
  syntax: PropTypes.oneOf([ 'html', 'css', 'js' ])
}

BpkCode.defaultProps = {
  inline: false,
  syntax: 'html'
}

export default BpkCode
