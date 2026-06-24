// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A64
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/close.d.ts
// component=BpkSmallCloseIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCloseIcon",
    imports: [
      "import BpkSmallCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/close';",
    ],
    example: figma.code`<BpkSmallCloseIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCloseIcon",
    imports: [
      "import BpkLargeCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/close';",
    ],
    example: figma.code`<BpkLargeCloseIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCloseIcon",
    imports: [
      "import BpkLargeCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/close';",
    ],
    example: figma.code`<BpkLargeCloseIcon />`,
  }
}

export default template
