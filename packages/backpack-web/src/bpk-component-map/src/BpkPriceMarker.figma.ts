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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10908%3A1778
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-map/src/BpkPriceMarker.tsx
// component=BpkPriceMarker

import figma from "figma"

const status = figma.selectedInstance.getEnum("State", {
  Unselected: figma.helpers.react.identifier("MARKER_STATUSES.unselected"),
  Selected: figma.helpers.react.identifier("MARKER_STATUSES.selected"),
  "Pervious selected": figma.helpers.react.identifier(
    "MARKER_STATUSES.previous_selected",
  ),
})
const icon = figma.selectedInstance.getBoolean("Icon?", {
  true: figma.helpers.react.jsxElement("<Icon />"),
  false: undefined,
})

export default {
  id: "BpkPriceMarker",
  imports: [
    "import BpkPriceMarker from '@skyscanner/backpack-web/bpk-component-map';",
  ],
  example: figma.code`<BpkPriceMarker accessibilityLabel="£370" position={{ latitude: 0.0, longitude: 0.0 }} label="£370"${figma.helpers.react.renderProp(
    "status",
    status,
  )}${figma.helpers.react.renderProp("icon", icon)}/>`,
  metadata: { nestable: true },
}
