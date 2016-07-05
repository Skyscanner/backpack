import React from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-table.scss'

const BpkTableCell = (props) => <td styleName='bpk-table__cell' {...props} />

export default CssModules(BpkTableCell, styles)
