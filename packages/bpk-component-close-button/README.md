# bpk-component-close-button

> Backpack close button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkCloseButton from '@skyscanner/backpack-web/bpk-component-close-button';

export default () => (
  <BpkCloseButton label="Close" onClick={() => console.log('click')} />
);
```

## Props

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| label    | string   | true     | -             |
| onClick  | func     | true     | -             |
