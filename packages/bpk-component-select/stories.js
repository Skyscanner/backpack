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
  Example,
  Invalid,
  InvalidWithImage,
  Disabled,
  Large,
  Docked,
  DockedWithImages,
  ManuallyDocked,
  ManuallyDockedWithImages,
  WithImage,
  WithImageLarge,
  MixedExample,
} from './examples';

storiesOf('bpk-component-select', module)
  .add('Example', Example)
  .add('Invalid', Invalid)
  .add('Invalid with image', InvalidWithImage)
  .add('Disabled', Disabled)
  .add('Large', Large)
  .add('Docked', Docked)
  .add('Docked with images', DockedWithImages)
  .add('Manually docked', ManuallyDocked)
  .add('Manually docked with images', ManuallyDockedWithImages)
  .add('With Image', WithImage)
  .add('With Image Large', WithImageLarge)
  .add('Visual test', MixedExample);
