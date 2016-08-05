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
    <BpkParagraph>
      We use spinners to indicate that a part of the product is loading or performing a task. These are available in 3
      sizes, small (16px), large (24px) and extra-large (48px) in blue, white and gray.
    </BpkParagraph>
    <BpkParagraph>
      Like everything in Backpack, we use rems to size these to ensure they scale inline with the user’s base
      stylesheet. More info on why we use rems can be found here.
    </BpkParagraph>
    <BpkHeading level='h2'>Examples</BpkHeading>
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
    <BpkHeading id={anchors.small} level='h3'>Small</BpkHeading>
    <PresentationBlock>
      <BpkSpinner />
    </PresentationBlock>
    <BpkHeading id={anchors.large} level='h3'>Large</BpkHeading>
    <PresentationBlock>
      <BpkSpinner large />
    </PresentationBlock>
    <BpkHeading id={anchors.extraLarge} level='h3'>Extra large</BpkHeading>
    <PresentationBlock>
      <BpkSpinner extraLarge />
    </PresentationBlock>
    <BpkHeading level='h2'>Usage</BpkHeading>
    <BpkParagraph>
      Matt to write
    </BpkParagraph>
  </section>
)

export default SpinnersPage
