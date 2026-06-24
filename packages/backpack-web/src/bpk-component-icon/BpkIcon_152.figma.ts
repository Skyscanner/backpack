// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A149
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/long-arrow-left.d.ts
// component=BpkSmallLongArrowLeftIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLongArrowLeftIcon",
    imports: [
      "import BpkSmallLongArrowLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-left';",
    ],
    example: figma.code`<BpkSmallLongArrowLeftIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLongArrowLeftIcon",
    imports: [
      "import BpkLargeLongArrowLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-left';",
    ],
    example: figma.code`<BpkLargeLongArrowLeftIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLongArrowLeftIcon",
    imports: [
      "import BpkLargeLongArrowLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-left';",
    ],
    example: figma.code`<BpkLargeLongArrowLeftIcon />`,
  }
}

export default template
