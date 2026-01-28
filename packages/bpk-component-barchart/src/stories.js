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


import BpkBarchart from './BpkBarchart';
import {
  AxesAndGridlinesExample,
  DefaultExample,
  CustomScrollColorsExample,
  DefaultDisabledDataTableExample,
  InteractiveExample,
  OutliersExample,
  CustomTicksExample,
  CustomTickLabelsExample,
  GridlinesExample,
  CustomYAxisDomainExample,
} from './examples';

export default {
  title: 'bpk-component-barchart',
  component: BpkBarchart,
};

export const AxesAndGridlines = AxesAndGridlinesExample;

export const Default = DefaultExample;
export const UsingCustomScrollColours = CustomScrollColorsExample;

export const DefaultDisabledDataTable = DefaultDisabledDataTableExample;

export const Interactive = InteractiveExample;
export const Outliers = OutliersExample;
export const CustomTicks = CustomTicksExample;

export const CustomTickLabels = CustomTickLabelsExample;

export const GridLines = GridlinesExample;

export const CustomYAxisDomain = CustomYAxisDomainExample;

export const VisualTest = DefaultExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};