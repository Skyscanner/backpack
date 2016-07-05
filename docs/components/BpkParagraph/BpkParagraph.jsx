import React from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-paragraph.scss'

const BpkParagraph = (props) => <p styleName='bpk-paragraph' {...props} />

export default CssModules(BpkParagraph, styles)
