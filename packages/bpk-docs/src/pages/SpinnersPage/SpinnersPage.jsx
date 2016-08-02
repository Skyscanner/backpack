import React from 'react'
import Helmet from 'react-helmet'

import BpkSpinner from 'bpk-component-spinner'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import PresentationBlock from './../../components/PresentationBlock'

const SpinnersPage = () => (
  <section>
    <Helmet title='Spinners' />
    <BpkHeading level='h1'>Spinners</BpkHeading>
    <BpkParagraph>Icons are available in three sizes - small, large and extra large.</BpkParagraph>
    <BpkHeading level='h2'>Small</BpkHeading>
    <PresentationBlock>
      <BpkSpinner />
    </PresentationBlock>
    <BpkHeading level='h2'>Large</BpkHeading>
    <PresentationBlock>
      <BpkSpinner large />
    </PresentationBlock>
    <BpkHeading level='h2'>Extra large</BpkHeading>
    <PresentationBlock>
      <BpkSpinner extraLarge />
    </PresentationBlock>
  </section>
)

export default SpinnersPage
