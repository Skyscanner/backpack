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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=17423-70360
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-divider/src/BpkDivider.tsx
// component=BpkDivider

import figma from "figma"

const spacing = figma.selectedInstance.getEnum("Padding", {
  NoSpace: "none",
  Base: "base",
  Large: "lg",
})
const weight = figma.selectedInstance.getEnum("Weight", {
  "1px": "default",
  "2px": "bold",
})

export default {
  id: "BpkDivider",
  imports: [
    "import BpkDivider from '@skyscanner-internal/backpack-web/bpk-component-divider'",
  ],
  example: figma.code`<BpkDivider${figma.helpers.react.renderProp(
    "spacing",
    spacing,
  )}${figma.helpers.react.renderProp("weight", weight)}/>`,
  metadata: { nestable: true },
}
