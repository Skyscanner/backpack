// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10885%3A9743
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-link/src/BpkLink.tsx
// component=BpkLink

import figma from "figma"

const implicit = figma.selectedInstance.getEnum("Type", {
  Implicit: true,
})
const children = figma.selectedInstance.getString("Text")
const alternate = figma.selectedInstance.getEnum("Style", {
  Default: false,
  "On Contrast": true,
})

export default {
  id: "BpkLink",
  imports: [
    "import BpkLink from '@skyscanner/backpack-web/bpk-component-link';",
  ],
  example: figma.code`<BpkLink href="#"${figma.helpers.react.renderProp(
    "implicit",
    implicit,
  )}${figma.helpers.react.renderProp("alternate", alternate)}>
        ${figma.helpers.react.renderChildren(children)}
      </BpkLink>`,
  metadata: { nestable: true },
}
