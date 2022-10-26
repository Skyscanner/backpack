# bpk-component-star-rating

> Backpack rating star component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkStarRating, {
  BpkStar,
  STAR_TYPES,
  BpkInteractiveStarRating,
  withInteractiveStarRatingState
} from '@skyscanner/backpack-web/bpk-component-star-rating';

const InteractiveStarRating = withInteractiveStarRatingState(BpkInteractiveStarRating);

export default () => (
  <div>
    <BpkStar
      type={STAR_TYPES.HALF}
    />
    <BpkStarRating
      rating={3.5}
      large
      ratingLabel={(rating, maxRating) => `Rated ${rating} out of ${maxRating} stars`}
    />
    <InteractiveStarRating
      id="large-star-rating"
      onRatingSelect={(rating) => console.log(rating)}
      getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
    />
  </div>
);
```

## Props

### BpkStarRating

| Property       | PropType                | Required | Default Value       |
| -------------- | ----------------------- | -------- | ------------------- |
| ratingLabel    | oneOfType(string, func) | true     | -                   |
| className      | string                  | false    | null                |
| large          | bool                    | false    | false               |
| maxRating      | number                  | false    | 5                   |
| rating         | number                  | false    | 0                   |
| rounding       | oneOf(ROUNDING_TYPES)   | false    | ROUNDING_TYPES.down |

### BpkStar

| Property    | PropType          | Required | Default Value |
| ----------- | ----------------- | -------- | ------------- |
| type        | oneOf(STAR_TYPES) | true     | -             |
| className   | string            | false    | null          |
| large       | bool              | false    | false         |

### withInteractiveStarRatingState()

| Property       | PropType | Required | Default Value |
| -------------- | -------- | -------- | ------------- |
| onRatingSelect | func     | false    | () => null    |

### BpkInteractiveStarRating

| Property       | PropType | Required | Default Value |
| -------------- | -------- | -------- | ------------- |
| getStarLabel   | func     | true     | -             |
| id             | string   | true     | -             |
| className      | string   | false    | null          |
| hoverRating    | number   | false    | 0             |
| large          | bool     | false    | false         |
| maxRating      | number   | false    | 5             |
| onMouseLeave   | func     | false    | () => null    |
| onRatingHover  | func     | false    | () => null    |
| onRatingSelect | func     | false    | () => null    |
| rating         | number   | false    | 0             |

### BpkInteractiveStar

| Property     | PropType          | Required | Default Value |
| ------------ | ----------------- | -------- | ------------- |
| label        | bool              | true     | -             |
| name         | bool              | true     | -             |
| type         | oneOf(STAR_TYPES) | true     | -             |
| value        | number            | true     | -             |
| onClick      | func              | true     | -             |
| onMouseEnter | func              | true     | -             |
| selected     | bool              | false    | false         |

## Theme Props

* `starRatingFilledColor`