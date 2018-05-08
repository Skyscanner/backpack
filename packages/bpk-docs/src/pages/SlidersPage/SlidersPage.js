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
import BpkSlider from 'bpk-component-slider';
import sliderReadme from 'bpk-component-slider/readme.md';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import Paragraph from './../../components/Paragraph';

const EnhancedSlider = updateOnDirectionChange(BpkSlider);
const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [<Paragraph>This is the default slider.</Paragraph>],
    examples: [<EnhancedSlider min={0} max={100} value={0} />],
  },
  {
    id: 'large',
    title: 'Large',
    blurb: [
      <Paragraph>This is a bigger version of the default slider.</Paragraph>,
    ],
    examples: [<EnhancedSlider min={0} max={100} value={0} large />],
  },
  {
    id: 'range',
    title: 'Range',
    blurb: [<Paragraph>There can be a range of values.</Paragraph>],
    examples: [
      <EnhancedSlider min={0} max={100} value={[20, 80]} minDistance={0} />,
    ],
  },
  {
    id: 'stepped',
    title: 'Stepped',
    blurb: [<Paragraph>You can set steps.</Paragraph>],
    examples: [
      <EnhancedSlider
        min={0}
        max={100}
        value={[20, 80]}
        minDistance={0}
        step={10}
      />,
    ],
  },
  {
    id: 'minDistance',
    title: 'Minimum Distance',
    blurb: [
      <Paragraph>
        You can set a minimum distance between the handlers.
      </Paragraph>,
    ],
    examples: [
      <EnhancedSlider min={0} max={100} value={[20, 80]} minDistance={15} />,
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    Sliders allow users to input a numeric value from a given range.
  </Paragraph>,
];

const SlidersPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Sliders"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={sliderReadme}
    {...rest}
  />
);

const NeoSliderPage = () => (
  <DocsPageWrapper
    title="Slider"
    blurb={blurb}
    webSubpage={<SlidersPage wrapped />}
  />
);

export default (isNeo ? NeoSliderPage : SlidersPage);
