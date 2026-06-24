// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A193
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/ppe.d.ts
// component=BpkSmallPpeIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPpeIcon",
    imports: [
      "import BpkSmallPpeIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/ppe';",
    ],
    example: figma.code`<BpkSmallPpeIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePpeIcon",
    imports: [
      "import BpkLargePpeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/ppe';",
    ],
    example: figma.code`<BpkLargePpeIcon />`,
  }
} else {
  template = {
    id: "BpkLargePpeIcon",
    imports: [
      "import BpkLargePpeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/ppe';",
    ],
    example: figma.code`<BpkLargePpeIcon />`,
  }
}

export default template
