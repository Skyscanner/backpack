import React from 'react'
import Helmet from 'react-helmet'
import CssModules from 'react-css-modules'

import styles from './home-page.scss'
import pkg from './../../../package.json'
import * as routes from './../../constants/routes'
import BpkLink from './../../components/BpkLink'
import BpkCode from './../../components/BpkCode'
import BpkButton from 'bpk-component-button'
import BpkHeading from './../../components/BpkHeading'
import BpkParagraph from './../../components/BpkParagraph'

const anchors = {
  gettingStarted: 'home-page-getting-started'
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
          <BpkHeading level='h3'>Developer & designer resources</BpkHeading>
          <BpkParagraph>
            Rizzle ipsizzle dolizzle ass cool, crazy adipiscing elizzle. Nullam phat velizzle, i'm in the shizzle
            volutpizzle, check out this quizzle, cool vizzle, arcu. Pellentesque sheezy tortor.
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Mixins</BpkHeading>
          <BpkParagraph>
            Owned erizzle. Black izzle dolor dapibizzle turpis tempizzle ghetto. Dope pellentesque nibh et turpis. Sure
            in tortizzle. Pellentesque eleifend rhoncizzle crackalackin. In hac habitasse platea dictumst.
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Reusable components</BpkHeading>
          <BpkParagraph>
            Fo shizzle my nizzle dapibizzle. Curabitizzle tellus izzle, pretizzle nizzle, da bomb sheezy, eleifend its
            fo rizzle, check out this. Nizzle suscipizzle. Shizznit semper crackalackin phat boofron.
          </BpkParagraph>
        </article>
      </section>
      <section styleName='bpkdocs-home-page__columns'>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading id={anchors.gettingStarted} level='h3'>Getting started</BpkHeading>
          <BpkParagraph>
            Backpack is available as
            an <BpkLink href='https://www.npmjs.com/' target='_blank'>npm</BpkLink> module.
            Install the module using the git url like so:
          </BpkParagraph>
          <BpkCode>
            {`npm install git+http://git.prod.skyscanner.local/backpack/backpack.git#v${pkg.version} --save-dev`}
          </BpkCode>
        </article>
      </section>
      <section styleName='bpkdocs-home-page__columns'>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Bonds</BpkHeading>
          <BpkParagraph>
            Bonds help set the foundation for all components and helps connect them together.<br />
            <BpkLink to={routes.BONDS}>Read more</BpkLink>.
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Atoms</BpkHeading>
          <BpkParagraph>
            Atoms are the basic building blocks of our product.<br />
            <BpkLink to={routes.ATOMS}>Read more</BpkLink>.
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Molecules</BpkHeading>
          <BpkParagraph>
            Molecules are groups of two or more atoms bonded together to form a larger component.<br />
            <BpkLink to={routes.MOLECULES}>Read more</BpkLink>.
          </BpkParagraph>
        </article>
        <article styleName='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Organisms</BpkHeading>
          <BpkParagraph>
            Fo shizzle my nizzle dapibizzle. Curabitizzle tellus izzle, pretizzle nizzle, da bomb sheezy, eleifend its
            fo rizzle, check out this. Nizzle suscipizzle. Shizznit semper crackalackin phat boofron.
          </BpkParagraph>
        </article>
      </section>

    </div>
  </section>
)

export default CssModules(HomePage, styles)
