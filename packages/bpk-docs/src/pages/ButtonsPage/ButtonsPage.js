import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkIcon from 'bpk-component-icon'
import BpkButton from 'bpk-component-button'
import BpkSpinner from 'bpk-component-spinner'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'
import TOKENS from 'bpk-tokens/tokens/base.common'

import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  primary: 'buttons-page-primary',
  largePrimary: 'buttons-page-large-primary',
  secondary: 'buttons-page-secondary',
  largeSecondary: 'buttons-page-large-secondary',
  iconsAndSpinners: 'buttons-page-icons-and-spinners',
  link: 'buttons-page-link',
  largeLink: 'buttons-page-large-link'
}

const ButtonsPage = () => (
  <section>
    <Helmet title='Buttons' />
    <BpkContentContainer>
      <BpkHeading level='h1'>Buttons</BpkHeading>
      <BpkParagraph>
        Primary and secondary buttons, both with a selected state and a disabled state. Link style buttons which align
        nicely alongside other buttons. <BpkLink href='/sassdoc/#buttons' blank>View the Sass documentation.</BpkLink>
      </BpkParagraph>
      <BpkHeading level='h2'>Examples</BpkHeading>
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
          <BpkLink href={`#${anchors.iconsAndSpinners}`}>Icons & spinners</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.link}`}>Link</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.largeLink}`}>Large link</BpkLink>
        </BpkListItem>
      </BpkList>
      <BpkHeading id={anchors.primary} level='h3'>Primary</BpkHeading>
      <PresentationBlock>
        <BpkButton>Primary</BpkButton>&nbsp;
        <BpkButton href='#'>Anchor</BpkButton>&nbsp;
        <BpkButton selected>Selected</BpkButton>&nbsp;
        <BpkButton disabled>Disabled</BpkButton>
      </PresentationBlock>
      <BpkHeading id={anchors.largePrimary} level='h3'>Large primary</BpkHeading>
      <PresentationBlock>
        <BpkButton large>Primary</BpkButton>&nbsp;
        <BpkButton large href='#'>Anchor</BpkButton>&nbsp;
        <BpkButton large selected>Selected</BpkButton>&nbsp;
        <BpkButton large disabled>Disabled</BpkButton>&nbsp;
      </PresentationBlock>
      <BpkHeading id={anchors.secondary} level='h3'>Secondary</BpkHeading>
      <PresentationBlock>
        <BpkButton secondary>Secondary</BpkButton>&nbsp;
        <BpkButton href='#' secondary>Anchor</BpkButton>&nbsp;
        <BpkButton secondary selected>Selected</BpkButton>&nbsp;
        <BpkButton secondary disabled>Disabled</BpkButton>&nbsp;
      </PresentationBlock>
      <BpkHeading id={anchors.largeSecondary} level='h3'>Large secondary</BpkHeading>
      <PresentationBlock>
        <BpkButton large secondary>Secondary</BpkButton>&nbsp;
        <BpkButton href='#' large secondary>Anchor</BpkButton>&nbsp;
        <BpkButton large secondary selected>Selected</BpkButton>&nbsp;
        <BpkButton large secondary disabled>Disabled</BpkButton>&nbsp;
      </PresentationBlock>
      <BpkHeading id={anchors.iconsAndSpinners} level='h3'>Icons & spinners</BpkHeading>
      <PresentationBlock>
        <BpkButton>Primary <BpkIcon icon='long-arrow-right-alt' color={TOKENS.colorWhite} alignToButton /></BpkButton>&nbsp;
        <BpkButton>Primary <BpkSpinner color={TOKENS.colorWhite} alignToButton /></BpkButton>&nbsp;
        <BpkButton large>
          Primary <BpkIcon large icon='long-arrow-right-alt' color={TOKENS.colorWhite} alignToButton />
        </BpkButton>
        &nbsp;
        <BpkButton large>Primary <BpkSpinner large color={TOKENS.colorWhite} alignToButton /></BpkButton>
      </PresentationBlock>
      <BpkHeading id={anchors.link} level='h3'>Link</BpkHeading>
      <PresentationBlock>
        <BpkButton link>Link</BpkButton>
        <BpkButton href='#' link>Anchor</BpkButton>
        <BpkButton link disabled>Disabled</BpkButton>
      </PresentationBlock>
      <BpkHeading id={anchors.largeLink} level='h3'>Large link</BpkHeading>
      <PresentationBlock>
        <BpkButton link large>Link</BpkButton>
        <BpkButton href='#' link large>Anchor</BpkButton>
        <BpkButton link large disabled>Disabled</BpkButton>
      </PresentationBlock>
      <BpkHeading level='h2'>Usage</BpkHeading>
      <BpkParagraph>Matt to write</BpkParagraph>
    </BpkContentContainer>
  </section>
)

export default ButtonsPage
