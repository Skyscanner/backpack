import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'

import BpkCode from './../../components/BpkCode'

const html5BoilerplateHelpersLink = 'https://github.com/h5bp/html5-boilerplate/blob/5.3.0/dist/doc/css.md#common-helpers'
const baseStylesheetBlogPostLink = 'https://skyspace.sharepoint.com/sites/development/blog/Lists/Posts/Post.aspx?ID=96'

const BaseStylesheetPage = () => (
  <section>
    <Helmet title='Base stylesheet' />
    <BpkContentContainer>
      <BpkHeading level='h1'>Base stylesheet</BpkHeading>
      <BpkParagraph>
        All components are built on top of a super lightweight base stylesheet. Ensure you include this on the page when
        consuming any backpack components.
      </BpkParagraph>
      <BpkParagraph>
        <strong>
          Note: The scaffolding still uses a different, older base stylesheet. Please refer to
          this <BpkLink href={baseStylesheetBlogPostLink} blank>blog post</BpkLink> for more info and
          this <BpkLink href='https://gojira.skyscanner.net/browse/BPK-72' blank>JIRA card</BpkLink> for updates.
        </strong>
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
          including <BpkCode syntax='css' inline>*:before</BpkCode> and <BpkCode syntax='css' inline>*:after</BpkCode>,
          to <BpkCode syntax='css' inline>border-box</BpkCode>. This ensures that the declared width of element is never
          exceeded due to padding or border.
        </BpkListItem>
        <BpkListItem>
          The default <BpkCode syntax='css' inline>color</BpkCode>, <BpkCode syntax='css' inline>font-family</BpkCode>,
          &nbsp;<BpkCode syntax='css' inline>font-size</BpkCode> & <BpkCode syntax='css' inline>line-height</BpkCode>.
        </BpkListItem>
        <BpkListItem>
          Utility classes based on
          the <BpkLink href={html5BoilerplateHelpersLink} blank>HTML5 Boilerplate common helpers</BpkLink>,
          including: &nbsp;<BpkCode syntax='css' inline>.hidden</BpkCode>,
          &nbsp;<BpkCode syntax='css' inline>.visuallyhidden</BpkCode>,
          &nbsp;<BpkCode syntax='css' inline>.visuallyhidden.focusable</BpkCode>,
          &nbsp;<BpkCode syntax='css' inline>.invisible</BpkCode> and <BpkCode syntax='css' inline>.clearfix</BpkCode>.
        </BpkListItem>
        <BpkListItem>That's it so far...</BpkListItem>
      </BpkList>
      <BpkHeading level='h3'>Usage</BpkHeading>
      <BpkParagraph>
        Consumer's of the website scaffolding should expect this base stylesheet to be on the page already. If
        you need to emulate this base in your component's local test harness, the compiled css is available for you to
        import, but first you'll need to install the <BpkCode inline>{'bpk-stylesheets'}</BpkCode> package:
      </BpkParagraph>
      <BpkCode>{'npm install bpk-stylesheets --save-dev'}</BpkCode>
      <BpkParagraph>Import like so:</BpkParagraph>
      <BpkCode>{'<link rel="stylesheet" href="/node_modules/bpk-stylesheets/base.css">'}</BpkCode>
      <BpkParagraph>Alternatively you could import using SASS:</BpkParagraph>
      <BpkCode syntax='css'>@import '~bpk-stylesheets/base';</BpkCode>
    </BpkContentContainer>
  </section>
)

export default BaseStylesheetPage
