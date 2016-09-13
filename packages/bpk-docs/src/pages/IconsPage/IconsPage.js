import React from 'react'

import BpkIcon from 'bpk-component-icon'
import BpkParagraph from 'bpk-component-paragraph'
import BpkRouterLink from 'bpk-component-router-link'

import './icons-page.scss'
import * as ROUTES from './../../constants/routes'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const req = require.context('raw!bpk-svgs/src/icons/sm', false, /\.svg$/)
const icons = req.keys().map((key) => key.replace('./', '').replace('.svg', ''))

const blurb = [
  <BpkParagraph>
    Backpack icons are beautifully crafted for use in across Skyscanner’s web, app and marketing projects.
  </BpkParagraph>,
  <BpkParagraph>
    Icons are provided in two sizes: small (18px) and large (24px). Both sets are pixel-snapped for clarity at the
    intended usage sizes.
  </BpkParagraph>,
  <BpkParagraph>
    Our icon set is provided in two sizes: small (18px) and large (24px). Both sets are pixel-snapped for clarity at
    the intended usage sizes.
  </BpkParagraph>,
  <BpkParagraph>
    Like everything in Backpack, rems to size these to ensure they scale inline with the user’s base
    stylesheet. More info on why rems are used can be found <BpkRouterLink to={ROUTES.LAYOUT}>here</BpkRouterLink>.
  </BpkParagraph>
]

const components = [
  {
    id: 'small',
    title: 'Small icons',
    blurb: 'In general, this should be the default for most applications:',
    examples: [
      <ol className='bpkdocs-icons-page__icon-list'>
        {icons.map((icon) => (
          <li key={icon} title={icon} className='bpkdocs-icons-page__icon-list-item'>
            <BpkIcon icon={icon} />
          </li>
        ))}
      </ol>
    ]
  },
  {
    id: 'large',
    title: 'Large icons',
    blurb: 'The following can be used when you need something bigger. Please refrain from scaling these any further.',
    examples: [
      <ol className='bpkdocs-icons-page__icon-list'>
        {icons.map((icon) => (
          <li key={icon} title={icon} className='bpkdocs-icons-page__icon-list-item'>
            <BpkIcon icon={icon} large />
          </li>
        ))}
      </ol>
    ]
  }
]

const customSections = [
  {
    id: 'drawing-new-icons',
    title: 'Drawing new icons',
    content: [
      <BpkParagraph>
        Backpack has taken inspiration from Google’s Material Design System, leaning on their icon grid. You can find
        the template <BpkRouterLink to={ROUTES.DOWNLOADS}>here</BpkRouterLink>.
      </BpkParagraph>,
      <BpkParagraph>
        To maintain consistency when creating new icons, you should make use of bold, filled shapes and thick strokes.
        Try to keep strokes to no less than 2px on the 24px icons.
      </BpkParagraph>,
      <BpkParagraph>
        Icons should be created (and optimised for display) at 18px and 24px. Please ensure all shapes and lines are
        pixel-snapped to ensure crispness and readability at these sizes.
      </BpkParagraph>
    ]
  }
]

const IconsPage = () => <DocsPageBuilder
  title='Icons'
  blurb={blurb}
  components={components}
  customSections={customSections}
  readme={require('raw!bpk-component-icon/readme.md')}
  sassdocId='svgs-mixin-bpk-icon-sm'
/>

export default IconsPage
