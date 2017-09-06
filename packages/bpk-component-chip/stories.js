/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import { storiesOf, action } from '@storybook/react';

import BpkChip, { BpkChipInput } from './index';

storiesOf('bpk-component-chip', module)
  .add('Default', () => (
    <BpkChip onClose={action('Chip closing!')} >This is a chip!</BpkChip>
  ))
  .add('Chip Input', () => (
    <BpkChipInput
      values={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']}
      selectedColor="#afafaf"
      selectedItem="dolor"
      placeholderText="Add a chip..."
      textInputValue=""
      onTextInputChanged={newValue => action(`text input changed to ${newValue}`)}
      onSelectionChanged={newValue => action(`selection changed to ${newValue}`)}
      valueAdded={newValue => action(`${newValue} added`)}
      valueRemoved={removedValue => action(`${removedValue} removed`)}
    />
  ));
