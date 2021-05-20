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
/* @flow strict */

import { storiesOf } from '@storybook/react';

import {
  DefaultExample,
  OverlayTypeNoneExample,
  WithForegroundContentExample,
  WithBpkImageExample,
  WithBpkImageNoTintExample,
  WithBpkImageLazyLoadedExample,
  TextOverlaidOnImageExample,
  MixedExample,
} from './examples';

storiesOf('bpk-component-overlay', module)
  .add('Default', DefaultExample)
  .add('overlayType="none"', OverlayTypeNoneExample)
  .add('with foreground content', WithForegroundContentExample)
  .add('With BpkImage', WithBpkImageExample)
  .add('With BpkImage and overlayType="none"', WithBpkImageNoTintExample)
  .add('With BpkImage, lazy loaded', WithBpkImageLazyLoadedExample)
  .add(
    'Text overlaid on an image using foreground content',
    TextOverlaidOnImageExample,
  )
  .add('Visual test', MixedExample);
