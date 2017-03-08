# bpk-component-heading

> Backpack heading component.

## Installation

```sh
npm install bpk-component-heading --save
```

## Usage

```js
import React from 'react'
import BpkHeading from 'bpk-component-heading'

export default MyComponent = () => (
  <BpkHeading level='h1'>My Heading</BpkHeading>
)
```

### Props

| Property     | PropType                           | Required | Default Value |
| ------------ | ---------------------------------- | -------- | ------------- |
| children     | -                                  | true     | -             |
| level        | 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' | true     | -             |
| className    | string                             | false    | null          |
| id           | string                             | false    | null          |
| bottomMargin | bool                               | false    | true          |
