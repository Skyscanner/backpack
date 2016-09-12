import React, { PropTypes } from 'react'
import BpkLink from 'bpk-component-link'

import './sassdoc-link.scss'
const sassdocLogoSvg = { __html: `${require('raw!./../../static/sassdoc-logo.svg')}` }

const SassdocLink = (props) => (
  <aside className='bpkdocs-sassdoc-link'>
    <span className='bpkdocs-sassdoc-link__logo' dangerouslySetInnerHTML={sassdocLogoSvg} />
    Looking for "{props.category}" Sass variables and mixins? Check
    out <BpkLink href={`/sassdoc/#${props.sassdocId}`} blank>Backpack's Sassdoc</BpkLink>.
  </aside>
)

SassdocLink.propTypes = {
  sassdocId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
}

export default SassdocLink
