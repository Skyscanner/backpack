// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A223
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/swap--horizontal.d.ts
// component=BpkSmallSwapHorizontalIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSwapHorizontalIcon",
    imports: [
      "import BpkSmallSwapHorizontalIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/swap--horizontal';",
    ],
    example: figma.code`<BpkSmallSwapHorizontalIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSwapHorizontalIcon",
    imports: [
      "import BpkLargeSwapHorizontalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/swap--horizontal';",
    ],
    example: figma.code`<BpkLargeSwapHorizontalIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSwapHorizontalIcon",
    imports: [
      "import BpkLargeSwapHorizontalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/swap--horizontal';",
    ],
    example: figma.code`<BpkLargeSwapHorizontalIcon />`,
  }
}

export default template
