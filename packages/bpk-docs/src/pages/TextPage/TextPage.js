/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import BpkText from 'bpk-component-text';
import BpkBlockquote from 'bpk-component-blockquote';

import textReadme from 'bpk-component-text/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import PresentationBlock from './../../components/PresentationBlock';
import Code from '../../components/Code';

const blurb = [
  <Paragraph>
    The text component enables you to use the five Backpack defined text styles
    in combination with any of the heading tags, a span or a paragraph. You can
    mix different text styles with the appropriate tag to achieve semantic
    markup while retaining control over how the text looks.
  </Paragraph>,
  <BpkBlockquote extraSpace>
    <BpkText bold>Note:</BpkText> Whilst <Code>BpkText</Code> allows for any
    combination of text size and heading levels, we recommend that visual
    hierarchy is maintained inline with the semantic structure.
  </BpkBlockquote>,
  <PresentationBlock>
    <BpkText textStyle="xxl" tagName="p">
      Flights to Edinburgh
    </BpkText>
    <BpkText textStyle="xl" tagName="p">
      Flights to Edinburgh
    </BpkText>
    <BpkText textStyle="lg" tagName="p">
      Flights to Edinburgh
    </BpkText>
    <BpkText textStyle="base" tagName="p">
      Flights to Edinburgh
    </BpkText>
    <BpkText textStyle="sm" tagName="p">
      Flights to Edinburgh
    </BpkText>
  </PresentationBlock>,
];

const TextPage = () => (
  <DocsPageBuilder
    title="Text"
    showMenu={false}
    readme={textReadme}
    blurb={blurb}
  />
);

export default TextPage;
