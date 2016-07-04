import Prism from 'prismjs'
import Beautify from 'js-beautify'
import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'
import ReactDOMServer from 'react-dom/server'

import styles from './bpk-code.scss'

const syntaxHighlightingMap = {
  html: {
    beautifier: 'html',
    highlighter: Prism.languages.markup
  },
  css: {
    beautifier: 'css',
    highlighter: Prism.languages.css
  },
  js: {
    beautifier: 'js',
    highlighter: Prism.languages.javascript
  }
}

const renderToStaticMarkup = (element) => {
  return React.isValidElement(element)
    ? ReactDOMServer.renderToStaticMarkup(element)
    : `${element}`
}

const renderChildrenToStaticMarkup = (children) => {
  return React.Children.map(children, (child) => renderToStaticMarkup(child)).join('')
}

const prettyPrint = (code, syntax) => {
  const { beautifier } = syntaxHighlightingMap[ syntax ]

  return syntax ? Beautify[ beautifier ](code, { indent_size: 2 }) : code
}

const highlight = (code, syntax) => {
  const { highlighter } = syntaxHighlightingMap[ syntax ]

  return syntax ? Prism.highlight(code, highlighter) : code
}

const BpkCode = (props) => {
  const styleName = `language-${props.syntax}`
  const staticMarkup = renderChildrenToStaticMarkup(props.children)
  const prettyCode = prettyPrint(staticMarkup, props.syntax)
  const innerHTML = { __html: highlight(prettyCode, props.syntax) }

  if (props.inline) {
    return (
      <code styleName={`${styleName} ${styleName}--inline`}>
        <span dangerouslySetInnerHTML={innerHTML}></span>
      </code>
    )
  }

  return (
    <pre styleName={`${styleName} ${styleName}--block`}>
      <code styleName={styleName} dangerouslySetInnerHTML={innerHTML}></code>
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

export default CssModules(BpkCode, styles, { allowMultiple: true })
