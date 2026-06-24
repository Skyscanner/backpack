// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A157
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/media.d.ts
// component=BpkSmallMediaIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMediaIcon",
    imports: [
      "import BpkSmallMediaIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/media';",
    ],
    example: figma.code`<BpkSmallMediaIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMediaIcon",
    imports: [
      "import BpkLargeMediaIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/media';",
    ],
    example: figma.code`<BpkLargeMediaIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMediaIcon",
    imports: [
      "import BpkLargeMediaIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/media';",
    ],
    example: figma.code`<BpkLargeMediaIcon />`,
  }
}

export default template
