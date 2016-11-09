# bpk-component-button

> Backpack button component.

## Installation

```sh
npm install bpk-component-button --save
```

## Usage

```js
import React from 'react'
import BpkButton from 'bpk-component-button'

export default MyComponent = () => (
  <div>
    <BpkButton>Primary</BpkButton>
    <BpkButton large>Large primary</BpkButton>
    <BpkButton selected>Selected</BpkButton>
    <BpkButton secondary>Secondary</BpkButton>
    <BpkButton link>Link</BpkButton>
  </div>
)
```

### Props

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | -        | true     | -             |
| href        | string   | false    | null          |
| className   | string   | false    | null          |
| disabled    | bool     | false    | false         |
| submit      | bool     | false    | false         |
| secondary   | bool     | false    | false         |
| destructive | bool     | false    | false         |
| selected    | bool     | false    | false         |
| large       | bool     | false    | false         |
| link        | bool     | false    | false         |
| onClick     | func     | false    | null          |
