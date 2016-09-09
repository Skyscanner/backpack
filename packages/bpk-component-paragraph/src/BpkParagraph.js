import React, { PropTypes } from 'react'

import './bpk-paragraph.scss'

const BpkParagraph = (props) => <p className='bpk-paragraph' children={props.children} />

BpkParagraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkParagraph

