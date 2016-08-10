import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'

import { BpkCode, BpkCodeBlock } from 'bpk-component-code'

const h5bpLink = 'https://github.com/h5bp/html5-boilerplate/blob/5.3.0/dist/doc/css.md#common-helpers'

const BaseStylesheetPage = () => (
  <section>
    <Helmet title='Base stylesheet' />
    <BpkContentContainer>
      <BpkHeading level='h1'>Base stylesheet</BpkHeading>
      <BpkParagraph>
        All components are built on top of a super lightweight base stylesheet. Ensure you include this on the page when
        consuming any backpack components.
      </BpkParagraph>
      <BpkHeading level='h3'>What's in it?</BpkHeading>
      <BpkList>
        <BpkListItem>
          For improved cross-browser rendering, we
          use <BpkLink href='http://necolas.github.io/normalize.css/' blank>Normalize.css</BpkLink> to
          correct small inconsistencies across browsers and devices.
        </BpkListItem>
        <BpkListItem>
          The <BpkCode>box-sizing</BpkCode> is globally set on every element,
          including <BpkCode>*:before</BpkCode> and <BpkCode>*:after</BpkCode>,
          to <BpkCode>border-box</BpkCode>. This ensures that the declared width of element is never
          exceeded due to padding or border.
        </BpkListItem>
        <BpkListItem>
          The default <BpkCode >color</BpkCode>, <BpkCode>font-family</BpkCode>,
          &nbsp;<BpkCode>font-size</BpkCode> & <BpkCode>line-height</BpkCode>.
        </BpkListItem>
        <BpkListItem>
          Utility classes based on
          the <BpkLink href={h5bpLink} blank>HTML5 Boilerplate common helpers</BpkLink>,
          including: &nbsp;<BpkCode>.hidden</BpkCode>,
          &nbsp;<BpkCode>.visuallyhidden</BpkCode>,
          &nbsp;<BpkCode>.visuallyhidden.focusable</BpkCode>,
          &nbsp;<BpkCode>.invisible</BpkCode> and <BpkCode>.clearfix</BpkCode>.
        </BpkListItem>
        <BpkListItem>That's it!</BpkListItem>
      </BpkList>
      <BpkHeading level='h3'>Usage</BpkHeading>
      <BpkParagraph>
        Consumer's of the website scaffolding should expect this base stylesheet to be on the page already. If
        you need to emulate this base in your component's local test harness, the compiled css is available for you to
        import, but first you'll need to install the <BpkCode>bpk-stylesheets</BpkCode> package:
      </BpkParagraph>
      <BpkCodeBlock>npm install bpk-stylesheets --save-dev</BpkCodeBlock>
      <BpkParagraph>Import like so:</BpkParagraph>
      <BpkCodeBlock>{'<link rel="stylesheet" href="/node_modules/bpk-stylesheets/base.css">'}</BpkCodeBlock>
      <BpkParagraph>Alternatively you could import using SASS:</BpkParagraph>
      <BpkCodeBlock>@import '~bpk-stylesheets/base';</BpkCodeBlock>
    </BpkContentContainer>
  </section>
)

export default BaseStylesheetPage
