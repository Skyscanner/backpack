// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A1
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/account.d.ts
// component=BpkSmallAccountIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAccountIcon",
    imports: [
      "import BpkSmallAccountIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/account';",
    ],
    example: figma.code`<BpkSmallAccountIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAccountIcon",
    imports: [
      "import BpkLargeAccountIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account';",
    ],
    example: figma.code`<BpkLargeAccountIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAccountIcon",
    imports: [
      "import BpkLargeAccountIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account';",
    ],
    example: figma.code`<BpkLargeAccountIcon />`,
  }
}

export default template
