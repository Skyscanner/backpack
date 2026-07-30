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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A4777
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-checkbox/src/BpkCheckbox.tsx
// component=BpkCheckbox

import figma from "figma"

const label = figma.selectedInstance.findText("Option").__render__()

export default {
  id: "BpkCheckbox",
  imports: [
    "import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';",
  ],
  example: figma.code`<BpkCheckbox${figma.helpers.react.renderProp(
    "name",
    label,
  )}${figma.helpers.react.renderProp("label", label)} onChange={() => { }}/>`,
  metadata: { nestable: true },
}
