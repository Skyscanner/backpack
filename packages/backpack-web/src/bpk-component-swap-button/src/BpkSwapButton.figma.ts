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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A50522
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-swap-button/src/BpkSwapButton.tsx
// component=BpkSwapButton

import figma from "figma"

const swapButtonStyle = figma.selectedInstance.getEnum("Style", {
  "Surface Contrast": figma.helpers.react.identifier(
    "SWAPBUTTON_STYLES.surfaceContrast",
  ),
  "Canvas Contrast": figma.helpers.react.identifier(
    "SWAPBUTTON_STYLES.canvasContrast",
  ),
  "Canvas Default": figma.helpers.react.identifier(
    "SWAPBUTTON_STYLES.canvasDefault",
  ),
})

export default {
  id: "BpkSwapButton",
  imports: [
    "import BpkSwapButton, { SWAPBUTTON_STYLES } from '@skyscanner-internal/backpack-web/bpk-component-swap-button';",
  ],
  example: figma.code`<BpkSwapButton ariaLabel="Swap origin and destination" onClick={() => { }}${figma.helpers.react.renderProp(
    "swapButtonStyle",
    swapButtonStyle,
  )}/>`,
  metadata: { nestable: true },
}
