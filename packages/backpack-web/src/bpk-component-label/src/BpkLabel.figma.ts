// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A5124
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-label/src/BpkLabel.tsx
// component=BpkLabel

import figma from "figma"

const required = figma.selectedInstance.getEnum("Required", {
  True: true,
  False: false,
})
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
})
const valid = figma.selectedInstance.getEnum("State", {
  Invalid: false,
  Default: undefined,
})
const children = figma.selectedInstance.findText("Label").__render__()

export default {
  id: "BpkLabel",
  imports: [
    "import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';",
  ],
  example: figma.code`<BpkLabel htmlFor="input-id"${figma.helpers.react.renderProp(
    "required",
    required,
  )}${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("valid", valid)}>
        ${figma.helpers.react.renderChildren(children)}
      </BpkLabel>`,
  metadata: { nestable: true },
}
