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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A16303
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-bubble/src/BpkBubble.tsx
// component=BpkBubble

import figma from "figma"

const children = figma.selectedInstance.findText("*").__render__()

export default {
  id: "BpkBubble",
  imports: [
    "import BpkBubble from '@skyscanner/backpack-web/bpk-component-bubble';",
  ],
  example: figma.code`<BpkBubble>${figma.helpers.react.renderChildren(
    children,
  )}</BpkBubble>`,
  metadata: { nestable: true },
}
