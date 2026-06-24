// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A37
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/cafe.d.ts
// component=BpkSmallCafeIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCafeIcon",
    imports: [
      "import BpkSmallCafeIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/cafe';",
    ],
    example: figma.code`<BpkSmallCafeIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCafeIcon",
    imports: [
      "import BpkLargeCafeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cafe';",
    ],
    example: figma.code`<BpkLargeCafeIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCafeIcon",
    imports: [
      "import BpkLargeCafeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cafe';",
    ],
    example: figma.code`<BpkLargeCafeIcon />`,
  }
}

export default template
