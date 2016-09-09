import React from 'react'

import BpkIcon from 'bpk-component-icon'
import BpkButton from 'bpk-component-button'
import BpkSpinner from 'bpk-component-spinner'
import TOKENS from 'bpk-tokens/tokens/base.common'

import DocsPageBuilder from './../../components/DocsPageBuilder'

const components = [
  {
    id: 'primary',
    title: 'Primary',
    examples: [
      <BpkButton>Primary</BpkButton>,
      ' ',
      <BpkButton href='#'>Anchor</BpkButton>,
      ' ',
      <BpkButton selected>Selected</BpkButton>,
      ' ',
      <BpkButton disabled>Disabled</BpkButton>
    ]
  },
  {
    id: 'large-primary',
    title: 'Large primary',
    examples: [
      <BpkButton large>Primary</BpkButton>,
      ' ',
      <BpkButton large href='#'>Anchor</BpkButton>,
      ' ',
      <BpkButton large selected>Selected</BpkButton>,
      ' ',
      <BpkButton large disabled>Disabled</BpkButton>
    ]
  },
  {
    id: 'secondary',
    title: 'Secondary',
    examples: [
      <BpkButton secondary>Secondary</BpkButton>,
      ' ',
      <BpkButton href='#' secondary>Anchor</BpkButton>,
      ' ',
      <BpkButton secondary selected>Selected</BpkButton>,
      ' ',
      <BpkButton secondary disabled>Disabled</BpkButton>
    ]
  },
  {
    id: 'large-secondary',
    title: 'Large secondary',
    examples: [
      <BpkButton large secondary>Secondary</BpkButton>,
      ' ',
      <BpkButton href='#' large secondary>Anchor</BpkButton>,
      ' ',
      <BpkButton large secondary selected>Selected</BpkButton>,
      ' ',
      <BpkButton large secondary disabled>Disabled</BpkButton>
    ]
  },
  {
    id: 'icons-and-spinners',
    title: 'Icons & spinners',
    examples: [
      <BpkButton>
        Primary <BpkIcon icon='long-arrow-right-alt' color={TOKENS.colorWhite} alignToButton />
      </BpkButton>,
      ' ',
      <BpkButton>
        Primary <BpkSpinner color={TOKENS.colorWhite} alignToButton />
      </BpkButton>,
      ' ',
      <BpkButton large>
        Primary <BpkIcon large icon='long-arrow-right-alt' color={TOKENS.colorWhite} alignToButton />
      </BpkButton>,
      ' ',
      <BpkButton large>
        Primary <BpkSpinner large color={TOKENS.colorWhite} alignToButton />
      </BpkButton>
    ]
  },
  {
    id: 'link',
    title: 'Link',
    examples: [
      <BpkButton link>Link</BpkButton>,
      ' ',
      <BpkButton href='#' link>Anchor</BpkButton>,
      ' ',
      <BpkButton link disabled>Disabled</BpkButton>
    ]
  },
  {
    id: 'large-link',
    title: 'Large link',
    examples: [
      <BpkButton link large>Link</BpkButton>,
      ' ',
      <BpkButton href='#' link large>Anchor</BpkButton>,
      ' ',
      <BpkButton link large disabled>Disabled</BpkButton>
    ]
  }
]

const ButtonsPage = () => <DocsPageBuilder
  title='Buttons'
  blurb='Primary and secondary buttons, both with a selected state and a disabled state. Link style buttons which align nicely alongside other buttons.'
  components={components}
  readme={require('raw!bpk-component-button/readme.md')}
  sassdocId='buttons'
/>

export default ButtonsPage
