import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  primary: 'buttons-page-primary',
  secondary: 'buttons-page-secondary',
  selected: 'buttons-page-selected',
  link: 'buttons-page-link'
}

const ButtonsPage = () => (
  <section>
    <Helmet title='Buttons' />
    <BpkHeading level='h1'>Buttons</BpkHeading>
    <BpkParagraph>Primary, secondary and disabled on three different backgrounds.</BpkParagraph>
    <BpkHeading level='h2'>Contents</BpkHeading>
    <BpkList>
      <BpkListItem>
        <BpkLink href={`#${anchors.primary}`}>Primary</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.secondary}`}>Secondary</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.selected}`}>Selected</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.link}`}>Link</BpkLink>
      </BpkListItem>
    </BpkList>
    <BpkHeading id={anchors.primary} level='h2'>Primary</BpkHeading>
    <PresentationBlock sassdocId='buttons-mixin-bpk-button'>
      <BpkButton>Primary</BpkButton>{'\n'}
      <BpkButton href='#'>Anchor</BpkButton>{'\n'}
      <BpkButton disabled>Disabled</BpkButton>{'\n'}
      <BpkButton large>Primary</BpkButton>{'\n'}
      <BpkButton large href='#'>Anchor</BpkButton>{'\n'}
      <BpkButton large disabled>Disabled</BpkButton>
    </PresentationBlock>
    <BpkHeading id={anchors.secondary} level='h2'>Secondary</BpkHeading>
    <PresentationBlock sassdocId='buttons-mixin-bpk-button--secondary'>
      <BpkButton secondary>Secondary</BpkButton>{'\n'}
      <BpkButton href='#' secondary>Anchor</BpkButton>{'\n'}
      <BpkButton secondary disabled>Disabled</BpkButton>{'\n'}
      <BpkButton secondary large>Secondary</BpkButton>{'\n'}
      <BpkButton href='#' secondary large>Anchor</BpkButton>{'\n'}
      <BpkButton secondary large disabled>Disabled</BpkButton>
    </PresentationBlock>
    <BpkHeading id={anchors.selected} level='h2'>Selected</BpkHeading>
    <PresentationBlock sassdocId='buttons-mixin-bpk-button--selected'>
      <BpkButton selected>Selected</BpkButton>{'\n'}
      <BpkButton href='#' selected>Anchor</BpkButton>{'\n'}
      <BpkButton selected disabled>Disabled</BpkButton>{'\n'}
      <BpkButton selected large>Selected</BpkButton>{'\n'}
      <BpkButton href='#' selected large>Anchor</BpkButton>{'\n'}
      <BpkButton selected large disabled>Disabled</BpkButton>
    </PresentationBlock>
    <BpkHeading id={anchors.link} level='h2'>Link</BpkHeading>
    <PresentationBlock sassdocId='buttons-mixin-bpk-button--link'>
      <BpkButton link>Link</BpkButton>{'\n'}
      <BpkButton href='#' link>Anchor</BpkButton>{'\n'}
      <BpkButton link disabled>Disabled</BpkButton>{'\n'}
      <BpkButton link large>Link</BpkButton>{'\n'}
      <BpkButton href='#' link large>Anchor</BpkButton>{'\n'}
      <BpkButton link large disabled>Disabled</BpkButton>
    </PresentationBlock>
  </section>
)

export default ButtonsPage
