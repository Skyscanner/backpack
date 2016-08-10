import React from 'react'

import BpkLogo from 'bpk-component-logo'
import BpkLink from 'bpk-component-link'
import BpkParagraph from 'bpk-component-paragraph'

import ComponentPageBuilder from './../../components/ComponentPageBuilder'

const blurb = [
  <BpkParagraph>
    We have a few different versions of our logo which can be used in different situations. In general, all logos
    should be used in white, reversed out of a colored background. When it’s not possible to reverse the logo out
    of a color, the preferred usage is using blue-500 or gray-500. No other colors should be used.
  </BpkParagraph>,
  <BpkParagraph>
    As with using any logo, please ensure there’s sufficient clear space surrounding it and consider color,
    contrast, and legibility to ensure it’s shown at its best.
  </BpkParagraph>
]

const components = [
  {
    id: 'inline',
    title: 'Inline',
    examples: [
      <BpkLogo logo='tianxun' />
    ],
    blurb: 'This is the preferred usage of the logo.'
  },
  {
    id: 'stacked',
    title: 'Stacked',
    examples: [
      <BpkLogo logo='stacked' />
    ],
    blurb: 'This version should only be used when required to be used at small sizes, usually confined to a square e.g. a social media profile..'
  },
  {
    id: 'cloud',
    title: 'Cloud',
    examples: [
      <BpkLogo logo='cloud' />
    ],
    blurb: 'This version should be used sparingly for things such as App icons and favicons.'
  },
  {
    id: 'tianxun',
    title: 'Tianxun',
    examples: [
      <BpkLogo logo='cloud' />
    ],
    blurb: 'This is the preferred usage for Skyscanner in China.'
  },
  {
    id: 'tianxun-stacked',
    title: 'Tianxun stacked',
    examples: [
      <BpkLogo logo='tianxun-stacked' />
    ],
    blurb: 'Similar to the stacked version of the Skyscanner logo, this version should only be used at small sizes when constrained to a square e.g. social media profile.'
  }
]

const customSections = [
  {
    id: 'localised-product-logos',
    title: 'Localised Product Logos',
    content: [
      <BpkParagraph>
        We also maintain specific logos for our product verticals, for example: ‘Skyscanner Flights’,
        ‘Skyscanner Hotels’ etc. These are not widely used on our product and as such are not maintained in Backpack.
        Please contact the <BpkLink href='mailto: creative@skyscanner.net'>creative team </BpkLink> if you require
        these.
      </BpkParagraph>
    ]
  }
]

const LogosPage = () => <ComponentPageBuilder
  title='Logos'
  blurb={blurb}
  components={components}
  customSections={customSections}
  readme={require('raw!bpk-component-logo/readme.md')}
  sassdocId='svgs-mixin-bpk-logo-cloud'
/>

export default LogosPage
