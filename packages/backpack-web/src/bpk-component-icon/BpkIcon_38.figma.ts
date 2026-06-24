// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A34
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/breakfast-tick.d.ts
// component=BpkSmallBreakfastTickIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBreakfastTickIcon",
    imports: [
      "import BpkSmallBreakfastTickIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/breakfast-tick';",
    ],
    example: figma.code`<BpkSmallBreakfastTickIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBreakfastTickIcon",
    imports: [
      "import BpkLargeBreakfastTickIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/breakfast-tick';",
    ],
    example: figma.code`<BpkLargeBreakfastTickIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBreakfastTickIcon",
    imports: [
      "import BpkLargeBreakfastTickIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/breakfast-tick';",
    ],
    example: figma.code`<BpkLargeBreakfastTickIcon />`,
  }
}

export default template
