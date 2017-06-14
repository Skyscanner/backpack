# bpk-component-star-rating

> Backpack rating star component.

## Installation

```sh
npm install bpk-component-star-rating --save-dev
```

## Usage

```js
import React from 'react';
import BpkStarRating, { BpkStar, STAR_TYPES, BpkInteractiveStarRating } from 'bpk-component-star-rating';

export default () => (
  <BpkStar type={STAR_TYPES.HALF} />
  <BpkStarRating rating={3.5} large />
  <BpkInteractiveStarRating onRatingSelect={(rating) => console.log(rating)} />
);
```

## Props

### BpkStarRating

| Property       | PropType | Required | Default Value |
| -------------- | -------- | -------- | ------------- |
| rating         | number   | false    | 0             |
| hoverRating    | number   | false    | 0             |
| maxRating      | number   | false    | 5             |
| large          | bool     | false    | false         |
| interactive    | bool     | false    | false         |
| onRatingHover  | func     | false    | null          |
| onMouseLeave   | func     | false    | null          |
| onRatingSelect | func     | false    | null          |
| className      | string   | false    | null          |

### BpkStar

| Property    | PropType          | Required | Default Value |
| ----------- | ----------------- | -------- | ------------- |
| type        | oneOf(STAR_TYPES) | true     | -             |
| large       | bool              | false    | false         |
| selected    | bool              | false    | false         |

### BpkInteractiveStarRating

| Property       | PropType | Required | Default Value |
| -------------- | -------- | -------- | ------------- |
| onRatingSelect | func     | false    | () => null    |
