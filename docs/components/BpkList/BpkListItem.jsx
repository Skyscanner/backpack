import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-list.scss'

const BpkList = ({ children }) => <li styleName='bpk-list__item'>{children}</li>

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CssModules(BpkList, styles)
