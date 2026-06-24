// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A7
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/account-circle.d.ts
// component=BpkSmallAccountCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAccountCircleIcon",
    imports: [
      "import BpkSmallAccountCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/account-circle';",
    ],
    example: figma.code`<BpkSmallAccountCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAccountCircleIcon",
    imports: [
      "import BpkLargeAccountCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account-circle';",
    ],
    example: figma.code`<BpkLargeAccountCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAccountCircleIcon",
    imports: [
      "import BpkLargeAccountCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account-circle';",
    ],
    example: figma.code`<BpkLargeAccountCircleIcon />`,
  }
}

export default template
