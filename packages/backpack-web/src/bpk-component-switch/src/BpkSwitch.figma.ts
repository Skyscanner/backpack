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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A51298
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-switch/src/BpkSwitch.tsx
// component=BpkSwitch

import figma from "figma"

const size = figma.selectedInstance.getEnum("Size", {
  Default: false,
  Small: true,
})
const state = figma.selectedInstance.getEnum("State", {
  On: true,
  Off: false,
})

export default {
  id: "BpkSwitch",
  imports: [
    "import BpkSwitch from '@skyscanner-internal/backpack-web/bpk-component-switch';",
  ],
  example: figma.code`<BpkSwitch ariaLabel="Activate Backpack"${figma.helpers.react.renderProp(
    "small",
    size,
  )}${figma.helpers.react.renderProp("checked", state)}/>`,
  metadata: { nestable: true },
}
