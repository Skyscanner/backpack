# bpk-component-select

> Backpack select component.

### Installation

```sh
npm install bpk-component-select --save
```

### Usage

```js
import React from 'react'
import BpkSelect from 'bpk-component-select'

export default MyComponent = () => (
  <BpkSelect
    name='fruits'
    value='oranges'
    onChange={() => console.log('select changed')}
    options={[
      { name: 'Apples', value: 'apples' },
      { name: 'Oranges', value: 'oranges' },
      { name: 'Pears', value: 'pears' }
    ]}
  />
)
```
