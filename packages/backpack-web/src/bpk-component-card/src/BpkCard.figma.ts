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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=15086%3A15207
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-card/src/BpkCardV2/BpkCardV2.tsx
// component=BpkCardV2

import figma from "figma"

const bgColor = figma.selectedInstance.getEnum("Style", {
  "Surface default": figma.helpers.react.identifier(
    "CARD_V2_SURFACE_COLORS.surfaceDefault",
  ),
  "Surface low contrast": figma.helpers.react.identifier(
    "CARD_V2_SURFACE_COLORS.surfaceLowContrast",
  ),
  "Surface elevated": figma.helpers.react.identifier(
    "CARD_V2_SURFACE_COLORS.surfaceElevated",
  ),
  "Surface tint": figma.helpers.react.identifier(
    "CARD_V2_SURFACE_COLORS.surfaceTint",
  ),
  "Surface subtle": figma.helpers.react.identifier(
    "CARD_V2_SURFACE_COLORS.surfaceSubtle",
  ),
  "Surface contrast": figma.helpers.react.identifier(
    "CARD_V2_SURFACE_COLORS.surfaceContrast",
  ),
})
const variant = figma.selectedInstance.getEnum("Style", {
  "Panel • Keyline": figma.helpers.react.identifier(
    "CARD_V2_VARIANTS.outlined",
  ),
  "Panel • No keyline": figma.helpers.react.identifier(
    "CARD_V2_VARIANTS.noElevation",
  ),
})
const children = figma.properties.slot("Contents")

export default {
  id: "BpkCardV2",
  imports: [
    "import BpkCardV2 from '@skyscanner-internal/backpack-web/bpk-component-card';",
  ],
  example: figma.code`<BpkCardV2.Root${figma.helpers.react.renderProp(
    "bgColor",
    bgColor,
  )}${figma.helpers.react.renderProp("variant", variant)}>
        <BpkCardV2.Body>${figma.helpers.react.renderChildren(
          children,
        )}</BpkCardV2.Body>
      </BpkCardV2.Root>`,
  metadata: { nestable: true },
}
