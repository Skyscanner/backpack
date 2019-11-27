# bpk-component-carousel

> Backpack carousel component.

## Installation

```sh
npm install bpk-component-carousel --save-dev
```

## Usage

```js
import React from 'react';
import BpkCarousel from 'bpk-component-carousel';

// Carousel items all need to be the same width.
const CAROUSEL_ITEM_WIDTH = '15rem';

export default () => (
  <BpkCarousel>
    <BpkCard style={{width: CAROUSEL_ITEM_WIDTH; }}>Item 1</BpkCard>
    <BpkCard style={{width: CAROUSEL_ITEM_WIDTH; }}>Item 2</BpkCard>
  </BpkCarousel>
);
```

## Props

| Property         | PropType | Required | Default Value |
| ---------------- | -------- | -------- | ------------- |
| className        | string   | false    | null          |