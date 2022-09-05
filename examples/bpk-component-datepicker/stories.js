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
  DefaultExample,
  RangeExample,
  OpenOnRender,
  MinDateInPast,
  WithoutDateSet,
  PassingProps,
  DepartReturn,
  CustomComponent,
  InvalidExample,
  MultipleRangeInputExample,
  DefaultVisualExample,
  VisualRangeExample,
} from './examples';

export default {
  title: 'bpk-component-datepicker',
};

export const Default = DefaultExample;
export const Range = RangeExample;
export const OpenOnFirstRender = OpenOnRender;

OpenOnFirstRender.storyName = 'Open on first render';

export const MinDateInThePast = MinDateInPast;

MinDateInThePast.storyName = 'Min date in the past';

export const _WithoutDateSet = WithoutDateSet;

_WithoutDateSet.storyName = 'Without date set';

export const PassingThroughPropsToUnderlyingInput = PassingProps;

PassingThroughPropsToUnderlyingInput.storyName = 'Passing through props to underlying input';

export const _DepartReturn = DepartReturn;

_DepartReturn.storyName = 'Depart & Return';

export const CustonCalendarComponent = CustomComponent;

CustonCalendarComponent.storyName = 'Custon calendar component';

export const Invalid = InvalidExample;
export const RangeWithMultipleInputs = MultipleRangeInputExample;

RangeWithMultipleInputs.storyName = 'Range with multiple inputs';

export const VisualTest = DefaultVisualExample;

VisualTest.storyName = 'Visual test';

export const VisualTestRange = VisualRangeExample;

VisualTestRange.storyName = 'Visual test range';
