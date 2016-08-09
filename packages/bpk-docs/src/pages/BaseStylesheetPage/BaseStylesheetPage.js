import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'

import Code from './../../components/Code'

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
          The box-sizing is globally set on every element,
          including <Code syntax='css' inline>*:before</Code> and <Code syntax='css' inline>*:after</Code>,
          to <Code syntax='css' inline>border-box</Code>. This ensures that the declared width of element is never
          exceeded due to padding or border.
        </BpkListItem>
        <BpkListItem>
          The default <Code syntax='css' inline>color</Code>, <Code syntax='css' inline>font-family</Code>,
          &nbsp;<Code syntax='css' inline>font-size</Code> & <Code syntax='css' inline>line-height</Code>.
        </BpkListItem>
        <BpkListItem>
          Utility classes based on
          the <BpkLink href={h5bpLink} blank>HTML5 Boilerplate common helpers</BpkLink>,
          including: &nbsp;<Code syntax='css' inline>.hidden</Code>,
          &nbsp;<Code syntax='css' inline>.visuallyhidden</Code>,
          &nbsp;<Code syntax='css' inline>.visuallyhidden.focusable</Code>,
          &nbsp;<Code syntax='css' inline>.invisible</Code> and <Code syntax='css' inline>.clearfix</Code>.
        </BpkListItem>
        <BpkListItem>That's it!</BpkListItem>
      </BpkList>
      <BpkHeading level='h3'>Usage</BpkHeading>
      <BpkParagraph>
        Consumer's of the website scaffolding should expect this base stylesheet to be on the page already. If
        you need to emulate this base in your component's local test harness, the compiled css is available for you to
        import, but first you'll need to install the <Code inline>{'bpk-stylesheets'}</Code> package:
      </BpkParagraph>
      <Code>{'npm install bpk-stylesheets --save-dev'}</Code>
      <BpkParagraph>Import like so:</BpkParagraph>
      <Code>{'<link rel="stylesheet" href="/node_modules/bpk-stylesheets/base.css">'}</Code>
      <BpkParagraph>Alternatively you could import using SASS:</BpkParagraph>
      <Code syntax='css'>@import '~bpk-stylesheets/base';</Code>
    </BpkContentContainer>
  </section>
)

export default BaseStylesheetPage
