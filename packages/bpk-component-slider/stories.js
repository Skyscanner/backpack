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

import { storiesOf } from '@storybook/react';

import {
  SimpleSlider,
  SimpleLargeSlider,
  TimeSlider,
  SimpleSliderWithSteps,
  RangeSlider,
  RangeSliderWithMinimumDistance,
} from './examples';

storiesOf('bpk-component-slider', module)
  .add('Simple slider', SimpleSlider)
  .add('Simple large slider', SimpleLargeSlider)
  .add('Time slider', TimeSlider)
  .add('Simple slider with steps', SimpleSliderWithSteps)
  .add('Range slider', RangeSlider)
  .add('Range slider with minimum distance', RangeSliderWithMinimumDistance);
