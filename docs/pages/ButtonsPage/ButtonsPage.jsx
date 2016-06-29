import React from 'react'
import Helmet from 'react-helmet'

import BpkHeading from './../../components/BpkHeading'
import BpkParagraph from './../../components/BpkParagraph'
import BpkList from './../../components/BpkList'
import BpkLink from './../../components/BpkLink'
import BpkButton from './../../components/BpkButton'

import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  primary: 'buttons-page-primary',
  largePrimary: 'buttons-page-large-primary',
  secondary: 'buttons-page-secondary',
  largeSecondary: 'buttons-page-large-secondary'
}

const ButtonsPage = () => (
  <section>
    <Helmet title='Buttons' />
    <BpkHeading level='h1'>Buttons</BpkHeading>
    <BpkParagraph>Primary, secondary and disabled on three different backgrounds.</BpkParagraph>
    <BpkHeading level='h2'>Contents</BpkHeading>
    <BpkList children={[
      <BpkLink href={`#${anchors.primary}`}>Primary</BpkLink>,
      <BpkLink href={`#${anchors.largePrimary}`}>Large Primary</BpkLink>,
      <BpkLink href={`#${anchors.secondary}`}>Secondary</BpkLink>,
      <BpkLink href={`#${anchors.largeSecondary}`}>Large Secondary</BpkLink>
    ]} />
    <BpkHeading id={anchors.primary} level='h2'>Primary</BpkHeading>
    <PresentationBlock>
      <BpkButton>Primary</BpkButton>{'\n'}
      <BpkButton selected>Selected</BpkButton>{'\n'}
      <BpkButton disabled>Disabled</BpkButton>
    </PresentationBlock>
    <BpkHeading id={anchors.largePrimary} level='h2'>Large Primary</BpkHeading>
    <PresentationBlock>
      <BpkButton large>Primary</BpkButton>{'\n'}
      <BpkButton large selected>Selected</BpkButton>{'\n'}
      <BpkButton large disabled>Disabled</BpkButton>
    </PresentationBlock>
    <BpkHeading id={anchors.secondary} level='h2'>Secondary</BpkHeading>
    <PresentationBlock>
      <BpkButton secondary>Secondary</BpkButton>{'\n'}
      <BpkButton secondary selected>Selected</BpkButton>{'\n'}
      <BpkButton secondary disabled>Disabled</BpkButton>
    </PresentationBlock>
    <BpkHeading id={anchors.largeSecondary} level='h2'>Large Secondary</BpkHeading>
    <PresentationBlock>
      <BpkButton secondary large>Secondary</BpkButton>{'\n'}
      <BpkButton secondary large selected>Selected</BpkButton>{'\n'}
      <BpkButton secondary large disabled>Disabled</BpkButton>
    </PresentationBlock>
  </section>
)

export default ButtonsPage
