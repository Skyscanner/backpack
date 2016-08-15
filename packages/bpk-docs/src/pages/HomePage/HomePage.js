import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { PropTypes as RouterPropTypes } from 'react-router'

import BpkIcon from 'bpk-component-icon'
import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import TOKENS from 'bpk-tokens/tokens/base.common'

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
            <BpkHeading level='h2'>Backpack is a collection of design resources, reusable components and guidelines for
              creating Skyscanner products.
            </BpkHeading>
            <BpkButton large href={ROUTES.GETTING_STARTED} onClick={this.onGettingStartedClick}>
              Get started <BpkIcon icon='long-arrow-right-alt' color={TOKENS.colorWhite} large alignToButton />
            </BpkButton>
          </div>
        </div>
        <div className='bpkdocs-home-page__content-container'>
          <section className='bpkdocs-home-page__columns'>
            <article className='bpkdocs-home-page__column'>
              <BpkHeading level='h3'>Mission</BpkHeading>
              <BpkParagraph>To bring Design and Engineering teams together to help drive product consistency
                at scale and reduce waste by offering a platform by which to share components easily.
              </BpkParagraph>
            </article>
            <article className='bpkdocs-home-page__column'>
              <BpkHeading level='h3'>About Backpack</BpkHeading>
              <BpkParagraph>
                Backpack is the foundation for all Skyscanner products and is maintained by the Backpack Design System
                Squad. It builds on Atomic Design principals to help visualise how Skyscanner's products are assembled.
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
