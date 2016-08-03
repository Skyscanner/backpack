import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { PropTypes as RouterPropTypes } from 'react-router'

import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import BpkRouterLink from 'bpk-component-router-link'

import './home-page.scss'
import * as ROUTES from './../../constants/routes'

class HomePage extends React.Component {
  constructor (props) {
    super(props)

    this.onGettingStartedClick = this.onGettingStartedClick.bind(this)
  }

  onGettingStartedClick (e) {
    e.preventDefault()
    this.props.router.push(e.currentTarget.getAttribute('href'))
  }

  render () {
    return (
      <section>
        <Helmet title='Backpack' />
        <div className='bpkdocs-home-page__hero'>
          <div className='bpkdocs-home-page__hero-container'>
            <BpkHeading level='h1'>Backpack</BpkHeading>
            <BpkHeading level='h2'>
              A suite of tools to enable you to design and build products which look and feel consistent with the
              Skyscanner product family.
            </BpkHeading>
            <BpkButton large href={ROUTES.GETTING_STARTED} onClick={this.onGettingStartedClick}>Get started</BpkButton>
          </div>
        </div>
        <div className='bpkdocs-home-page__content-container'>
          <BpkHeading level='h3'>
            We’ve built upon Atomic Design principals to bring a scalable platform to design, build and share components
            across all of Skyscanner’s product areas.
          </BpkHeading>
          <section className='bpkdocs-home-page__columns'>
            <article className='bpkdocs-home-page__column'>
              <BpkHeading level='h3'>Bonds</BpkHeading>
              <BpkParagraph>
                Bonds help set the foundation for all elements and helps connect them together. They’re abstract by
                nature and cover things like color, typography and even more invisible aspects of an interface such as
                animations and spacing.
                <br />
                <BpkRouterLink to={ROUTES.BONDS}>Read more</BpkRouterLink>
              </BpkParagraph>
            </article>
            <article className='bpkdocs-home-page__column'>
              <BpkHeading level='h3'>Atoms</BpkHeading>
              <BpkParagraph>
                Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such
                as a form label, an input or a button. They have distinct properties and can't be broken down further
                without losing their meaning.
                <br />
                <BpkRouterLink to={ROUTES.ATOMS}>Read more</BpkRouterLink>
              </BpkParagraph>
            </article>
            <article className='bpkdocs-home-page__column'>
              <BpkHeading level='h3'>Molecules</BpkHeading>
              <BpkParagraph>
                Molecules are two or more atoms held together by chemical bonds. These combinations of atoms take on
                their own unique properties, and become more tangible and operational than atoms.
                <br />
                <BpkRouterLink to={ROUTES.MOLECULES}>Read more</BpkRouterLink>
              </BpkParagraph>
            </article>
            <article className='bpkdocs-home-page__column'>
              <BpkHeading level='h3'>Organisms</BpkHeading>
              <BpkParagraph>
                Organisms are groups of molecules joined together to form a relatively complex, distinct section of an
                interface.
                <br />
                <BpkRouterLink to={ROUTES.ORGANISMS}>Read more</BpkRouterLink>
              </BpkParagraph>
            </article>
          </section>
        </div>
      </section>
    )
  }
}

HomePage.propTypes = {
  router: PropTypes.shape(RouterPropTypes.routerShape)
}

export default HomePage
