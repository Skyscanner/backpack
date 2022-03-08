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
  SmallIconsExample,
  LargeIconsExample,
  AlignToBaseTextExample,
  AlignToLargeTextExample,
  AlignSmallTextToIconExample,
  AlignTextToIconExample,
  AlignToButtonExample,
  AlignToLargeButtonExample,
  AlignToLargeButtonRTLExample,
  MixedExample,
} from './examples';

storiesOf('bpk-component-icon', module)
  .add('Small icons', SmallIconsExample)
  .add('Large icons', LargeIconsExample)
  .add('Align to text base', AlignToBaseTextExample)
  .add('Align to large text', AlignToLargeTextExample)
  .add('Align small text to icon', AlignSmallTextToIconExample)
  .add('Align text to icon', AlignTextToIconExample)
  .add('Align to button', AlignToButtonExample)
  .add('Align to large button', AlignToLargeButtonExample)
  .add('Align to large button (RTL support)', AlignToLargeButtonRTLExample)
  .add('Visual test', MixedExample);
