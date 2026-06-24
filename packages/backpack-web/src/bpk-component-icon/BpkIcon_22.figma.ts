// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A21
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/arrow-right.d.ts
// component=BpkSmallArrowRightIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallArrowRightIcon",
    imports: [
      "import BpkSmallArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/arrow-right';",
    ],
    example: figma.code`<BpkSmallArrowRightIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeArrowRightIcon",
    imports: [
      "import BpkLargeArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-right';",
    ],
    example: figma.code`<BpkLargeArrowRightIcon />`,
  }
} else {
  template = {
    id: "BpkLargeArrowRightIcon",
    imports: [
      "import BpkLargeArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-right';",
    ],
    example: figma.code`<BpkLargeArrowRightIcon />`,
  }
}

export default template
