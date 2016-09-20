import React from 'react'

import BpkCard from 'bpk-component-card'

import DocsPageBuilder from './../../components/DocsPageBuilder'

const components = [
  {
    id: 'basic-card',
    title: 'Basic card',
    examples: [
      <BpkCard href='#' onClick={e => e.preventDefault()}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ]
  },
  {
    id: 'focused',
    title: 'Focused',
    examples: [
      <BpkCard href='#' onClick={e => e.preventDefault()} focused>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ]
  },
  {
    id: 'no-padding',
    title: 'No padding',
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
  blurb='James TODO'
  components={components}
  readme={require('raw!bpk-component-card/readme.md')}
  sassdocId='cards'
/>

export default CardsPage
