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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A19302
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-price/src/BpkPrice.tsx
// component=BpkPrice

import figma from "figma"

const price = figma.selectedInstance.getString("Price")
const size = figma.selectedInstance.getEnum("Size", {
  "X-Small": figma.helpers.react.identifier("SIZES.xsmall"),
  Small: figma.helpers.react.identifier("SIZES.small"),
  Medium: figma.helpers.react.identifier("SIZES.medium"),
  Large: figma.helpers.react.identifier("SIZES.large"),
})
const align = figma.selectedInstance.getEnum("Alignment", {
  Left: figma.helpers.react.identifier("ALIGNS.left"),
  Right: figma.helpers.react.identifier("ALIGNS.right"),
})
const variant = figma.selectedInstance.getEnum("Style", {
  Default: figma.helpers.react.identifier("VARIANTS.default"),
  OnContrast: figma.helpers.react.identifier("VARIANTS.onContrast"),
})
const trailingText = figma.selectedInstance.getString("Trailing text")

export default {
  id: "BpkPrice",
  imports: [
    "import BpkPrice from '@skyscanner/backpack-web/bpk-component-price'",
  ],
  example: figma.code`<BpkPrice${figma.helpers.react.renderProp(
    "price",
    price,
  )}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp(
    "align",
    align,
  )}${figma.helpers.react.renderProp(
    "trailingText",
    trailingText,
  )}${figma.helpers.react.renderProp("variant", variant)}/>`,
  metadata: { nestable: true },
}
