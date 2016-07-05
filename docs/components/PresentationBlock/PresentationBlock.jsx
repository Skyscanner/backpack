import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './presentation-block.scss'
import BpkCode from './../BpkCode'

const PresentationBlock = (props) => (
  <section styleName='bpkdocs-presentation-block'>
    <div styleName='bpkdocs-presentation-block__container'>
      {props.children}
    </div>
    <BpkCode syntax={props.syntax}>
      {props.children}
    </BpkCode>
  </section>
)

PresentationBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  syntax: PropTypes.string
}

export default CssModules(PresentationBlock, styles)
