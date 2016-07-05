import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-list.scss'

const BpkList = (props) => {
  return props.ordered
    ? <ol styleName='bpk-list' {...props} />
    : <ul styleName='bpk-list' {...props} />
}

BpkList.propTypes = {
  ordered: PropTypes.bool
}

BpkList.defaultProps = {
  ordered: false
}

export default CssModules(BpkList, styles)
