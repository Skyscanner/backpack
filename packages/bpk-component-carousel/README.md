# bpk-component-carousel

> Backpack example component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkCarousel from '@skyscanner/backpack-web/bpk-component-carousel';

export default () => (
  <BpkCarousel accessibilityLabel="This is a carousel">
    <span>slide 1</span>
    <span>slide 2</span>
    <span>slide 3</span>
  </BpkCarousel>
);
```

## Props

| Property           | PropType | Required | Default Value |
| ------------------ | -------- | -------- | ------------- |
| className          | string   | false    | null          |
| children           | node     | true     | null          |
| accessibilityLabel | false    | false    | -             |
| infinite           | false    | false    | true          |
| showIndicator      | false    | false    | true          |
