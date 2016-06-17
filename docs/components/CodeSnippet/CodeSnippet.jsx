import React, { PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'
import Prism from 'prismjs'
import Beautify from 'js-beautify'

import styles from './code-snippet.scss'

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
  return React.Children.map(children, (child) => { return renderToStaticMarkup(child) }).join('')
}

const prettyPrint = (code, syntax) => {
  const { beautifier } = syntaxHighlightingMap[ syntax ]

  return syntax ? Beautify[ beautifier ](code) : code
}

const highlight = (code, syntax) => {
  const { highlighter } = syntaxHighlightingMap[ syntax ]

  return syntax ? Prism.highlight(code, highlighter) : code
}

const CodeSnippet = (props) => {
  const staticMarkup = renderChildrenToStaticMarkup(props.children)
  const code = prettyPrint(staticMarkup, props.syntax)
  const highlightedCode = highlight(code, props.syntax)

  if (props.inline) {
    return (<code className={`language-${props.syntax}`} dangerouslySetInnerHTML={{__html: highlightedCode}}></code>)
  }

  return (
    <pre className={`language-${props.syntax}`}>
      <code className={`language-${props.syntax}`} dangerouslySetInnerHTML={{__html: highlightedCode}}></code>
    </pre>
  )
}

CodeSnippet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  inline: PropTypes.bool,
  className: PropTypes.string,
  syntax: PropTypes.oneOf([ 'html', 'css', 'scss', 'js' ])
}

CodeSnippet.defaultProps = {
  inline: false,
  syntax: 'html'
}

export default CodeSnippet
