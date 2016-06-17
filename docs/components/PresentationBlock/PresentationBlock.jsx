import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './presentation-block.scss'

import CodeSnippet from './../CodeSnippet'

const PresentationBlock = (props) => (
  <section styleName='presentation-block'>
    <div styleName='presentation-block__container'>
      {props.children}
    </div>
    <CodeSnippet syntax='html'>
      {props.children}
    </CodeSnippet>
  </section>
)

PresentationBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CssModules(PresentationBlock, styles)
