import React from 'react'

import BpkIcon from 'bpk-component-icon'
import BpkLink from 'bpk-component-link'
import BpkParagraph from 'bpk-component-paragraph'
import BpkRouterLink from 'bpk-component-router-link'

import './icons-page.scss'
import * as ROUTES from './../../constants/routes'
import ComponentPageBuilder from './../../components/ComponentPageBuilder'

const req = require.context('raw!bpk-svgs/src/icons/sm', false, /\.svg$/)
const icons = req.keys().map((key) => key.replace('./', '').replace('.svg', ''))

const blurb = [
  <BpkParagraph>
    Our icons are beautifully crafted for use in across Skyscanner’s Web, App and marketing projects.
  </BpkParagraph>,
  <BpkParagraph>
    Each icon is simple, modern, and has a friendly style. We use icons to convey information quickly and
    accurately, and therefore they should not be overly decorative or detailed. This also helps to ensure
    readability and clarity at small sizes.
  </BpkParagraph>,
  <BpkParagraph>
    Our icon set is provided in two sizes: small (18px) and large (24px). Both sets are pixel-snapped for clarity at
    the intended usage sizes.
  </BpkParagraph>,
  <BpkParagraph>
    Like everything in Backpack, we use rems to size these to ensure they scale inline with the user’s base
    stylesheet. More info on why we use rems can be found <BpkRouterLink to={ROUTES.SPACING}>here</BpkRouterLink>.
  </BpkParagraph>
]

const components = [
  {
    id: 'small',
    title: 'Small icons',
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
        We’ve taken inspiration from Google’s Material Design System, leaning on their icon grid. You can find our
        template <BpkLink href='#'>here</BpkLink>.
      </BpkParagraph>,
      <BpkParagraph>
        To maintain consistency when creating new icons , you should make use of bold, filled shapes and thick
        strokes. Try to keep strokes to no less than 2px on the 24px icons.
      </BpkParagraph>,
      <BpkParagraph>
        Icons should be created (and optimised for display) at 18px and 24px. Please ensure all shapes and lines are
        pixel-snapped to ensure crispness and readability at these sizes.
      </BpkParagraph>
    ]
  }
]

const IconsPage = () => <ComponentPageBuilder
  title='Icons'
  blurb={blurb}
  components={components}
  customSections={customSections}
  readme={require('raw!bpk-component-icon/readme.md')}
  sassdocId='mixin-bpk-icon-sm'
/>

export default IconsPage
