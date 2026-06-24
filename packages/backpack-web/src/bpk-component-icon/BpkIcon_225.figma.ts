// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A222
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/swap.d.ts
// component=BpkSmallSwapIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSwapIcon",
    imports: [
      "import BpkSmallSwapIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/swap';",
    ],
    example: figma.code`<BpkSmallSwapIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSwapIcon",
    imports: [
      "import BpkLargeSwapIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/swap';",
    ],
    example: figma.code`<BpkLargeSwapIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSwapIcon",
    imports: [
      "import BpkLargeSwapIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/swap';",
    ],
    example: figma.code`<BpkLargeSwapIcon />`,
  }
}

export default template
