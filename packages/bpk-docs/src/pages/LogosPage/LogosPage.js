import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkLogo from 'bpk-component-logo'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'

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
    <BpkContentContainer>
      <BpkHeading level='h1'>Logos</BpkHeading>
      <BpkParagraph>
        We have a few different versions of our logo which can be used in different situations. In general, all logos
        should be used in white, reversed out of a colored background. When it’s not possible to reverse the logo out
        of a color, the preferred usage is using blue-500 or gray-500. No other colors should be used.
      </BpkParagraph>
      <BpkParagraph>
        As with using any logo, please ensure there’s sufficient clear space surrounding it and consider color,
        contrast, and legibility to ensure it’s shown at its best.
      </BpkParagraph>
      <BpkHeading level='h2'>Examples</BpkHeading>
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
      <BpkHeading id={anchors.inline} level='h3'>Inline</BpkHeading>
      <BpkParagraph>
        This is the preferred usage of the logo.
      </BpkParagraph>
      <PresentationBlock>
        <BpkLogo logo='inline' />
      </PresentationBlock>
      <BpkHeading id={anchors.stacked} level='h3'>Stacked</BpkHeading>
      <BpkParagraph>
        This version should only be used when required to be used at small sizes, usually confined to a square e.g. a
        social media profile.
      </BpkParagraph>
      <PresentationBlock>
        <BpkLogo logo='stacked' />
      </PresentationBlock>
      <BpkHeading id={anchors.cloud} level='h3'>Cloud only</BpkHeading>
      <BpkParagraph>
        This version should be used sparingly for things such as App icons and favicons.
      </BpkParagraph>
      <PresentationBlock>
        <BpkLogo logo='cloud' />
      </PresentationBlock>
      <BpkHeading id={anchors.tianxun} level='h2'>Tianxun</BpkHeading>
      <BpkParagraph>
        This is the preferred usage for Skyscanner in China.
      </BpkParagraph>
      <PresentationBlock>
        <BpkLogo logo='tianxun' />
      </PresentationBlock>
      <BpkHeading id={anchors.tianxunStacked} level='h2'>Tianxun stacked</BpkHeading>
      <BpkParagraph>
        Similar to the stacked version of the Skyscanner logo, this version should only be used at small sizes when
        constrained to a square e.g. social media profile.
      </BpkParagraph>
      <PresentationBlock>
        <BpkLogo logo='tianxun-stacked' />
      </PresentationBlock>
      <BpkHeading level='h2'>Localised Product Logos</BpkHeading>
      <BpkParagraph>
        We also maintain specific logos for our product verticals,  for example:  ‘Skyscanner Flights’,
        ‘Skyscanner Hotels’ etc.. These are not widely used on our product and as such are not maintained in Backpack.
        Please contact  the <BpkLink href='mailto: creative@skyscanner.net'>creative team </BpkLink> if you require
        these.
      </BpkParagraph>
      <BpkHeading level='h2'>Usage</BpkHeading>
      <BpkParagraph>Matt to write</BpkParagraph>
    </BpkContentContainer>
  </section>
)

export default LogosPage
