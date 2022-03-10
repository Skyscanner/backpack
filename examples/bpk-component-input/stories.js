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
  TextExample,
  PlaceholderExample,
  ValidExample,
  InvalidExample,
  DisabledExample,
  ClearableExample,
  EmailInputExample,
  NumberInputExample,
  PasswordInputExample,
  TelephoneInputExample,
  LargeInputExample,
  DockedExample,
  ManuallyDockedExample,
  MixedExample,
} from './examples';

storiesOf('bpk-component-input', module)
  .add('Text value', TextExample)
  .add('Placeholder', PlaceholderExample)
  .add('Valid', ValidExample)
  .add('Invalid', InvalidExample)
  .add('Disabled', DisabledExample)
  .add('Clearable', ClearableExample)
  .add('Email', EmailInputExample)
  .add('Number', NumberInputExample)
  .add('Password', PasswordInputExample)
  .add('Telephone', TelephoneInputExample)
  .add('Large', LargeInputExample)
  .add('Docked', DockedExample)
  .add('Manually docked', ManuallyDockedExample)
  .add('Visual test', MixedExample);
