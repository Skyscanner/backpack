import React, { Children } from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import BpkBlockquote from 'bpk-component-blockquote'
import BpkRouterLink from 'bpk-component-router-link'
import { BpkList, BpkListItem } from 'bpk-component-list'
import { BpkCodeBlock, BpkCode } from 'bpk-component-code'
import BpkContentContainer from 'bpk-component-content-container'

import * as ROUTES from './../../constants/routes'

const title = 'Getting started'
const backpackReactExampleUrl = 'http://git.prod.skyscanner.local/backpack/backpack-react-example'
const createReactAppUrl = 'https://github.com/facebookincubator/create-react-app'

const sections = [
  {
    id: 'sketch-resources',
    title: 'Sketch resources',
    content: [
      <BpkParagraph>
        James to input. Download the sketch resources <BpkRouterLink to={ROUTES.DOWNLOADS}>here</BpkRouterLink>.
      </BpkParagraph>
    ]
  },
  {
    id: 'react-components',
    title: 'React components',
    content: [
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
        end up with local dev server running a page with
        our <BpkRouterLink to={ROUTES.BUTTONS}>button component</BpkRouterLink> on it.
      </BpkParagraph>,
      <BpkBlockquote>
        <strong>Note:</strong> We are hoping to make it a lot easier to get started with Backpack and React in the near
        future. Ideas include a <BpkLink href={createReactAppUrl}>create-react-app</BpkLink> like project which will get
        you up and running in minutes as well as some sort of Slingshot / MShell based integration to get your app into
        production. Watch this space.
      </BpkBlockquote>
    ]
  },
  {
    id: 'sass-variables-and-mixins',
    title: 'Sass variables and mixins',
    content: [
      <BpkParagraph>
        Backpack's bonds are primarily available as a library of Sass variables and mixins. Furthermore, most atom
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
        {`@import '~bpk-mixins';

.my-button {
  @include bpk-button;
}`}
      </BpkCodeBlock>,
      <BpkBlockquote>
        <strong>Note</strong>: The tilde import syntax (<BpkCode>~</BpkCode>) is webpack/sass-loader specific, otherwise
        you'll have to adjust the import path relative to your <BpkCode>node_modules</BpkCode> folder, for
        example <BpkCode>@import "./../node_modules/bpk-mixins";</BpkCode>
      </BpkBlockquote>,
      <BpkParagraph>
        To get an idea of all the variables and mixins available, head on over to
        the <BpkLink href='/sassdoc' blank>full reference documentation</BpkLink>.
      </BpkParagraph>
    ]
  }
]

const NavItem = (section) => (
  <BpkListItem>
    <BpkLink href={`#${section.id}`}>{section.title}</BpkLink>
  </BpkListItem>
)

const SectionContent = (section) => [
  <BpkHeading id={section.id} level='h3'>{section.title}</BpkHeading>,
  section.content
]

const GettingStartedPage = () => (
  <section>
    <Helmet title={title} />
    <BpkContentContainer>
      <BpkHeading level='h1'>{title}</BpkHeading>
      <BpkParagraph>
        Backpack is a collection of design resources, reusable components and guidelines for creating Skyscanner's
        products. Depending on the audience, there are a few ways to get started:
      </BpkParagraph>
      <BpkList>{Children.toArray(sections.map(NavItem))}</BpkList>
      {Children.toArray(sections.map(SectionContent))}
    </BpkContentContainer>
  </section>
)

export default GettingStartedPage
