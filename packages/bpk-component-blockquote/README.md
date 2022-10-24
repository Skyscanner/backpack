# bpk-component-blockquote

> Backpack blockquote component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkBlockquote from '@skyscanner/backpack-web/bpk-component-blockquote';

export default () => (
  <BpkBlockquote extraSpace>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  </BpkBlockquote>
);
```

## Props

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | -        | true     | -             |
| extraSpace  | bool     | false    | false         |

## Theme Props

* `blockquoteBarColor`
