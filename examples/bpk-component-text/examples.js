/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { withDefaultProps } from '../../packages/bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

import STYLE from './examples.module.scss';

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyLongform,
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

const WithHeadingTagsExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.subheading} tagName="h1">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.bodyLongform} tagName="h2">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.label1} tagName="h3">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="h3">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.label2} tagName="h4">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.label3} tagName="h4">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.footnote} tagName="h5">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.caption} tagName="h6">
      The quick brown fox jumps over the lazy dog
    </BpkText>
  </div>
);

const ParagraphExample = () => (
  <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
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

const HeadingStylesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.hero4} tagName="h5">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.hero5} tagName="h6">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading1} tagName="h1">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading2} tagName="h4">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading4} tagName="h6">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading5} tagName="h4">
      The quick brown fox jumps over the lazy dog
    </BpkText>
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <WithHeadingTagsExample />
    <ParagraphExample />
    <WithDefaultProps />
  </div>
);

export {
  DefaultExample,
  WithHeadingTagsExample,
  ParagraphExample,
  WithDefaultProps,
  HeadingStylesExample,
  MixedExample,
};
