// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A23
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/award.d.ts
// component=BpkSmallAwardIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAwardIcon",
    imports: [
      "import BpkSmallAwardIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/award';",
    ],
    example: figma.code`<BpkSmallAwardIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAwardIcon",
    imports: [
      "import BpkLargeAwardIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/award';",
    ],
    example: figma.code`<BpkLargeAwardIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAwardIcon",
    imports: [
      "import BpkLargeAwardIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/award';",
    ],
    example: figma.code`<BpkLargeAwardIcon />`,
  }
}

export default template
