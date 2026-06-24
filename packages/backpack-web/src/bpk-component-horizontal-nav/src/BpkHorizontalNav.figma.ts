// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10908%3A3878
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-horizontal-nav/src/BpkHorizontalNav.tsx
// component=BpkHorizontalNav

import figma from "figma"

const showUnderline = figma.selectedInstance.getBoolean("Line")
const type = figma.selectedInstance.getEnum("Style", {
  Default: figma.helpers.react.identifier("HORIZONTAL_NAV_TYPES.default"),
  "On Contrast": figma.helpers.react.identifier("HORIZONTAL_NAV_TYPES.light"),
})

export default {
  id: "BpkHorizontalNav",
  imports: [
    "import BpkHorizontalNav, { HORIZONTAL_NAV_TYPES } from '@skyscanner/backpack-web/bpk-component-horizontal-nav';",
    "import BpkHorizontalNavItem from '@skyscanner/backpack-web/bpk-component-horizontal-nav';",
  ],
  example: figma.code`<BpkHorizontalNav${figma.helpers.react.renderProp(
    "showUnderline",
    showUnderline,
  )}${figma.helpers.react.renderProp("type", type)}>
        <BpkHorizontalNavItem>One</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Two</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Three</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Four</BpkHorizontalNavItem>
      </BpkHorizontalNav>`,
  metadata: { nestable: true },
}
