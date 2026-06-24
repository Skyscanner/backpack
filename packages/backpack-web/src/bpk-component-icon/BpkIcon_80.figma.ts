// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=11818%3A15
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/dot.d.ts
// component=BpkSmallDotIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDotIcon",
    imports: [
      "import BpkSmallDotIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/dot';",
    ],
    example: figma.code`<BpkSmallDotIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDotIcon",
    imports: [
      "import BpkLargeDotIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/dot';",
    ],
    example: figma.code`<BpkLargeDotIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDotIcon",
    imports: [
      "import BpkLargeDotIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/dot';",
    ],
    example: figma.code`<BpkLargeDotIcon />`,
  }
}

export default template
