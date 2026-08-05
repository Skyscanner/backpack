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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=17976-8783
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-chat-thought-bubble/src/BpkChatThoughtBubble.tsx
// component=BpkChatThoughtBubble

import figma from "figma"

const content = figma.selectedInstance.findText("Label").__render__()

export default {
  id: "BpkChatThoughtBubble",
  imports: [
    "import BpkChatThoughtBubble from '@skyscanner-internal/backpack-web/bpk-component-chat-thought-bubble';",
  ],
  example: figma.code`<BpkChatThoughtBubble${figma.helpers.react.renderProp(
    "content",
    content,
  )}/>`,
  metadata: { nestable: true },
}
