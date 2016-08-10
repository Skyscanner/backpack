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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam nemo umquam voluptatem appellavit, appellat;
        Occultum facinus esse potuerit, gaudebit; Quaerimus enim finem bonorum. Quo igitur, inquit, modo?
      </BpkParagraph>,
      <BpkParagraph>
        Quodsi ipsam honestatem undique pertectam atque absolutam. Cyrenaici quidem non recusant; Sed ego in hoc
        resisto; Quae duo sunt, unum facit.
      </BpkParagraph>,
      <BpkParagraph>
        Sed nunc, quod agimus; Et quidem, inquit, vehementer errat; Equidem e Cn. Venit ad extremum; Quis non odit
        sordidos, vanos, leves, futtiles? Itaque ab his ordiamur.
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
        <BpkListItem>Third</BpkListItem>
      </BpkList>
    ]
  }
]

const TypographyPage = () => <ComponentPageBuilder
  title='Typography'
  blurb='Headings, paragraphs, links, lists and more.'
  components={components}
  readme={require('raw!bpk-component-heading/readme.md')}
/>

export default TypographyPage
