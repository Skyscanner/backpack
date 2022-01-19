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

import { storiesOf } from '@storybook/react';

import {
  DefaultExample,
  WithIconsExample,
  CenteredExample,
  DockedLeadingExample,
  DockedTrailingExample,
  WarningExample,
  SuccessExample,
  DestructiveExample,
  LightExample,
  InverseExample,
  OutlineExample,
  MixedExample,
} from './examples';

storiesOf('bpk-component-badge', module)
  .add('Default', DefaultExample)
  .add('With icons', WithIconsExample)
  .add('Centered', CenteredExample)
  .add('Docked right', DockedLeadingExample)
  .add('Docked left', DockedTrailingExample)
  .add('Warning (Default)', WarningExample)
  .add('Success', SuccessExample)
  .add('Destructive', DestructiveExample)
  .add('Light', LightExample)
  .add('Inverse', InverseExample)
  .add('Outline', OutlineExample)
  .add('Visual test', MixedExample);
