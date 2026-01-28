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


import BpkInputGroup from '../../packages/bpk-component-input/src/BpkInputV2/BpkInputGroup';
import BpkInputV2Raw from '../../packages/bpk-component-input/src/BpkInputV2/BpkInputV2';

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
  InputGroupWithStartElement,
  InputGroupWithEndElement,
  InputGroupWithBothElements,
  InputGroupRTLExample,
} from './examples';

import type { Meta } from '@storybook/react';

export default {
  component: BpkInputV2Raw,
  title: 'bpk-component-input-v2',
  subcomponents: {
    BpkInputGroup,
  },
} as Meta<typeof BpkInputV2Raw>;

// BpkInputV2 Stories
export const TextValue = TextExample;
export const Placeholder = PlaceholderExample;
export const Valid = ValidExample;
export const Invalid = InvalidExample;
export const Disabled = DisabledExample;
export const Clearable = ClearableExample;
export const Email = EmailInputExample;
export const Number = NumberInputExample;
export const Password = PasswordInputExample;
export const Telephone = TelephoneInputExample;
export const Large = LargeInputExample;
export const Docked = DockedExample;
export const ManuallyDocked = ManuallyDockedExample;

// BpkInputGroup Stories
export const InputGroupStartElement = {
  render: InputGroupWithStartElement,
  name: 'InputGroup with start element (currency)',
};

export const InputGroupEndElement = {
  render: InputGroupWithEndElement,
  name: 'InputGroup with end element (unit)',
};

export const InputGroupBothElements = {
  render: InputGroupWithBothElements,
  name: 'InputGroup with both elements',
};

export const InputGroupRTL = {
  render: InputGroupRTLExample,
  name: 'InputGroup RTL support',
};

// Visual Test Stories
export const VisualTest = MixedExample;
export const VisualTestWithZoom = MixedExample;
