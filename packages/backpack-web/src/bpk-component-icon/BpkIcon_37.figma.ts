// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A33
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/breakfast-cross.d.ts
// component=BpkSmallBreakfastCrossIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBreakfastCrossIcon",
    imports: [
      "import BpkSmallBreakfastCrossIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/breakfast-cross';",
    ],
    example: figma.code`<BpkSmallBreakfastCrossIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBreakfastCrossIcon",
    imports: [
      "import BpkLargeBreakfastCrossIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/breakfast-cross';",
    ],
    example: figma.code`<BpkLargeBreakfastCrossIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBreakfastCrossIcon",
    imports: [
      "import BpkLargeBreakfastCrossIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/breakfast-cross';",
    ],
    example: figma.code`<BpkLargeBreakfastCrossIcon />`,
  }
}

export default template
