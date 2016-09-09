import React, { PropTypes } from 'react'

import './bpk-list.scss'

const BpkList = (props) => {
  const TagName = props.ordered ? 'ol' : 'ul'

  return <TagName className='bpk-list' children={props.children} />
}

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  ordered: PropTypes.bool
}

BpkList.defaultProps = {
  ordered: false
}

export default (BpkList)
