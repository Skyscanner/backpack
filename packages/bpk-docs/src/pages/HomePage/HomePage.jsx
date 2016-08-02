import React from 'react'
import Helmet from 'react-helmet'

import './home-page.scss'
import * as routes from './../../constants/routes'

import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import BpkLink from './../../components/BpkLink'

const HomePage = () => (
  <section>
    <Helmet title='Backpack' />
    <div className='bpkdocs-home-page__hero'>
      <div className='bpkdocs-home-page__hero-container'>
        <BpkHeading level='h1'>Backpack</BpkHeading>
        <BpkHeading level='h2'>
          A suite of tools to enable you to design and build products which look and
          feel consistent with the Skyscanner product family.
        </BpkHeading>
        <BpkButton large>Get started</BpkButton>
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
            Bonds help set the foundation for all elements and helps connect them together. They’re abstract by nature
            and cover things like colour, typography and even more invisible aspects of an interface such as animations
            and spacing.
            <br />
            <BpkLink to={routes.BONDS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article className='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Atoms</BpkHeading>
          <BpkParagraph>
            Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a
            form label, an input or a button. They have distinct properties and can't be broken down further without
            losing their meaning.
            <br />
            <BpkLink to={routes.ATOMS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article className='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Molecules</BpkHeading>
          <BpkParagraph>
            Molecules are two or more atoms held together by chemical bonds. These combinations of atoms take on their
            own unique properties, and become more tangible and operational than atoms.
            <br />
            <BpkLink to={routes.MOLECULES}>Read more</BpkLink>
          </BpkParagraph>
        </article>
        <article className='bpkdocs-home-page__column'>
          <BpkHeading level='h3'>Organisms</BpkHeading>
          <BpkParagraph>
            Organisms are groups of molecules joined together to form a relatively complex, distinct section of an
            interface.
            <br />
            <BpkLink to={routes.ORGANISMS}>Read more</BpkLink>
          </BpkParagraph>
        </article>
      </section>
    </div>
  </section>
)

export default HomePage
