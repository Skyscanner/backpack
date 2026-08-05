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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A5124
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-label/src/BpkLabel.tsx
// component=BpkLabel

import figma from "figma"

const required = figma.selectedInstance.getEnum("Required", {
  True: true,
  False: false,
})
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
})
const valid = figma.selectedInstance.getEnum("State", {
  Invalid: false,
  Default: undefined,
})
const children = figma.selectedInstance.findText("Label").__render__()

export default {
  id: "BpkLabel",
  imports: [
    "import BpkLabel from '@skyscanner-internal/backpack-web/bpk-component-label';",
  ],
  example: figma.code`<BpkLabel htmlFor="input-id"${figma.helpers.react.renderProp(
    "required",
    required,
  )}${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("valid", valid)}>
        ${figma.helpers.react.renderChildren(children)}
      </BpkLabel>`,
  metadata: { nestable: true },
}
