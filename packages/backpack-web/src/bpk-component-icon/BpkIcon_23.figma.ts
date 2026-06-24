// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A22
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/arrow-up.d.ts
// component=BpkSmallArrowUpIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallArrowUpIcon",
    imports: [
      "import BpkSmallArrowUpIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/arrow-up';",
    ],
    example: figma.code`<BpkSmallArrowUpIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeArrowUpIcon",
    imports: [
      "import BpkLargeArrowUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-up';",
    ],
    example: figma.code`<BpkLargeArrowUpIcon />`,
  }
} else {
  template = {
    id: "BpkLargeArrowUpIcon",
    imports: [
      "import BpkLargeArrowUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-up';",
    ],
    example: figma.code`<BpkLargeArrowUpIcon />`,
  }
}

export default template
