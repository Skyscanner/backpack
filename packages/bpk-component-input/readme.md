# bpk-component-input

> Backpack input component.

## Installation

```sh
npm install bpk-component-input --save
```

## Usage

```js
import React from 'react'
import BpkInput, { INPUT_TYPES } from 'bpk-component-input'

export default MyComponent = () => (
  <BpkInput
    id='origin'
    type={INPUT_TYPES.TEXT}
    name='origin'
    value='Edinburgh'
    onChange={() => console.log('input changed!')}
    placeholder='Country, city or airport'
  />
)
```

### Props

| Property    | PropType             | Required  | Default Value    |
| ----------- | -------------------- | --------- | ---------------- |
| id          | string               | true      | -                |
| name        | string               | true      | -                |
| value       | string               | true      | -                |
| type        | INPUT_TYPES (one of) | false     | INPUT_TYPES.TEXT |
| valid       | bool                 | false     | null             |
| large       | bool                 | false     | false            |
| docked      | bool                 | false     | false            |

Additionally, all native `<input />` attributes such as `placeholder` and `onChange` are supported.
