// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=15011%3A6144
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-accordion/src/BpkAccordion.tsx
// component=BpkAccordion

import figma from "figma"

const children = figma.properties.slot("List")

export default {
  id: "BpkAccordion",
  imports: [
    "import BpkAccordion from '@skyscanner/backpack-web/bpk-component-accordion';",
  ],
  example: figma.code`<BpkAccordion>
        ${figma.helpers.react.renderChildren(children)}
      </BpkAccordion>`,
  metadata: { nestable: true },
}
