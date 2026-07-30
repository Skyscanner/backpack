// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A50640
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-card-button/src/BpkSaveButton.tsx
// component=BpkSaveButton

import figma from "figma"

const size = figma.selectedInstance.getEnum("Size", {
  Default: figma.helpers.react.identifier("SIZE_TYPES.default"),
  Small: figma.helpers.react.identifier("SIZE_TYPES.small"),
})
const style = figma.selectedInstance.getEnum("Style", {
  Default: figma.helpers.react.identifier("STYLE_TYPES.default"),
  Contained: figma.helpers.react.identifier("STYLE_TYPES.contained"),
  "On Dark": figma.helpers.react.identifier("STYLE_TYPES.onDark"),
})
const checked = figma.selectedInstance.getEnum("State", {
  Saved: true,
})

export default {
  id: "BpkSaveButton",
  imports: [
    "import BpkSaveButton, { SIZE_TYPES, STYLE_TYPES } from '@skyscanner/backpack-web/bpk-component-card-button'",
  ],
  example: figma.code`<BpkSaveButton${figma.helpers.react.renderProp(
    "checked",
    checked,
  )} accessibilityLabel="Save" onCheckedChange={() => { }}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("style", style)}/>`,
  metadata: { nestable: true },
}
