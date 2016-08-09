import React from 'react'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import ComponentPageBuilder from './../../components/ComponentPageBuilder'

const components = [
  {
    id: 'headings',
    title: 'Headings',
    examples: [
      <BpkHeading level='h1'>Heading 1</BpkHeading>,
      <BpkHeading level='h2'>Heading 2</BpkHeading>,
      <BpkHeading level='h3'>Heading 3</BpkHeading>,
      <BpkHeading level='h4'>Heading 4</BpkHeading>,
      <BpkHeading level='h5'>Heading 5</BpkHeading>,
      <BpkHeading level='h6'>Heading 6</BpkHeading>
    ]
  },
  {
    id: 'paragraphs',
    title: 'Paragaphs',
    examples: [
      <BpkParagraph>
        Rizzle ipsizzle dolizzle ass cool, crazy adipiscing elizzle. Nullam phat velizzle, i'm in the shizzle
        volutpizzle, check out this quizzle, cool vizzle, arcu. Pellentesque sheezy tortor.
      </BpkParagraph>,
      <BpkParagraph>
        Owned erizzle. Black izzle dolor dapibizzle turpis tempizzle ghetto. Dope pellentesque nibh et turpis.
        Sure intortizzle. Pellentesque eleifend rhoncizzle crackalackin. In hac habitasse platea dictumst.
      </BpkParagraph>,
      <BpkParagraph>
        Fo shizzle my nizzle dapibizzle. Curabitizzle tellus izzle, pretizzle nizzle, da bomb sheezy, eleifend its
        fo rizzle, check out this. Nizzle suscipizzle. Shizznit semper crackalackin phat boofron.
      </BpkParagraph>
    ]
  },
  {
    id: 'links',
    title: 'Links',
    examples: [
      <BpkLink href='#'>Link 1</BpkLink>,
      ' ',
      <BpkLink href='#'>Link 2</BpkLink>,
      ' ',
      <BpkLink href='#'>Link 3</BpkLink>
    ]
  },
  {
    id: 'lists',
    title: 'Lists',
    examples: [
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
      </BpkList>,
      <BpkList ordered>
        <BpkListItem>First</BpkListItem>
        <BpkListItem>Second</BpkListItem>
        <BpkListItem>First</BpkListItem>
      </BpkList>
    ]
  }
]

const TypographyPage = () => <ComponentPageBuilder
  title='Typography'
  blurb='Headings, paragraphs, links, lists and more.'
  components={components}
  usage='Matt to write'
/>

export default TypographyPage
