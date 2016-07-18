import React from 'react'
import Helmet from 'react-helmet'
import CssModules from 'react-css-modules'

import styles from './home-page.scss'
import * as routes from './../../constants/routes'

import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkLink from './../../components/BpkLink'
import BpkCode from './../../components/BpkCode'

const anchors = {
  gettingStarted: 'home-page-getting-started',
  designTokens: 'home-page-design-tokens',
  sketchFiles: 'home-page-sketch-files',
  stylesheets: 'home-page-stylesheets',
  sassMixins: 'home-page-sass-mixins',
  reactComponents: 'home-page-react-components'
}

const HomePage = () => (
  <section>
    <Helmet title='Backpack' />
    <div styleName='bpkdocs-home-page__hero'>
      <div styleName='bpkdocs-home-page__hero-container'>
        <BpkHeading level='h1'>Backpack</BpkHeading>
        <BpkHeading level='h2'>Skyscanner's living style guide and organic design system</BpkHeading>
        <BpkButton large href={`#${anchors.gettingStarted}`}>Get started</BpkButton>
      </div>
    </div>
    <div styleName='bpkdocs-home-page__content-container'>
      <section styleName='bpkdocs-home-page__columns'>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Bonds</BpkHeading>
          <BpkParagraph>
            Bonds help set the foundation for all components and helps connect them together.<br />
            <BpkLink to={routes.BONDS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Atoms</BpkHeading>
          <BpkParagraph>
            Atoms are the basic building blocks of our product.<br />
            <BpkLink to={routes.ATOMS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Molecules</BpkHeading>
          <BpkParagraph>
            Molecules are two or more atoms bonded together to form a larger, more useful component.<br />
            <BpkLink to={routes.MOLECULES}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Organisms</BpkHeading>
          <BpkParagraph>
            Organisms are groups of molecules and atoms which form a relatively complex, distinct section of an
            interface.<br />
            <BpkLink to={routes.ORGANISMS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
      </section>
      <section styleName='bpkdocs-home-page__columns'>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading id={anchors.gettingStarted} level='h3'>Getting started</BpkHeading>
          <BpkParagraph>
            There are a number of ways to get started with Backpack. Below is a list aimed to suit a variety of
            audiences and use cases.
          </BpkParagraph>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`#${anchors.designTokens}`}>Design tokens</BpkLink> <em>(coming soon...)</em>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`#${anchors.sketchFiles}`}>Sketch files</BpkLink> <em>(coming soon...)</em>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`#${anchors.stylesheets}`}>Stylesheets</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`#${anchors.sassMixins}`}>Sass mixins</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`#${anchors.reactComponents}`}>React components</BpkLink> <em>(coming soon...)</em>
            </BpkListItem>
          </BpkList>
          <BpkHeading id={anchors.designTokens} level='h3'>Design tokens</BpkHeading>
          <BpkParagraph>
            <em>Coming soon...</em>
          </BpkParagraph>
          <BpkHeading id={anchors.sketchFiles} level='h3'>Sketch files</BpkHeading>
          <BpkParagraph>
            <em>Coming soon...</em>
          </BpkParagraph>
          <BpkHeading id={anchors.stylesheets} level='h3'>Stylesheets</BpkHeading>
          <BpkParagraph>
            At present there is only one, foundational level base stylesheet. Read more about
            it <BpkLink to={routes.BASE_STYLESHEET}>here</BpkLink>.
          </BpkParagraph>
          <BpkHeading id={anchors.sassMixins} level='h3'>Sass mixins</BpkHeading>
          <BpkParagraph>
            <strong>View the full <BpkLink href='/sassdoc' target='__blank'>Sass documentation</BpkLink>.</strong>
          </BpkParagraph>
          <BpkParagraph>
            The Backpack Sass mixins are available as
            an <BpkLink href='https://www.npmjs.com/package/bpk-mixins' target='_blank'>npm</BpkLink> module.
            Install the module like so:
          </BpkParagraph>
          <BpkCode>
            {'npm install bpk-mixins --save-dev'}
          </BpkCode>
          <BpkParagraph>
            Import the mixins and consume as appropriate:
          </BpkParagraph>
          <BpkCode syntax='css'>
            {`@import '~bpk-mixins';
            .bpk-my-component {
              @include bpk-button;
            }
            `}
          </BpkCode>
          <BpkParagraph>
            <strong>Note:</strong> The tilde import syntax (<BpkCode inline>~</BpkCode>) is webpack/sass-loader
            specific, otherwise adjust the import path relative to your <BpkCode inline>node_modules</BpkCode> folder
            i.e. <BpkCode inline>@import './node_modules/bpk-mixins';</BpkCode>
          </BpkParagraph>
          <BpkHeading id={anchors.reactComponents} level='h3'>React components</BpkHeading>
          <BpkParagraph>
            <em>Coming soon...</em>
          </BpkParagraph>
        </article>
      </section>
    </div>
  </section>
)

export default CssModules(HomePage, styles)
