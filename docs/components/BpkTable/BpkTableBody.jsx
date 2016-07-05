import React from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-table.scss'

const BpkTableBody = (props) => <tbody {...props} />

export default CssModules(BpkTableBody, styles)
