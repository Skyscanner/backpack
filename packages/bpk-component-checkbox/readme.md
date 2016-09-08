# bpk-component-checkbox

> Backpack checkbox component.

## Installation

```sh
npm install bpk-component-checkbox --save
```

## Usage

```js
import React from 'react'
import BpkCheckbox from 'bpk-component-checkbox'

export default MyComponent = () => (
  <BpkCheckbox
    name='prefer-directs'
    onChange={() => console.log('prefer directs changed!')}
    id='prefer-directs'
    label='Prefer directs'
    checked
  />
)
```

### Props

| Property  | PropType | Required | Default Value |
| ----------| -------- | -------- | ------------- |
| name      | string   | true     | -             |
| onChange  | func     | true     | -             |
| id        | string   | false    | null          |
| label     | string   | false    | null          |
| value     | string   | false    | null          |
| checked   | bool     | false    | false         |
| disabled  | bool     | false    | false         |
