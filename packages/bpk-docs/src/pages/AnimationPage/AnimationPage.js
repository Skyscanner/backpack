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
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import TOKENS from 'bpk-tokens/tokens/base.common';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const components = [
  {
    id: 'durations',
    title: 'Durations',
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'duration')),
    examples: [],
  },
];

const MotionPage = () => <DocsPageBuilder
  title="Animation"
  blurb={[
    <Paragraph>
      Backpack components make use of animations to add delight to the user experience. Care has been taken to make
      sure that they do not obstruct user flow and that they are performant across devices and browsers.
    </Paragraph>,
  ]}
  components={components}
  showMenu={false}
  sassdocId="animation"
/>;

export default MotionPage;
