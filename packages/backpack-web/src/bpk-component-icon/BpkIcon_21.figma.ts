// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A20
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/arrow-left.d.ts
// component=BpkSmallArrowLeftIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallArrowLeftIcon",
    imports: [
      "import BpkSmallArrowLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/arrow-left';",
    ],
    example: figma.code`<BpkSmallArrowLeftIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeArrowLeftIcon",
    imports: [
      "import BpkLargeArrowLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-left';",
    ],
    example: figma.code`<BpkLargeArrowLeftIcon />`,
  }
} else {
  template = {
    id: "BpkLargeArrowLeftIcon",
    imports: [
      "import BpkLargeArrowLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-left';",
    ],
    example: figma.code`<BpkLargeArrowLeftIcon />`,
  }
}

export default template
