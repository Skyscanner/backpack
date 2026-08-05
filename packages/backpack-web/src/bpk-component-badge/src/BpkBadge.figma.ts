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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A5938
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-badge/src/BpkBadge.tsx
// component=BpkBadge

import figma from "figma"

const style = figma.selectedInstance.getEnum("Style", {
  Normal: figma.helpers.react.identifier("BADGE_TYPES.normal"),
  Success: figma.helpers.react.identifier("BADGE_TYPES.success"),
  Warning: figma.helpers.react.identifier("BADGE_TYPES.warning"),
  Critical: figma.helpers.react.identifier("BADGE_TYPES.critical"),
  Inverse: figma.helpers.react.identifier("BADGE_TYPES.inverse"),
  Outline: figma.helpers.react.identifier("BADGE_TYPES.outline"),
  Brand: figma.helpers.react.identifier("BADGE_TYPES.brand"),
  Strong: figma.helpers.react.identifier("BADGE_TYPES.strong"),
})
const label = figma.selectedInstance.findText("Attribute").__render__()

export default {
  id: "BpkBadge",
  imports: [
    "import BpkBadge, { BADGE_TYPES } from '@skyscanner-internal/backpack-web/bpk-component-badge';",
  ],
  example: figma.code`<BpkBadge${figma.helpers.react.renderProp(
    "type",
    style,
  )}>${figma.helpers.react.renderChildren(label)}</BpkBadge>`,
  metadata: { nestable: true },
}
