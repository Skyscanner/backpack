import React from 'react'

import BpkSpinner from 'bpk-component-spinner'
import BpkParagraph from 'bpk-component-paragraph'

import DocsPageBuilder from './../../components/DocsPageBuilder'

const blurb = [
  <BpkParagraph>
    Spinners are used to to indicate that a part of the product is loading or performing a task. These are available in
    3 sizes, small (18px), large (24px) and extra-large (48px).
  </BpkParagraph>,
]

const components = [
  {
    id: 'small',
    title: 'Small',
    examples: [
      <BpkSpinner />
    ]
  },
  {
    id: 'large',
    title: 'Large',
    examples: [
      <BpkSpinner large/>
    ]
  },
  {
    id: 'extra-large',
    title: 'Extra large',
    examples: [
      <BpkSpinner extraLarge/>
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
