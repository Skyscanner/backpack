// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A244
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/view.d.ts
// component=BpkSmallViewIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallViewIcon",
    imports: [
      "import BpkSmallViewIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/view';",
    ],
    example: figma.code`<BpkSmallViewIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeViewIcon",
    imports: [
      "import BpkLargeViewIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/view';",
    ],
    example: figma.code`<BpkLargeViewIcon />`,
  }
} else {
  template = {
    id: "BpkLargeViewIcon",
    imports: [
      "import BpkLargeViewIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/view';",
    ],
    example: figma.code`<BpkLargeViewIcon />`,
  }
}

export default template
