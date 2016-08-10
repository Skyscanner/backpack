import React from 'react'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import BpkBlockquote from 'bpk-component-blockquote'
import { BpkList, BpkListItem } from 'bpk-component-list'
import { BpkCode, BpkCodeBlock } from 'bpk-component-code'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

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
    ],
    readme: require('raw!bpk-component-heading/readme.md')
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
    ],
    readme: require('raw!bpk-component-paragraph/readme.md')
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
    ],
    readme: require('raw!bpk-component-link/readme.md')
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
    ],
    readme: require('raw!bpk-component-list/readme.md')
  },
  {
    id: 'tables',
    title: 'Tables',
    examples: [
      <BpkTable>
        <BpkTableHead>
          <BpkTableRow>
            <BpkTableHeadCell>Heading 1</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 2</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 3</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 4</BpkTableHeadCell>
          </BpkTableRow>
        </BpkTableHead>
        <BpkTableBody>
          <BpkTableRow>
            <BpkTableCell>Row 1, Data 1</BpkTableCell>
            <BpkTableCell>Row 1, Data 2</BpkTableCell>
            <BpkTableCell>Row 1, Data 3</BpkTableCell>
            <BpkTableCell>Row 1, Data 4</BpkTableCell>
          </BpkTableRow>
          <BpkTableRow>
            <BpkTableCell>Row 2, Data 1</BpkTableCell>
            <BpkTableCell>Row 2, Data 2</BpkTableCell>
            <BpkTableCell>Row 2, Data 3</BpkTableCell>
            <BpkTableCell>Row 2, Data 4</BpkTableCell>
          </BpkTableRow>
        </BpkTableBody>
      </BpkTable>
    ],
    readme: require('raw!bpk-component-table/readme.md')
  },
  {
    id: 'blockquotes',
    title: 'Blockquotes',
    examples: [
      <BpkBlockquote>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam nemo umquam voluptatem appellavit, appellat;
        Occultum facinus esse potuerit, gaudebit; Quaerimus enim finem bonorum. Quo igitur, inquit, modo?
      </BpkBlockquote>
    ],
    readme: require('raw!bpk-component-blockquote/readme.md')
  },
  {
    id: 'code',
    title: 'Code',
    examples: [
      <BpkParagraph>
        We recommend using React from npm with a bundler like webpack. You can use
        the <BpkCode>react</BpkCode> and <BpkCode>react-dom</BpkCode> packages. After installing it
        using <BpkCode>npm install --save react react-dom</BpkCode>, you can use:
      </BpkParagraph>,
      <BpkCodeBlock>{`import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, ...);`}
      </BpkCodeBlock>
    ],
    readme: require('raw!bpk-component-code/readme.md')
  }
]

const TypographyPage = () => <ComponentPageBuilder
  title='Typography'
  blurb='Headings, paragraphs, links, lists and more.'
  components={components}
  sassdocId='typography'
/>

export default TypographyPage
