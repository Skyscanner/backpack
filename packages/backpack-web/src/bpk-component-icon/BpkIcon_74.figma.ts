// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A73
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/depart.d.ts
// component=BpkSmallDepartIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDepartIcon",
    imports: [
      "import BpkSmallDepartIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/depart';",
    ],
    example: figma.code`<BpkSmallDepartIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDepartIcon",
    imports: [
      "import BpkLargeDepartIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/depart';",
    ],
    example: figma.code`<BpkLargeDepartIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDepartIcon",
    imports: [
      "import BpkLargeDepartIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/depart';",
    ],
    example: figma.code`<BpkLargeDepartIcon />`,
  }
}

export default template
