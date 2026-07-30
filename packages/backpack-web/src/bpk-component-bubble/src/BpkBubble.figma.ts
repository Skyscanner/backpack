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
