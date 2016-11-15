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
const createReactAppUrl = 'https://github.com/facebookincubator/create-react-app';
const nodeSassTildeImporterUrl = 'https://github.com/matthewdavidson/node-sass-tilde-importer';
const backpackReactExampleUrl = 'http://git.prod.skyscanner.local/backpack/backpack-react-example';
const webpackConfigExampleUrl =
  'http://git.prod.skyscanner.local/backpack/backpack-react-example/blob/master/webpack.config.babel.js';

const components = [
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
  {
    id: 'react-components',
    title: 'React components',
    blurb: [
      <BpkParagraph>
        All <BpkRouterLink to={ROUTES.ATOMS}>atoms</BpkRouterLink>
        , <BpkRouterLink to={ROUTES.MOLECULES}>molecules</BpkRouterLink>
        &nbsp;and <BpkRouterLink to={ROUTES.ORGANISMS}>organisms</BpkRouterLink> are available to consume as React
        components, exposed as modules on the npm registry. They encapsulate markup and styling which means that
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
      <BpkParagraph>
        Head on over to the <BpkLink href={backpackReactExampleUrl} blank>backpack-react-example</BpkLink> project on
        GitLab to see the above example in action. Fork it, clone it to your machine and follow the readme - you should
        end up with a local dev server running a page displaying the button component.
      </BpkParagraph>,
      <BpkBlockquote>
        <strong>Note:</strong> All Backpack components are published uncompiled which means you&apos;ll need to
        accommodate for this in your webpack config - here is
        an <BpkLink href={webpackConfigExampleUrl} blank>example</BpkLink>.
      </BpkBlockquote>,
      <BpkBlockquote>
        <strong>Note:</strong> We are hoping to make it a lot easier to get started with Backpack and React in the near
        future. Ideas include a <BpkLink href={createReactAppUrl} blank>create-react-app</BpkLink> like project which
        will get you up and running in minutes as well as some sort of Slingshot / MShell based integration to get your
        app into production. Watch this space.
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
];

const GettingStartedPage = () => <DocsPageBuilder
  title="Getting started"
  blurb={[
    <BpkParagraph>Depending on the audience, there are a few ways to get started:</BpkParagraph>,
  ]}
  components={components}
/>;

export default GettingStartedPage;
