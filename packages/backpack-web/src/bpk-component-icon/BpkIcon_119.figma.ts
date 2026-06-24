// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A117
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/heart.d.ts
// component=BpkSmallHeartIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHeartIcon",
    imports: [
      "import BpkSmallHeartIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/heart';",
    ],
    example: figma.code`<BpkSmallHeartIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHeartIcon",
    imports: [
      "import BpkLargeHeartIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/heart';",
    ],
    example: figma.code`<BpkLargeHeartIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHeartIcon",
    imports: [
      "import BpkLargeHeartIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/heart';",
    ],
    example: figma.code`<BpkLargeHeartIcon />`,
  }
}

export default template
