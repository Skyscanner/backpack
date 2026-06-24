// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A54
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/chevron-right.d.ts
// component=BpkSmallChevronRightIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChevronRightIcon",
    imports: [
      "import BpkSmallChevronRightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chevron-right';",
    ],
    example: figma.code`<BpkSmallChevronRightIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChevronRightIcon",
    imports: [
      "import BpkLargeChevronRightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-right';",
    ],
    example: figma.code`<BpkLargeChevronRightIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChevronRightIcon",
    imports: [
      "import BpkLargeChevronRightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-right';",
    ],
    example: figma.code`<BpkLargeChevronRightIcon />`,
  }
}

export default template
