# bpk-component-textarea

> Backpack textarea component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkTextarea from '@skyscanner/backpack-web/bpk-component-textarea';

export default () => (
  <BpkTextarea
    id="textarea"
    name="textarea"
    value="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  />
);
```

## Props

| Property     | PropType             | Required  | Default Value    |
| ------------ | -------------------- | --------- | ---------------- |
| id           | string               | true      | -                |
| name         | string               | true      | -                |
| value        | string               | true      | -                |
| valid        | bool                 | false     | null             |
| large        | bool                 | false     | false            |
