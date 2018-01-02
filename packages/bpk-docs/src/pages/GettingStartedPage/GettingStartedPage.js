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
import BpkRouterLink from 'bpk-component-router-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import { BpkCodeBlock, BpkCode } from 'bpk-component-code';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const nodeSassUrl = 'https://github.com/sass/node-sass';
const sassLoaderUrl = 'https://github.com/jtangelder/sass-loader';
const sassLoaderTildeUrl = 'https://github.com/jtangelder/sass-loader#imports';
const nodeSassTildeImporterUrl =
  'https://github.com/matthewdavidson/node-sass-tilde-importer';

const components = [
  {
    id: 'react-components',
    title: 'React components',
    blurb: [
      <Paragraph>
        All components are available to consume as React components, exposed as
        modules on the npm registry. They encapsulate structure, style, and
        logic which means that achieving a consistent look and feel across
        Skyscanner products on web, iOS and Android is as straightforward as:
        installing a package, importing it in a view and using it in JSX. Please
        see the Text component for{' '}
        <BpkLink href={`${ROUTES.TYPOGRAPHY}#text-readme`} blank>
          web
        </BpkLink>{' '}
        and&nbsp;
        <BpkLink href={ROUTES.NATIVE_TEXT} blank>
          native
        </BpkLink>{' '}
        as examples.
      </Paragraph>,
      <BpkBlockquote extraSpace>
        The recommended way to get started with Backpack on web is to use{' '}
        <BpkRouterLink to={ROUTES.BACKPACK_REACT_SCRIPTS}>
          Backpack React Scripts
        </BpkRouterLink>.
        <br />
        <br />
        <strong>Note:</strong> If you are looking to integrate Backpack
        components into an existing project, be aware that components are
        published uncompiled which means you&apos;ll need to accommodate for
        this in your webpack config.
      </BpkBlockquote>,
    ],
    examples: [],
  },
  {
    id: 'sass-variables-and-mixins',
    title: 'Sass variables and mixins',
    blurb: [
      <Paragraph>
        Backpack&apos;s bonds are primarily available as a library of Sass
        variables and mixins. Furthermore, most atom level components are also
        available as mixins. Again, the library is exposed as a module on the
        npm registry which can be installed like so:
      </Paragraph>,
      <BpkCodeBlock>npm install bpk-mixins --save-dev</BpkCodeBlock>,
      <Paragraph>
        The following example demonstrates how to import the module and consume
        the primary button mixin:
      </Paragraph>,
      <BpkCodeBlock>
        {`@import '~bpk-mixins/index';

.my-button {
  @include bpk-button;
}`}
      </BpkCodeBlock>,
      <BpkBlockquote extraSpace>
        <strong>Note</strong>: <BpkCode>bpk-mixins</BpkCode> only supports{' '}
        <BpkLink href={nodeSassUrl} blank>
          node-sass
        </BpkLink>{' '}
        and makes extensive use of{' '}
        <BpkLink href={sassLoaderTildeUrl} blank>
          sass-loader&apos;s
        </BpkLink>{' '}
        tilde importing mechanism. If you are not using{' '}
        <BpkLink href={sassLoaderUrl} blank>
          sass-loader
        </BpkLink>, you can use{' '}
        <BpkLink href={nodeSassTildeImporterUrl}>
          node-sass-tilde-importer
        </BpkLink>. The <BpkCode>indentedSyntax</BpkCode> option is unsupported.
      </BpkBlockquote>,
      <Paragraph>
        To get an idea of all the variables and mixins available, head on over
        to the{' '}
        <BpkLink href="/sassdoc" blank>
          full reference documentation
        </BpkLink>.
      </Paragraph>,
    ],
    examples: [],
  },
  {
    id: 'sketch-resources',
    title: 'Sketch resources',
    blurb: [
      <Paragraph>
        We use the Craft plugin (from InVision) to help share components and
        keep Sketch files in sync. To use this:
      </Paragraph>,
      <BpkList ordered>
        <BpkListItem>
          Download and install the{' '}
          <BpkLink href="https://labs.invisionapp.com/craft" blank>
            Craft plugin
          </BpkLink>.
        </BpkListItem>
        <BpkListItem>
          Download the Backpack Craft library from{' '}
          <BpkRouterLink to={ROUTES.RESOURCES}>Downloads</BpkRouterLink>.
        </BpkListItem>
        <BpkListItem>
          Import the Backpack Craft Library into Sketch.
        </BpkListItem>
      </BpkList>,
    ],
    examples: [],
  },
];

const GettingStartedPage = () => (
  <DocsPageBuilder
    title="Getting started"
    blurb={[
      <Paragraph>
        Depending on the audience, there are a few ways to get started:
      </Paragraph>,
    ]}
    components={components}
  />
);

export default GettingStartedPage;
