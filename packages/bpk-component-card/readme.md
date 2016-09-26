# bpk-component-card

> Backpack card component.

## Installation

```sh
npm install bpk-component-card --save
```

## Usage

```js
import React from 'react'
import BpkCard from 'bpk-component-card'

export default MyComponent = () => (
  <BpkCard href='#'>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  </BpkCard>
)
```

### Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| href      | string   | true     |               |
| onClick   | func     | false    | null          |
| focused   | bool     | false    | false         |
