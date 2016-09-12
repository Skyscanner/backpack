import React from 'react'

import BpkSpinner from 'bpk-component-spinner'
import BpkParagraph from 'bpk-component-paragraph'

import DocsPageBuilder from './../../components/DocsPageBuilder'

const blurb = [
  <BpkParagraph>
    We use spinners to indicate that a part of the product is loading or performing a task. These are available in 3
    sizes, small (18px), large (24px) and extra-large (48px) in blue, white and gray.
  </BpkParagraph>,
  <BpkParagraph>
    Like everything in Backpack, we use rems to size these to ensure they scale inline with the user’s base
    stylesheet. More info on why we use rems can be found here.
  </BpkParagraph>
]

const components = [
  {
    id: 'small',
    title: 'Small spinners',
    examples: [
      <BpkSpinner />
    ]
  },
  {
    id: 'large',
    title: 'Large spinners',
    examples: [
      <BpkSpinner large />
    ]
  },
  {
    id: 'extra-large',
    title: 'Extra large spinners',
    examples: [
      <BpkSpinner extraLarge />
    ]
  }
]

const SpinnersPage = () => <DocsPageBuilder
  title='Spinners'
  blurb={blurb}
  components={components}
  readme={require('raw!bpk-component-spinner/readme.md')}
  sassdocId='svgs-mixin-bpk-spinner'
/>

export default SpinnersPage
