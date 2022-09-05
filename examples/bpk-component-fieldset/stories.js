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
  InputExample,
  SelectExample,
  CheckboxExample,
  DatepickerExample,
  TextareaExample,
  AutosuggestExample,
  RequiredInputExample,
  RequiredSelectExample,
  RequiredCheckboxExample,
  DisabledInputExample,
  DisabledSelectExample,
  DisabledCheckboxExample,
  MixedExample,
  SplitInputExample,
} from './examples';

export default {
  title: 'bpk-component-fieldset',
};

export const Input = InputExample;
export const Select = SelectExample;
export const Checkbox = CheckboxExample;
export const Datepicker = DatepickerExample;
export const Textarea = TextareaExample;
export const Autosuggest = AutosuggestExample;
export const RequiredInput = RequiredInputExample;

RequiredInput.storyName = 'Required input';

export const RequiredSelect = RequiredSelectExample;

RequiredSelect.storyName = 'Required select';

export const RequiredCheckbox = RequiredCheckboxExample;

RequiredCheckbox.storyName = 'Required checkbox';

export const DisabledInput = DisabledInputExample;

DisabledInput.storyName = 'Disabled input';

export const DisabledSelect = DisabledSelectExample;

DisabledSelect.storyName = 'Disabled select';

export const DisabledCheckbox = DisabledCheckboxExample;

DisabledCheckbox.storyName = 'Disabled checkbox';

export const VisualTest = MixedExample;

VisualTest.storyName = 'Visual test';

export const SplitInput = SplitInputExample;
