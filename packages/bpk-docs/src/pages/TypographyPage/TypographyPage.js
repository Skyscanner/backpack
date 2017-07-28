/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';
import BpkBlockquote from 'bpk-component-blockquote';
import { BpkList, BpkListItem } from 'bpk-component-list';
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';
import BpkLink, { BpkButtonLink } from 'bpk-component-link';
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table';
import BpkText from 'bpk-component-text';

import textReadme from 'bpk-component-text/readme.md';
import linkReadme from 'bpk-component-link/readme.md';
import listReadme from 'bpk-component-list/readme.md';
import tableReadme from 'bpk-component-table/readme.md';
import blockquoteReadme from 'bpk-component-blockquote/readme.md';
import codeReadme from 'bpk-component-code/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';


const components = [
  {
    id: 'text',
    title: 'Text',
    blurb: [
      <Paragraph>
        The Text component enables you to use the six backpack defined text styles in combination with any of the
        heading tags, a span or a paragraph. You can mix different text styles with the
        appropriate tag to achieve semantic markup while retaining control over how the text looks.
      </Paragraph>,
      <Paragraph>
        Note: Whilst <BpkCode>BpkText</BpkCode> allows for any combination of text size and heading levels,
        we recommend that visual hierarchy is maintained inline with the semantic structure.
      </Paragraph>,
    ],
    examples: [
      <BpkText textStyle="base" tagName="p">Base paragraph</BpkText>,
      <BpkText textStyle="xxl" tagName="h1">xxl Heading(h1)</BpkText>,
      <BpkText textStyle="lg" tagName="h1">lg Heading(h1)</BpkText>,
      <BpkText textStyle="lg" tagName="h2">lg Heading(h2)</BpkText>,
    ],
    readme: textReadme,
  },
  {
    id: 'links',
    title: 'Links',
    examples: [
      <div>
        Links can be both <BpkLink href="#">anchor tags</BpkLink> as well
        as <BpkButtonLink onClick={() => null}>button tags</BpkButtonLink>.
      </div>,
    ],
    readme: linkReadme,
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
      </BpkList>,
    ],
    readme: listReadme,
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
      </BpkTable>,
    ],
    readme: tableReadme,
  },
  {
    id: 'blockquotes',
    title: 'Blockquotes',
    examples: [
      <BpkBlockquote>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkBlockquote>,
    ],
    readme: blockquoteReadme,
  },
  {
    id: 'code',
    title: 'Code',
    examples: [
      <Paragraph>
        We recommend using React from npm with a bundler like webpack. You can use
        the <BpkCode>react</BpkCode> and <BpkCode>react-dom</BpkCode> packages. After installing it
        using <BpkCode>npm install --save react react-dom</BpkCode>, you can use:
      </Paragraph>,
      <BpkCodeBlock>{`import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, ...);`}
      </BpkCodeBlock>,
    ],
    readme: codeReadme,
  },
];

const TypographyPage = () => <DocsPageBuilder
  title="Typography"
  blurb={[
    <Paragraph>
      Backpack has a number of components to help with typography including headings, paragraphs, links, lists and
      more.
    </Paragraph>,
  ]}
  components={components}
  sassdocId="typography"
/>;

export default TypographyPage;
