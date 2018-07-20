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
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';

import codeReadme from 'bpk-component-code/README.md';

import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';

const blurb = [
  <IntroBlurb>
    The code component can be used to format a piece of text or entire text
    block as code.
  </IntroBlurb>,
];

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <Paragraph>
        We recommend using React from npm with a bundler like webpack. You can
        use the <BpkCode>react</BpkCode> and <BpkCode>react-dom</BpkCode>{' '}
        packages. After installing it using{' '}
        <BpkCode>npm install --save react react-dom</BpkCode>, you can use:
      </Paragraph>,
      <BpkCodeBlock>
        {`import React from 'react';
  import ReactDOM from 'react-dom';

  ReactDOM.render(<App />, ...);`}
      </BpkCodeBlock>,
    ],
  },
];

const CodeSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Code"
    readme={codeReadme}
    components={components}
    {...rest}
  />
);

const CodePage = () => (
  <DocsPageWrapper
    title="Code"
    blurb={blurb}
    webSubpage={<CodeSubPage wrapped />}
  />
);

export default CodePage;
