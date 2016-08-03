import React from 'react'
import Helmet from 'react-helmet'

import BpkLogo from 'bpk-component-logo'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import PresentationBlock from './../../components/PresentationBlock'

const LogosPage = () => (
  <section>
    <Helmet title='Logos' />
    <BpkHeading level='h1'>Logos</BpkHeading>
    <BpkParagraph>
      Logos are available in five variants - cloud, inline, stacked Tianxun and Tianxun-stacked.
    </BpkParagraph>
    <BpkHeading level='h2'>Cloud</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='cloud' />
    </PresentationBlock>
    <BpkHeading level='h2'>Inline</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='inline' />
    </PresentationBlock>
    <BpkHeading level='h2'>Stacked</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='stacked' />
    </PresentationBlock>
    <BpkHeading level='h2'>Tianxun</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='tianxun' />
    </PresentationBlock>
    <BpkHeading level='h2'>Tianxun-stacked</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='tianxun-stacked' />
    </PresentationBlock>
  </section>
)

export default LogosPage
