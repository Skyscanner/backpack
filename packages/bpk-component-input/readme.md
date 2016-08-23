# bpk-component-input

> Backpack input component.

### Installation

```sh
npm install bpk-component-input --save
```

### Usage

```js
import React from 'react'
import BpkInput from 'bpk-component-input'

export default MyComponent = () => (
  <BpkInput
    name='origin'
    value='Edinburgh'
    onChange={() => console.log('input changed!')}
    placeholder='Enter a country, city or airport'
  />
)
```
