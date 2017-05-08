# bpk-component-label

> Backpack label component.

## Installation

```sh
npm install bpk-component-label --save-dev
```

## Usage

```js
import React from 'react';
import BpkLabel from 'bpk-component-label';

export default () => (
  <BpkLabel htmlFor="origin">Origin</BpkLabel>
)
```

### Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| required  | bool     | false    | false         |
| white     | bool     | false    | false         |
