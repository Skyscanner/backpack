import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-paragraph.scss'

const BpkParagraph = ({ children }) => (
  <p styleName='bpk-paragraph'>{children}</p>
)

BpkParagraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CssModules(BpkParagraph, styles)
