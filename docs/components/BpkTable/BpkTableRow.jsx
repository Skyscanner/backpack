import React from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-table.scss'

const BpkTableRow = (props) => <tr {...props} />

export default CssModules(BpkTableRow, styles)
