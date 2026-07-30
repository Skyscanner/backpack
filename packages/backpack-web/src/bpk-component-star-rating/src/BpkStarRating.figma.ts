// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A49089
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-star-rating/src/BpkStarRating.tsx
// component=BpkStarRating

import figma from "figma"

const large = figma.selectedInstance.getEnum("Size", {
  Large: true,
})
const rating = figma.selectedInstance.getEnum("Rating", {
  "1 star": 1,
  "2 stars": 2,
  "3 stars": 3,
  "3.5 stars": 3.5,
  "4 stars": 4,
  "5 stars": 5,
})
const ratingLabel = figma.selectedInstance.getEnum("Rating", {
  "1 star": "Rated 1 star out of 5",
  "2 stars": "Rated 2 stars out of 5",
  "3 stars": "Rated 3 stars out of 5",
  "3.5 stars": "Rated 3.5 stars out of 5",
  "4 stars": "Rated 4 stars out of 5",
  "5 stars": "Rated 5 stars out of 5",
})

export default {
  id: "BpkStarRating",
  imports: [
    "import BpkStarRating from '@skyscanner/backpack-web/bpk-component-star-rating';",
  ],
  example: figma.code`<BpkStarRating${figma.helpers.react.renderProp(
    "ratingLabel",
    ratingLabel,
  )}${figma.helpers.react.renderProp(
    "large",
    large,
  )}${figma.helpers.react.renderProp("rating", rating)}/>`,
  metadata: { nestable: true },
}
