import React, { PropTypes } from 'react'

import './presentation-block.scss'
import BpkCode from './../BpkCode'
import BpkLink from './../BpkLink'

const SassDocLink = ({ sassdocId }) => (
  <div className='bpkdocs-presentation-block__sassdoc'>
    <BpkLink href={`/sassdoc/#${sassdocId}`} target='_blank'>View the Sass documentation.</BpkLink>
  </div>
)

SassDocLink.propTypes = {
  sassdocId: PropTypes.string
}

const PresentationBlock = ({ children, showHTML, sassdocId }) => (
  <section className='bpkdocs-presentation-block'>
    <div className='bpkdocs-presentation-block__container'>{children}</div>
    {sassdocId ? <SassDocLink sassdocId={sassdocId} /> : null}
    {showHTML ? <BpkCode label='HTML:'>{children}</BpkCode> : null}
  </section>
)

PresentationBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  showHTML: PropTypes.bool,
  sassdocId: PropTypes.string
}

PresentationBlock.defaultProps = {
  showHTML: false
}

export default PresentationBlock
