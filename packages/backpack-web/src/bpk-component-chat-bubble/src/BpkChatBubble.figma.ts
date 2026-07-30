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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=17976-8767
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-chat-bubble/src/BpkChatBubble.tsx
// component=BpkChatBubble

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  System: figma.helpers.react.identifier("CHAT_BUBBLE_TYPE.bot"),
  User: figma.helpers.react.identifier("CHAT_BUBBLE_TYPE.user"),
})
const position = figma.selectedInstance.getEnum("State", {
  Top: figma.helpers.react.identifier("CHAT_BUBBLE_POSITION.first"),
  Middle: figma.helpers.react.identifier("CHAT_BUBBLE_POSITION.middle"),
  Bottom: figma.helpers.react.identifier("CHAT_BUBBLE_POSITION.last"),
})
const content = figma.selectedInstance.findText("chat text").__render__()

export default {
  id: "BpkChatBubble",
  imports: [
    "import BpkChatBubble from '@skyscanner/backpack-web/bpk-component-chat-bubble';",
  ],
  example: figma.code`<BpkChatBubble${figma.helpers.react.renderProp(
    "type",
    type,
  )}${figma.helpers.react.renderProp("systemPosition", position)}>
        ${figma.helpers.react.renderChildren(content)}
      </BpkChatBubble>`,
  metadata: { nestable: true },
}
