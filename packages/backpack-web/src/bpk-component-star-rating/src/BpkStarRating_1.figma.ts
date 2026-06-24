// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A49171
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-star-rating/src/BpkStarRating.tsx
// component=BpkStarRating

import figma from "figma"

const large = figma.selectedInstance.getEnum("Size", {
  Large: true,
})
const hotelRating = figma.selectedInstance.getEnum("Rating", {
  "1 star": 1,
  "2 star": 2,
  "3 star": 3,
  "4 star": 4,
  "5 star": 5,
})
const hotelRatingLabel = figma.selectedInstance.getEnum("Rating", {
  "1 star": "1 star hotel",
  "2 star": "2 star hotel",
  "3 star": "3 star hotel",
  "4 star": "4 star hotel",
  "5 star": "5 star hotel",
})

export default {
  id: "BpkStarRating",
  imports: [
    "import BpkStarRating from '@skyscanner/backpack-web/bpk-component-star-rating';",
  ],
  example: figma.code`<BpkStarRating${figma.helpers.react.renderProp(
    "ratingLabel",
    hotelRatingLabel,
  )}${figma.helpers.react.renderProp(
    "large",
    large,
  )}${figma.helpers.react.renderProp(
    "rating",
    hotelRating,
  )}${figma.helpers.react.renderProp("maxRating", hotelRating)}/>`,
  metadata: { nestable: true },
}
