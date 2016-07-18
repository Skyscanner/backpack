import React from 'react'
import Helmet from 'react-helmet'
import CssModules from 'react-css-modules'

import styles from './home-page.scss'
import * as routes from './../../constants/routes'

import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import BpkLink from './../../components/BpkLink'

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
        <BpkHeading level='h2'>Backpack is a suite of front-end tools to enable you to design and build products which look and feel consistent with the Skyscanner product family.</BpkHeading>
        <BpkButton large href={`#${anchors.gettingStarted}`}>Get started</BpkButton>
      </div>
    </div>
    <div styleName='bpkdocs-home-page__content-container'>
      <BpkHeading level='h3'>We’ve built upon Atomic Design principals to bring a scalable front-end platform to design, build and share components across all of Skyscanner’s product areas.</BpkHeading>
      <section styleName='bpkdocs-home-page__columns'>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Bonds</BpkHeading>
          <BpkParagraph>
            Bonds help set the foundation for all elements and helps connect them together. They’re abstract by nature and cover things like colour, typography and even more invisible aspects of an interface such as animations and spacing.<br />
            <BpkLink to={routes.BONDS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Atoms</BpkHeading>
          <BpkParagraph>
            Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button. They have distinct properties and can't be broken down further without losing their meaning.<br />
            <BpkLink to={routes.ATOMS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Molecules</BpkHeading>
          <BpkParagraph>
            Molecules are groups of atoms bonded together, which take on new properties as a result.<br />
            <BpkLink to={routes.MOLECULES}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Organisms</BpkHeading>
          <BpkParagraph>
            Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.<br />
            <BpkLink to={routes.ORGANISMS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
      </section>
    </div>
  </section>
)

export default CssModules(HomePage, styles)
