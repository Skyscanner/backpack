// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A5121
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-form-validation/src/BpkFormValidation.tsx
// component=BpkFormValidation

import figma from "figma"

const children = figma.selectedInstance.findText("*").__render__()

export default {
  id: "BpkFormValidation",
  imports: [
    "import BpkFormValidation from '@skyscanner/backpack-web/bpk-component-form-validation';",
  ],
  example: figma.code`<BpkFormValidation id="form-validation" expanded>
        ${figma.helpers.react.renderChildren(children)}
      </BpkFormValidation>`,
  metadata: { nestable: true },
}
