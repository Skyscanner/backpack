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

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';
import Code from '../../components/Code';
import CodeBlock from '../../components/CodeBlock';

/* eslint-disable import/no-webpack-loader-syntax */
const iconTemplate = require('!!file-loader?name=[name].[hash].sketch!./../../static/icon-template.sketch');
const responsiveGrid = require('!!file-loader?name=[name].[hash].sketch!./../../static/responsive-grids.sketch');

const nodeSassUrl = 'https://github.com/sass/node-sass';
const sassLoaderUrl = 'https://github.com/jtangelder/sass-loader';
const sassLoaderTildeUrl = 'https://github.com/jtangelder/sass-loader#imports';
const nodeSassTildeImporterUrl =
  'https://github.com/matthewdavidson/node-sass-tilde-importer';
const backpackIOS = 'https://github.com/skyscanner/backpack-ios';
const backpackAndroid = 'https://github.com/skyscanner/backpack-android';

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
        <BpkLink href={`${ROUTES.TEXT}`} blank>
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
    id: 'backpack-ios',
    title: 'Backpack CocoaPod',
    blurb: [
      <Paragraph>
        <BpkLink href={backpackIOS} blank>
          Backpack for iOS
        </BpkLink>{' '}
        is distributed as a CocoaPod. The pod contains several subspecs for
        different token level aspects of Backpack such as colour, typography,
        spacing etc.
      </Paragraph>,
    ],
    examples: [],
  },
  {
    id: 'backpack-android',
    title: 'Backpack Gradle package',
    blurb: [
      <Paragraph>
        <BpkLink href={backpackAndroid} blank>
          Backpack for Android
        </BpkLink>{' '}
        is distributed as a Gradle package. It contains a module with different
        Backpack tokens such as colour, typography, spacing etc as a resource
        file.
      </Paragraph>,
    ],
    examples: [],
  },
  {
    id: 'sass-variables-and-mixins',
    title: 'Sass variables and mixins',
    blurb: [
      <Paragraph>
        Backpack&apos;s tokens are also available as a library of Sass variables
        and mixins. Furthermore, most small components such as buttons are also
        available as mixins. Again, the library is exposed as a module on the
        npm registry which can be installed like so:
      </Paragraph>,
      <CodeBlock>npm install bpk-mixins --save-dev</CodeBlock>,
      <Paragraph>
        The following example demonstrates how to import the module and consume
        the primary button mixin:
      </Paragraph>,
      <CodeBlock>
        {`@import '~bpk-mixins/index';

.my-button {
  @include bpk-button;
}`}
      </CodeBlock>,
      <BpkBlockquote extraSpace>
        <strong>Note</strong>: <Code>bpk-mixins</Code> only supports{' '}
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
        </BpkLink>. The <Code>indentedSyntax</Code> option is unsupported.
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
        Sketch is the preferred tool of choice for designing with Backpack. Its
        plugin-based architecture makes it highly extensible and customisable.
        We make heavy use of the Autolayout plugin from Anima to ensure symbols
        can be resized with ease. You can download that below. As well as this
        we use Sketch libraries to keep everyone in sync. These are split by
        platform. You can also grab the latest versions of these below.
      </Paragraph>,
      <Paragraph>To get started, follow the steps below.</Paragraph>,
      <BpkList ordered>
        <BpkListItem>
          Download and install the{' '}
          <BpkLink href="https://animaapp.github.io/" blank>
            Autolayout plugin
          </BpkLink>{' '}
          for Sketch.
        </BpkListItem>
        <BpkListItem>
          Download the Backpack Sketch libraries:
          <BpkList>
            <BpkListItem>
              <BpkLink
                href="https://www.dropbox.com/s/vyswgx5f6af45vl/Backpack_Web_Sketch_Library.sketch?dl=0"
                blank
              >
                Web Sketch library
              </BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink
                href="https://www.dropbox.com/s/d6hxj3jufh9f4jj/Backpack_iOS_Sketch_Library.sketch?dl=0"
                blank
              >
                iOS Sketch library
              </BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink
                href="https://www.dropbox.com/s/u1tbpvxlebo417w/Backpack_Android_Sketch_Library.sketch?dl=0"
                blank
              >
                Android Sketch library
              </BpkLink>
            </BpkListItem>
          </BpkList>
        </BpkListItem>
        <BpkListItem>Import the library/libraries in Sketch.</BpkListItem>
        <BpkListItem>
          <BpkLink
            href="https://www.dropbox.com/s/remeifqag21zej8/Backpack_Sketch_Template.sketch?dl=0"
            blank
          >
            Grab the Sketch template.
          </BpkLink>{' '}
          This is used to manage colour and type styles since Sketch libraries
          do not currently have support for syncing colour palettes or type
          styles.
        </BpkListItem>
      </BpkList>,
      <BpkBlockquote>
        Note: You will need to have <strong>SF Pro</strong> and{' '}
        <strong>Roboto</strong> fonts installed for these libraries to work
        properly. These can be downloaded from Apple and Google.
      </BpkBlockquote>,
      <Heading level="h3">Other Sketch Resources</Heading>,
      <BpkList>
        <BpkListItem>
          <BpkLink href={`/${responsiveGrid}`} blank>
            Responsive grids
          </BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`/${iconTemplate}`} blank>
            Icon template
          </BpkLink>
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
        Depending on the audience, there are a few ways to get started with
        Backpack.
      </Paragraph>,
    ]}
    components={components}
  />
);

export default GettingStartedPage;
