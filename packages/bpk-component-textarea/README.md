# bpk-component-textarea

> Backpack textarea component.

## Installation

```sh
npm install bpk-component-textarea --save-dev
```

## Usage

```js
import React from 'react';
import BpkTextarea from 'bpk-component-textarea';

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
