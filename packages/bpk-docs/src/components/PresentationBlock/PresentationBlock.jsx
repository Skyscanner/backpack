import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './presentation-block.scss'
import BpkCode from './../BpkCode'
import BpkLink from './../BpkLink'

const SassDocLink = CssModules(({ sassdocId }) => (
  <div styleName='bpkdocs-presentation-block__sassdoc'>
    <BpkLink href={`/sassdoc/#${sassdocId}`} target='_blank'>View the Sass documentation.</BpkLink>
  </div>
), styles)

SassDocLink.propTypes = {
  sassdocId: PropTypes.string
}

const PresentationBlock = ({ children, showHTML, sassdocId }) => (
  <section styleName='bpkdocs-presentation-block'>
    <div styleName='bpkdocs-presentation-block__container'>{children}</div>
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

export default CssModules(PresentationBlock, styles)
