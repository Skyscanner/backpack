import React from 'react'

import BpkCard from 'bpk-component-card'

import DocsPageBuilder from './../../components/DocsPageBuilder'

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'The default card comes with padding already applied to get you up and running quickly and has normal and hover states baked in.',
    examples: [
      <BpkCard href='#' onClick={e => e.preventDefault()}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ]
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: 'For full flexibility you can opt to remove the default padding.',
    examples: [
      <BpkCard href='#' onClick={e => e.preventDefault()} padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ]
  }
]

const CardsPage = () => <DocsPageBuilder
  title='Cards'
  blurb='Cards are used to define distinct areas of the UI. They are quite often used as a signifier to give affordance to a clickable set of elements e.g. a flight result.'
  components={components}
  readme={require('raw!bpk-component-card/readme.md')}
  sassdocId='cards'
/>

export default CardsPage
