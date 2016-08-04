import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkSpinner from 'bpk-component-spinner'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  small: 'spinners-page-small',
  large: 'spinners-page-large',
  extraLarge: 'spinners-page-extra-large'
}

const SpinnersPage = () => (
  <section>
    <Helmet title='Spinners' />
    <BpkHeading level='h1'>Spinners</BpkHeading>
    <BpkParagraph>Icons are available in three sizes - small, large and extra large.</BpkParagraph>
    <BpkList>
      <BpkListItem>
        <BpkLink href={`#${anchors.small}`}>Small</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.large}`}>Large</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.extraLarge}`}>Extra large</BpkLink>
      </BpkListItem>
    </BpkList>
    <BpkHeading id={anchors.small} level='h2'>Small</BpkHeading>
    <PresentationBlock>
      <BpkSpinner />
    </PresentationBlock>
    <BpkHeading id={anchors.large} level='h2'>Large</BpkHeading>
    <PresentationBlock>
      <BpkSpinner large />
    </PresentationBlock>
    <BpkHeading id={anchors.extraLarge} level='h2'>Extra large</BpkHeading>
    <PresentationBlock>
      <BpkSpinner extraLarge />
    </PresentationBlock>
  </section>
)

export default SpinnersPage
