import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkSelect from './index'

storiesOf('bpk-component-select', module)
  .add('Example', () => (
    <BpkSelect
      id='fruits'
      name='fruits'
      value='oranges'
      onChange={action('select changed')}
      options={[
        { name: 'Apples', value: 'apples' },
        { name: 'Oranges', value: 'oranges' },
        { name: 'Pears', value: 'pears' },
        { name: 'Tomato', value: 'tomato', disabled: true }
      ]}
    />
  ))
  .add('Invalid', () => (
    <BpkSelect
      id='invalid'
      name='invalid'
      value=''
      onChange={action('select changed')}
      options={[
        { name: 'Please select...', value: '', hidden: true },
        { name: 'Apples', value: 'apples' },
        { name: 'Oranges', value: 'oranges' },
        { name: 'Pears', value: 'pears' },
        { name: 'Tomato', value: 'tomato', disabled: true }
      ]}
      valid={false}
    />
  ))
  .add('Disabled', () => (
    <BpkSelect
      id='disabled'
      name='disabled'
      value=''
      onChange={action('select changed')}
      options={[
        { name: 'Apples', value: 'apples' },
        { name: 'Oranges', value: 'oranges' },
        { name: 'Pears', value: 'pears' }
      ]}
      disabled
    />
  ))
  .add('Large', () => (
    <BpkSelect
      id='large'
      name='large'
      value='oranges'
      onChange={action('select changed')}
      options={[
        { name: 'Apples', value: 'apples' },
        { name: 'Oranges', value: 'oranges' },
        { name: 'Pears', value: 'pears' },
        { name: 'Tomato', value: 'tomato', disabled: true }
      ]}
      large
    />
  ))
  .add('Docked', () => (
    <div style={{ display: 'flex' }}>
      <BpkSelect
        id='large'
        name='large'
        value='oranges'
        onChange={action('select changed')}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomato', value: 'tomato', disabled: true }
        ]}
        large
        docked
      />
      <BpkSelect
        id='large'
        name='large'
        value='oranges'
        onChange={action('select changed')}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomato', value: 'tomato', disabled: true }
        ]}
        large
        docked
      />
      <BpkSelect
        id='large'
        name='large'
        value='oranges'
        onChange={action('select changed')}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomato', value: 'tomato', disabled: true }
        ]}
        large
        valid={false}
        docked
      />
      <BpkSelect
        id='large'
        name='large'
        value='oranges'
        onChange={action('select changed')}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomato', value: 'tomato', disabled: true }
        ]}
        large
        docked
      />
    </div>
  ))
