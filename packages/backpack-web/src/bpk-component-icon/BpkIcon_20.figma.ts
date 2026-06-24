// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A19
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/arrow-down.d.ts
// component=BpkSmallArrowDownIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallArrowDownIcon",
    imports: [
      "import BpkSmallArrowDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/arrow-down';",
    ],
    example: figma.code`<BpkSmallArrowDownIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeArrowDownIcon",
    imports: [
      "import BpkLargeArrowDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-down';",
    ],
    example: figma.code`<BpkLargeArrowDownIcon />`,
  }
} else {
  template = {
    id: "BpkLargeArrowDownIcon",
    imports: [
      "import BpkLargeArrowDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-down';",
    ],
    example: figma.code`<BpkLargeArrowDownIcon />`,
  }
}

export default template
