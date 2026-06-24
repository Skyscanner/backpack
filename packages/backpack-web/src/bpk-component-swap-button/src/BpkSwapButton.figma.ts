// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A50522
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-swap-button/src/BpkSwapButton.tsx
// component=BpkSwapButton

import figma from "figma"

const swapButtonStyle = figma.selectedInstance.getEnum("Style", {
  "Surface Contrast": figma.helpers.react.identifier(
    "SWAPBUTTON_STYLES.surfaceContrast",
  ),
  "Canvas Contrast": figma.helpers.react.identifier(
    "SWAPBUTTON_STYLES.canvasContrast",
  ),
  "Canvas Default": figma.helpers.react.identifier(
    "SWAPBUTTON_STYLES.canvasDefault",
  ),
})

export default {
  id: "BpkSwapButton",
  imports: [
    "import BpkSwapButton, { SWAPBUTTON_STYLES } from '@skyscanner/backpack-web/bpk-component-swap-button';",
  ],
  example: figma.code`<BpkSwapButton ariaLabel="Swap origin and destination" onClick={() => { }}${figma.helpers.react.renderProp(
    "swapButtonStyle",
    swapButtonStyle,
  )}/>`,
  metadata: { nestable: true },
}
