import React from 'react'
import Helmet from 'react-helmet'
import CssModules from 'react-css-modules'

import styles from './home-page.scss'
import BpkHeading from './../../components/BpkHeading'
import BpkButton from './../../components/BpkButton'

const HomePage = () => (
  <section>
    <Helmet title='Backpack' />
    <div styleName='bpkdocs-home-page__hero'>
      <div styleName='bpkdocs-home-page__hero-container'>
        <BpkHeading level='h1'>Backpack</BpkHeading>
        <BpkHeading level='h2'>A blurb about the Backpack Design System.</BpkHeading>
        <BpkButton large>Get Started</BpkButton>
      </div>
    </div>
    <div styleName='bpkdocs-home-page__content-container'>
      <BpkHeading level='h3'>More content</BpkHeading>
    </div>
  </section>
)

export default CssModules(HomePage, styles)
