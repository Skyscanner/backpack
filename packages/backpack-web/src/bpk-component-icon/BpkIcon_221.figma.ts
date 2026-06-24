// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A218
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/star.d.ts
// component=BpkSmallStarIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallStarIcon",
    imports: [
      "import BpkSmallStarIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/star';",
    ],
    example: figma.code`<BpkSmallStarIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeStarIcon",
    imports: [
      "import BpkLargeStarIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/star';",
    ],
    example: figma.code`<BpkLargeStarIcon />`,
  }
} else {
  template = {
    id: "BpkLargeStarIcon",
    imports: [
      "import BpkLargeStarIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/star';",
    ],
    example: figma.code`<BpkLargeStarIcon />`,
  }
}

export default template
