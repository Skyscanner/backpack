import React from 'react'
import Helmet from 'react-helmet'

import BpkHeading from './../../components/BpkHeading'
import BpkParagraph from './../../components/BpkParagraph'
import BpkList from './../../components/BpkList'
import BpkLink from './../../components/BpkLink'

import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  headings: 'typography-page-headings',
  paragraphs: 'typography-page-paragraphs',
  lists: 'typography-page-lists'
}

const TypographyPage = () => (
  <section>
    <Helmet title='Typography' />
    <BpkHeading level='h1'>Typography</BpkHeading>
    <BpkParagraph>Headings, paragraphs, blockquotes, lists and more.</BpkParagraph>
    <BpkHeading level='h2'>Contents</BpkHeading>
    <BpkList children={[
      <BpkLink href={`#${anchors.headings}`}>Headings</BpkLink>,
      <BpkLink href={`#${anchors.paragraphs}`}>Paragaphs</BpkLink>,
      <BpkLink href={`#${anchors.lists}`}>Lists</BpkLink>
    ]} />
    <BpkHeading id={anchors.headings} level='h2'>Headings</BpkHeading>
    <PresentationBlock>
      <BpkHeading level='h1'>Heading 1</BpkHeading>
      <BpkHeading level='h2'>Heading 2</BpkHeading>
      <BpkHeading level='h3'>Heading 3</BpkHeading>
      <BpkHeading level='h4'>Heading 4</BpkHeading>
      <BpkHeading level='h5'>Heading 5</BpkHeading>
      <BpkHeading level='h6'>Heading 6</BpkHeading>
    </PresentationBlock>
    <BpkHeading id={anchors.paragraphs} level='h2'>Paragraphs</BpkHeading>
    <PresentationBlock>
      <BpkParagraph>
        Rizzle ipsizzle dolizzle ass cool, crazy adipiscing elizzle. Nullam phat velizzle, i'm in the shizzle
        volutpizzle, check out this quizzle, cool vizzle, arcu. Pellentesque sheezy tortor.
      </BpkParagraph>
      <BpkParagraph>
        Owned erizzle. Black izzle dolor dapibizzle turpis tempizzle ghetto. Dope pellentesque nibh et turpis. Sure in
        tortizzle. Pellentesque eleifend rhoncizzle crackalackin. In hac habitasse platea dictumst.
      </BpkParagraph>
      <BpkParagraph>
        Fo shizzle my nizzle dapibizzle. Curabitizzle tellus izzle, pretizzle nizzle, da bomb sheezy, eleifend its fo
        rizzle, check out this. Nizzle suscipizzle. Shizznit semper crackalackin phat boofron.
      </BpkParagraph>
    </PresentationBlock>
    <BpkHeading id={anchors.lists} level='h2'>Lists</BpkHeading>
    <PresentationBlock>
      <BpkList children={['Apples', 'Oranges', 'Pears']} />
      <BpkList children={['First', 'Second', 'First']} ordered />
    </PresentationBlock>
  </section>
)

export default TypographyPage
