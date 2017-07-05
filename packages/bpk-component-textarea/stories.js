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
