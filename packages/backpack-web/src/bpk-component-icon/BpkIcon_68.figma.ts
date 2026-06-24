// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A67
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/content--copy.d.ts
// component=BpkSmallContentCopyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallContentCopyIcon",
    imports: [
      "import BpkSmallContentCopyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/content--copy';",
    ],
    example: figma.code`<BpkSmallContentCopyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeContentCopyIcon",
    imports: [
      "import BpkLargeContentCopyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/content--copy';",
    ],
    example: figma.code`<BpkLargeContentCopyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeContentCopyIcon",
    imports: [
      "import BpkLargeContentCopyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/content--copy';",
    ],
    example: figma.code`<BpkLargeContentCopyIcon />`,
  }
}

export default template
