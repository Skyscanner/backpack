// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A118
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/heart--outline.d.ts
// component=BpkSmallHeartOutlineIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHeartOutlineIcon",
    imports: [
      "import BpkSmallHeartOutlineIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/heart--outline';",
    ],
    example: figma.code`<BpkSmallHeartOutlineIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHeartOutlineIcon",
    imports: [
      "import BpkLargeHeartOutlineIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/heart--outline';",
    ],
    example: figma.code`<BpkLargeHeartOutlineIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHeartOutlineIcon",
    imports: [
      "import BpkLargeHeartOutlineIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/heart--outline';",
    ],
    example: figma.code`<BpkLargeHeartOutlineIcon />`,
  }
}

export default template
