// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=17423-70360
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-divider/src/BpkDivider.tsx
// component=BpkDivider

import figma from "figma"

const spacing = figma.selectedInstance.getEnum("Padding", {
  NoSpace: "none",
  Base: "base",
  Large: "lg",
})
const weight = figma.selectedInstance.getEnum("Weight", {
  "1px": "default",
  "2px": "bold",
})

export default {
  id: "BpkDivider",
  imports: [
    "import BpkDivider from '@skyscanner/backpack-web/bpk-component-divider'",
  ],
  example: figma.code`<BpkDivider${figma.helpers.react.renderProp(
    "spacing",
    spacing,
  )}${figma.helpers.react.renderProp("weight", weight)}/>`,
  metadata: { nestable: true },
}
