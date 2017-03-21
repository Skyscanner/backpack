import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

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
