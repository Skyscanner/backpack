/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A49221
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-star-rating/src/BpkInteractiveStarRating.tsx
// component=BpkInteractiveStarRating

import figma from "figma"

const large = figma.selectedInstance.getEnum("Size", {
  Large: true,
})
const extraLarge = figma.selectedInstance.getEnum("Size", {
  "Extra-large": true,
})
const initialRating = figma.selectedInstance.getEnum("Rating", {
  "1 star": 1,
  "2 stars": 2,
  "3 stars": 3,
  "4 stars": 4,
  "5 stars": 5,
})

export default {
  id: "BpkInteractiveStarRating",
  imports: [
    "import BpkInteractiveStarRating from '@skyscanner/backpack-web/bpk-component-star-rating'",
  ],
  example: figma.code`<BpkInteractiveStarRating getStarLabel={(rating: number, maxRating: number) => \`${rating} out of ${maxRating} stars\`} id="uniqueId" 
// eslint-disable-next-line no-console
onRatingSelect={(rating: number) => console.log(rating)}${figma.helpers.react.renderProp(
    "large",
    large,
  )}${figma.helpers.react.renderProp(
    "extraLarge",
    extraLarge,
  )}${figma.helpers.react.renderProp("rating", initialRating)}/>`,
  metadata: { nestable: true },
}
