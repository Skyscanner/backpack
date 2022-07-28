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

storiesOf('bpk-component-datepicker', module)
  .add('Default', DefaultExample)
  .add('Range', RangeExample)
  .add('Open on first render', OpenOnRender)
  .add('Min date in the past', MinDateInPast)
  .add('Without date set', WithoutDateSet)
  .add('Passing through props to underlying input', PassingProps)
  .add('Depart & Return', DepartReturn)
  .add('Custon calendar component', CustomComponent)
  .add('Invalid', InvalidExample)
  .add('Range with multiple inputs', MultipleRangeInputExample)
  .add('Visual test', DefaultVisualExample)
  .add('Visual test range', VisualRangeExample);
