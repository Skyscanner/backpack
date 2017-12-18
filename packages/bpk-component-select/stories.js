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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BpkSelect from './index';

storiesOf('bpk-component-select', module)
  .add('Example', () => (
    <BpkSelect
      id="fruits"
      name="fruits"
      value="oranges"
      onChange={action('select changed')}
    >
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Invalid', () => (
    <BpkSelect
      id="invalid"
      name="invalid"
      value=""
      onChange={action('select changed')}
      valid={false}
    >
      <option value="" hidden>
        Please select...
      </option>
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Disabled', () => (
    <BpkSelect
      id="disabled"
      name="disabled"
      value=""
      onChange={action('select changed')}
      disabled
    >
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Large', () => (
    <BpkSelect
      id="large"
      name="large"
      value="oranges"
      onChange={action('select changed')}
      large
    >
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Docked', () => (
    <div style={{ display: 'flex' }}>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        valid={false}
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
    </div>
  ))
  .add('Manually docked', () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          dockedFirst
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          dockedMiddle
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          valid={false}
          dockedMiddle
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          dockedLast
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
    </div>
  ));
