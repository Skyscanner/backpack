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
import progressReadme from 'bpk-component-progress/readme.md';

import ProgressContainer from './ProgressContainer';
import SteppedProgressContainer from './SteppedProgressContainer';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        This is the default progress bar which animates in and automatically hides when complete.
      </Paragraph>,
    ],
    examples: [
      <ProgressContainer />,
    ],
  },
  {
    id: 'small',
    title: 'Small',
    blurb: [
      <Paragraph>
        This is very similar to the default progress bar, but is a little thinner to fit nicely inline,
        e.g. at the top of a page.
      </Paragraph>,
    ],
    examples: [
      <ProgressContainer small />,
    ],
  },
  {
    id: 'stepped',
    title: 'Stepped',
    blurb: [
      <Paragraph>
        This option allows you to specify how many steps there are in a given task. These are great to guide users
        through longer processes such as completing a form.
      </Paragraph>,
    ],
    examples: [
      <SteppedProgressContainer />,
    ],
  },
];


const PopoversPage = () => <DocsPageBuilder
  title="Progress bars"
  blurb={[
    <Paragraph>
      Progress bars are a great way of providing feedback when a tasking is running. Unlike spinners,
      they give the user a clear idea of how long the given task will take.
    </Paragraph>,
  ]}
  components={components}
  readme={progressReadme}
/>;

export default PopoversPage;
