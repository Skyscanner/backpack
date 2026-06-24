// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A51298
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-switch/src/BpkSwitch.tsx
// component=BpkSwitch

import figma from "figma"

const size = figma.selectedInstance.getEnum("Size", {
  Default: false,
  Small: true,
})
const state = figma.selectedInstance.getEnum("State", {
  On: true,
  Off: false,
})

export default {
  id: "BpkSwitch",
  imports: [
    "import BpkSwitch from '@skyscanner/backpack-web/bpk-component-switch';",
  ],
  example: figma.code`<BpkSwitch ariaLabel="Activate Backpack"${figma.helpers.react.renderProp(
    "small",
    size,
  )}${figma.helpers.react.renderProp("checked", state)}/>`,
  metadata: { nestable: true },
}
