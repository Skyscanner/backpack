import React from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-table.scss'

const BpkTableHeadCell = (props) => <th styleName='bpk-table__cell bpk-table__cell--head' {...props} />

export default CssModules(BpkTableHeadCell, styles, { allowMultiple: true })
