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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10908%3A3845
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-horizontal-nav/src/BpkHorizontalNavItem.tsx
// component=BpkHorizontalNavItem

import figma from "figma"

const selected = figma.selectedInstance.getEnum("State", {
  Active: true,
})
const type = figma.selectedInstance.getEnum("Style", {
  Default: figma.helpers.react.identifier("HORIZONTAL_NAV_TYPES.default"),
  Light: figma.helpers.react.identifier("HORIZONTAL_NAV_TYPES.light"),
})
const children = figma.selectedInstance.findText("Label").__render__()

export default {
  id: "BpkHorizontalNavItem",
  imports: [
    "import BpkHorizontalNavItem from '@skyscanner-internal/backpack-web/bpk-component-horizontal-nav';",
  ],
  example: figma.code`<BpkHorizontalNavItem${figma.helpers.react.renderProp(
    "selected",
    selected,
  )}${figma.helpers.react.renderProp("type", type)}>
        ${figma.helpers.react.renderChildren(children)}
      </BpkHorizontalNavItem>`,
  metadata: { nestable: true },
}
