// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A53
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/chevron-left.d.ts
// component=BpkSmallChevronLeftIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChevronLeftIcon",
    imports: [
      "import BpkSmallChevronLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chevron-left';",
    ],
    example: figma.code`<BpkSmallChevronLeftIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChevronLeftIcon",
    imports: [
      "import BpkLargeChevronLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-left';",
    ],
    example: figma.code`<BpkLargeChevronLeftIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChevronLeftIcon",
    imports: [
      "import BpkLargeChevronLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-left';",
    ],
    example: figma.code`<BpkLargeChevronLeftIcon />`,
  }
}

export default template
