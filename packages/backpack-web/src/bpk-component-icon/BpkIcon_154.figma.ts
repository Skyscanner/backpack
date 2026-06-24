// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A151
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/long-arrow-up.d.ts
// component=BpkSmallLongArrowUpIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLongArrowUpIcon",
    imports: [
      "import BpkSmallLongArrowUpIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-up';",
    ],
    example: figma.code`<BpkSmallLongArrowUpIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLongArrowUpIcon",
    imports: [
      "import BpkLargeLongArrowUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-up';",
    ],
    example: figma.code`<BpkLargeLongArrowUpIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLongArrowUpIcon",
    imports: [
      "import BpkLargeLongArrowUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-up';",
    ],
    example: figma.code`<BpkLargeLongArrowUpIcon />`,
  }
}

export default template
