// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A4
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/account--id-card.d.ts
// component=BpkSmallAccountIdCardIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAccountIdCardIcon",
    imports: [
      "import BpkSmallAccountIdCardIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/account--id-card';",
    ],
    example: figma.code`<BpkSmallAccountIdCardIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAccountIdCardIcon",
    imports: [
      "import BpkLargeAccountIdCardIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--id-card';",
    ],
    example: figma.code`<BpkLargeAccountIdCardIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAccountIdCardIcon",
    imports: [
      "import BpkLargeAccountIdCardIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--id-card';",
    ],
    example: figma.code`<BpkLargeAccountIdCardIcon />`,
  }
}

export default template
