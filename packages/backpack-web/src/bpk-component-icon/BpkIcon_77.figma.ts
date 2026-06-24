// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A76
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/direct.d.ts
// component=BpkSmallDirectIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDirectIcon",
    imports: [
      "import BpkSmallDirectIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/direct';",
    ],
    example: figma.code`<BpkSmallDirectIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDirectIcon",
    imports: [
      "import BpkLargeDirectIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/direct';",
    ],
    example: figma.code`<BpkLargeDirectIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDirectIcon",
    imports: [
      "import BpkLargeDirectIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/direct';",
    ],
    example: figma.code`<BpkLargeDirectIcon />`,
  }
}

export default template
