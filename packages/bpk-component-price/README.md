# bpk-component-price

> Backpack example component.

## Installation

```sh
npm install bpk-component-price --save-dev
```

## Usage

```js
import React from 'react';
import BpkPrice, { SIZES, ALIGNS } from 'bpk-component-price';

export default () => (
  <BpkPrice
    size={SIZES.large}
    align={ALIGNS.left}
    subtitle="£209"
    title="£1,830"
    description="a night"
  />
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| title     | string   | true     | -             |
| size | oneOf(SIZES)   | false    | SIZES.small         |
| align | oneOf(ALIGNS)   | false    | ALIGNS.left         |
| subtitle  | string   | false    | null          |
| description | string   | false    | null          |
| className | string   | false    | null          |
