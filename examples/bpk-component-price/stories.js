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

import { storiesOf } from '@storybook/react';

import {
  SmallLeftExample,
  SmallLeftWithDescriptionExample,
  SmallLeftWithSubtitleDescriptionExample,
  SmallRightExample,
  SmallRightWithDescriptionExample,
  SmallRightWithSubtitleDescriptionExample,
  LargeLeftExample,
  LargeLeftWithDescriptionExample,
  LargeLeftWithSubtitleDescriptionExample,
  LargeLeftLongPriceExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-price',
};

export const SmallLeftDefault = SmallLeftExample;

SmallLeftDefault.storyName = 'Small left - default';

export const SmallLeftWithDescription = SmallLeftWithDescriptionExample;

SmallLeftWithDescription.storyName = 'Small left with description';

export const SmallLeftWithSubtitleAndDescription =
  SmallLeftWithSubtitleDescriptionExample;

SmallLeftWithSubtitleAndDescription.storyName = 'Small left with subtitle and description';

export const SmallRight = SmallRightExample;

SmallRight.storyName = 'Small right';

export const SmallRightWithDescription = SmallRightWithDescriptionExample;

SmallRightWithDescription.storyName = 'Small right with description';

export const SmallRightWithSubtitleAndDescription =
  SmallRightWithSubtitleDescriptionExample;

SmallRightWithSubtitleAndDescription.storyName = 'Small right with subtitle and description';

export const LargeLeftDefault = LargeLeftExample;

LargeLeftDefault.storyName = 'Large left - default';

export const LargeLeftWithDescription = LargeLeftWithDescriptionExample;

LargeLeftWithDescription.storyName = 'Large left with description';

export const LargeLeftWithSubtitleAndDescription =
  LargeLeftWithSubtitleDescriptionExample;

LargeLeftWithSubtitleAndDescription.storyName = 'Large left with subtitle and description';

export const LargeLeftWithLongPrice = LargeLeftLongPriceExample;

LargeLeftWithLongPrice.storyName = 'Large left with long price';

export const VisualTest = MixedExample;

VisualTest.storyName = 'Visual test';
