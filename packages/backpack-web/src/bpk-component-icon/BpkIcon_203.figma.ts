// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A201
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/return.d.ts
// component=BpkSmallReturnIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallReturnIcon",
    imports: [
      "import BpkSmallReturnIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/return';",
    ],
    example: figma.code`<BpkSmallReturnIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeReturnIcon",
    imports: [
      "import BpkLargeReturnIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/return';",
    ],
    example: figma.code`<BpkLargeReturnIcon />`,
  }
} else {
  template = {
    id: "BpkLargeReturnIcon",
    imports: [
      "import BpkLargeReturnIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/return';",
    ],
    example: figma.code`<BpkLargeReturnIcon />`,
  }
}

export default template
