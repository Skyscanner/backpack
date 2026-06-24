// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A5030
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-input/src/BpkInput.tsx
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
    "import BpkInput from '@skyscanner/backpack-web/bpk-component-input';",
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
