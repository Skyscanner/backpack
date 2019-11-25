# bpk-component-carousel

> Backpack example component.

## Installation

```sh
npm install bpk-component-carousel --save-dev
```

## Usage

```js
import React from 'react';
import BpkCarousel from 'bpk-component-carousel';

export default () => (
  <BpkCarousel>
    <BpkCard>Item 1</BpkCard>
    <BpkCard>Item 2</BpkCard>
  </BpkCarousel>
);
```

## Props

| Property         | PropType | Required | Default Value |
| ---------------- | -------- | -------- | ------------- |
| className        | string   | false    | null          |
| wrapperClassName | string   | false    | null          |
| itemClassName    | string   | false    | null          |