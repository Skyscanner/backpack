// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A60
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/clean.d.ts
// component=BpkSmallCleanIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCleanIcon",
    imports: [
      "import BpkSmallCleanIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/clean';",
    ],
    example: figma.code`<BpkSmallCleanIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCleanIcon",
    imports: [
      "import BpkLargeCleanIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/clean';",
    ],
    example: figma.code`<BpkLargeCleanIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCleanIcon",
    imports: [
      "import BpkLargeCleanIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/clean';",
    ],
    example: figma.code`<BpkLargeCleanIcon />`,
  }
}

export default template
