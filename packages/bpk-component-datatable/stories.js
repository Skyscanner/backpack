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
  AutowidthExample,
  NonHoverRows,
  FixedWidth,
  DisabledSort,
  CustomRowAndHeaderHeights,
} from './examples';

storiesOf('bpk-component-datatable', module)
  .add('Autowidth Example', AutowidthExample)
  .add('Rows not hoverable', NonHoverRows)
  .add('Fixed Width Example', FixedWidth)
  .add('Disabled Sort Example', DisabledSort)
  .add('Custom row and header heights', CustomRowAndHeaderHeights)
  .add('Visual test', AutowidthExample);
