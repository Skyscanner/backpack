// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A148
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/long-arrow-down.d.ts
// component=BpkSmallLongArrowDownIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLongArrowDownIcon",
    imports: [
      "import BpkSmallLongArrowDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-down';",
    ],
    example: figma.code`<BpkSmallLongArrowDownIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLongArrowDownIcon",
    imports: [
      "import BpkLargeLongArrowDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-down';",
    ],
    example: figma.code`<BpkLargeLongArrowDownIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLongArrowDownIcon",
    imports: [
      "import BpkLargeLongArrowDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-down';",
    ],
    example: figma.code`<BpkLargeLongArrowDownIcon />`,
  }
}

export default template
