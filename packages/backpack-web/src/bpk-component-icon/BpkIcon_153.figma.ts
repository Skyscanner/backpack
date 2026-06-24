// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A150
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/long-arrow-right.d.ts
// component=BpkSmallLongArrowRightIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLongArrowRightIcon",
    imports: [
      "import BpkSmallLongArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';",
    ],
    example: figma.code`<BpkSmallLongArrowRightIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLongArrowRightIcon",
    imports: [
      "import BpkLargeLongArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-right';",
    ],
    example: figma.code`<BpkLargeLongArrowRightIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLongArrowRightIcon",
    imports: [
      "import BpkLargeLongArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-right';",
    ],
    example: figma.code`<BpkLargeLongArrowRightIcon />`,
  }
}

export default template
