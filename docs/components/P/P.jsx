import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './p.scss'

const P = ({ children }) => (
  <p styleName='bpk-p'>{children}</p>
)

P.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CssModules(P, styles)
