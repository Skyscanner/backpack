# bpk-component-rating

> Backpack rating component.

## Installation

```sh
npm install bpk-component-rating --save-dev
```

## Usage

```js
import React from 'react';
import BpkRating from 'bpk-component-rating';

export default () => (
  <BpkRating
    ariaLabel="9 Excellent would recommend"
    title="Excellent"
    value={9}
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
