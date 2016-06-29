import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './bpk-list.scss'

const BpkList = ({ children, ordered }) => {
  const listItems = React.Children.map(children, (child) => (
    <li styleName='bpk-list__item'>
      {child}
    </li>
  ))

  return ordered
    ? <ol styleName='bpk-list'>{listItems}</ol>
    : <ul styleName='bpk-list'>{listItems}</ul>
}

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  ordered: PropTypes.bool
}

BpkList.defaultProps = {
  ordered: false
}

export default CssModules(BpkList, styles)
