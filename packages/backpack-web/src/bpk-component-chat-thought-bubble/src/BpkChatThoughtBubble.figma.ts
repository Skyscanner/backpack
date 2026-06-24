// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=17976-8783
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-chat-thought-bubble/src/BpkChatThoughtBubble.tsx
// component=BpkChatThoughtBubble

import figma from "figma"

const content = figma.selectedInstance.findText("Label").__render__()

export default {
  id: "BpkChatThoughtBubble",
  imports: [
    "import BpkChatThoughtBubble from '@skyscanner/backpack-web/bpk-component-chat-thought-bubble';",
  ],
  example: figma.code`<BpkChatThoughtBubble${figma.helpers.react.renderProp(
    "content",
    content,
  )}/>`,
  metadata: { nestable: true },
}
