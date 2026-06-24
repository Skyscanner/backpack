// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A52
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/chevron-down.d.ts
// component=BpkSmallChevronDownIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChevronDownIcon",
    imports: [
      "import BpkSmallChevronDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chevron-down';",
    ],
    example: figma.code`<BpkSmallChevronDownIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChevronDownIcon",
    imports: [
      "import BpkLargeChevronDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-down';",
    ],
    example: figma.code`<BpkLargeChevronDownIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChevronDownIcon",
    imports: [
      "import BpkLargeChevronDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chevron-down';",
    ],
    example: figma.code`<BpkLargeChevronDownIcon />`,
  }
}

export default template
