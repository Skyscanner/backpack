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

import BpkInput, { INPUT_TYPES } from './index';

storiesOf('bpk-component-input', module)
  .add('Text value', () => (
    <BpkInput
      id="text_value"
      name="text_value"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
    />
  ))
  .add('Placeholder', () => (
    <BpkInput
      id="placeholder"
      name="placeholder"
      value=""
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
    />
  ))
  .add('Valid', () => (
    <BpkInput
      id="valid"
      name="valid"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      valid
    />
  ))
  .add('Invalid', () => (
    <BpkInput
      id="invalid"
      name="invalid"
      value="Edinbrvgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      valid={false}
    />
  ))
  .add('Disabled', () => (
    <BpkInput
      id="disabled"
      name="disabled"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      disabled
    />
  ))
  .add('Clearable', () => (
    <div>
      <BpkInput
        id="clearable"
        name="clearable"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        clearable
        clearButtonLabel="Clear field"
        onClear={action('input cleared')}
      />
      <BpkInput
        id="clearable"
        name="clearable"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        valid
        clearable
        clearButtonLabel="Clear field"
        onClear={action('input cleared')}
      />
      <BpkInput
        id="clearable"
        name="clearable"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        valid
        clearable
        clearButtonLabel="Clear field"
        onClear={action('input cleared')}
      />
    </div>
  ))
  .add('Email', () => (
    <BpkInput
      type={INPUT_TYPES.EMAIL}
      id="email"
      name="email"
      value=""
      onChange={action('input changed')}
      placeholder="example@example.com"
    />
  ))
  .add('Number', () => (
    <BpkInput
      type={INPUT_TYPES.NUMBER}
      id="number"
      name="number"
      value="0"
      onChange={action('input changed')}
      placeholder=""
    />
  ))
  .add('Password', () => (
    <BpkInput
      type={INPUT_TYPES.PASSWORD}
      id="password"
      name="password"
      value="letmein"
      onChange={action('input changed')}
      placeholder="Please enter a password"
    />
  ))
  .add('Telephone', () => (
    <BpkInput
      type={INPUT_TYPES.TEL}
      id="telephone"
      name="telephone"
      value="+441234567890"
      onChange={action('input changed')}
      placeholder="Enter your telephone number"
    />
  ))
  .add('Large', () => (
    <BpkInput
      id="large"
      name="large"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      large
    />
  ))
  .add('Docked', () => (
    <div style={{ display: 'flex' }}>
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        valid
        docked
      />
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        valid={false}
        docked
      />
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        docked
      />
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        docked
      />
    </div>
  ))
  .add('Manually docked', () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          valid
          dockedFirst
        />
      </div>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          valid={false}
          dockedMiddle
        />
      </div>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          dockedMiddle
        />
      </div>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          dockedLast
        />
      </div>
    </div>
  ));
