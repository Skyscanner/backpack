# bpk-component-rating

> Backpack rating component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkRating, { RATING_SIZES, RATING_SCALES } from '@skyscanner/backpack-web/bpk-component-rating';

export default () => (
  <BpkRating
    ariaLabel="4.8 Excellent 2,420 reviews"
    value={4.8}
    title="Excellent"
    subtitle="2,420 reviews"
  />

  // Large size rating
  <BpkRating
    ariaLabel="4.4 Very good 120 reviews"
    title="Very good"
    subtitle="120 reviews"
    size={RATING_SIZES.large}
    value={4.4}
  />

  // Title only rating
  <BpkRating
    ariaLabel="2.3 Bad"
    title="Bad"
    value={2.3}
  />

  // Subtitle only rating
  <BpkRating
    ariaLabel="4.8 2,420 reviews"
    value={4.8}
    subtitle="2,420 reviews"
  />

  // Show scale rating
  <BpkRating
    ariaLabel="3.8 Good 530 reviews"
    title="Good"
    subtitle="530 reviews"
    value={3.8}
  />

  // Hide scale rating
  <BpkRating
    ariaLabel="3.8 Good 530 reviews"
    title="Good"
    subtitle="530 reviews"
    value={3.8}
    showScale={false}
  />

  // 0-10 scale
  <BpkRating
    ariaLabel="9.9 Awesome 6,549 reviews"
    title="Awesome"
    subtitle="6,549 reviews"
    value={9.9}
    ratingScale={RATING_SCALES.zeroToTen}
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/rating/web-gTX79kJ6#section-props-fb).
