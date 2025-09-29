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

import BpkFieldset from '../../packages/bpk-component-fieldset/src/BpkFieldset';

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

import type { Meta } from '@storybook/react';

const meta: Meta<typeof BpkFieldset> = {
  title: 'bpk-component-fieldset',
  component: BpkFieldset,
  parameters: {
    docs: {
      description: {
        component: 'BpkFieldset wraps form elements with proper labeling, validation, and accessibility features.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'The form element to wrap (BpkInput, BpkSelect, BpkCheckbox, etc.)',
      control: false,
    },
    label: {
      description: 'The label text for the field. Required when isCheckbox is false.',
      control: 'text',
    },
    disabled: {
      description: 'Whether the field is disabled',
      control: 'boolean',
    },
    valid: {
      description: 'Validation state - true for valid, false for invalid, null/undefined for neutral',
      control: { type: 'select', options: [null, true, false] },
    },
    required: {
      description: 'Whether the field is required',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS class names',
      control: 'text',
    },
    validationMessage: {
      description: 'Validation message to display when field is invalid',
      control: 'text',
    },
    isCheckbox: {
      description: 'Whether the child element is a checkbox (affects label placement)',
      control: 'boolean',
    },
    validationProps: {
      description: 'Additional props passed to the validation component',
      control: 'object',
    },
    description: {
      description: 'Additional descriptive text displayed below the field',
      control: 'text',
    },
  },
};

export default meta;

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
  }
};
