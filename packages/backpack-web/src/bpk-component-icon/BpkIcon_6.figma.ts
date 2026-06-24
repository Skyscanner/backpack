// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A6
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/account--permit.d.ts
// component=BpkSmallAccountPermitIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAccountPermitIcon",
    imports: [
      "import BpkSmallAccountPermitIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/account--permit';",
    ],
    example: figma.code`<BpkSmallAccountPermitIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAccountPermitIcon",
    imports: [
      "import BpkLargeAccountPermitIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--permit';",
    ],
    example: figma.code`<BpkLargeAccountPermitIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAccountPermitIcon",
    imports: [
      "import BpkLargeAccountPermitIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--permit';",
    ],
    example: figma.code`<BpkLargeAccountPermitIcon />`,
  }
}

export default template
