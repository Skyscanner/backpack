// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A224
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/swap--vertical.d.ts
// component=BpkSmallSwapVerticalIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSwapVerticalIcon",
    imports: [
      "import BpkSmallSwapVerticalIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/swap--vertical';",
    ],
    example: figma.code`<BpkSmallSwapVerticalIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSwapVerticalIcon",
    imports: [
      "import BpkLargeSwapVerticalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/swap--vertical';",
    ],
    example: figma.code`<BpkLargeSwapVerticalIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSwapVerticalIcon",
    imports: [
      "import BpkLargeSwapVerticalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/swap--vertical';",
    ],
    example: figma.code`<BpkLargeSwapVerticalIcon />`,
  }
}

export default template
