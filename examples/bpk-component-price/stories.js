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

storiesOf('bpk-component-price', module)
  .add('Small left - default', SmallLeftExample)
  .add('Small left with description', SmallLeftWithDescriptionExample)
  .add(
    'Small left with subtitle and description',
    SmallLeftWithSubtitleDescriptionExample,
  )
  .add('Small right', SmallRightExample)
  .add('Small right with description', SmallRightWithDescriptionExample)
  .add(
    'Small right with subtitle and description',
    SmallRightWithSubtitleDescriptionExample,
  )
  .add('Large left - default', LargeLeftExample)
  .add('Large left with description', LargeLeftWithDescriptionExample)
  .add(
    'Large left with subtitle and description',
    LargeLeftWithSubtitleDescriptionExample,
  )
  .add('Large left with long price', LargeLeftLongPriceExample)
  .add('Visual test', MixedExample);
