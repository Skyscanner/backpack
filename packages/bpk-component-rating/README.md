# bpk-component-rating

> Backpack rating component.

## Installation

```sh
npm install bpk-component-rating --save-dev
```

## Usage

```js
import React from 'react';
import BpkRating, { RATING_SIZES, RATING_SCALES, RATING_TYPES } from 'bpk-component-rating';

export default () => (
  <BpkRating
    ariaLabel="9 Excellent would recommend"
    title="Excellent"
    subtitle="It was almost perfect!"
    value={9}
  />

  // Large rating
  <BpkRating
    ariaLabel="9 Excellent would recommend"
    title="Excellent"
    subtitle="It was almost perfect!"
    size={RATING_SIZES.large}
    value={9}
  />

  // Pill-shaped rating
  <BpkRating
    ariaLabel="9 Excellent would recommend"
    title="Excellent"
    subtitle="It was almost perfect!"
    type={RATING_TYPE.pill}
    value={9}
  />

  // 0-5 scale
  <BpkRating
    ariaLabel="2 It was ok I guess"
    title="Meh"
    value={2}
    ratingScale={RATING_SCALES.zeroToFive}
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
| ratingScale | oneOf(RATING_SCALES) | false    | RATING_SCALES.zeroToTen |
| size      | oneOf(RATING_SIZES)   | false    | RATING_SIZES.base |
| subtitle  | string                | false    | null              |
| type      | oneOf(RATING_TYPES)   | false    | RATING_TYPES.default |
| vertical  | boolean               | false    | false             |

## Theme props

* `ratingHighColor`
* `ratingHighTextColor`
* `ratingMediumColor`
* `ratingMediumTextColor`
* `ratingLowColor`
