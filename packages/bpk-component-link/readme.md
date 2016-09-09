# bpk-component-link

> Backpack link component.

## Installation

```sh
npm install bpk-component-link --save
```

## Usage

```js
import React from 'react'
import BpkLink from 'bpk-component-link'

export default MyComponent = () => (
  <BpkLink href="https://www.skyscanner.net/">Click here</BpkLink>
)
```

### Props

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | -        | true     | -             |
| href     | string   | true     | -             |
| onClick  | func     | false    | null          |
| blank    | bool     | false    | false         |
