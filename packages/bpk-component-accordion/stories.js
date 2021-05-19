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
  SingleItemExample,
  SingleItemExampleInitiallyExpanded,
  MultipleItemsOpenExample,
  MultipleItemsOpenInitiallyExpandedExample,
  CustomExample,
  CustomTitleTextStyleExample,
  WithIconsExample,
  WithBoldTitlesExample,
} from './examples';

storiesOf('bpk-component-accordion', module)
  .add('Single item only', SingleItemExample)
  .add(
    'Single item only (second item initially expanded)',
    SingleItemExampleInitiallyExpanded,
  )
  .add('Multiple items open', MultipleItemsOpenExample)
  .add(
    'Multiple items open (second & third items initially expanded)',
    MultipleItemsOpenInitiallyExpandedExample,
  )
  .add('Custom', CustomExample)
  .add('Custom title textStyle', CustomTitleTextStyleExample)
  .add('With icons', WithIconsExample)
  .add('With bold titles', WithBoldTitlesExample)
  .add('Visual test', SingleItemExample);
