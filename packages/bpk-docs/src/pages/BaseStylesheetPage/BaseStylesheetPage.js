/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import BpkLink from 'bpk-component-link';
import BpkBlockquote from 'bpk-component-blockquote';
import { BpkList, BpkListItem } from 'bpk-component-list';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Code from '../../components/Code';
import CodeBlock from '../../components/CodeBlock';

import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/IntroBlurb';

const h5bpLink =
  'https://github.com/h5bp/html5-boilerplate/blob/5.3.0/dist/doc/css.md#common-helpers';

const components = [
  {
    id: 'whats-in-it',
    title: "What's in it?",
    blurb: [
      <BpkList>
        <BpkListItem>
          For improved cross-browser rendering, we use{' '}
          <BpkLink href="http://necolas.github.io/normalize.css/" blank>
            Normalize.css
          </BpkLink>{' '}
          to correct small inconsistencies across browsers and devices.
        </BpkListItem>
        <BpkListItem>
          The <Code>box-sizing</Code> is globally set on every element,
          including <Code>*:before</Code> and <Code>*:after</Code>, to{' '}
          <Code>border-box</Code>. This ensures that the declared width of an
          element is never exceeded due to padding or border.
        </BpkListItem>
        <BpkListItem>
          The default <Code>color</Code>, <Code>font-family</Code>, &nbsp;<Code>
            font-size
          </Code>{' '}
          & <Code>line-height</Code>.
        </BpkListItem>
        <BpkListItem>
          Utility classes based on the{' '}
          <BpkLink href={h5bpLink} blank>
            HTML5 Boilerplate common helpers
          </BpkLink>, including: &nbsp;<Code>.hidden</Code>, &nbsp;<Code>
            .visuallyhidden
          </Code>, &nbsp;<Code>.visuallyhidden.focusable</Code>, &nbsp;<Code>
            .invisible
          </Code>{' '}
          and <Code>.clearfix</Code>.
        </BpkListItem>
        <BpkListItem>That&apos;s it!</BpkListItem>
      </BpkList>,
      <BpkBlockquote extraSpace>
        <strong>Note:</strong> There is also a small amount of JavaScript that
        does &quot;<BpkLink href="https://modernizr.com/" blank>
          Modernizr
        </BpkLink>{' '}
        like&quot; feature detection (currently used to prevent hover effects on
        touch devices in downstream components) - make sure this is included in
        the head also.
      </BpkBlockquote>,
    ],
  },
  {
    id: 'usage',
    title: 'Usage',
    blurb: [
      <CodeBlock>npm install bpk-stylesheets --save-dev</CodeBlock>,
      <Paragraph>Include in your HTML like so:</Paragraph>,
      <CodeBlock>
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
      </CodeBlock>,
      <Paragraph>
        Alternatively you could import the uncompiled JavaScript/Sass directly
        and let Webpack split them out:
      </Paragraph>,
      <CodeBlock>import &apos;bpk-stylesheets&apos;&#59;</CodeBlock>,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    All components are built on top of a super lightweight base stylesheet.
    Ensure you include this on the page when consuming any backpack components.
  </IntroBlurb>,
];
const BaseStylesheetPage = () => (
  <DocsPageBuilder
    title="Base stylesheet"
    blurb={blurb}
    components={components}
  />
);

export default BaseStylesheetPage;
