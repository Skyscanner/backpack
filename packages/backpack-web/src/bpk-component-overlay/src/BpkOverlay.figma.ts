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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10908%3A17397
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-overlay/src/BpkOverlay.tsx
// component=BpkOverlay

import figma from "figma"

const style = figma.selectedInstance.getEnum("Style", {
  High: figma.helpers.react.identifier("OVERLAY_TYPES.solidHigh"),
  Medium: figma.helpers.react.identifier("OVERLAY_TYPES.solidMedium"),
  Low: figma.helpers.react.identifier("OVERLAY_TYPES.solidLow"),
  None: figma.helpers.react.identifier("OVERLAY_TYPES.off"),
  "↓ Heavy": figma.helpers.react.identifier("OVERLAY_TYPES.heavyBottom"),
  "↓ High": figma.helpers.react.identifier("OVERLAY_TYPES.bottomHigh"),
  "↓ Medium": figma.helpers.react.identifier("OVERLAY_TYPES.bottomMedium"),
  "↓ Low": figma.helpers.react.identifier("OVERLAY_TYPES.bottomLow"),
  "↑ Heavy": figma.helpers.react.identifier("OVERLAY_TYPES.heavyTop"),
  "↑ High": figma.helpers.react.identifier("OVERLAY_TYPES.topHigh"),
  "↑ Medium": figma.helpers.react.identifier("OVERLAY_TYPES.topMedium"),
  "↑ Low": figma.helpers.react.identifier("OVERLAY_TYPES.topLow"),
  "← High": figma.helpers.react.identifier("OVERLAY_TYPES.leftHigh"),
  "← Medium": figma.helpers.react.identifier("OVERLAY_TYPES.leftMedium"),
  "← Low": figma.helpers.react.identifier("OVERLAY_TYPES.leftLow"),
  "→ High": figma.helpers.react.identifier("OVERLAY_TYPES.rightHigh"),
  "→ Medium": figma.helpers.react.identifier("OVERLAY_TYPES.rightMedium"),
  "→ Low": figma.helpers.react.identifier("OVERLAY_TYPES.rightLow"),
  "◻︎ Vignette": figma.helpers.react.identifier("OVERLAY_TYPES.vignette"),
})

export default {
  id: "BpkOverlay",
  imports: [
    "import BpkImage from '@skyscanner-internal/backpack-web/bpk-component-image';",
    "import BpkOverlay, { OVERLAY_TYPES } from '@skyscanner-internal/backpack-web/bpk-component-overlay';",
  ],
  example: figma.code`<BpkOverlay${figma.helpers.react.renderProp(
    "overlayType",
    style,
  )}>
        <BpkImage altText="altText here" aspectRatio={16 / 9} src="https://content.skyscnr.com/m/f8b42e98e2b79a6/original/Carousel-placeholder-3.jpg"/>
      </BpkOverlay>`,
  metadata: { nestable: true },
}
