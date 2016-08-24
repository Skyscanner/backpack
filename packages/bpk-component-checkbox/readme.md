# bpk-component-checkbox

> Backpack checkbox component.

### Installation

```sh
npm install bpk-component-checkbox --save
```

### Usage

```js
import React from 'react'
import BpkCheckbox from 'bpk-component-checkbox'

export default MyComponent = () => (
  <BpkCheckbox
    name='prefer-directs'
    label='Prefer directs'
    onChange={() => console.log('checkbox changed')}
    checked
  />
)
```
