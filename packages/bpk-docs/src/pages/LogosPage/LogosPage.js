import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkLogo from 'bpk-component-logo'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  cloud: 'logos-page-cloud',
  inline: 'logos-page-inline',
  stacked: 'logos-page-stacked',
  tianxun: 'logos-page-tianxun',
  tianxunStacked: 'logos-page-tianxun-stacked'
}

const LogosPage = () => (
  <section>
    <Helmet title='Logos' />
    <BpkHeading level='h1'>Logos</BpkHeading>
    <BpkParagraph>
      Logos are available in five variants - cloud, inline, stacked Tianxun and Tianxun-stacked.
    </BpkParagraph>
    <BpkList>
      <BpkListItem>
        <BpkLink href={`#${anchors.cloud}`}>Cloud</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.inline}`}>Inline</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.stacked}`}>Stacked</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.tianxun}`}>Tianxun</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.tianxunStacked}`}>Tianxun stacked</BpkLink>
      </BpkListItem>
    </BpkList>
    <BpkHeading id={anchors.cloud} level='h2'>Cloud</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='cloud' />
    </PresentationBlock>
    <BpkHeading id={anchors.inline} level='h2'>Inline</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='inline' />
    </PresentationBlock>
    <BpkHeading id={anchors.stacked} level='h2'>Stacked</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='stacked' />
    </PresentationBlock>
    <BpkHeading id={anchors.tianxun} level='h2'>Tianxun</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='tianxun' />
    </PresentationBlock>
    <BpkHeading id={anchors.tianxunStacked} level='h2'>Tianxun stacked</BpkHeading>
    <PresentationBlock>
      <BpkLogo logo='tianxun-stacked' />
    </PresentationBlock>
  </section>
)

export default LogosPage
