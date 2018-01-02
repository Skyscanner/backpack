/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BpkTextarea from './index';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate repellat assumenda
necessitatibus reiciendis, porro temporibus expedita excepturi! Nostrum pariatur odit porro, dolorem dignissimos
laudantium quis, tempore iste non, nam magnam.`;

storiesOf('bpk-component-textarea', module)
  .add('Default', () => (
    <BpkTextarea
      id="default"
      name="default"
      value={loremIpsum}
      onChange={action('input changed')}
      placeholder="Please enter some text"
    />
  ))
  .add('Placeholder', () => (
    <BpkTextarea
      id="placeholder"
      name="placeholder"
      value=""
      onChange={action('input changed')}
      placeholder="Please enter some text"
    />
  ))
  .add('Disabled', () => (
    <BpkTextarea
      id="disabled"
      name="disabled"
      value=""
      onChange={action('input changed')}
      placeholder="Please enter some text"
      disabled
    />
  ));
