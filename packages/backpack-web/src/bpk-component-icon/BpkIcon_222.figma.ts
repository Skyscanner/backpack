// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A219
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/star-half.d.ts
// component=BpkSmallStarHalfIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallStarHalfIcon",
    imports: [
      "import BpkSmallStarHalfIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/star-half';",
    ],
    example: figma.code`<BpkSmallStarHalfIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeStarHalfIcon",
    imports: [
      "import BpkLargeStarHalfIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/star-half';",
    ],
    example: figma.code`<BpkLargeStarHalfIcon />`,
  }
} else {
  template = {
    id: "BpkLargeStarHalfIcon",
    imports: [
      "import BpkLargeStarHalfIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/star-half';",
    ],
    example: figma.code`<BpkLargeStarHalfIcon />`,
  }
}

export default template
