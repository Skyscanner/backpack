import React from 'react'
import Helmet from 'react-helmet'

import BpkHeading from 'bpk-component-heading'
import BpkContentContainer from 'bpk-component-content-container'

const GettingStartedPage = () => (
  <section>
    <Helmet title='Getting started' />
    <BpkContentContainer>
      <BpkHeading level='h1'>Getting started</BpkHeading>
    </BpkContentContainer>
  </section>
)

export default GettingStartedPage
