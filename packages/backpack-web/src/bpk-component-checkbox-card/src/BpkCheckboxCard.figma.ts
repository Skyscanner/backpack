// url=https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-checkbox-card/src/BpkCheckboxCard.tsx
// component=BpkCheckboxCard

import figma from "figma"

const checked = figma.selectedInstance.getEnum("State", {
  selected: true,
})
const variant = figma.selectedInstance.getEnum("Style", {
  "On Canvas Default": figma.helpers.react.identifier(
    "CHECKBOX_CARD_VARIANTS.onCanvasDefault",
  ),
  "On Canvas Contrast": figma.helpers.react.identifier(
    "CHECKBOX_CARD_VARIANTS.onCanvasContrast",
  ),
  "On Surface Contrast": figma.helpers.react.identifier(
    "CHECKBOX_CARD_VARIANTS.onSurfaceContrast",
  ),
})
const disabled = figma.selectedInstance.getEnum("State", {
  disabled: true,
})
const label = figma.selectedInstance.findText("Label").__render__()

export default {
  id: "BpkCheckboxCard",
  imports: [
    "import { BpkCheckboxCard } from '@skyscanner/backpack-web/bpk-component-checkbox-card';",
  ],
  example: figma.code`<BpkCheckboxCard.Root${figma.helpers.react.renderProp(
    "checked",
    checked,
  )} onCheckedChange={() => { }}${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}${figma.helpers.react.renderProp("disabled", disabled)}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>${figma.helpers.react.renderChildren(
            label,
          )}</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>`,
  metadata: { nestable: true },
}
