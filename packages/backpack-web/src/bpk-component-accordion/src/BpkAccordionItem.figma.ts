// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=15011%3A6079
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-accordion/src/BpkAccordionItem.tsx
// component=BpkAccordionItem

import figma from "figma"

const title = figma.selectedInstance.findText("Title").__render__()
const textStyle = figma.selectedInstance.getEnum("Size", {
  "Heading 3": "heading-3",
  "Heading 5": "heading-5",
})

export default {
  id: "BpkAccordionItem",
  imports: [
    "import BpkAccordionItem from '@skyscanner/backpack-web/bpk-component-accordion';",
  ],
  example: figma.code`<BpkAccordionItem id="accordion-item"${figma.helpers.react.renderProp(
    "title",
    title,
  )}${figma.helpers.react.renderProp("textStyle", textStyle)}>
        Content goes here
      </BpkAccordionItem>`,
  metadata: { nestable: true },
}
