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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A50640
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-card-button/src/BpkSaveButton.tsx
// component=BpkSaveButton

import figma from "figma"

const size = figma.selectedInstance.getEnum("Size", {
  Default: figma.helpers.react.identifier("SIZE_TYPES.default"),
  Small: figma.helpers.react.identifier("SIZE_TYPES.small"),
})
const style = figma.selectedInstance.getEnum("Style", {
  Default: figma.helpers.react.identifier("STYLE_TYPES.default"),
  Contained: figma.helpers.react.identifier("STYLE_TYPES.contained"),
  "On Dark": figma.helpers.react.identifier("STYLE_TYPES.onDark"),
})
const checked = figma.selectedInstance.getEnum("State", {
  Saved: true,
})

export default {
  id: "BpkSaveButton",
  imports: [
    "import BpkSaveButton, { SIZE_TYPES, STYLE_TYPES } from '@skyscanner-internal/backpack-web/bpk-component-card-button'",
  ],
  example: figma.code`<BpkSaveButton${figma.helpers.react.renderProp(
    "checked",
    checked,
  )} accessibilityLabel="Save" onCheckedChange={() => { }}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("style", style)}/>`,
  metadata: { nestable: true },
}
