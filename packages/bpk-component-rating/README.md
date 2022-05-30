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
    ariaLabel="4.8 Excellent 2,420 reviews"
    value={4.8}
    title="Excellent"
    subtitle="2,420 reviews"
  />

  // Large size rating
  <BpkRating
    ariaLabel="4.4 Very good This place was amazing"
    title="Very good"
    subtitle="This place was amazing"
    size={RATING_SIZES.large}
    value={4.4}
  />

  // Title only rating
  <BpkRating
    ariaLabel="2.3 Bad"
    title="Bad"
    value={2.3}
  />

  // Show scale rating
  <BpkRating
    ariaLabel="3.8 Good Nice choice"
    title="Good"
    subtitle="Nice choice"
    value={3.8}
  />

  // Hide scale rating
  <BpkRating
    ariaLabel="3.8 Good Nice choice"
    title="Good"
    subtitle="Nice choice"
    value={3.8}
    showScale={false}
  />

  // 0-10 scale
  <BpkRating
    ariaLabel="9.9 Awesome It was almost perfect"
    title="Awesome"
    subtitle="It was almost perfect"
    value={9.9}
    ratingScale={RATING_SCALES.zeroToTen}
  />
);
```

## Props

| Property  | PropType              | Required | Default Value     |
| --------- | --------------------- | -------- | ----------------- |
| ariaLabel | string                | true     | -                 |
| title     | oneOfType(string, node) | true     | -                 |
| value     | oneOfType(string, number) | true     | -               |
| className | string                | false    | null              |
| ratingScale | oneOf(RATING_SCALES) | false    | RATING_SCALES.zeroToFive |
| size      | oneOf(RATING_SIZES)   | false    | RATING_SIZES.base |
| subtitle  | string                | false    | null              |
| showScale  | boolean               | false    | true             |