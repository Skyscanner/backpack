import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import PresentationBlock from './../../components/PresentationBlock'

const anchors = {
  headings: 'typography-page-headings',
  paragraphs: 'typography-page-paragraphs',
  links: 'typography-page-links',
  lists: 'typography-page-lists'
}

const TypographyPage = () => (
  <section>
    <Helmet title='Typography' />
    <BpkHeading level='h1'>Typography</BpkHeading>
    <BpkParagraph>Headings, paragraphs, links, lists and more.</BpkParagraph>
    <BpkHeading level='h2'>Contents</BpkHeading>
    <BpkList>
      <BpkListItem>
        <BpkLink href={`#${anchors.headings}`}>Headings</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.paragraphs}`}>Paragaphs</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.links}`}>Links</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.lists}`}>Lists</BpkLink>
      </BpkListItem>
    </BpkList>
    <BpkHeading id={anchors.headings} level='h2'>Headings</BpkHeading>
    <PresentationBlock sassdocId='typography-mixin-bpk-heading-1'>
      <BpkHeading level='h1'>Heading 1</BpkHeading>
      <BpkHeading level='h2'>Heading 2</BpkHeading>
      <BpkHeading level='h3'>Heading 3</BpkHeading>
      <BpkHeading level='h4'>Heading 4</BpkHeading>
      <BpkHeading level='h5'>Heading 5</BpkHeading>
      <BpkHeading level='h6'>Heading 6</BpkHeading>
    </PresentationBlock>
    <BpkHeading id={anchors.paragraphs} level='h2'>Paragraphs</BpkHeading>
    <PresentationBlock sassdocId='typography-mixin-bpk-paragraph'>
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
    <BpkHeading id={anchors.links} level='h2'>Links</BpkHeading>
    <PresentationBlock sassdocId='typography-mixin-bpk-link'>
      <BpkLink href='#'>Link 1</BpkLink>{'\n'}
      <BpkLink href='#'>Link 2</BpkLink>{'\n'}
      <BpkLink href='#'>Link 3</BpkLink>
    </PresentationBlock>
    <BpkHeading id={anchors.lists} level='h2'>Lists</BpkHeading>
    <PresentationBlock sassdocId='typography-mixin-bpk-list'>
      <BpkList>
        <BpkListItem>Apples</BpkListItem>
        <BpkListItem>Oranges
          <BpkList>
            <BpkListItem>Tangerines</BpkListItem>
            <BpkListItem>Mandarins</BpkListItem>
            <BpkListItem>Satsumas</BpkListItem>
          </BpkList>
        </BpkListItem>
        <BpkListItem>Pears</BpkListItem>
      </BpkList>
      <BpkList ordered>
        <BpkListItem>First</BpkListItem>
        <BpkListItem>Second</BpkListItem>
        <BpkListItem>First</BpkListItem>
      </BpkList>
    </PresentationBlock>
  </section>
)

export default TypographyPage
