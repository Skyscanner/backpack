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
  <BpkLabel label="Origin" htmlFor="origin" />
)
```

### Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| label     | string   | true     | -             |
| white     | bool     | false    | false         |
