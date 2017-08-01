/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import Helmet from 'react-helmet';
import BpkLink from 'bpk-component-link';
import BpkBlockquote from 'bpk-component-blockquote';
import { BpkList, BpkListItem } from 'bpk-component-list';
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';
import BpkContentContainer from 'bpk-component-content-container';

import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';

const h5bpLink = 'https://github.com/h5bp/html5-boilerplate/blob/5.3.0/dist/doc/css.md#common-helpers';

const BaseStylesheetPage = () => (
  <section>
    <Helmet title="Base stylesheet" />
    <BpkContentContainer>
      <Heading level="h1">Base stylesheet</Heading>
      <Paragraph>
        All components are built on top of a super lightweight base stylesheet. Ensure you include this on the page when
        consuming any backpack components.
      </Paragraph>
      <Heading level="h3">What&apos;s in it?</Heading>
      <BpkList>
        <BpkListItem>
          For improved cross-browser rendering, we
          use <BpkLink href="http://necolas.github.io/normalize.css/" blank>Normalize.css</BpkLink> to
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
        <BpkListItem>That&apos;s it!</BpkListItem>
      </BpkList>
      <BpkBlockquote>
        <strong>Note:</strong> There is also a small amount of JavaScript that does
        &quot;<BpkLink href="https://modernizr.com/" blank>Modernizr</BpkLink> like&quot; feature detection (currently
        used to prevent hover effects on touch devices in downstream components) - make sure this is included in the
        head also.
      </BpkBlockquote>
      <Heading level="h3">Usage</Heading>
      <BpkCodeBlock>npm install bpk-stylesheets --save-dev</BpkCodeBlock>
      <Paragraph>Include in your HTML like so:</Paragraph>
      <BpkCodeBlock>
        {`<!DOCTYPE html>
<html lang="en">
<head>
  ...
  <link rel="stylesheet" href="/node_modules/bpk-stylesheets/base.css">
  <script src="/node_modules/bpk-stylesheets/base.js"></script>
</head>
<body>...</body>
</html>
`}
      </BpkCodeBlock>
      <Paragraph>
        Alternatively you could import the uncompiled JavaScript/Sass directly and let Webpack split them out:
      </Paragraph>
      <BpkCodeBlock>{'import \'bpk-stylesheets\';'}</BpkCodeBlock>
    </BpkContentContainer>
  </section>
);

export default BaseStylesheetPage;
