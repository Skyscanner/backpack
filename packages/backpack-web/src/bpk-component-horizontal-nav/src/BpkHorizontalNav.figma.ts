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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10908%3A3878
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-horizontal-nav/src/BpkHorizontalNav.tsx
// component=BpkHorizontalNav

import figma from "figma"

const showUnderline = figma.selectedInstance.getBoolean("Line")
const type = figma.selectedInstance.getEnum("Style", {
  Default: figma.helpers.react.identifier("HORIZONTAL_NAV_TYPES.default"),
  "On Contrast": figma.helpers.react.identifier("HORIZONTAL_NAV_TYPES.light"),
})

export default {
  id: "BpkHorizontalNav",
  imports: [
    "import BpkHorizontalNav, { HORIZONTAL_NAV_TYPES } from '@skyscanner-internal/backpack-web/bpk-component-horizontal-nav';",
    "import BpkHorizontalNavItem from '@skyscanner-internal/backpack-web/bpk-component-horizontal-nav';",
  ],
  example: figma.code`<BpkHorizontalNav${figma.helpers.react.renderProp(
    "showUnderline",
    showUnderline,
  )}${figma.helpers.react.renderProp("type", type)}>
        <BpkHorizontalNavItem>One</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Two</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Three</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Four</BpkHorizontalNavItem>
      </BpkHorizontalNav>`,
  metadata: { nestable: true },
}
