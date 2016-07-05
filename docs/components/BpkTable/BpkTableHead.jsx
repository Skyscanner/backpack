import React from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-table.scss'

const BpkTableHead = (props) => <thead {...props} />

export default CssModules(BpkTableHead, styles)
