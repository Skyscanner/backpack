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


import { ArgTypes,Title, Markdown } from '@storybook/addon-docs/blocks';

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
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            {`
              **Note**: minDistance and step props are multiplied to calculate the minimum distance allowed between thumbs

            **Note**: The aria props are the values that will be passed to the thumb of the slider. If your slider is for times for instance you would likely pass something like the following to ensure the value of the thumb is read out in a formatted state rather than just the value of where the thumb is on the track. If no \`ariaValuetext\` is passed to the component the screen reader will read just the value of the thumb

            ariaLabels={['From', 'To']}
    ariaValuetext={[getSliderTime(finalSliderStart), getSliderTime(finalSliderEnd)]}

          `}


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
