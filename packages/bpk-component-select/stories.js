import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

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
      <option value="tomato" disabled>Tomato</option>
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
      <option value="" hidden>Please select...</option>
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>Tomato</option>
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
      <option value="tomato" disabled>Tomato</option>
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
      <option value="tomato" disabled>Tomato</option>
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
        <option value="tomato" disabled>Tomato</option>
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
        <option value="tomato" disabled>Tomato</option>
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
        <option value="tomato" disabled>Tomato</option>
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
        <option value="tomato" disabled>Tomato</option>
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
          <option value="tomato" disabled>Tomato</option>
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
          <option value="tomato" disabled>Tomato</option>
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
          <option value="tomato" disabled>Tomato</option>
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
          <option value="tomato" disabled>Tomato</option>
        </BpkSelect>
      </div>
    </div>
  ));
