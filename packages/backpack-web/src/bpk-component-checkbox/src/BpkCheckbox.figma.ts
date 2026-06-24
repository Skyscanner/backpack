// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A4777
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-checkbox/src/BpkCheckbox.tsx
// component=BpkCheckbox

import figma from "figma"

const label = figma.selectedInstance.findText("Option").__render__()

export default {
  id: "BpkCheckbox",
  imports: [
    "import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';",
  ],
  example: figma.code`<BpkCheckbox${figma.helpers.react.renderProp(
    "name",
    label,
  )}${figma.helpers.react.renderProp("label", label)} onChange={() => { }}/>`,
  metadata: { nestable: true },
}
