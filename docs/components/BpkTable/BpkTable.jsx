import React from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-table.scss'

const BpkTable = (props) => <table styleName='bpk-table' {...props} />

export default CssModules(BpkTable, styles)
