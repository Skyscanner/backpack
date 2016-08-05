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
        <BpkButton disabled>Disabled</BpkButton>
        <br />
        <br />
        <BpkButton>
          Primary <BpkIcon icon='long-arrow-right' color={TOKENS.colorWhite} large />
        </BpkButton>
        &nbsp;
        <BpkButton href='#'>
          Anchor <BpkIcon icon='long-arrow-right' color={TOKENS.colorWhite} large />
        </BpkButton>
        &nbsp;
        <BpkButton selected>
          Selected <BpkIcon icon='long-arrow-right' color={TOKENS.colorWhite} large />
        </BpkButton>
        &nbsp;
        <BpkButton disabled>
          Disabled <BpkIcon icon='long-arrow-right' color={TOKENS.colorGray300} large />
        </BpkButton>
        <br />
        <br />
        <BpkButton>
          Primary <BpkSpinner color={TOKENS.colorWhite} large />
        </BpkButton>
        &nbsp;
        <BpkButton href='#'>
          Anchor <BpkSpinner color={TOKENS.colorWhite} large />
        </BpkButton>
        &nbsp;
        <BpkButton selected>
          Selected <BpkSpinner color={TOKENS.colorWhite} large />
        </BpkButton>
        &nbsp;
        <BpkButton disabled>
          Disabled <BpkSpinner color={TOKENS.colorGray300} large />
        </BpkButton>
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
