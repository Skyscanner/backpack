import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from './../../components/BpkLink'
import BpkButton from './../../components/BpkButton'
import BpkHeading from './../../components/BpkHeading'
import BpkParagraph from './../../components/BpkParagraph'
import { BpkList, BpkListItem } from './../../components/BpkList'
import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  primary: 'buttons-page-primary',
  largePrimary: 'buttons-page-large-primary',
  secondary: 'buttons-page-secondary',
  largeSecondary: 'buttons-page-large-secondary',
  link: 'buttons-page-link',
  largeLink: 'buttons-page-large-link'
}

const ButtonsPage = () => (
  <section>
    <Helmet title='Buttons' />
    <BpkHeading level='h1'>Buttons</BpkHeading>
    <BpkParagraph>Primary, secondary and disabled on three different backgrounds.</BpkParagraph>
    <BpkHeading level='h2'>Contents</BpkHeading>
    <BpkList>
      <BpkListItem>
        <BpkLink href={`#${anchors.primary}`}>Primary</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.largePrimary}`}>Large Primary</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.secondary}`}>Secondary</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.largeSecondary}`}>Large Secondary</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.link}`}>Link</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.largeLink}`}>Large Link</BpkLink>
      </BpkListItem>
    </BpkList>
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
    <BpkHeading id={anchors.link} level='h2'>Link</BpkHeading>
    <PresentationBlock>
      <BpkButton link>Link</BpkButton>{'\n'}
      <BpkButton link disabled>Disabled</BpkButton>
    </PresentationBlock>
    <BpkHeading id={anchors.largeLink} level='h2'>Large Link</BpkHeading>
    <PresentationBlock>
      <BpkButton link large>Link</BpkButton>{'\n'}
      <BpkButton link large disabled>Disabled</BpkButton>
    </PresentationBlock>
  </section>
)

export default ButtonsPage
