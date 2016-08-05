import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'
import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  primary: 'buttons-page-primary',
  largePrimary: 'buttons-page-large-primary',
  secondary: 'buttons-page-secondary',
  largeSecondary: 'buttons-page-large-secondary',
  link: 'buttons-page-link',
  largeLink: 'buttons-page-large-link'
}

const ButtonsPage = () => (
  <section>
    <Helmet title='Buttons' />
    <BpkContentContainer>
      <BpkHeading level='h1'>Buttons</BpkHeading>
      <BpkParagraph>
        Primary, secondary and disabled on three different backgrounds.&nbsp;
        <BpkLink href='/sassdoc/#buttons' blank>View the Sass documentation.</BpkLink>
      </BpkParagraph>
      <BpkList>
        <BpkListItem>
          <BpkLink href={`#${anchors.primary}`}>Primary</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.largePrimary}`}>Large primary</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.secondary}`}>Secondary</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.largeSecondary}`}>Large secondary</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.link}`}>Link</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.largeLink}`}>Large link</BpkLink>
        </BpkListItem>
      </BpkList>
      <BpkHeading id={anchors.primary} level='h2'>Primary</BpkHeading>
      <PresentationBlock>
        <BpkButton>Primary</BpkButton>&nbsp;
        <BpkButton href='#'>Anchor</BpkButton>&nbsp;
        <BpkButton selected>Selected</BpkButton>&nbsp;
        <BpkButton disabled>Disabled</BpkButton>&nbsp;
      </PresentationBlock>
      <BpkHeading id={anchors.largePrimary} level='h2'>Large primary</BpkHeading>
      <PresentationBlock>
        <BpkButton large>Primary</BpkButton>&nbsp;
        <BpkButton large href='#'>Anchor</BpkButton>&nbsp;
        <BpkButton large selected>Selected</BpkButton>&nbsp;
        <BpkButton large disabled>Disabled</BpkButton>&nbsp;
      </PresentationBlock>
      <BpkHeading id={anchors.secondary} level='h2'>Secondary</BpkHeading>
      <PresentationBlock>
        <BpkButton secondary>Secondary</BpkButton>&nbsp;
        <BpkButton href='#' secondary>Anchor</BpkButton>&nbsp;
        <BpkButton secondary selected>Selected</BpkButton>&nbsp;
        <BpkButton secondary disabled>Disabled</BpkButton>&nbsp;
      </PresentationBlock>
      <BpkHeading id={anchors.largeSecondary} level='h2'>Large secondary</BpkHeading>
      <PresentationBlock>
        <BpkButton large secondary>Secondary</BpkButton>&nbsp;
        <BpkButton href='#' large secondary>Anchor</BpkButton>&nbsp;
        <BpkButton large secondary selected>Selected</BpkButton>&nbsp;
        <BpkButton large secondary disabled>Disabled</BpkButton>&nbsp;
      </PresentationBlock>
      <BpkHeading id={anchors.link} level='h2'>Link</BpkHeading>
      <PresentationBlock>
        <BpkButton link>Link</BpkButton>
        <BpkButton href='#' link>Anchor</BpkButton>
        <BpkButton link disabled>Disabled</BpkButton>
      </PresentationBlock>
      <BpkHeading id={anchors.largeLink} level='h2'>Large link</BpkHeading>
      <PresentationBlock>
        <BpkButton link large>Link</BpkButton>
        <BpkButton href='#' link large>Anchor</BpkButton>
        <BpkButton link large disabled>Disabled</BpkButton>
      </PresentationBlock>
    </BpkContentContainer>
  </section>
)

export default ButtonsPage
