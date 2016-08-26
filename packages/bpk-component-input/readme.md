# bpk-component-input

> Backpack input component.

### Installation

```sh
npm install bpk-component-input --save
```

### Usage

```js
import React from 'react'
import BpkInput, { INPUT_TYPES } from 'bpk-component-input'

export default MyComponent = () => (
  <BpkInput
    type={INPUT_TYPES.TEXT}
    name='origin'
    value='Edinburgh'
    onChange={() => console.log('input changed!')}
    placeholder='Enter a country, city or airport'
  />
)
```
