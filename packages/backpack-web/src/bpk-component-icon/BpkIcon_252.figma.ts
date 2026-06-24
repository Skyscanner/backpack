// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=14550%3A55
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/walk.d.ts
// component=BpkSmallWalkIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWalkIcon",
    imports: [
      "import BpkSmallWalkIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/walk';",
    ],
    example: figma.code`<BpkSmallWalkIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWalkIcon",
    imports: [
      "import BpkLargeWalkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/walk';",
    ],
    example: figma.code`<BpkLargeWalkIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWalkIcon",
    imports: [
      "import BpkLargeWalkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/walk';",
    ],
    example: figma.code`<BpkLargeWalkIcon />`,
  }
}

export default template
