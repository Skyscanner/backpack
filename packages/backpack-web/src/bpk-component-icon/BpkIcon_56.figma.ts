// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A55
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/chevron-up.d.ts
// component=BpkSmallChevronUpIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChevronUpIcon",
    imports: [
      "import BpkSmallChevronUpIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chevron-up';",
    ],
    example: figma.code`<BpkSmallChevronUpIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChevronUpIcon",
    imports: [
      "import BpkLargeChevronUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-up';",
    ],
    example: figma.code`<BpkLargeChevronUpIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChevronUpIcon",
    imports: [
      "import BpkLargeChevronUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-up';",
    ],
    example: figma.code`<BpkLargeChevronUpIcon />`,
  }
}

export default template
