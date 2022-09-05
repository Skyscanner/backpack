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
  AutowidthExample,
  NonHoverRows,
  FixedWidth,
  DisabledSort,
  CustomRowAndHeaderHeights,
  HeaderRendererExample,
  CustomSortingExample,
} from './examples';

export default {
  title: 'bpk-component-datatable',
};

export const _AutowidthExample = AutowidthExample;
export const RowsNotHoverable = NonHoverRows;

RowsNotHoverable.storyName = 'Rows not hoverable';

export const FixedWidthExample = FixedWidth;
export const DisabledSortExample = DisabledSort;
export const _CustomRowAndHeaderHeights = CustomRowAndHeaderHeights;

_CustomRowAndHeaderHeights.storyName = 'Custom row and header heights';

export const _CustomSortingExample = CustomSortingExample;

_CustomSortingExample.storyName = 'Custom sorting Example';

export const CustomHeaderDataExample = HeaderRendererExample;

CustomHeaderDataExample.storyName = 'Custom header data Example';

export const VisualTest = AutowidthExample;

VisualTest.storyName = 'Visual test';
