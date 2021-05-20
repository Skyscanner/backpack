/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { withDefaultProps } from 'bpk-react-utils';

import STYLE from './examples.module.scss';

import BpkText, { WEIGHT_STYLES } from './index';

const Paragraph = withDefaultProps(BpkText, {
  textStyle: 'lg',
  tagName: 'p',
  className: STYLE['bpk-my-paragraph'],
});

const DefaultExample = () => (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
    imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
    consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
    mi ante eu arcu.
  </BpkText>
);

const HeadingsExample = () => (
  <div>
    <BpkText textStyle="xxl" tagName="h1">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle="xl" tagName="h2">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle="lg" tagName="h3">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle="base" tagName="h4">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle="sm" tagName="h5">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle="xs" tagName="h6">
      The quick brown fox jumps over the lazy dog
    </BpkText>
  </div>
);

const ParagraphExample = () => (
  <BpkText textStyle="base" tagName="p">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
    imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
    consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
    mi ante eu arcu.
  </BpkText>
);

const WithDefaultProps = () => (
  <div>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </Paragraph>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </Paragraph>
  </div>
);

const BoldExample = () => (
  <BpkText tagName="p">
    The man jumped over the shark tank. That was very{' '}
    <BpkText weight={WEIGHT_STYLES.bold}>bold</BpkText> indeed.
  </BpkText>
);

const WithWeightsExample = () => (
  <div>
    <BpkText tagName="p">
      The man jumped over the shark tank. That was very brave indeed.
    </BpkText>
    <BpkText tagName="p">
      The man jumped over the shark tank. That was very{' '}
      <BpkText weight={WEIGHT_STYLES.bold}>bold</BpkText> indeed.
    </BpkText>
    <BpkText tagName="p">
      The man jumped over the shark tank. That was a{' '}
      <BpkText weight={WEIGHT_STYLES.black} textStyle="xl">
        heavy
      </BpkText>{' '}
      shark.
    </BpkText>
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <HeadingsExample />
    <ParagraphExample />
    <WithDefaultProps />
    <BoldExample />
    <WithWeightsExample />
  </div>
);

export {
  DefaultExample,
  HeadingsExample,
  ParagraphExample,
  WithDefaultProps,
  BoldExample,
  WithWeightsExample,
  MixedExample,
};
