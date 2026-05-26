# bpk-component-star-rating

> Backpack rating star component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
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

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/star-rating/web-5Y5HQkJv#section-props-32).
