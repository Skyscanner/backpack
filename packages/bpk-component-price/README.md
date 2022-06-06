# bpk-component-price

> Backpack example component.

## Installation

```sh
npm install bpk-component-price --save-dev
```

## Usage

```js
import React from 'react';
import BpkPrice, { SIZES } from 'bpk-component-price';

export default () => (
  <BpkPrice
    size={SIZES.large}
    subtitle="£209"
    title="£1,830"
    description="/ night"
  />
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| title     | string   | true     | -             |
| size | oneOf([SIZES.small, SIZES.large])   | true    | -          |
| subtitle  | string   | false    | null          |
| description | string   | false    | null          |
| className | string   | false    | null          |
