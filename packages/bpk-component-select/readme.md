# bpk-component-select

> Backpack select component.

## Installation

```sh
npm install bpk-component-select --save
```

## Usage

```js
import React from 'react'
import BpkSelect from 'bpk-component-select'

export default MyComponent = () => (
  <BpkSelect
    id='fruits'
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

### Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| id        | string   | true     | -             |
| name      | string   | true     | -             |
| value     | string   | true     | -             |
| onChange  | func     | true     | -             |
| options   | array    | true     | -             |
| valid     | bool     | false    | null          |
| disabled  | bool     | false    | false         |

*`options` shape:*

| Property  | PropType | Required |
| --------- | -------- | -------- |
| name      | string   | true     |
| value     | string   | true     |
| hidden    | bool     | false    |
| disabled  | bool     | false    |
