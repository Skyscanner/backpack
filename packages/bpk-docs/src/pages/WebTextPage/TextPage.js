/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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
import textReadme from 'bpk-component-text/README.md';

import DocsPageBuilder from '../../components/DocsPageBuilder';

const TEXT = 'Lorem ipsum';

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <div>
        <BpkText textStyle="xxl" tagName="p">
          {TEXT}
        </BpkText>
        <BpkText textStyle="xl" tagName="p">
          {TEXT}
        </BpkText>
        <BpkText textStyle="lg" tagName="p">
          {TEXT}
        </BpkText>
        <BpkText textStyle="base" tagName="p">
          {TEXT}
        </BpkText>
        <BpkText textStyle="sm" tagName="p">
          {TEXT}
        </BpkText>
      </div>,
    ],
  },
];

const TextPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Text"
    readme={textReadme}
    components={components}
    {...rest}
  />
);

export default TextPage;
