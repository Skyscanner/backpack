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

import BpkFieldset from '../index';

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
  component: BpkFieldset,
};

export const Input = InputExample;
export const Select = SelectExample;
export const Checkbox = CheckboxExample;
export const Datepicker = DatepickerExample;
export const Textarea = TextareaExample;
export const Autosuggest = AutosuggestExample;
export const RequiredInput = RequiredInputExample;

export const RequiredSelect = RequiredSelectExample;

export const RequiredCheckbox = RequiredCheckboxExample;

export const DisabledInput = DisabledInputExample;

export const DisabledSelect = DisabledSelectExample;

export const DisabledCheckbox = DisabledCheckboxExample;

export const VisualTest = MixedExample;

export const SplitInput = SplitInputExample;

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  },
};


