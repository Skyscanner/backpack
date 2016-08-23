import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkSelect from './index'

storiesOf('bpk-component-select', module)
  .add('Example', () => (
    <BpkSelect
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
  .add('Disabled', () => (
    <BpkSelect
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
