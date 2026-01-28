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

import BpkDatepicker from '../index';

import {
  DefaultExample,
  RangeExample,
  OpenOnFirstRenderExample,
  MinDateInPastExample,
  WithoutDateSetExample,
  PassingPropsExample,
  DepartReturnExample,
  CustomComponentExample,
  InvalidExample,
  MultipleRangeInputExample,
  DefaultVisualExample,
  VisualRangeExample,
} from './examples';

export default {
  title: 'bpk-component-datepicker',
  component: BpkDatepicker,
};

export const Default = DefaultExample;
export const Range = RangeExample;
export const OpenOnFirstRender = OpenOnFirstRenderExample;

export const MinDateInThePast = MinDateInPastExample;

export const WithoutDateSet = WithoutDateSetExample;

export const PassingThroughPropsToUnderlyingInput = PassingPropsExample;

export const DepartReturn = DepartReturnExample;

export const CustonCalendarComponent = CustomComponentExample;

export const Invalid = InvalidExample;
export const RangeWithMultipleInputs = MultipleRangeInputExample;

export const VisualTest = DefaultVisualExample;

export const VisualTestRange = VisualRangeExample;

export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};

export const VisualTestRangeWithZoom = VisualTestRange.bind({});
VisualTestRangeWithZoom.args = {
  zoomEnabled: true
};