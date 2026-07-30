// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A5938
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-badge/src/BpkBadge.tsx
// component=BpkBadge

import figma from "figma"

const style = figma.selectedInstance.getEnum("Style", {
  Normal: figma.helpers.react.identifier("BADGE_TYPES.normal"),
  Success: figma.helpers.react.identifier("BADGE_TYPES.success"),
  Warning: figma.helpers.react.identifier("BADGE_TYPES.warning"),
  Critical: figma.helpers.react.identifier("BADGE_TYPES.critical"),
  Inverse: figma.helpers.react.identifier("BADGE_TYPES.inverse"),
  Outline: figma.helpers.react.identifier("BADGE_TYPES.outline"),
  Brand: figma.helpers.react.identifier("BADGE_TYPES.brand"),
  Strong: figma.helpers.react.identifier("BADGE_TYPES.strong"),
})
const label = figma.selectedInstance.findText("Attribute").__render__()

export default {
  id: "BpkBadge",
  imports: [
    "import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';",
  ],
  example: figma.code`<BpkBadge${figma.helpers.react.renderProp(
    "type",
    style,
  )}>${figma.helpers.react.renderChildren(label)}</BpkBadge>`,
  metadata: { nestable: true },
}
