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

import { ArgsTable } from '@storybook/addon-docs';
import { Title, Markdown, PRIMARY_STORY } from '@storybook/blocks';

import BpkSlider from '../../packages/bpk-component-slider/src/BpkSlider';

import {
  SimpleSliderExample,
  TimeSliderExample,
  SimpleSliderWithStepsExample,
  RangeSliderExample,
  RangeSliderWithMinimumDistanceExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-slider',
  component: BpkSlider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgsTable of={PRIMARY_STORY} />
          <Markdown>
            {
              `[Please refer to react-slider's documentation for a full list of props](https://zillow.github.io/react-slider/).
              **Note:** When you're representing non-integer values (eg time, dates) please ensure you use \`ariaLabel\` and \`ariaValuetext\` to ensure that assistive technologies will be able to understand the value better.
              `
            }
          </Markdown>
        </>
      )
    },
  },
};

export const SimpleSlider = SimpleSliderExample;

export const TimeSlider = TimeSliderExample;

export const SimpleSliderWithSteps = SimpleSliderWithStepsExample;

export const RangeSlider = RangeSliderExample;

export const RangeSliderWithMinimumDistance =
  RangeSliderWithMinimumDistanceExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
