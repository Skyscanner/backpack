# bpk-component-card

> Backpack card component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCard>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  </BpkCard>
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |
| href      | string   | false    | null          |
| atomic    | bool     | false    | true          |
| padded    | bool     | false    | true          |
