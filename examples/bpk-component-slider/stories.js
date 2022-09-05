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

import {
  SimpleSlider,
  SimpleLargeSlider,
  TimeSlider,
  SimpleSliderWithSteps,
  RangeSlider,
  RangeSliderWithMinimumDistance,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-slider',
};

export const _SimpleSlider = SimpleSlider;

_SimpleSlider.storyName = 'Simple slider';

export const _SimpleLargeSlider = SimpleLargeSlider;

_SimpleLargeSlider.storyName = 'Simple large slider';

export const _TimeSlider = TimeSlider;

_TimeSlider.storyName = 'Time slider';

export const _SimpleSliderWithSteps = SimpleSliderWithSteps;

_SimpleSliderWithSteps.storyName = 'Simple slider with steps';

export const _RangeSlider = RangeSlider;

_RangeSlider.storyName = 'Range slider';

export const _RangeSliderWithMinimumDistance = RangeSliderWithMinimumDistance;

_RangeSliderWithMinimumDistance.storyName = 'Range slider with minimum distance';

export const VisualTest = MixedExample;

VisualTest.storyName = 'Visual test';
