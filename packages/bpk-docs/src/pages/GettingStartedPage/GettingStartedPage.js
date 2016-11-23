import React from 'react';
import BpkLink from 'bpk-component-link';
import BpkParagraph from 'bpk-component-paragraph';
import BpkBlockquote from 'bpk-component-blockquote';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import { BpkCodeBlock, BpkCode } from 'bpk-component-code';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const nodeSassUrl = 'https://github.com/sass/node-sass';
const sassLoaderUrl = 'https://github.com/jtangelder/sass-loader';
const sassLoaderTildeUrl = 'https://github.com/jtangelder/sass-loader#imports';
const nodeSassTildeImporterUrl = 'https://github.com/matthewdavidson/node-sass-tilde-importer';
const webpackConfigExampleUrl =
  'http://git.prod.skyscanner.local/backpack/backpack-react-example/blob/master/webpack.config.babel.js';

const components = [
  {
    id: 'react-components',
    title: 'React components',
    blurb: [
      <BpkParagraph>
        The recommended way to get started with Backpack is to
        use <BpkRouterLink to={ROUTES.BACKPACK_REACT_SCRIPTS}>Backpack React Scripts</BpkRouterLink>.
      </BpkParagraph>,
      <BpkParagraph>
        All <BpkRouterLink to={ROUTES.ATOMS}>atoms</BpkRouterLink>
        , <BpkRouterLink to={ROUTES.MOLECULES}>molecules</BpkRouterLink>
        &nbsp;and <BpkRouterLink to={ROUTES.ORGANISMS}>organisms</BpkRouterLink> are available to consume as React
        components, exposed as modules on the npm registry. They encapsulate markup, style and logic which means that
        achieving a consistent look and feel across Skyscanner products is as straightforward as:
      </BpkParagraph>,
      <BpkList ordered>
        <BpkListItem>
          <BpkParagraph>Installing the component as a dependency:</BpkParagraph>
          <BpkCodeBlock>
            {'npm install bpk-component-button --save'}
          </BpkCodeBlock>
        </BpkListItem>
        <BpkListItem>
          <BpkParagraph>Consuming it in your app:</BpkParagraph>
          <BpkCodeBlock>{`import React from 'react';
import ReactDom from 'react-dom';
import BpkButton from 'bpk-component-button';

const onClick = () => alert('Hello World!');
const myComponent = <BpkButton onClick={onClick}>Click me</BpkButton>;

ReactDom.render(myComponent, document.getElementById('react-mount'));
`}
          </BpkCodeBlock>
        </BpkListItem>
      </BpkList>,
      <BpkBlockquote>
        <strong>Note:</strong> If you are looking to integrate Backpack components into an existing project, be
        aware that components are published uncompiled which means you&apos;ll need to accommodate for this in your
        webpack config - here is an <BpkLink href={webpackConfigExampleUrl} blank>example</BpkLink>.
      </BpkBlockquote>,
    ],
    examples: [],
  },
  {
    id: 'sass-variables-and-mixins',
    title: 'Sass variables and mixins',
    blurb: [
      <BpkParagraph>
        Backpack&apos;s bonds are primarily available as a library of Sass variables and mixins. Furthermore, most atom
        level components are also available as mixins. Again, the library is exposed as a module on the npm registry
        which can be installed like so:
      </BpkParagraph>,
      <BpkCodeBlock>
        npm install bpk-mixins --save-dev
      </BpkCodeBlock>,
      <BpkParagraph>
        The following example demonstrates how to import the module and consume the primary button mixin:
      </BpkParagraph>,
      <BpkCodeBlock>
        {`@import '~bpk-mixins/index';

.my-button {
  @include bpk-button;
}`}
      </BpkCodeBlock>,
      <BpkBlockquote>
        <strong>Note</strong>: <BpkCode>bpk-mixins</BpkCode> only
        supports <BpkLink href={nodeSassUrl} blank>node-sass</BpkLink> and makes extensive use
        of <BpkLink href={sassLoaderTildeUrl} blank>sass-loader&apos;s</BpkLink> tilde importing mechanism. If you are
        not using <BpkLink href={sassLoaderUrl} blank>sass-loader</BpkLink>, you can
        use <BpkLink href={nodeSassTildeImporterUrl}>node-sass-tilde-importer</BpkLink>.
        The <BpkCode>indentedSyntax</BpkCode> option is unsupported.
      </BpkBlockquote>,
      <BpkParagraph>
        To get an idea of all the variables and mixins available, head on over to
        the <BpkLink href="/sassdoc" blank>full reference documentation</BpkLink>.
      </BpkParagraph>,
    ],
    examples: [],
  },
  {
    id: 'sketch-resources',
    title: 'Sketch resources',
    blurb: [
      <BpkParagraph>
        We use the Craft plugin (from InVision) to help share components and keep Sketch files in sync. To use this:
      </BpkParagraph>,
      <BpkList ordered>
        <BpkListItem>
          Download and install the <BpkLink href="https://labs.invisionapp.com/craft" blank>Craft plugin</BpkLink>.
        </BpkListItem>
        <BpkListItem>
          Download the Backpack Craft library from <BpkRouterLink to={ROUTES.DOWNLOADS}>Downloads</BpkRouterLink>.
        </BpkListItem>
        <BpkListItem>
          Import the Backpack Craft Library into Sketch.
        </BpkListItem>
      </BpkList>,
    ],
    examples: [],
  },
];

const GettingStartedPage = () => <DocsPageBuilder
  title="Getting started"
  blurb={[
    <BpkParagraph>Depending on the audience, there are a few ways to get started:</BpkParagraph>,
  ]}
  components={components}
/>;

export default GettingStartedPage;
