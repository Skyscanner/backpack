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

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| disabled  | bool     | false    | false         |
| invalid   | bool     | false    | false         |
| required  | bool     | false    | false         |
| white     | bool     | false    | false         |
