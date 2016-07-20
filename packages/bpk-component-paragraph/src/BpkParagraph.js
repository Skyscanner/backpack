import React, { PropTypes } from 'react'

import './bpk-paragraph.scss'

const BpkParagraph = ({ children }) => <p className='bpk-paragraph' children={children} />

BpkParagraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BpkParagraph

