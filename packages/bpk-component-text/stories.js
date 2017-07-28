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
import { storiesOf } from '@storybook/react';
import { withDefaultProps } from 'bpk-react-utils';

import BpkText from './index';

import STYLE from './stories.scss';

const Paragraph = withDefaultProps(BpkText, { textStyle: 'lg', tagName: 'p', className: STYLE['bpk-my-paragraph'] });

storiesOf('bpk-component-text', module)
  .add('Default', () => (
    <BpkText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
      Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
      non dictum mi ante eu arcu.
    </BpkText>
  ))
  .add('Headings', () => (
    <div>
      <BpkText textStyle="xxl" tagName="h1">
        H1 type xxl
      </BpkText>
      <BpkText textStyle="xl" tagName="h2">
        H2 type xl
      </BpkText>
      <BpkText textStyle="lg" tagName="h3">
        H3 type lg
      </BpkText>
      <BpkText textStyle="base" tagName="h4">
        H4 type base
      </BpkText>
      <BpkText textStyle="sm" tagName="h5">
        H5 type sm
      </BpkText>
      <BpkText textStyle="sm" tagName="h6">
        H6 type sm
      </BpkText>
    </div>
  ))
  .add('Paragraph', () => (
    <BpkText textStyle="base" tagName="p">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
      Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
      non dictum mi ante eu arcu.
    </BpkText>
  ))
  .add('using withDefaultProps', () => (
    <div>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
        Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
        non dictum mi ante eu arcu.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
        Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
        non dictum mi ante eu arcu.
      </Paragraph>
    </div>
  ))
  .add('bold', () => (
    <div>
      <BpkText>
        The man jumped over the shark tank. Tha was very <BpkText bold>bold</BpkText> indeed.
      </BpkText>
    </div>
  ));
