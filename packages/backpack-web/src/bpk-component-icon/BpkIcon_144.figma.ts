// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A141
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/legroom--reduced.d.ts
// component=BpkSmallLegroomReducedIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLegroomReducedIcon",
    imports: [
      "import BpkSmallLegroomReducedIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/legroom--reduced';",
    ],
    example: figma.code`<BpkSmallLegroomReducedIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLegroomReducedIcon",
    imports: [
      "import BpkLargeLegroomReducedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/legroom--reduced';",
    ],
    example: figma.code`<BpkLargeLegroomReducedIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLegroomReducedIcon",
    imports: [
      "import BpkLargeLegroomReducedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/legroom--reduced';",
    ],
    example: figma.code`<BpkLargeLegroomReducedIcon />`,
  }
}

export default template
