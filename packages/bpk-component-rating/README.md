# bpk-component-rating

> Backpack rating component.

## Installation

```sh
npm install bpk-component-rating --save-dev
```

## Usage

```js
import React from 'react';
import BpkRating, { RATING_SIZES, RATING_SCALES } from 'bpk-component-rating';

export default () => (
  <BpkRating
    ariaLabel="4.6 Excellent 2,420 reviews"
    value={4.6}
    title="Excellent"
    subtitle="2,420 reviews"
  />

  // Large size rating
  <BpkRating
    ariaLabel="4.5 Excellent would recommend"
    title="Excellent"
    subtitle="It was almost perfect!"
    size={RATING_SIZES.large}
    value={4.5}
  />

  // Title only rating
  <BpkRating
    ariaLabel="4.5 Excellent would recommend"
    title="Excellent"
    value={4.5}
  />

  // Show max value rating
  <BpkRating
    ariaLabel="4.8 Excellent would recommend"
    title="Excellent"
    subtitle="It was almost perfect!"
    value={4.8}
    showMaxValue
  />

  // 0-10 scale
  <BpkRating
    ariaLabel="9.4 Excellent would recommend"
    title="Excellent"
    subtitle="It was almost perfect!"
    value={9.4}
  />
);
```

## Props

| Property  | PropType              | Required | Default Value     |
| --------- | --------------------- | -------- | ----------------- |
| ariaLabel | string                | true     | -                 |
| title     | string                | true     | -                 |
| value     | number                | true     | -                 |
| className | string                | false    | null              |
| ratingScale | oneOf(RATING_SCALES) | false    | RATING_SCALES.zeroToFive |
| size      | oneOf(RATING_SIZES)   | false    | RATING_SIZES.base |
| subtitle  | string                | false    | null              |
| showMaxValue  | boolean               | false    | false             |
