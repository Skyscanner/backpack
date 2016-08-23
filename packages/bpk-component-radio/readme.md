# bpk-component-radio

> Backpack radio button component.

### Installation

```sh
npm install bpk-component-radio --save
```

### Usage

```js
import React from 'react'
import BpkRadio from 'bpk-component-radio'

export default MyComponent = () => (
  <BpkRadio
    name='return'
    label='Return'
    onChange={() => console.log('radio changed')}
    checked
  />
)
```
