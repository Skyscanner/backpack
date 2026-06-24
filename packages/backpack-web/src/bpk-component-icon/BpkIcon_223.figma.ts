// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A220
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/star-outline.d.ts
// component=BpkSmallStarOutlineIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallStarOutlineIcon",
    imports: [
      "import BpkSmallStarOutlineIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/star-outline';",
    ],
    example: figma.code`<BpkSmallStarOutlineIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeStarOutlineIcon",
    imports: [
      "import BpkLargeStarOutlineIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/star-outline';",
    ],
    example: figma.code`<BpkLargeStarOutlineIcon />`,
  }
} else {
  template = {
    id: "BpkLargeStarOutlineIcon",
    imports: [
      "import BpkLargeStarOutlineIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/star-outline';",
    ],
    example: figma.code`<BpkLargeStarOutlineIcon />`,
  }
}

export default template
