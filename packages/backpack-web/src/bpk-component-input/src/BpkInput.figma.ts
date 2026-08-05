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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A5030
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-input/src/BpkInput.tsx
// component=BpkInput

import figma from "figma"

const large = figma.selectedInstance.getEnum("Size", {
  Default: false,
  Large: true,
})
const dockedFirst = figma.selectedInstance.getEnum("Docking", {
  Left: true,
})
const dockedMiddle = figma.selectedInstance.getEnum("Docking", {
  Centre: true,
})
const dockedLast = figma.selectedInstance.getEnum("Docking", {
  Right: true,
})

export default {
  id: "BpkInput",
  imports: [
    "import BpkInput from '@skyscanner-internal/backpack-web/bpk-component-input';",
  ],
  example: figma.code`<BpkInput id="input-id" name="" value=""${figma.helpers.react.renderProp(
    "large",
    large,
  )}${figma.helpers.react.renderProp(
    "dockedFirst",
    dockedFirst,
  )}${figma.helpers.react.renderProp(
    "dockedMiddle",
    dockedMiddle,
  )}${figma.helpers.react.renderProp("dockedLast", dockedLast)}/>`,
  metadata: { nestable: true },
}
