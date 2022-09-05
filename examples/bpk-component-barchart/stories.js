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

/* @flow strict */

import {
  AxesAndGridlines,
  DefaultExample,
  CustomScrollColors,
  DefaultDisabledDataTable,
  Interactive,
  Outliers,
  CustomTicks,
  CustomTickLabels,
  GridlinesExample,
  CustomYAxisDomain,
} from './examples';

export default {
  title: 'bpk-component-barchart',
};

export const _AxesAndGridlines = AxesAndGridlines;

_AxesAndGridlines.storyName = 'Axes and Gridlines';

export const Default = DefaultExample;
export const UsingCustomScrollColours = CustomScrollColors;

UsingCustomScrollColours.storyName = 'Using custom scroll colours';

export const _DefaultDisabledDataTable = DefaultDisabledDataTable;

_DefaultDisabledDataTable.storyName = 'Default disabled data table';

export const _Interactive = Interactive;
export const _Outliers = Outliers;
export const _CustomTicks = CustomTicks;

_CustomTicks.storyName = 'Custom ticks';

export const _CustomTickLabels = CustomTickLabels;

_CustomTickLabels.storyName = 'Custom tick labels';

export const GridLines = GridlinesExample;

GridLines.storyName = 'Grid lines';

export const _CustomYAxisDomain = CustomYAxisDomain;

_CustomYAxisDomain.storyName = 'Custom yAxisDomain';

export const VisualTest = DefaultExample;

VisualTest.storyName = 'Visual test';
